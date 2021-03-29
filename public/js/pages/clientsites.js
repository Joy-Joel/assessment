$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    // View All Sites

    var tableallsite = $("#clientsites").DataTable({
        // processing: true,
        serverSide: true,
        bInfo: true,
        pageLength: 50,

        ajax: {
            url: "/get-client-sites",
            data: function(d) {
                d.bu = $("#selectbu")
                    .find(":selected")
                    .val();
                d.ut = $("#selectut")
                    .find(":selected")
                    .val();
            }
        },

        columns: [{
                data: "site_number",
                name: "site_number",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "name",
                name: "name",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "uprisers",
                name: "uprisers",
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
            [0, "asc"]
        ]
    });
    var preid = "";
    $("#selectbu").change(function() {
        var id = $("#selectbu")
            .find(":selected")
            .val();
        if (preid != id) {
            loadBUUT(id);
            preid = id;
        }
    });
    var preidut = "";
    $("#selectut").change(function() {
        var id = $("#selectut")
            .find(":selected")
            .val();
        if (preidut != id) {
            loadUTBU(id);
            preidut = id;
        }
    });

    const loadBUUT = id => {
        $.ajax({
            url: "/get-bu-ut/" + id,
            type: "GET",
            success: function(response) {
                console.log(response);
                List = response;
                $("#selectut").empty();
                $("#selectut").append(
                    '<option value="All" selected="selected" >All</option>'
                );
                for (i in List) {
                    $("#selectut").append(
                        '<option value="' +
                        List[i].id +
                        '">' +
                        List[i].name +
                        "</option>"
                    );
                }

                $("#clientsites")
                    .DataTable()
                    .draw(true);
                tableallsite.ajax.reload(null, false); // user paging is not reset on reload
            },
            error: function(e) {
                console.log("error", e);
            }
        });
    };
    const loadUTBU = id => {
        $.ajax({
            url: "/get-ut-bu/" + id,
            type: "GET",
            success: function(response) {
                console.log(response);
                $("#selectbu").empty();
                $("#selectbu").append(
                    '<option value="' +
                    response[0].id +
                    '" selected="selected" >' +
                    response[0].name +
                    "</option>"
                );
                $("#clientsites")
                    .DataTable()
                    .draw(true);
                tableallsite.ajax.reload(null, false); // user paging is not reset on reload
            },
            error: function(e) {
                console.log("error", e);
            }
        });
    };

    $("#modal-view-site").on("show.bs.modal", function(e) {
        var siteId = $(e.relatedTarget).data("id");
        $.ajax({
            method: "GET",
            url: "/site/" + siteId,
            success: function(msg) {
                // console.log(msg);
                let data = msg;
                console.log(data);
                // $('.modal-body  #site_number').val(data.site_number);
                $(".modal-body  #data-name").val(data.name);
                $(".modal-body  #data-id").val(siteId);
            }
        });
    });
    $("#modal-edit-site").on("show.bs.modal", function(e) {
        var siteId = $(e.relatedTarget).data("id");
        $.ajax({
            method: "GET",
            url: "/site/" + siteId,
            success: function(msg) {
                // console.log(msg);
                let data = msg;
                console.log(data);
                // $('.modal-body  #site_number').val(data.site_number);
                $(".modal-body  #data-name").val(data.name);
                $(".modal-body  #data-id").val(siteId);
            }
        });
    });

    $("#edit-site-plan").submit(function(e) {
        e.preventDefault();
        let form = $("#edit-site-plan").serialize();
        console.log(form);

        $.ajax({
            method: "PATCH",
            url: "/edit-site",
            data: form,
            success: function(response) {
                $("#modal-edit-site").modal("hide");
                tableallsite.ajax.reload(null, false);
                alert("Update Successful");
            }
        });
    });
});