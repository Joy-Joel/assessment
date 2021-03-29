$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    // disable datatables error prompt
    $.fn.dataTable.ext.errMode = "none";
    var table = $("#client").DataTable({
        // processing: true,
        serverSide: true,
        bInfo: true,
        pageLength: 25,

        ajax: {
            url: "/clients"
        },
        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            'csv',
            'excel',
            'print',
        ],
        columns: [{
                data: "name",
                name: "name",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "address",
                name: "address",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "email",
                name: "email",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "phone_number",
                name: "phone_number",
                render: function(data, type, row) {
                    return '234' + data;
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "totalsites",
                name: "totalsites",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "ctrl_auth",
                name: "ctrl_auth",
                render: function(data, type, row) {
                    if (data == '1') {
                        return 'Active';
                    } else {
                        return 'Deactivated'
                    }

                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "setting",
                name: "setting",
                render: function(data, type, row) {
                    if (data == '1') {
                        return 'Active';
                    } else {
                        return 'Suspended'
                    }

                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "action",
                name: "action",
                orderable: false,
                searchable: false
            }
        ],
        order: [
            [1, "asc"]
        ]
    });

    $('#modal-edit-client').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('id');
        $.ajax({
            method: 'GET',
            url: '/get-client/' + id,
            success: function(msg) {
                let data = msg;
                $('.modal-body  #name').val(data.name);
                $('.modal-body  #address').val(data.address);
                $('.modal-body  #email').val(data.email);
                $('.modal-body  #number').val("234-" + data.phone_number);
                if (data.ctrl_auth == '1') {
                    $('.modal-body  #enable').prop("checked", true);
                    $('.modal-body  #enable').val('1');
                } else {
                    $('.modal-body  #enable').prop("checked", false);
                    $('.modal-body  #enable').val('0');
                }
                if (data.activate == '1') {
                    $('.modal-body  #clientenable').prop("checked", true);
                    $('.modal-body  #clientenable').val('1');
                } else {
                    $('.modal-body  #clientenable').prop("checked", false);
                    $('.modal-body  #clientenable').val('0');
                }


                $('.modal-body  #data-id').val(id);
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


    $('#clientenable').on('click', function(e) {
        if ($(this).is(':checked', true)) {
            $('.modal-body  #clientenable').val('1');
        } else {
            $('.modal-body  #clientenable').val('0');
        }
        // $.ajax({
        //     method: 'post',
        //     url: '/client-activate-settings',
        //     data: {
        //         clientenable: $('.modal-body  #clientenable').val(),
        //         name: $("#name").val()
        //     },
        //     success: function(response) {
        //         toastr.success('Client activate status updated successfully', { timeOut: 5000 });
        //         table.ajax.reload(null, false);
        //     }
        // });
    });


    $("#edit-client-details").submit(function(e) {
        e.preventDefault();
        let form;
        if ($('#enable').is(':checked', true)) {
            form = $("#edit-client-details").serialize();
        } else {
            form = $("#edit-client-details").serialize() + '&enable=0';
        }
        if ($('#clientenable').is(':checked', true)) {
            form = $("#edit-client-details").serialize();
        } else {
            form = form + '&clientenable=0';
        }
        $.ajax({
            method: "PATCH",
            url: "/edit-client",
            data: form,
            success: function(response) {
                table.ajax.reload(null, false);
                toastr.success('Update successfully', { timeOut: 5000 });
                $("#modal-edit-client").modal("hide");
            },
            error: function(data) {
                toastr.warning('Error occur', { timeOut: 5000 });
            }
        });
    });



    $("#modal-delete-api").on("show.bs.modal", function(e) {
        var keyid = $(e.relatedTarget).data("id");
        var name = $(e.relatedTarget).data("name");
        var msg = "Delete " + name + " client?";
        document.getElementById("alertmsg").textContent = msg;
        $(".modal-body  #data-id").val(keyid);
    });
    $("#confirm").click(function() {
        $("#ajax").modal("show");
        $.ajax({
            url: "/delete-client",
            type: 'DELETE',
            data: 'id=' + $(".modal-body  #data-id").val(),
            success: function(data) {
                if (data['status'] == true) {
                    $("#clientsite").DataTable().draw(true);
                    table.ajax.reload(null, false); // user paging is not reset on reload
                    toastr.success('Client  delete successfully', { timeOut: 5000 });
                    $("#ajax").modal("hide");
                } else {
                    toastr.warning('Client delete fails', { timeOut: 5000 });
                    $("#ajax").modal("hide");
                }
            },
            error: function(data) {
                toastr.warning('Error occur', { timeOut: 5000 });
                $("#ajax").modal("hide");
            }

        });
        $("#modal-delete-api").modal("hide");
    });


});