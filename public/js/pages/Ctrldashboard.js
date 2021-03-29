$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    // disable datatables error prompt
    $.fn.dataTable.ext.errMode = "none";
    $("body").on("click", ".panel_fullscreen", function() {
        var check = $("#panel-1").hasClass("fullscreen");
        if (check) {
            $("#panelbody").css({
                "max-height": "10",
                "overflow-y": "scroll"
            });
        } else {
            $("#panelbody").css({
                "max-height": "",
                "overflow-y": ""
            });
        }
    });

    var table = $("#sitecb").DataTable({
        serverSide: true,
        bFilter: false,
        bInfo: false,
        pageLength: 25,

        ajax: {
            url: "/getTabledata",
            data: function(d) {
                d.bu_id = $("#selectbu")
                    .find(":selected")
                    .val();
                d.ut_id = $("#selectut")
                    .find(":selected")
                    .val();
                d.bu_name = $("#selectbu")
                    .find(":selected")
                    .text();
                d.ut_name = $("#selectut")
                    .find(":selected")
                    .text();
                d.dt_name = $("#sitesearch").val();
            }
        },

        columnDefs: [{
            className: "text-left",
            targets: [1]
        }],

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
                    $(td).css("text-transform", "left");
                }
            },

            {
                data: "status",
                name: "status",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<h4 class="text-danger" style="font-weight: bold;">DOWN</h4>';

                    } else if (data == 1) {
                        return '<h4 class="text-success" style="font-weight: bold;">LIVE</h4>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "left");
                }
            },
            {
                data: "CB_MAIN",
                name: "CB_MAIN",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-success"></i>';
                    } else if (data == 2) {
                        return '<i class="fa fa-bell text-warning"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "CB_A",
                name: "CB_A",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-success"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "CB_B",
                name: "CB_B",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-success"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "CB_C",
                name: "CB_C",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-success"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "CB_D",
                name: "CB_D",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-success"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
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
        ]
    });

    var preStr = $("#selectbu")
        .find(":selected")
        .val();

    $("#selectbu")
        .change(function() {
            var id = $("#selectbu")
                .find(":selected")
                .val();
            // console.log(id);
            if (preStr != id) {
                $.ajax({
                    type: "POST",
                    url: "/getBUUT",
                    data: { id: id },
                    success: function(data) {
                        $("#selectut").empty();
                        $("#selectut").append(
                            "<option value='All'>Select Undertaking (UT)</option>"
                        );
                        for (var i = 0; i < data.length; i++) {
                            var id = data[i]["id"];
                            var name = data[i]["name"];
                            $("#selectut").append(
                                "<option value='" +
                                id +
                                "'>" +
                                name +
                                "</option>"
                            );
                        }
                    }
                });
                $("#sitecb")
                    .DataTable()
                    .draw(true);
                table.ajax.reload(null, false); // user paging is not reset on reload
            }
        })
        .trigger("change");

    var preStrut = $("#selectut")
        .find(":selected")
        .val();

    $("#selectut")
        .change(function() {
            var idut = $("#selectut")
                .find(":selected")
                .val();
            if (preStrut != idut) {
                $.ajax({
                    type: "POST",
                    url: "/getUT",
                    data: { id: idut },
                    success: function(data) {
                        id = data.id;
                        $("#selectbu")
                            .val(id)
                            .trigger("change");
                    }
                });
            }
        })
        .trigger("change");

    $("input.typeahead").typeahead({
        source: function(query, process) {
            return $.get(
                "/autocomplete", {
                    query: query
                },
                function(data) {
                    return process(data);
                }
            );
        },
        updater: function(item) {
            $.ajax({
                type: "GET",
                url: "/getsite/" + item.name,
                success: function(data) {
                    console.log(data);
                    id = data.user_info.id;
                    $("#selectbu")
                        .val(id)
                        .trigger("change");
                    if ((data.ut_info |= null)) {
                        idut = data.ut_info.id;
                        $("#selectut")
                            .val(idut)
                            .trigger("change");
                    }
                }
            });
            $("#sitecb")
                .DataTable()
                .draw(true);
            table.ajax.reload(null, false); // user paging is not reset on reload

            return item;
        }
    });

    $("#modalpassvalidate").on("show.bs.modal", function(e) {
        var id = $(e.relatedTarget).data("id");
        $(".modal-body  #data-id").val(id);
    });

    setInterval(() => {
        $("#sitecb")
            .DataTable()
            .draw(true);
        table.ajax.reload(null, false); // user paging is not reset on reload
    }, 5000);
    $("#confirmbut").click(function(e) {
        e.preventDefault();
        let form = $("#pass_validate").serialize();
        var id = $(".modal-body  #data-id").val();
        $.ajax({
            method: "POST",
            url: "/validateControlpass",
            data: form,
            success: function(response) {
                if (response.Status == "200") {
                    if (response.AuthControl == "1") {
                        window.location.href = "/controlterminal/" + id;
                        toastr.success("User authentication successfull", {
                            timeOut: 1000
                        });
                    } else {
                        toastr.warning(
                            "User not authorized for control <br> Please contact the adminstrator", { timeOut: 2000 }
                        );
                    }
                } else {
                    toastr.warning(response.Auth_info, { timeOut: 5000 });
                }
                $("#modalpassvalidate").modal("hide");
            }
        });
    });
});