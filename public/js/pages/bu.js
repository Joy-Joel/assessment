$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });
    var notify = localStorage.getItem("soundallow");
    console.log(notify);
    if (notify == "true") {
        $("#soundctrl").bootstrapToggle("on");
    } else {
        $("#soundctrl").bootstrapToggle("off");
    }
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
    //SCAN site for transmitting of live sites

    $.ajax({
        type: "GET",
        url: "/scansites"
    });

    var table = $("#site").DataTable({
        // processing: true,
        serverSide: true,
        pageLength: 50,
        bInfo: false,
        ajax: {
            type: "GET",
            url: "/bu"
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
                render: function(data, type, row) {
                    return number_format(data, 2);
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "up_time",
                name: "up_time",
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
            [4, "asc"]
        ]
    });

    $("#soundctrl").change(function() {
        var status = $(this).prop("checked");
        if (status == true) {
            localStorage.setItem("soundallow", true);
        } else if (status == false) {
            localStorage.setItem("soundallow", false);
        }
    });

    function number_format(number, decimals, decPoint, thousandsSep) {
        number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
        var n = !isFinite(+number) ? 0 : +number;
        var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
        var sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
        var dec = typeof decPoint === "undefined" ? "." : decPoint;
        var s = "";

        var toFixedFix = function(n, prec) {
            if (("" + n).indexOf("e") === -1) {
                return +(Math.round(n + "e+" + prec) + "e-" + prec);
            } else {
                var arr = ("" + n).split("e");
                var sig = "";
                if (+arr[1] + prec > 0) {
                    sig = "+";
                }
                return (+(
                    Math.round(+arr[0] + "e" + sig + (+arr[1] + prec)) +
                    "e-" +
                    prec
                )).toFixed(prec);
            }
        };

        // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec).toString() : "" + Math.round(n)).split(
            "."
        );
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || "").length < prec) {
            s[1] = s[1] || "";
            s[1] += new Array(prec - s[1].length + 1).join("0");
        }

        return s.join(dec);
    }

    setInterval(() => {
        table.ajax.reload(null, false); // user paging is not reset on reload
        $.ajax({
            type: "GET",
            url: "/scansites",
            success: function(data) {
                if (data.includes("Login")) {
                    alert("Session timeout!!,  Please login again");
                    window.location.reload();
                }
            }
        });

        $.ajax({
            type: "GET",
            url: "/sitereviews",
            success: function(data) {
                var notify = localStorage.getItem("soundallow");
                if (data.sum == undefined) {} else {
                    document.getElementById("usersum").innerHTML =
                        '<a href="#"><b class="text-info">Users : </b></a>' +
                        data.sum;
                    // document.getElementById("devicesum").innerHTML = '<b class="text-info"> Devices : </b>' + data.device_sum;
                    document.getElementById("sitesum").innerHTML =
                        '<a href="#"><b class="text-info">Sites : </b> </a>' +
                        data.site_sum;
                    document.getElementById("dsite").innerHTML =
                        '<a href="#"><b class="text-info">Down Sites : </b> </a>' +
                        data.downsite;
                    document.getElementById("lsite").innerHTML =
                        '<a href="#"><b class="text-info">Live Sites : </b> </a>' +
                        data.livesite;
                    if (data.alarmStatus != null) {
                        if (data.alarmStatus.alarm_status == "1") {
                            if (notify) {
                                var x = document.getElementById("notifyBeep");
                                x.play();
                            }
                            $.ajax({
                                type: "GET",
                                url: "/resetalarm",
                                success: function(data) {
                                    console.log(data);
                                }
                            });
                        }
                    }
                }
            }
        });
    }, 10000);

    $("body").on("click", ".view", function() {
        window.location.href = $(this).data("href");
    });
});