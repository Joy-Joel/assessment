$(document).ready(function(e) {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var tableallut = $('#allbu').DataTable({
        // processing: true,
        serverSide: true,

        ajax: {
            "type": "GET",
            url: "/viewall-bu",
        },

        columns: [{
                data: 'name',
                name: 'name',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'sorting_1')
                }
            },
            {
                data: 'email',
                name: 'email',
                render: function(data, type, row) {

                    return data;

                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform')
                }
            },
            {
                data: 'phone_number',
                name: 'phone_number',
                render: function(data, type, row) {

                    return data;

                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'address',
                name: 'address',

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },

            {
                data: 'control',
                name: 'control',
                render: function(data, type, row) {
                    if (data == '1') {
                        return "Yes";
                    } else {

                        return "No";
                    }

                },

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },

            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false
            },

        ],
        order: [
            [3, 'desc']
        ]
    });

    // Edit var userId BU admin Info
    $('#modal-edit-buinfo').on('show.bs.modal', function(e) {
        var userId = $(e.relatedTarget).data('id');

        $.ajax({
            method: 'GET',
            url: '/get-bu/' + userId,
            success: function(msg) {

                let data = msg[0];
                console.log(data);

                $('.modal-body  #data-name').val(data.name);
                $('.modal-body  #address').val(data.address);
                $(".modal-body  #phone_number").val('234-' + data.phone_number);
                $(".modal-body  #data-email").val(data.email);
                $('.modal-body  #data-id').val(userId);
                if (data.control == '1') {
                    $('.modal-body  #enable').prop("checked", true);
                    $('.modal-body  #enable').val('1');
                } else {
                    $('.modal-body  #enable').prop("checked", false);
                    $('.modal-body  #enable').val('0');
                }


            }
        });
    });
    $('#enable').on('click', function(e) {
        if ($(this).is(':checked', true)) {
            $('.modal-body  #enable').val('1');
        } else {
            $('.modal-body  #enable').val('0');
        }

    });

    $('#edit-data-plan').submit(function(e) {
        e.preventDefault();

        var checkvalue = '&enable=' + $('.modal-body  #enable').val();
        let form = $('#edit-data-plan').serialize() + checkvalue;

        $.ajax({
            method: 'PATCH',
            url: '/edit-buinfo',
            data: form,
            success: function(response) {
                $("#modal-edit-buinfo").modal('hide')
                tableallut.ajax.reload(null, false);
                toastr.success('Update successfully', { timeOut: 5000 });
            }
        });
    });



    // View Each indidvidual BU
    var tableutsite = $('#busite').DataTable({
        // processing: true,
        serverSide: true,
        ajax: {
            "type": "GET",
            url: "/buadmin/" + $('#utid').val(),
        },
        columns: [{
                data: 'site_number',
                name: 'site_number',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'sorting_1')
                }
            },
            {
                data: 'name',
                name: 'name',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform')
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
            // {
            //     data: 'a2',
            //     name: 'a2',

            //     createdCell: function(td, cellData, rowData, row, col) {
            //         $(td).css('text-transform', 'center')
            //     }
            // },
            {
                data: 'DT_status',
                name: 'DT_status',
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>'
                    } else if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>'
                    }

                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'Up_A',
                name: 'Up_A',
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>'
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>'
                    } else if (data == 2) {
                        return '<i class="fa fa-bell text-danger"></i>'
                    } else {
                        return '<i class="fa fa-close text-info"></i>'
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'Up_B',
                name: 'Up_B',
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>'
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>'
                    } else if (data == 2) {
                        return '<i class="fa fa-bell text-danger"></i>'
                    } else {
                        return '<i class="fa fa-close text-info"></i>'
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'Up_C',
                name: 'Up_C',
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>'
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>'
                    } else if (data == 2) {
                        return '<i class="fa fa-bell text-danger"></i>'
                    } else {
                        return '<i class="fa fa-close text-info"></i>'
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'Up_D',
                name: 'Up_D',
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>'
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>'
                    } else if (data == 2) {
                        return '<i class="fa fa-bell text-danger"></i>'
                    } else {
                        return '<i class="fa fa-close text-info"></i>'
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false
            },

        ],
        order: [
            [5, 'desc']
        ]
    });
    $('body').on('click', '.view', function() {
        console.log($(this).data('href'));
        window.location.href = $(this).data('href');
    });



    // View All Sites

    var tableallsite = $('#allsites').DataTable({
        // processing: true,
        serverSide: true,
        "pageLength": 50,
        ajax: {
            "type": "GET",
            url: "/sites",
        },

        columns: [{
                data: 'site_number',
                name: 'site_number',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'sorting_1')
                }
            },
            {
                data: 'name',
                name: 'name',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform')
                }
            },
            {
                data: 'uprisers',
                name: 'uprisers',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'long',
                name: 'long',

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'lat',
                name: 'lat',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },

            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false
            },

        ],
        order: [
            [3, 'desc']
        ]
    });


    // Edit var userId t User Info
    $('#modal-edit-site').on('show.bs.modal', function(e) {
        var siteId = $(e.relatedTarget).data('id');
        $.ajax({
            method: 'GET',
            url: '/site/' + siteId,
            success: function(msg) {
                // console.log(msg);
                let data = msg;
                $('.modal-body  #data-name').val(data.name);
                $('.modal-body  #data-id').val(siteId);

            }
        });
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
    $('#edit-site-plan').submit(function(e) {
        e.preventDefault();
        let form = $('#edit-site-plan').serialize();
        $.ajax({
            method: 'PATCH',
            url: '/edit-site',
            data: form,
            success: function(response) {
                $("#modal-edit-site").modal('hide')
                tableallsite.ajax.reload(null, false);
                toastr.success('Update successfully', { timeOut: 5000 });
            }
        });
    });
});