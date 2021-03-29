'use strict';
$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#editable_table').DataTable({
        "pageLength": 50,
        serverSide: true,
        ajax: {
            type: 'GET',
            url: "/user",

            // success: function(result){
            //     console.log(result)
            // }
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
                // concat(codeNumber, data),
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
                data: 'status',
                name: 'status',
                render: function(data, type, row) {
                    return data == '1' ? 'Activate' : 'Deactivated'
                        // if (data.status === 1) {
                        //     return 'Deactivated'
                        // } else{
                        //     return 'Activate'
                        // }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css('text-transform', 'center')
                }
            },
            { data: 'action', name: 'action', orderable: false, searchable: false },

        ],


        order: [
            [5, 'desc']
        ]
    });



    // datatables for pages
    // $('#editable_table').DataTable({
    //     paging: true,
    //     pageLength: 6,
    //     searching: true,
    //     info: true,
    //     autoWidth:true,
    //     // "processing": true,
    //     // "serverSide": true,
    //     dom: "<'text-right'B><f>lr<'table-responsive't><'row'<'col-md-5 col-12'i><'col-md-7 col-12'p>>",
    // buttons: [
    //         'copy', 'csv', 'print'
    //     ]
    // });


    // var table = $('#editable_table');
    // table.DataTable({
    //     dom: "<'text-right'B><f>lr<'table-responsive't><'row'<'col-md-5 col-12'i><'col-md-7 col-12'p>>",
    //     buttons: [
    //         'copy', 'csv', 'print'
    //     ]
    // });
    var tableWrapper = $("#editable_table_wrapper");
    tableWrapper.find(".dataTables_length select").select2({
        showSearchInput: false //hide search box with special css class
    }); // initialize select2 dropdown
    $("#editable_table_wrapper .dt-buttons .btn").addClass('btn-secondary').removeClass('btn-default');
    $(".dataTables_wrapper").removeClass("form-inline");
});