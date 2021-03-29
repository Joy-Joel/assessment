$(document).ready(function(e) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    var tableallut = $("#allut").DataTable({
        // processing: true,
        serverSide: true,

        ajax: {
            type: "GET",
            url: "/view-ut"
        },
        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            "csv",
            "excel",
            "print"
        ],
        columns: [{
                data: "name",
                name: "name",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "email",
                name: "email",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "phone_number",
                name: "phone_number",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "address",
                name: "address",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },

            {
                data: "action",
                name: "action",
                orderable: false,
                searchable: false
            }
        ],
        order: [
            [3, "desc"]
        ]
    });

    // Edit var userId t UT Info
    $("#modal-edit-data").on("show.bs.modal", function(e) {
        var userId = $(e.relatedTarget).data("id");
        // console.log(userId);

        $.ajax({
            method: "GET",
            url: "/get-ut/" + userId,
            success: function(msg) {
                let data = msg[0];

                $(".modal-body  #data-name").val(data.name);
                $(".modal-body  #data-email").val(data.email);
                $(".modal-body  #phone_number").val('234-'+
                    data.phone_number);
                $(".modal-body  #address").val(data.address);
                $(".modal-body  #data-id").val(userId);
            }
        });
    });


    $("#edit-data-plan").submit(function(e) {
        e.preventDefault();
        var checkvalue = '&enable=' + $('.modal-body  #enable').val();
        let form = $('#edit-data-plan').serialize() + checkvalue;
        console.log(form);
        $.ajax({
            method: "PATCH",
            url: "/edit-ut",
            data: form,
            success: function(response) {
                $("#modal-edit-data").modal("hide");
                tableallut.ajax.reload(null, false);
                toastr.success("Update successfull", { timeOut: 5000 });
            }
        });
    });
    // View Each indidvidual UT
    var tableutsite = $("#utsite").DataTable({
        // processing: true,
        serverSide: true,
        ajax: {
            type: "GET",
            url: "/ut/" + $("#utid").val()
        },
        columns: [{
                data: "site_number",
                name: "site_number",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "name",
                name: "name",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "a1",
                name: "a1",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "up_time",
                name: "up_time",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "DT_status",
                name: "DT_status",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-circle text-success"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "Up_A",
                name: "Up_A",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>';
                    } else if (data == 2) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "Up_B",
                name: "Up_B",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>';
                    } else if (data == 2) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "Up_C",
                name: "Up_C",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>';
                    } else if (data == 2) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "Up_D",
                name: "Up_D",
                render: function(data, type, row) {
                    if (data == 0) {
                        return '<i class="fa fa-circle text-success"></i>';
                    } else if (data == 1) {
                        return '<i class="fa fa-bell text-warning"></i>';
                    } else if (data == 2) {
                        return '<i class="fa fa-bell text-danger"></i>';
                    } else {
                        return '<i class="fa fa-close text-info"></i>';
                    }
                },
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "action",
                name: "action",
                orderable: false,
                searchable: false
            }
        ],
        order: [
            [4, "asc"]
        ]
    });
    $("body").on("click", ".view", function() {
        console.log($(this).data("href"));
        window.location.href = $(this).data("href");
    });

    // View All Sites

    var tableallsite = $("#allsites").DataTable({
        // processing: true,
        serverSide: true,
        pageLength: 50,
        ajax: {
            type: "GET",
            url: "/sites"
        },
        dom: '<lBf"bottom">rt<"top"pi><"clear">',
        buttons: [
            // 'pageLength',
            "csv",
            "excel",
            "print"
        ],
        columns: [{
                data: "site_number",
                name: "site_number",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "sorting_1");
                }
            },
            {
                data: "name",
                name: "name",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform");
                }
            },
            {
                data: "uprisers",
                name: "uprisers",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "long",
                name: "long",

                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },
            {
                data: "lat",
                name: "lat",
                createdCell: function(td, cellData, rowData, row, col) {
                    $(td).css("text-transform", "center");
                }
            },

            {
                data: "action",
                name: "action",
                orderable: false,
                searchable: false
            }
        ],
        order: [
            [3, "desc"]
        ]
    });

    // Edit var userId t User Info
    $("#modal-edit-site").on("show.bs.modal", function(e) {
        var siteId = $(e.relatedTarget).data("id");
        console.log(siteId);

        $.ajax({
            method: "GET",
            url: "/site/" + siteId,
            success: function(msg) {
                // console.log(msg);
                let data = msg;
                console.log(data);
                // $('.modal-body  #site_number').val(data.site_number);
                $(".modal-body  #data-name").val(data.name);
                $(".modal-body  #data-id").val(siteId);
            }
        });
    });

    $("#modal-config-site").on("show.bs.modal", function(e) {
        var siteId = $(e.relatedTarget).data("id");
        console.log("config site");

        console.log(siteId);
    });
    $("#edit-site-plan").submit(function(e) {
        e.preventDefault();
        let form = $("#edit-site-plan").serialize();
        console.log(form);

        $.ajax({
            method: "PATCH",
            url: "/edit-site",
            data: form,
            success: function(response) {
                $("#modal-edit-site").modal("hide");
                tableallsite.ajax.reload(null, false);
                toastr.success("Update successfull", { timeOut: 5000 });
            }
        });
    });
});