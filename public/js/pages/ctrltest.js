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

        bInfo: false,
        pageLength: 25,

        ajax: {
            url: "/Control-Resp",
            data: function(d) {
                d.client_id = $("#select")
                    .find(":selected")
                    .val();
                d.bu_id = $("#selectbu")
                    .find(":selected")
                    .val();
                d.ut_id = $("#selectut")
                    .find(":selected")
                    .val();


                d.client_name = $("#select")
                    .find(":selected")
                    .text();
                d.bu_name = $("#selectbu")
                    .find(":selected")
                    .text();
                d.ut_name = $("#selectut")
                    .find(":selected")
                    .text();

            }
        },
        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            'csv',
            'excel',
            'print',
        ],

        columnDefs: [{
            className: "text-left",
            targets: [1]
        }],

        columns: [{
                data: "client",
                name: "client",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "left");
                }
            },

            {
                data: "bu",
                name: "bu",
                render: function(data, type, row) {
                    var name = data;

                    if (name.includes('IE-')) {
                        name = name.replace("IE-", "");
                        name = name.replace("-BU", "");
                    }
                    return name;
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "left");
                }
            },
            {
                data: "ut",
                name: "ut",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "name",
                name: "name",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "status",
                name: "status",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-success"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "feedback",
                name: "feedback",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            }
        ]
    });


    var preStr = $("#select")
        .find(":selected")
        .val();

    $("#select")
        .change(function() {
            var id = $("#select")
                .find(":selected")
                .val();
            console.log(id);
            if (preStr != id) {
                $.ajax({
                    type: "GET",
                    url: "/Control-Unit",
                    data: { id: id },
                    success: function(data) {
                        $("#selectbu").empty();
                        $("#selectbu").append(
                            "<option value='All'>All Units</option>"
                        );
                        for (var i = 0; i < data.length; i++) {
                            var id = data[i]["id"];
                            var name = data[i]["name"];

                            if (name.includes('IE-')) {
                                name = name.replace("IE-", "");
                                name = name.replace("-BU", "");
                            }
                            $("#selectbu").append(
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
                    type: "GET",
                    url: "/Control-Subunit",
                    data: { id: id },
                    success: function(data) {
                        $("#selectut").empty();
                        $("#selectut").append(
                            "<option value='All'>All Subunit</option>"
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

    setInterval(() => {
        $("#sitecb")
            .DataTable()
            .draw(true);
        table.ajax.reload(null, false); // user paging is not reset on reload
    }, 3000);


    $("#sender").click(function() {
        $("#modal-control").modal("hide");
        $("#sender").text("Executing command");
        $("#sender").prop("disabled", true);
        var status = $("#ctrl").prop("checked");
        $.sendData(status);
    });

    $.sendData = (cmd) => {
        $.ajax({
            type: "POST",
            url: "/test-cmd",
            data: {
                CMD: cmd,
            },
            success: function(data) {
                // console.log(data);
                if (data.status == 200) {
                    $getFeedbck = true;
                    var seconds = 10,
                        $seconds = document.querySelector("#sender");
                    (function countdown() {
                        $seconds.textContent =
                            "Processing in " + seconds + " s";
                        if (seconds-- > 0) {
                            setTimeout(countdown, 1000);
                        } else {
                            $("#sender").prop("disabled", false);
                            $("#sender").text("Done");
                            sleep(2000).then(() => { $("#sender").text("Send command"); });
                            $("#sitecb")
                                .DataTable()
                                .draw(true);
                            table.ajax.reload(null, false); // user paging is not reset on reload
                        }
                    })();
                    toastr.success(
                        "Command sent successfully.<br>Please wait for confirmation feedback", { timeOut: 500 }
                    );
                }
            },
            error: function(e) {
                $("#sender").prop("disabled", false);
                $("#sender").text("Send command");
                setTimeout(countdown, 1000);
                toastr.warning("Error occur!!! Try again", { timeOut: 5000 });
            }
        });
    };

});