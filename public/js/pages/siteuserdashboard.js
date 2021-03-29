$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    $("body").on("click", ".panel_fullscreen", function() {
        var check = $("#panel-1").hasClass("fullscreen");
        if (check) {
            $("#panelbody").css({ "max-height": "10", "overflow-y": "scroll" });
        } else {
            $("#panelbody").css({ "max-height": "", "overflow-y": "" });
        }
    });
    //SCAN site for transmitting of live sites

    var table = $("#ut_admin").DataTable({
        // processing: true,
        serverSide: true,
        ajax: {
            type: "GET",
            url: "/ut"
        },
        columnDefs: [{
            className: "text-center",
            targets: [2, 3, 4, 5, 6, 7, 8, 9]
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
                data: "a1",
                name: "a1",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "up_time",
                name: "up_time",
                // render: function(data, type, row) {
                //     if (data == "R") {
                //         return '<i class="fa fa-close text-info"></i>';
                //     } else {
                //         return data;
                //     }
                // },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "DT_status",
                name: "DT_status",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "Up_A",
                name: "Up_A",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>';
                    } else if (data == 2) {
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
                data: "Up_B",
                name: "Up_B",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>';
                    } else if (data == 2) {
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
                data: "Up_C",
                name: "Up_C",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>';
                    } else if (data == 2) {
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
                data: "Up_D",
                name: "Up_D",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>';
                    } else if (data == 2) {
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
            [5, "desc"]
        ]
    });

    setInterval(function() {

        table.ajax.reload(null, false); // user paging is not reset on reload


        $.ajax({
            type: "GET",
            url: "/siteuser_sitereviews",
            success: function(data) {
                console.log(data);
                document.getElementById("sitesum").innerHTML =
                    '<a href="#"><b class="text-info">Sites : </b></a>' +
                    data.site_sum;
                document.getElementById("dsite").innerHTML =
                    '<a href="#"><b class="text-info">Down Sites : </b></a>' +
                    data.downsite;
                document.getElementById("lsite").innerHTML =
                    '<a href="#"><b class="text-info">Live Sites : </b></a>' +
                    data.livesite;

                if (data.alarmStatus.alarm_status == "1") {
                    var x = document.getElementById("notifyBeep");
                    x.play();
                    var id = data.alarmStatus.site_id;
                    $.ajax({
                        type: "GET",
                        url: "/siteuser_resetalarm/" + id,
                        success: function(data) {
                            console.log(data);
                        }
                    });
                }
            }
        });
    }, 10000);

    $("body").on("click", ".view", function() {
        console.log($(this).data("href"));
        window.location.href = $(this).data("href");
    });

    var table = $("#allsiteuser").DataTable({
        // processing: true,
        serverSide: true,
        ajax: {
            type: "GET",
            url: "/allsiteuser"
        },

        columns: [{
                data: "name",
                name: "name",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "email",
                name: "email",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "phone_number",
                name: "phone_number",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "address",
                name: "address",

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
            [3, "desc"]
        ]
    });
});