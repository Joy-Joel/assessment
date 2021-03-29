$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    // disable datatables error prompt
    $.fn.dataTable.ext.errMode = "none";


    var table = $("#apikeys").DataTable({
        // processing: true,
        serverSide: true,
        ajax: {
            type: "GET",
            url: "/getapikeylist"
        },
        columns: [{
                data: "user",
                name: "user",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "key",
                name: "key",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "request",
                name: "request",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "status",
                name: "status",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "date",
                name: "date",
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
        ]
    });

    $("#modal-view-api").on("show.bs.modal", function(e) {
        var keyid = $(e.relatedTarget).data("id");
        $(".modal-body  #data-id").val("");
        $(".modal-body  #name").val("");
        $(".modal-body  #status").val("");
        $(".modal-body  #apikey").val("");

        var data = new Array();
        $("#apikeys tr").each(function(row, tr) {
            data[row] = {
                key: $(tr)
                    .find("td:eq(1)")
                    .text(),
                status: $(tr)
                    .find("td:eq(3)")
                    .text(),
                name: $(tr)
                    .find("td:eq(5)")
                    .find("a:eq(1)")
                    .attr("data-name"),
                id: $(tr)
                    .find("td:eq(5)")
                    .find("a:eq(1)")
                    .attr("data-id")
            };
        });
        data.shift(); // first row is the table header - so remove
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                var id = element["id"];
                var name = element["name"];
                var apikey = element["key"];
                var status = element["status"];
                if (id == keyid) {
                    if (status == "Active") {
                        $(".modal-body  #keycontrol").text("Deactivate key");
                    } else {
                        $(".modal-body  #keycontrol").text("Activate Key");
                    }
                    $(".modal-body  #data-id").val(keyid);
                    $(".modal-body  #name").val(name);
                    $(".modal-body  #status").val(status);
                    $(".modal-body  #apikey").val(apikey);
                    break;
                }
            }
        }
    });

    $("#modal-delete-api").on("show.bs.modal", function(e) {
        var keyid = $(e.relatedTarget).data("id");
        console.log(keyid);
        var data = new Array();
        $("#apikeys tr").each(function(row, tr) {
            data[row] = {
                name: $(tr)
                    .find("td:eq(5)")
                    .find("a:eq(1)")
                    .attr("data-name"),
                id: $(tr)
                    .find("td:eq(5)")
                    .find("a:eq(1)")
                    .attr("data-id")
            };
        });
        data.shift(); // first row is the table header - so remove

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                var id = element["id"];
                var name = element["name"];

                if (id == keyid) {
                    var msg = "Delete " + name + " key permanently?";
                    document.getElementById("alertmsg").textContent = msg;
                    break;
                }
            }
        }
        $(".modal-body  #data-id").val(keyid);
    });

    $("#modal-gen-api").on("show.bs.modal", function(e) {
        $("#client").empty();
        $("#select2-client-container").text("Select Client");
        $("#generate").prop("disabled", false);
        $("#generate").css("cursor", "");
        $(".modal-body  #apikey").val("");
        $.ajax({
            type: "GET",
            url: "/allclient",
            success: function(data) {
                $("#client").append(
                    "<option value='' selected='selected'>Select Client</option>"
                );
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const element = data[key];
                        var id = element["id"];
                        var name = element["name"];
                        $(".modal-body #client").append(
                            "<option value='" + id + "'>" + name + "</option>"
                        );
                    }
                }
            }
        });
    });




    $("#keycontrol").click(function(e) {
        var url = "";
        if ($(".modal-body  #status").val() == "Active") {
            url = "/deactivateapikey";
        } else {
            url = "/activateapikey";
        }

        $.ajax({
            method: "POST",
            url: url,
            data: {
                id: $(".modal-body  #data-id").val(),
                name: $(".modal-body  #name").val()
            },
            success: function(msg) {
                if (msg.status == 1) {
                    toastr.success("Key activated successfull", {
                        timeOut: 5000
                    });
                } else if (msg.status == 0) {
                    toastr.success("Key deactivated successfull", {
                        timeOut: 5000
                    });
                }
                $("#apikeys")
                    .DataTable()
                    .draw(true);
                table.ajax.reload(null, false); // user paging is not reset on reload
                $("#modal-view-api").modal("hide");
            },
            error: function(error) {
                toastr.success("Operation fail", { timeOut: 5000 });
                $("#apikeys")
                    .DataTable()
                    .draw(true);
                table.ajax.reload(null, false); // user paging is not reset on reload
                $("#modal-view-api").modal("hide");

                $("#modal-view-api").modal("hide");
            }
        });
    });

    $("#regenkey").click(function() {
        $.ajax({
            method: "POST",
            url: "/regenerateapikey",
            data: {
                id: $(".modal-body  #data-id").val(),
                name: $(".modal-body  #name").val()
            },
            success: function(msg) {
                //console.log(msg);
                toastr.success("key regenerate successfull", { timeOut: 5000 });
                $("#modal-view-api").modal("hide");
                $("#apikeys")
                    .DataTable()
                    .draw(true);
                table.ajax.reload(null, false); // user paging is not reset on reload
            }
        });
    });

    $("#confirm").click(function() {
        $.ajax({
            method: "POST",
            url: "/deleteapikey",
            data: {
                id: $(".modal-body  #data-id").val()
            },
            success: function(msg) {
                //console.log(msg);
                toastr.success("key delete successfull", { timeOut: 5000 });
                $("#modal-delete-api").modal("hide");
                $("#apikeys")
                    .DataTable()
                    .draw(true);
                table.ajax.reload(null, false); // user paging is not reset on reload
            },
            error: function(e) {
                toastr.success("Operation fail", { timeOut: 5000 });
                $("#modal-delete-api").modal("hide");
                $("#apikeys")
                    .DataTable()
                    .draw(true);
                table.ajax.reload(null, false); // user paging is not reset on reload
            }
        });
    });

    $("#generate").click(function() {
        if (
            $("#client")
            .find(":selected")
            .val() == ""
        ) {
            toastr.success("Please select a client", { timeOut: 5000 });
            return;
        }
        $.ajax({
            method: "POST",
            url: "/generateapikey",
            data: {
                id: $("#client")
                    .find(":selected")
                    .val(),
                name: $("#client")
                    .find(":selected")
                    .text()
            },
            success: function(msg) {
                $("#generate").prop("disabled", true);
                $("#generate").css("cursor", "not-allowed");
                $(".modal-body  #apikey").val(msg.Key);
                toastr.success("Key generated successfully", { timeOut: 5000 });
                // $('#modal-gen-api').modal('hide');
                $("#apikeys")
                    .DataTable()
                    .draw(true);
                table.ajax.reload(null, false); // user paging is not reset on reload
            },
            error: function(e) {
                toastr.success("Operation fail", { timeOut: 5000 });
                $("#modal-gen-api").modal("hide");
                $("#apikeys")
                    .DataTable()
                    .draw(true);
                table.ajax.reload(null, false); // user paging is not reset on reload
            }
        });
    });
});