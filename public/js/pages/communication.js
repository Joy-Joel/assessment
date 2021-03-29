$(document).ready(function(e) {

    $('body').on('click', '.activater', function() {
        alert('Please contact your Admin');
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    var table = $('#communication').DataTable({
        // processing: true,
        serverSide: true,
        pageLength: 50,
        ajax: {
            "type": "GET",
            url: "/communication",
        },
        columnDefs: [{
            'targets': [0], // column index (start from 0)
            'orderable': false, // set orderable false for selected columns
        }],

        columns: [{
                data: "id",
                name: "id",
                render: function(data, type, row) {

                    return '<input class="checkbox" type="checkbox" data-id="' + data + '"  id="' + data + '">';

                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            }, {
                data: 'name',
                name: 'name',
                render: function(data, type, row) {
                    if (data.includes("IE-")) {
                        var res = data.replace("IE-", "");
                        res = res.replace("-BU", "");
                        return res;
                    } else {
                        return data;
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'sorting_1')
                }
            }, {
                data: 'role',
                name: 'role',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'sorting_1')
                }
            },
            {
                data: 'email_address',
                name: 'email_address',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'sorting_1')
                }
            },
            {
                data: 'sms_mobile_number',
                name: 'sms_mobile_number',
                render: function(data, type, row) {
                    return '234' + data;
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform')
                }
            },
            {
                data: 'email_user_type',
                name: 'email_user_type',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'schedule_time',
                name: 'schedule_time',
                render: function(data, type, row) {
                    if (data == '0') {
                        return 'Instant response'
                    } else {
                        return 'After ' + data + ' hours'
                    }

                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'email_enable',
                name: 'email_enable',
                render: function(data, type, row) {
                    if (data == '1') {
                        return 'Enabled'
                    } else {
                        return 'Disabled'
                    }

                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false
            },

        ],
        order: [
            [1, 'desc']
        ]
    });



    var idsArr = [];
    var namecheck = "";
    $("#modal-delete-api").on("show.bs.modal", function(e) {
        var keyid = $(e.relatedTarget).data("id");
        var name = $(e.relatedTarget).data("name");
        if (name == "Multiple") {
            namecheck = name;
            $(".checkbox:checked").each(function() {
                idsArr.push($(this).attr("data-id"));
            });

            $(".modal-body  #data-id").val(idsArr);

            var msg = "Deleting " + name + " communications?";
            document.getElementById("alertmsg").textContent = msg;

        } else {
            var msg = "Delete " + name + " communication?";
            document.getElementById("alertmsg").textContent = msg;
            $(".modal-body  #data-id").val(keyid);
        }

    });
    $("#confirm").click(function() {
        if (namecheck == "Multiple") {
            toastr.info("Delete operation in progress", "Please wait...");
            $("#ajax").modal("show");
            $("#delete").attr("disabled", true);
            $(".checkbox").attr("disabled", true);
            var strIds = idsArr.join(",");
            $.ajax({
                url: "/delete-communications",
                type: "post",
                data: "ids=" + strIds,
                success: function(data) {
                    if (data["status"] == true) {
                        $(".checkbox:checked").each(function() {
                            $(this)
                                .parents("tr")
                                .remove();
                            $("#communication")
                                .DataTable()
                                .draw(true);
                            table.ajax.reload(null, false); // user paging is not reset on reload
                        });
                        toastr.remove();
                        toastr.success("Operation successfully", {
                            timeOut: 2000
                        });
                        $("#master").prop("checked", false);
                        $(".checkbox").attr("disabled", false);
                        $("#ajax").modal("hide");
                    } else {
                        toastr.remove();
                        toastr.warning("Operation fails", { timeOut: 1000 });
                        $(".checkbox").attr("disabled", false);
                        $("#delete").attr("disabled", false);
                        $("#ajax").modal("hide");
                    }
                },

                error: function(data) {
                    toastr.remove();
                    toastr.warning("Operation fails", { timeOut: 1000 });

                    $(".checkbox").attr("disabled", false);
                    $("#delete").attr("disabled", false);
                    $("#ajax").modal("hide");
                }
            });

        } else {
            $("#ajax").modal("show");
            var id = $(".modal-body  #data-id").val();
            $.ajax({
                type: 'post',
                url: '/delete-communication/' + id,
                success: function(msg) {
                    table.ajax.reload(null, false);
                    toastr.success('Update successfully', { timeOut: 5000 });
                    $("#ajax").modal("hide");
                },
                error: function(msg) {
                    toastr.success('Operation fail', { timeOut: 5000 });
                    $("#ajax").modal("hide");
                }

            });
        }
        idsArr = [];
        namecheck = "";
        $("#modal-delete-api").modal("hide");
    });

    $("#master").on("click", function(e) {
        if ($(this).is(":checked", true)) {
            $(".checkbox").prop("checked", true);
            $("#delete").attr("disabled", false);
        } else {
            $(".checkbox").prop("checked", false);
            $("#delete").attr("disabled", true);
        }
    });
    $("#communication").on("change", "tbody input.checkbox", function() {
        cb = $(".checkbox").prop("checked");
        if (cb) {
            $("#delete").attr("disabled", false);
        } else {
            var ischecked = false;
            $('table [type="checkbox"]').each(function(i, chk) {
                if (chk.checked) {
                    ischecked = true;
                }
            });
            if (ischecked) {
                $("#delete").attr("disabled", false);
            } else {
                $("#delete").attr("disabled", true);
            }
        }
    });
    // Edit var userId t User Info
    $('#modal-edit-communication').on('show.bs.modal', function(e) {
        var commId = $(e.relatedTarget).data('id');
        $.ajax({
            method: 'GET',
            url: '/get-communication/' + commId,
            success: function(data) {

                $('.modal-body  #email_address').val(data.email_address);
                $('.modal-body  #sms_mobile_number').val("234-" + data.sms_mobile_number);
                if (data.email_enable == '1') {
                    $('.modal-body  #enable').prop("checked", true);
                    $('.modal-body  #enable').val('1');
                } else {
                    $('.modal-body  #enable').prop("checked", false);
                    $('.modal-body  #enable').val('0');
                }

                if (data.sms_enable == '1') {
                    $('.modal-body  #enabletext').prop("checked", true);
                    $('.modal-body  #enabletext').val('1');
                } else {
                    $('.modal-body  #enabletext').prop("checked", false);
                    $('.modal-body  #enabletext').val('0');
                }

                $('.modal-body  #data-id').val(commId);
            }
        });
    });


    $.ajax({
        type: 'get',
        url: '/get-global-com-settings',
        success: function(data) {

            if (data.status == 200) {
                if (data[0].email == '1') {
                    $('#enablemail').prop("checked", true);
                    $('#enablemail').val('1');
                } else {
                    $('#enablemail').prop("checked", false);
                    $('#enablemail').val('0');
                }

                if (data[0].sms == '1') {
                    $('#enablesms').prop("checked", true);
                    $('#enablesms').val('1');
                } else {
                    $('#enablesms').prop("checked", false);
                    $('#enablesms').val('0');
                }

            }

        }

    });
    $('#enable').on('click', function(e) {
        if ($(this).is(':checked', true)) {
            $('.modal-body  #enable').val('1');
        } else {
            $('.modal-body  #enable').val('0');
        }

    });

    $('#enabletext').on('click', function(e) {
        if ($(this).is(':checked', true)) {
            $('.modal-body  #enabletext').val('1');
        } else {
            $('.modal-body  #enabletext').val('0');
        }

    });

    var updatecomsetting = (email, sms) => {
        $.ajax({
            method: 'post',
            url: '/global-com-settings',
            data: {
                enablemail: email,
                enablesms: sms
            },
            success: function(response) {
                toastr.success('Update successfully', { timeOut: 5000 });

            }
        });

    };
    $('#enablemail').on('click', function(e) {
        if ($(this).is(':checked', true)) {
            $('#enablemail').val('1');
        } else {
            $('#enablemail').val('0');
        }
        updatecomsetting($('#enablemail').val(), $('#enablesms').val());

    });

    $('#enablesms').on('click', function(e) {
        if ($(this).is(':checked', true)) {
            $('#enablesms').val('1');
        } else {
            $('#enablesms').val('0');
        }
        updatecomsetting($('#enablemail').val(), $('#enablesms').val());

    });


    $('#edit-communication-plan').submit(function(e) {
        e.preventDefault();

        if ($('.modal-body  #enabletext').val() == "0") {
            var checkvaluesms = '&enablesms=' + $('.modal-body  #enabletext').val();
        } else {
            var checkvaluesms = "";
        }
        if ($('.modal-body  #enable').val() == "0") {
            var checkvalue = '&enable=' + $('.modal-body  #enable').val();
        } else {
            var checkvalue = "";
        }
        let form = $('#edit-communication-plan').serialize() + checkvalue + checkvaluesms;
        $.ajax({
            method: 'PATCH',
            url: '/edit-communication',
            data: form,
            success: function(response) {

                table.ajax.reload(null, false);
                toastr.success('Update successfully', { timeOut: 5000 });
                $("#modal-edit-communication").modal('hide')
            }
        });
    });


});