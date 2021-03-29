$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    // disable datatables error prompt
    $.fn.dataTable.ext.errMode = "none";

    // get non -transmiting site

    var tablefault = $("#faultsite").DataTable({
        // processing: true,
        serverSide: true,
        bInfo: true,
        pageLength: 25,

        ajax: {
            url: "/getFaulty-sites",
            data: function(d) {
                d.value = $("#day")
                    .find(":selected")
                    .val();
            }
        },
        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            "csv",
            "excel",
            "print"
        ],
        columnDefs: [{
            targets: [0], // column index (start from 0)
            orderable: false // set orderable false for selected columns
        }],

        columns: [{
                data: "Client",
                name: "Client",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "BU",
                name: "BU",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "SiteName",
                name: "SiteName",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "alarm",
                name: "alarm",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },

            {
                data: "created_at",
                name: "created_at",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "duration",
                name: "duration",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            }
        ],
        order: [
            [2, "asc"]
        ]
    });

    $("#day").change(function() {

        $("#faultsite")
            .DataTable()
            .draw(true);
        tablefault.ajax.reload(null, false); // user paging is not reset on reload
    });


});