$(document).ready(function(e) {

    $('body').on('click', '.activater', function() {
        alert('Please contact your Admin');
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    //SCAN site for transmitting of live sites

    var table = $('#communication').DataTable({
        // processing: true,
        serverSide: true,
        pageLength: 50,
        ajax: {
            "type": "GET",
            url: "/communication",
        },

        columns: [{
                data: 'name',
                name: 'name',
                render: function(data, type, row) {
                    console.log(data);
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



    $("#modal-delete-api").on("show.bs.modal", function(e) {
        var keyid = $(e.relatedTarget).data("id");
        var name = $(e.relatedTarget).data("name");
        var msg = "Delete " + name + " communication?";
        document.getElementById("alertmsg").textContent = msg;
        $(".modal-body  #data-id").val(keyid);
    });
    $("#confirm").click(function() {
        $.ajax({
            type: 'post',
            url: '/delete-communication/' + $(".modal-body  #data-id").val(),
            success: function(msg) {
                table.ajax.reload(null, false);
                toastr.success('Update successfully', { timeOut: 5000 });
            },
            error: function(msg) {
                toastr.success('Operation fail', { timeOut: 5000 });
            }

        });
        $("#modal-delete-api").modal("hide");
    });


    // Edit var userId t User Info
    $('#modal-edit-communication').on('show.bs.modal', function(e) {
        var commId = $(e.relatedTarget).data('id');
        $.ajax({
            method: 'GET',
            url: '/get-communication/' + commId,
            success: function(msg) {
                let data = msg;
                $('.modal-body  #email_address').val(data.email_address);
                $('.modal-body  #sms_mobile_number').val(data.sms_mobile_number);
                if (data.email_enable == '1' || data.sms_enable == '1') {
                    $('.modal-body  #enable').prop("checked", true);
                    $('.modal-body  #enable').val('1');
                } else {
                    $('.modal-body  #enable').prop("checked", false);
                    $('.modal-body  #enable').val('0');
                }

                $('.modal-body  #data-id').val(commId);
            }
        });
    });
    $('#enable').on('click', function(e) {
        if ($(this).is(':checked', true)) {
            $('.modal-body  #enable').val('1');
        } else {
            $('.modal-body  #enable').val('0');
        }

    });
    $('#edit-communication-plan').submit(function(e) {
        e.preventDefault();
        var checkvalue = '&enable=' + $('.modal-body  #enable').val();
        let form = $('#edit-communication-plan').serialize() + checkvalue;

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