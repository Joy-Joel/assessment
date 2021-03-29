$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    $("#modal-control").on("show.bs.modal", function(e) {
        var status = $(e.relatedTarget).data("status");
        var name = $(e.relatedTarget).data("name");
        if (status == 0) {
            var note =
                "NOTE: " +
                name +
                " is down. Operation will be perform once the site is Live ";
            document.getElementById("note").textContent = note;
        }
        var msg = "Sending commands to " + name + " CB? ";
        document.getElementById("alertmsg").textContent = msg;
    });
    $("#confirm").click(function() {
        $("#modal-control").modal("hide");
        $("#sender").text("Executing command");
        $("#sender").prop("disabled", true);
        var status = $("#ctrlbut").prop("checked");
        var statusA = $("#ctrlbutA").prop("checked");
        var statusB = $("#ctrlbutB").prop("checked");
        var statusC = $("#ctrlbutC").prop("checked");
        var statusD = $("#ctrlbutD").prop("checked");
        var serial_number = $("input[name=serial_number]").val();
        $.sendData(serial_number, status, statusA, statusB, statusC, statusD);
    });
    // $("#sender").click(function() {

    // });
    $getFeedbck = false;
    $.sendData = (serial_number, cm, ca, cb, cc, cd) => {
        $.ajax({
            type: "POST",
            url: "/dtctrl",
            data: {
                serialnumber: serial_number,
                CM: cm,
                CA: ca,
                CB: cb,
                CC: cc,
                CD: cd
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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setInterval(() => {
        // if ($getFeedbck) {
        var serial_number = $("input[name=serial_number]").val();
        $.ajax({
            type: "GET",
            url: "/getfeedbck/" + serial_number,
            success: function(jsondata) {
                // console.log(jsondata);

                if (jsondata.z1 == "1") {
                    if ($("#fbM").hasClass("text-danger")) {
                        $("#fbM")
                            .removeClass("text-danger")
                            .addClass("text-success");
                    }
                    if ($("#fbM").hasClass("text-warning")) {
                        $("#fbM")
                            .removeClass("text-warning")
                            .addClass("text-success");
                    }
                } else if (jsondata.c1 == "2") {
                    if ($("#fbM").hasClass("text-danger")) {
                        $("#fbM")
                            .removeClass("text-danger")
                            .addClass("text-warning");
                    }
                    if ($("#fbM").hasClass("text-success")) {
                        $("#fbM")
                            .removeClass("text-success")
                            .addClass("text-warning");
                    }
                } else {
                    if ($("#fbM").hasClass("text-warning")) {
                        $("#fbM")
                            .removeClass("text-warning")
                            .addClass("text-danger");
                    }
                    if ($("#fbM").hasClass("text-success")) {
                        $("#fbM")
                            .removeClass("text-success")
                            .addClass("text-danger");
                    }
                }
                if (jsondata.z2 == "1") {
                    if ($("#fbA").hasClass("text-danger")) {
                        $("#fbA")
                            .removeClass("text-danger")
                            .addClass("text-success");
                    }
                    if ($("#fbA").hasClass("text-warning")) {
                        $("#fbA")
                            .removeClass("text-warning")
                            .addClass("text-success");
                    }
                } else if (jsondata.c2 == "2") {
                    if ($("#fbA").hasClass("text-danger")) {
                        $("#fbA")
                            .removeClass("text-danger")
                            .addClass("text-warning");
                    }
                    if ($("#fbA").hasClass("text-success")) {
                        $("#fbA")
                            .removeClass("text-success")
                            .addClass("text-warning");
                    }
                } else {
                    if ($("#fbA").hasClass("text-warning")) {
                        $("#fbA")
                            .removeClass("text-warning")
                            .addClass("text-danger");
                    }
                    if ($("#fbA").hasClass("text-success")) {
                        $("#fbA")
                            .removeClass("text-success")
                            .addClass("text-danger");
                    }
                }

                if (jsondata.z3 == "1") {
                    if ($("#fbB").hasClass("text-danger")) {
                        $("#fbB")
                            .removeClass("text-danger")
                            .addClass("text-success");
                    }
                    if ($("#fbB").hasClass("text-warning")) {
                        $("#fbB")
                            .removeClass("text-warning")
                            .addClass("text-success");
                    }
                } else if (jsondata.c3 == "2") {
                    if ($("#fbB").hasClass("text-danger")) {
                        $("#fbB")
                            .removeClass("text-danger")
                            .addClass("text-warning");
                    }
                    if ($("#fbB").hasClass("text-success")) {
                        $("#fbB")
                            .removeClass("text-success")
                            .addClass("text-warning");
                    }
                } else {
                    if ($("#fbB").hasClass("text-warning")) {
                        $("#fbB")
                            .removeClass("text-warning")
                            .addClass("text-danger");
                    }
                    if ($("#fbB").hasClass("text-success")) {
                        $("#fbB")
                            .removeClass("text-success")
                            .addClass("text-danger");
                    }
                }
                if (jsondata.z4 == "1") {
                    if ($("#fbC").hasClass("text-danger")) {
                        $("#fbC")
                            .removeClass("text-danger")
                            .addClass("text-success");
                    }
                    if ($("#fbC").hasClass("text-warning")) {
                        $("#fbC")
                            .removeClass("text-warning")
                            .addClass("text-success");
                    }
                } else if (jsondata.c4 == "2") {
                    if ($("#fbC").hasClass("text-warning")) {
                        $("#fbC")
                            .removeClass("text-warning")
                            .addClass("text-danger");
                    }
                    if ($("#fbC").hasClass("text-success")) {
                        $("#fbC")
                            .removeClass("text-success")
                            .addClass("text-danger");
                    }
                } else {
                    if ($("#fbC").hasClass("text-warning")) {
                        $("#fbC")
                            .removeClass("text-warning")
                            .addClass("text-danger");
                    }
                    if ($("#fbC").hasClass("text-success")) {
                        $("#fbC")
                            .removeClass("text-success")
                            .addClass("text-danger");
                    }
                }

                if (jsondata.z5 == "1") {
                    if ($("#fbD").hasClass("text-danger")) {
                        $("#fbD")
                            .removeClass("text-danger")
                            .addClass("text-success");
                    }
                    if ($("#fbD").hasClass("text-warning")) {
                        $("#fbD")
                            .removeClass("text-warning")
                            .addClass("text-success");
                    }
                } else if (jsondata.c5 == "2") {
                    if ($("#fbD").hasClass("text-warning")) {
                        $("#fbD")
                            .removeClass("text-warning")
                            .addClass("text-danger");
                    }
                    if ($("#fbD").hasClass("text-success")) {
                        $("#fbD")
                            .removeClass("text-success")
                            .addClass("text-danger");
                    }
                } else {
                    if ($("#fbD").hasClass("text-warning")) {
                        $("#fbD")
                            .removeClass("text-warning")
                            .addClass("text-danger");
                    }
                    if ($("#fbD").hasClass("text-success")) {
                        $("#fbD")
                            .removeClass("text-success")
                            .addClass("text-danger");
                    }
                }
                $getFeedbck = false;
            }
        });
        // }
    }, 1000);
});