$(document).ready(() => {

    // Initialize DataTable
    $("#submission-table").DataTable({
        ajax: {
            url: "api/submission",
            dataSrc: "",
        },
        columns: [
            {
                data: null,
                render: (data, type, row, meta) => {
                    return meta.row + 1;
                },
            },
            { data: "title" },
            { data: "file_submission" },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#detail"
                            onclick="getDetail(${data.id})"
                        >
                            Detail
                        </button>
                        <button
                            type="button"
                            class="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#update"
                            onclick="getUpdateData(${data.id})"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            onclick="deleteSubmission(${data.id})"
                        >
                            Delete
                        </button>
                    `;
                },
            },
        ],
    });
});


function deleteSubmission(id) {
    if (confirm("Are you sure you want to delete this Submission?")) {
        $.ajax({
            method: "DELETE",
            url: `/api/submission/${id}`,
            dataType: "JSON",
            contentType: "application/json",
            success: (res) => {
                $("#submission-table").DataTable().ajax.reload();
            },
        });
    }
}

function getDetail(id) {
    $.ajax({
        method: "GET",
        url: "api/submission/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#detail-title").val(res.title);
            $("#detail-file").val(res.file_submission);
           
        },
    });
}

function logout() {
    Swal.fire({
        title: 'Are you sure you want to logout this page?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                url: "logout",
                dataType: "JSON",
                beforeSend: addCsrfToken()
            });
            window.location = "http://localhost:9000/login"
        }
    })
}

function getUpdateData(id) {
    $.ajax({
        method: "GET",
        url: "api/submission/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#update-title").val(res.title);
            $("#update-file").val(res.file_submission);
           
            $("#submission-id").val(res.id);
        },
    });
}

function updateSubmission() {
    let titleVal = $("#update-title").val();
    let fileVal = $("#update-file").val();
    let submissionId = $("#submission-id").val();

    $.ajax({
        method: "PUT",
        url: `/api/submission/${submissionId}`,
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify({
            id: submissionId,
            title: titleVal,
            file_submission: fileVal,
           
        }),
        success: (res) => {
            $("#update").modal("hide");
            $("#submission-table").DataTable().ajax.reload();
        },
    });
}

function createSubmission() {
    let titleVal = $("#create-title").val();
    let fileVal = $("#create-file").val();
    let assigmentSubVal = $("#create-assigmentSub").val();

    $.ajax({
        method: "POST",
        url: "/api/submission",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        contentType: "application/json",
        data: JSON.stringify({
            title: titleVal,
            file_submission: fileVal,
            assigmentSub: {
                id: assigmentSubVal
            },
         
        }),
        success: (res) => {
            $("#create").modal("hide");
            $("#submission-table").DataTable().ajax.reload();
        },
    });
}
