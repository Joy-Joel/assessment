$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var table = $('#allsiteuser').DataTable({
        // processing: true,
        serverSide: true,
        ajax: {
            "type": "GET",
            url: "/allsiteuser",
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
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform')
                }
            },
            {
                data: 'phone_number',
                name: 'phone_number',
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


    // Edit var userId t UT Info
    $('#modal-edit-siteuser').on('show.bs.modal', function(e) {
        var userId = $(e.relatedTarget).data('id');
        console.log(userId);

        $.ajax({
            method: 'GET',
            url: '/get-siteuser/' + userId,
            success: function(msg) {
                // console.log(msg);
                let data = msg;
                console.log(data);
                $('.modal-body  #data-name').val(data.name);
                $('.modal-body  #data-email').val(data.email);
                $('.modal-body  #phone_number').val(data.phone_number);
                $('.modal-body  #address').val(data.address);
                $('.modal-body  #data-id').val(userId);

            }
        });
    });

    $('#edit-siteuser-plan').submit(function(e) {
        e.preventDefault();
        let form = $('#edit-siteuser-plan').serialize()
        console.log(form);

        $.ajax({
            method: 'PATCH',
            url: '/edit-siteuser',
            data: form,
            success: function(response) {
                $("#modal-edit-siteuser").modal('hide')
                table.ajax.reload(null, false);
                alert('Update Successful');
            }
        });
    });

    $('body').on('click', '.delete', function() {
        var id = $(this).data('id');
        // alert('Hello');

        console.log(id);
        $.ajax({
            method: 'DELETE',
            url: '/delete-siteuser/' + id,

            success: function(response) {
                table.ajax.reload(null, false);
            },
            error: (respons, xhr) => {
                alert("Delete fails, Try Again!!!");
            }
        });
    });


    // View Each indidvidual Site User 
    var table = $('#single_siteuser').DataTable({
        // processing: true,
        serverSide: true,
        ajax: {
            "type": "GET",
            url: "/siteuser/" + $('#siteuserid').val(),
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
                data: 'a1',
                name: 'a1',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'a2',
                name: 'a2',

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
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

    var table = $('#allutsites').DataTable({
        // processing: true,
        serverSide: true,
        ajax: {
            "type": "GET",
            url: "/utsites",
        },

        columns: [{
                data: 'site_number',
                name: 'site_number',
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'sorting_1')
                    console.log('hello')

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

    // Edit  SiteUser Info
    $('#modal-edit-allutsite').on('show.bs.modal', function(e) {
        var siteId = $(e.relatedTarget).data('id');
        console.log(siteId);

        $.ajax({
            method: 'GET',
            url: '/getsite-siteuser/' + siteId,
            success: function(msg) {
                // console.log(msg);
                let data = msg;
                console.log(data);
                // $('.modal-body  #site_number').val(data.site_number);
                $('.modal-body  #data-name').val(data.name);
                $('.modal-body  #data-id').val(siteId);

            }
        });
    });

    $('#edit-siteuser-site').submit(function(e) {
        e.preventDefault();
        let form = $('#edit-siteuser-site').serialize()
        console.log(form);

        $.ajax({
            method: 'PATCH',
            url: '/edit-site-siteuser',
            data: form,
            success: function(response) {
                $("#modal-edit-allutsite").modal('hide')
                table.ajax.reload(null, false);
                alert('Update Successful');
            }
        });
    });



});