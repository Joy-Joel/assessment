$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var d = new Date();
    d.setDate(d.getDate() - 6);

    var d7d = String(d.getDate()).padStart(2, "0");
    var m7m = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yy7yy = d.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    to7day = yy7yy + "-" + m7m + "-" + d7d;

    $('#rangepicker').val(to7day + " : " + today);
    $('#rangepicker').attr("data-from", to7day);
    $('#rangepicker').attr('data-to', today);



    var logintable = $("#loginreport").DataTable({
        // processing: true,
        serverSide: true,
        pageLength: 50,

        ajax: {
            url: "/login_report",
            data: function(d) {
                d.start_date = $("#rangepicker").attr("data-from");
                d.end_date = $("#rangepicker").attr("data-to");
                d.selectut = $("#selectut").val();
            }
        },
        // dom: 'Bfrtip',
        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            "csv",
            "excel",
            "print"
        ],
        columns: [{
                data: "user",
                name: "user",
                render: function(data, type, row) {
                    if (data.includes("IE-")) {
                        var name = data.replace("IE-", "");
                        name = name.replace("-BU", "");
                        return name;
                    } else {
                        return data;
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "ip_address",
                name: "ip_address",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "login_count",
                name: "login_count",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "updated_at",
                name: "updated_at",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            }
        ]
    });


    const loadDetails = () => {
        var datarange = $("#rangepicker").val();
        if (datarange != "All") {
            var array = datarange.split(" : ");
            var from_date = array[0].trim();
            var to_date = array[1].trim();
            $("#rangepicker").attr("data-from", from_date);
            $("#rangepicker").attr("data-to", to_date);
        }

        $('#loginreport').DataTable().draw(true);
        logintable.ajax.reload(null, false); // user paging is not reset on reload
    };

    $("#selectut").change(function() {

        loadDetails();
    });
    $("#status").change(function() {

        loadDetails();
    });

    var _container_2 = jQuery('.rangepicker');

    if (_container_2.length > 0) {
        loadScript('assets/plugins/bootstrap.daterangepicker/moment.min.js', function() {
            loadScript('assets/plugins/bootstrap.daterangepicker/daterangepicker.js', function() {

                if (jQuery().datepicker) {

                    _container_2.each(function() {

                        var _t = jQuery(this),
                            _format = _t.attr('data-format').toUpperCase() || 'YYYY-MM-DD';

                        _t.daterangepicker({
                                format: _format,
                                startDate: _t.attr('data-from'),
                                endDate: _t.attr('data-to'),

                                ranges: {
                                    'Today': [moment(), moment()],
                                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                                }
                            },
                            function(start, end, label) {
                                loadDetails();
                            });

                    });

                }

            });
        });
    }
});