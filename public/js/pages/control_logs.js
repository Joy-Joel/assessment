$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    $('#rangepicker').val("Today");
    $('#rangepicker').attr("data-from", today);
    $('#rangepicker').attr('data-to', today);

    var _container_2 = jQuery('.rangepicker');
    const loadDetails = () => {
        var datarange = $("#rangepicker").val();
        if (datarange != "All") {
            var array = datarange.split(" : ");
            var from_date = array[0].trim();
            var to_date = array[1].trim();
            $("#rangepicker").attr("data-from", from_date);
            $("#rangepicker").attr("data-to", to_date);
        }
        $('#report').DataTable().draw(true);
        table.ajax.reload(null, false); // user paging is not reset on reload
    };

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
    var table = $('#controllog').DataTable({
        // processing: true,
        serverSide: true,
        "pageLength": 50,

        ajax: {
            "url": "/getcontrolactivities",
            data: function(d) {
                d.start_date = $("#rangepicker").attr("data-from");
                d.end_date = $("#rangepicker").attr("data-to");
            }
        },

        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            'csv',
            'excel',
            'print',
        ],

        columns: [{
                data: 'role',
                name: 'role',

            },
            {
                data: 'user',
                name: 'user',


            },
            {
                data: 'sitename',
                name: 'sitename',


            },
            {
                data: 'command',
                name: 'command',
                render: function(data, type, row) {
                    return data.trim().substring(0, data.trim().length - 1);
                },



            },
            {
                data: 'ip_address',
                name: 'ip_address',
                render: function(data, type, row) {
                    if (data == null || data == "") {
                        return 'No Ip';
                    } else {
                        return data;
                    }

                },

            },
            {
                data: 'created_at',
                name: 'created_at',


            }
        ],
        order: [
            [5, "desc"]
        ]
    });


});