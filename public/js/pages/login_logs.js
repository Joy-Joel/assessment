$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    var table = $('#controllog').DataTable({
        // processing: true,
        serverSide: true,
        "pageLength": 50,

        "ajax": {
            "url": "/getloginactivities",
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
                data: 'agent',
                name: 'agent',

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'ip_address',
                name: 'ip_address',

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            {
                data: 'created_at',
                name: 'created_at',

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            }
        ],
        order: [
            [4, 'desc']
        ]
    });


});