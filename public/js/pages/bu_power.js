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
    $('#rangepicker').val(today + " : " + today);
    $('#rangepicker').attr("data-from", today);
    $('#rangepicker').attr('data-to', today);
    var table = $('#power').DataTable({
        // processing: true,
        serverSide: true,
        searching: false,
        "pageLength": 50,
        "ajax": {
            "url": "/fetchpower",
            "data": function(d) {
                d.name = $("#sitesearch").val();
                d.start_date = $("#rangepicker").attr("data-from");
                d.end_date = $("#rangepicker").attr("data-to");
                d.selectut = $("#selectut").val();
            }
        },
        // dom: 'Bfrtip',
        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            'csv',
            'excel',
            'print',
        ],
        columns: [{
                data: 'name',
                name: 'name',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'sorting_1')
                }
            },
            {
                data: 'power',
                name: 'power',
                render: function(data, type, row) {
                    if (data == 0) {
                        return '0.00'
                    } else {
                        return data
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform')
                }
            },
            {
                data: 'up_time',
                name: 'up_time',
                render: function(data, type, row) {
                    if (data == 0) {
                        return '00:00:00'
                    } else {
                        return milliConvert(data)
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'energy',
                name: 'energy',
                render: function(data, type, row) {
                    if (data == 0 || data == null) {
                        return '0.00'
                    } else {
                        return data
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            // {
            //     data: 'date',
            //     name: 'date',
            //     createdCell: function(td, cellData, rowData, row, col) {
            //         $(td).css('text-transform', 'center')
            //     }
            // }
        ]
    });
    $("#filter").prop('disabled', true);

    $("input.typeahead").typeahead({

        source: function(query, process) {
            return $.get(
                "/fetchsite", {
                    query: query
                },
                function(data) {
                    return process(data);
                }
            );
        },
        updater: function(item) {
            $("#filter").prop('disabled', false);
            $("#filter").attr("data-id", item.id);

            return item;

        }
    });


    $('#modal-power').on('show.bs.modal', function(e) {
        //   var siteid = $(e.relatedTarget).data('id');
        var siteid = $("#filter").attr("data-id");
        var tablemodal = $('#powermodal').DataTable({
            serverSide: true,
            searching: false,
            destroy: true,
            "pageLength": 10,
            "ajax": {
                "url": "/fetchsitereport",
                "data": function(d) {
                    d.id = siteid;
                    d.start_date = $("#rangepicker").attr("data-from");
                    d.end_date = $("#rangepicker").attr("data-to");
                }
            },
            // dom: 'Bfrtip',
            dom: '<lBf"bottom">rt<"top"pi><"clear">',
            buttons: [
                // 'pageLength',
                'csv',
                'excel',
                'print',
            ],
            columns: [{
                    data: 'name',
                    name: 'name',
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).css('text-transform', 'sorting_1')
                    }
                },
                {
                    data: 'power',
                    name: 'power',
                    render: function(data, type, row) {
                        if (data == 0) {
                            return '0.00'
                        } else {
                            return data
                        }
                    },
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).css('text-transform')
                    }
                },
                {
                    data: 'up_time',
                    name: 'up_time',
                    render: function(data, type, row) {
                        if (data == 0) {
                            return '00:00:00'
                        } else {
                            return milliConvert(data)
                        }
                    },
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).css('text-transform', 'center')
                    }
                },
                {
                    data: 'energy',
                    name: 'energy',
                    render: function(data, type, row) {
                        if (data == 0 || data == null) {
                            return '0.00'
                        } else {
                            return data
                        }
                    },
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).css('text-transform', 'center')
                    }
                },
                {
                    data: 'date',
                    name: 'date',
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).css('text-transform', 'center')
                    }
                }
            ]
        });
    });
    $("#modal-power").on("hidden.bs.modal", function() {
        // put your default event here
        tablemodal = $('#powermodal').DataTable();
        tablemodal.destroy();
        console.log('destory');
    });



    const milliConvert = (timestamp) => {
        var hours = Math.floor(timestamp / 60 / 60);
        var minutes = Math.floor(timestamp / 60) - (hours * 60);
        var seconds = timestamp % 60;
        var formatted = hours.toString().padStart(2, '0') + 'h:' + minutes.toString().padStart(2, '0') + 'm:' + seconds.toString().padStart(2, '0') + 's';
        return formatted;

    }



    const loadDetails = () => {

        var datarange = $("#rangepicker").val();
        if (datarange != "All") {
            var array = datarange.split(" : ");
            var from_date = array[0].trim();
            var to_date = array[1].trim();
            $("#rangepicker").attr("data-from", from_date);
            $("#rangepicker").attr("data-to", to_date);
        }
        $('#power').DataTable().draw(true);
        table.ajax.reload(null, false); // user paging is not reset on reload
    };

    $("#selectut").change(function() {
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