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


    var table = $("#injsite").DataTable({

        serverSide: true,
        pageLength: 50,
        ajax: {
            type: "GET",
            url: "/injection-stations"
        },
        columnDefs: [{
            className: "text-center",
            targets: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
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
                    $(td).css("text-transform");
                }
            },
            {
                data: "d1",
                name: "d1",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d2",
                name: "d2",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d3",
                name: "d3",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d4",
                name: "d4",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d5",
                name: "d5",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d6",
                name: "d6",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d7",
                name: "d7",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d8",
                name: "d8",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d9",
                name: "d9",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d10",
                name: "d10",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d11",
                name: "d11",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "d12",
                name: "d12",
                render: function(data, type, row) {
                    if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
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
        ],
        order: [
            [1, "desc"]
        ]
    });

    setInterval(() => {
        table.ajax.reload(null, false); // user paging is not reset on reload
    }, 10000);

    $("body").on("click", ".view", function() {
        var id = $(this).data("id");
        window.location.href = $(this).data("href");
        $.ajax({
            method: 'Get',
            url: "/injection-view/" + id,
            data: {
                id: id,
            },

        })

    });
});