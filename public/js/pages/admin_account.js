$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });
    //SCAN site for transmitting of live sites

    var table = $("#admins").DataTable({
        // processing: true,
        serverSide: true,
        pageLength: 50,
        ajax: {
            type: "GET",
            url: "/admin-list"
        },

        columns: [{
                data: "email",
                name: "email",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "login_count",
                name: "login_count",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "ctrl_auth",
                name: "ctrl_auth",
                render: function(data, type, row) {
                    if (data == "1") {
                        return "Enabled";
                    } else {
                        return "Disabled";
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "activate",
                name: "activate",
                render: function(data, type, row) {
                    if (data == "1") {
                        return "Activated";
                    } else {
                        return "Suspended";
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "updated_at",
                name: "updated_at",

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
            [1, "desc"]
        ]
    });

    $("#enable_ctrl").on("click", function(e) {
        if ($(this).is(":checked", true)) {
            $(".modal-body  #enable_ctrl").val("1");
        } else {
            $(".modal-body  #enable_ctrl").val("0");
        }
    });

    $("#activate_ctrl").on("click", function(e) {
        if ($(this).is(":checked", true)) {
            $(".modal-body  #activate_ctrl").val("1");
        } else {
            $(".modal-body  #activate_ctrl").val("0");
        }
    });

    $("#ctrl_auth").on("click", function(e) {
        if ($(this).is(":checked", true)) {
            $(".modal-body  #ctrl_auth").val("1");
        } else {
            $(".modal-body  #ctrl_auth").val("0");
        }
    });

    $("#activate_edit").on("click", function(e) {
        if ($(this).is(":checked", true)) {
            $(".modal-body  #activate_edit").val("1");
        } else {
            $(".modal-body  #activate_edit").val("0");
        }
    });

    $("#modal-add-admin").on("show.bs.modal", function(e) {});

    $("#create-admin").submit(function(e) {

        e.preventDefault();
        var valueCtrl = $(".modal-body  #enable_ctrl").val();
        var valueActivate = $(".modal-body  #activate_ctrl").val();
        var password = $(".modal-body  #password").val();
        var emailaddress = $(".modal-body  #emailaddress").val();

        $.ajax({
            method: "post",
            url: "/add-admin",
            data: {
                email: emailaddress,
                password: password,
                ctrl: valueCtrl,
                activate: valueActivate
            },
            success: function(response) {
                if (response.status == true) {
                    table.ajax.reload(null, false);
                    toastr.success(response.message, { timeOut: 5000 });
                } else if (response.status == false) {
                    toastr.error(response.message, { timeOut: 5000 });
                }

                $("#modal-add-admin").modal("hide");
            }
        });
    });

    $("#modal-delete-api").on("show.bs.modal", function(e) {
        var keyid = $(e.relatedTarget).data("id");
        var name = $(e.relatedTarget).data("name");
        var msg = "Delete " + name + " admin?";
        document.getElementById("alertmsg").textContent = msg;
        $(".modal-body  #data-id").val(keyid);
    });
    $("#confirm").click(function() {
        $("#ajax").modal("show");
        $.ajax({
            url: "/delete-admin",
            type: "DELETE",
            data: "id=" + $(".modal-body  #data-id").val(),
            success: function(data) {
                if (data["status"] == true) {
                    $("#admin")
                        .DataTable()
                        .draw(true);
                    table.ajax.reload(null, false); // user paging is not reset on reload
                    toastr.success("Admin  delete successfully", {
                        timeOut: 5000
                    });
                    $("#ajax").modal("hide");
                } else {
                    toastr.warning("Admin delete fails", { timeOut: 5000 });
                    $("#ajax").modal("hide");
                }
            },
            error: function(data) {
                toastr.warning("Error occur", { timeOut: 5000 });
                $("#ajax").modal("hide");
            }
        });
        $("#modal-delete-api").modal("hide");
    });

    $("#modal-edit-admin").on("show.bs.modal", function(e) {
        var id = $(e.relatedTarget).data("id");
        $.ajax({
            method: "GET",
            url: "/get-admin/" + id,
            success: function(msg) {
                let data = msg;
                console.log(data);
                $(".modal-body  #email").val(data.email);
                $(".modal-body  #userid").val(id);
                $(".modal-body  #emailadd").val(data.email);
                if (data.ctrl_auth == "1") {
                    $(".modal-body  #ctrl_auth").prop("checked", true);
                    $(".modal-body  #ctrl_auth").val("1");
                } else {
                    $(".modal-body  #ctrl_auth").prop("checked", false);
                    $(".modal-body  #ctrl_auth").val("0");
                }
                if (data.activate == "1") {
                    $(".modal-body  #activate_edit").prop("checked", true);
                    $(".modal-body  #activate_edit").val("1");
                } else {
                    $(".modal-body  #activate_edit").prop("checked", false);
                    $(".modal-body  #activate_edit").val("0");
                }

                $(".modal-body  #data-id").val(id);
            }
        });
    });

    $("#edit-admin").submit(function(e) {
        e.preventDefault();
        let form = $("#edit-admin").serialize();
        if ($("#ctrl_auth").is(":checked", true)) {} else {
            form = form + "&ctrl_auth=0";
        }
        if ($("#activate_edit").is(":checked", true)) {} else {
            form = form + "&activate_edit=0";
        }
        $.ajax({
            method: "PATCH",
            url: "/edit-admin",
            data: form,
            success: function(response) {
                table.ajax.reload(null, false);
                toastr.success("Update successfully", { timeOut: 5000 });
                $("#modal-edit-admin").modal("hide");
            },
            error: function(data) {
                toastr.warning("Error occur", { timeOut: 5000 });
            }
        });
    });
});