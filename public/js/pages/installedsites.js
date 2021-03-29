$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    // disable datatables error prompt
    $.fn.dataTable.ext.errMode = "none";
    var table = $("#dtsites").DataTable({
        // processing: true,
        serverSide: true,
        bInfo: true,
        pageLength: 25,

        ajax: {
            url: "/load-sites",
            data: function(d) {
                d.id = $("#selectclient")
                    .find(":selected")
                    .val();
                d.name = $("#selectclient")
                    .find(":selected")
                    .text();
            }
        },
        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            "csv",
            "excel",
            "print"
        ],
        columnDefs: [{
            targets: [0], // column index (start from 0)
            orderable: false // set orderable false for selected columns
        }],

        columns: [{
                data: "id",
                name: "id",
                render: function(data, type, row) {
                    return (
                        '<input class="checkbox" type="checkbox" data-id="' +
                        data +
                        '"  id="' +
                        data +
                        '">'
                    );
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "client",
                name: "client",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "SerialNo",
                name: "SerialNo",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "siteName",
                name: "siteName",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "simNo",
                name: "simNo",
                render: function(data, type, row) {
                    return "234" + data;
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "installdate",
                name: "installdate",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "lastupdate",
                name: "lastupdate",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "long",
                name: "long",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "lat",
                name: "lat",
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


    $("#master").on("click", function(e) {
        if ($(this).is(":checked", true)) {
            $(".checkbox").prop("checked", true);
            $("#delete").attr("disabled", false);
        } else {
            $(".checkbox").prop("checked", false);
            $("#delete").attr("disabled", true);
        }
    });

    // get non -transmiting site

    var tabletransmit = $("#sitetransmit").DataTable({
        // processing: true,
        serverSide: true,
        bInfo: true,
        pageLength: 25,

        ajax: {
            url: "/getNotTransmit-sites",
            data: function(d) {
                d.value = $("#day")
                    .find(":selected")
                    .val();
            }
        },
        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            "csv",
            "excel",
            "print"
        ],
        columnDefs: [{
            targets: [0], // column index (start from 0)
            orderable: false // set orderable false for selected columns
        }],

        columns: [{
                data: "Client",
                name: "Client",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "BU",
                name: "BU",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "SiteName",
                name: "SiteName",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "SerialNo",
                name: "SerialNo",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },

            {
                data: "Status",
                name: "Status",
                render: function(data, type, row) {
                    if (data == "0") {
                        return "Stopped Transmitting";
                    } else {
                        return "Never Transmit";
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "lastupdate",
                name: "lastupdate",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            }
        ],
        order: [
            [5, "asc"]
        ]
    });

    $("#day").change(function() {
        console.log(
            $("#day")
            .find(":selected")
            .val()
        );
        $("#sitetransmit")
            .DataTable()
            .draw(true);
        tabletransmit.ajax.reload(null, false); // user paging is not reset on reload
    });

    //
    $("#dtsites").on("change", "tbody input.checkbox", function() {
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

    $("#selectclient").change(function() {
        var id = $("#selectclient")
            .find(":selected")
            .val();
        $("#clientsite")
            .DataTable()
            .draw(true);
        table.ajax.reload(null, false); // user paging is not reset on reload
    });

    $("#modal-edit-site").on("show.bs.modal", function(e) {
        var siteId = $(e.relatedTarget).data("id");
        $.ajax({
            method: "GET",
            url: "/site/" + siteId,
            success: function(msg) {
                let data = msg;
                $(".modal-body  #number").val("234-" + data.phone_number);
                $(".modal-body  #data-name").val(data.name);
                $(".modal-body  #data-id").val(siteId);
                $("input[name=enable][value=" + data.ctrl_enable + "]").attr(
                    "checked",
                    "checked"
                );
            }
        });
    });

    $("#edit-site-plan").submit(function(e) {
        e.preventDefault();
        let form = $("#edit-site-plan").serialize();
        $.ajax({
            method: "PATCH",
            url: "/edit-site",
            data: form,
            success: function(response) {
                table.ajax.reload(null, false);
                toastr.success("Updaet successfully", { timeOut: 5000 });
                $("#modal-edit-site").modal("hide");
            },
            error: function(data) {
                toastr.warning("Error occur", { timeOut: 5000 });
            }
        });
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

            var msg = "Deleting " + name + " sites?";
            document.getElementById("alertmsg").textContent = msg;
        } else {
            var msg = "Delete " + name + " site?";
            document.getElementById("alertmsg").textContent = msg;
            $(".modal-body  #data-id").val(keyid);
        }
    });
    $("#confirm").click(function() {
        if (namecheck == "Multiple") {
            toastr.info("Delete opearion in progress", "Please wait...");
            $("#ajax").modal("show");
            $("#delete").attr("disabled", true);
            $(".checkbox").attr("disabled", true);
            var strIds = idsArr.join(",");
            $.ajax({
                url: "/delete-sites",
                type: "DELETE",
                data: "ids=" + strIds,
                success: function(data) {
                    if (data["status"] == true) {
                        $(".checkbox:checked").each(function() {
                            $(this)
                                .parents("tr")
                                .remove();
                            $("#clientsite")
                                .DataTable()
                                .draw(true);
                            table.ajax.reload(null, false); // user paging is not reset on reload
                        });
                        toastr.remove();
                        toastr.success("Site delete successfully", {
                            timeOut: 5000
                        });
                        $("#master").prop("checked", false);
                        $(".checkbox").attr("disabled", false);
                        $("#ajax").modal("hide");
                    } else {
                        toastr.remove();
                        toastr.warning("Site delete fails", { timeOut: 5000 });
                        $(".checkbox").attr("disabled", false);
                        $("#ajax").modal("hide");
                    }
                },

                error: function(data) {
                    toastr.remove();
                    toastr.warning(data.responseText, { timeOut: 5000 });

                    $(".checkbox").attr("disabled", false);
                    $("#ajax").modal("hide");
                }
            });
        } else {
            var id = $(".modal-body  #data-id").val();
            toastr.info("Delete operation in progress", "Please wait...");
            $("#ajax").modal("show");
            $.ajax({
                url: "/delete-site",
                type: "DELETE",
                data: "ids=" + id,
                success: function(data) {
                    if (data["status"] == true) {
                        $("#clientsite")
                            .DataTable()
                            .draw(true);
                        table.ajax.reload(null, false); // user paging is not reset on reload
                        toastr.remove();
                        toastr.success("Site delete successfully", {
                            timeOut: 5000
                        });
                        $("#ajax").modal("hide");
                    } else {
                        toastr.remove();
                        toastr.warning("Site delete fails", { timeOut: 5000 });
                        $("#ajax").modal("hide");
                    }
                },
                error: function(data) {
                    toastr.remove();
                    toastr.warning("Error occur", { timeOut: 5000 });
                    $("#ajax").modal("hide");
                }
            });
        }
        idsArr = [];
        namecheck = "";
        $("#modal-delete-api").modal("hide");
    });
});