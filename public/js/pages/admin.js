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
    //SCAN site for transmitting of live sites

    $.ajax({
        type: "GET",
        url: "/scanallsites"
    });


    setInterval(() => {
        var id = $("#selectclient")
            .find(":selected")
            .val();
        loadDashboardData(id);
        $.ajax({
            type: "GET",
            url: "/scanallsites",
            success: function(data) {
                if (data.includes("Login")) {
                    window.location.reload();
                }
            }
        });


        $.ajax({
            type: "GET",
            url: "/dashboardupdate",
            success: function(data) {
                if (data.sum == undefined) {} else {
                    document.getElementById("usersum").innerHTML =
                        '<a href="/clients><b class="text-info">Clients : </b></a>' +
                        data.sum;
                    // document.getElementById("devicesum").innerHTML = '<b class="text-info"> Devices : </b>' + data.device_sum;
                    document.getElementById("sitesum").innerHTML =
                        '<a href="/admin-sites"><b class="text-info">Sites : </b> </a>' +
                        data.site_sum;
                    document.getElementById("nonactive").innerHTML =
                        '<a href="/Not-Transmit"><b class="text-info">Not-transmit : </b> </a>' +
                        data.notactive;
                    document.getElementById("dsite").innerHTML =
                        '<a href="#"><b class="text-info">Down Sites : </b> </a>' +
                        data.downsite;
                    document.getElementById("lsite").innerHTML =
                        '<a href="#"><b class="text-info">Live Sites : </b> </a>' +
                        data.livesite;
                    document.getElementById("fsite").innerHTML =
                        '<a href="/Fault-Sites"><b class="text-info">Faulty Sites : </b> </a>' +
                        data.faultsite;

                }
            }
        });
    }, 10000);



    $("#sitepreview").DataTable({
        bFilter: false,
        bInfo: false,
        scrollY: false,
        scrollX: false,
        paging: false,
        order: [
            [1, "desc"]
        ],
        columnDefs: [{
                className: "text-center",
                targets: [1]
            },

            {
                className: "green text-center",
                targets: [2]
            },
            {
                className: "red text-center",
                targets: [3]
            }
        ],
        fnRowCallback: function(nRow) {
            $(nRow).css("font-weight", "bold");

            $(nRow).css("font-size", "medium");
        }
    });

    var str = $("#selectclient")
        .find(":selected")
        .val();
    const populateSummary = data => {
        $("#sitepreview")
            .DataTable()
            .clear();
        var length = Object.keys(data).length;
        for (var i = 0; i < length; i++) {
            var site = data[i];
            var name = site.name;
            if (name.includes('IE-')) {
                name = name.replace("IE-", "");
                name = name.replace("-BU", "");
            }
            $("#sitepreview")
                .dataTable()
                .fnAddData([
                    "<a href=" + "/sites/" + site.id + ">" + name + "</a>",
                    site.sitesum,
                    site.livesite,
                    site.downsite
                ]);
        }
    };
    const loadDashboardData = id => {
        $.ajax({
            url: "/clientsummary",
            type: "GET",
            data: {
                id: id
            },
            success: function(response) {
                populateSummary(response);
            },
            error: function(e) {
                console.log("error", e);
            }
        });
    };
    loadDashboardData(str);

    $("#selectclient").change(function() {
        var id = $("#selectclient")
            .find(":selected")
            .val();
        loadDashboardData(id);
    });
});