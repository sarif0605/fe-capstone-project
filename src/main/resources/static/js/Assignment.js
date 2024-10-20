$(document).ready(() => {
    // Load persons and segments into select dropdowns
    let selectedPersonId;
    loadPersons();
    // Initialize DataTable
    $("#assignment-table").DataTable({
        ajax: {
            url: "api/assignment",
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
            { data: "file_tugas" },
            { data: "deadline" },
            { data: "lecture.name" },
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
                            onclick="deleteAssignment(${data.id})"
                        >
                            Delete
                        </button>
                    `;
                },
            },
        ],
    });
});

function loadPersons() {
    $.ajax({
        method: "GET",
        url: "api/person",
        dataType: "JSON",
        success: (res) => {
            const selectElement = $("#create-lecture");
            selectElement.empty();
            res.forEach((person) => {
                const option = `<option value="${person.id}">${person.name}</option>`;

                selectElement.append(option);
            });

            // Populate persons in the update modal as well
            const updateSelectElement = $("#update-lecture");
            const createSelectElement = $("#create-lecture");
            updateSelectElement.empty();
            createSelectElement.empty();

            res.forEach((person) => {
                const option = `<option value="${person.id}">${person.name}</option>`;
                updateSelectElement.append(option);
                createSelectElement.append(option);
            });

            selectedPersonId = res[0].id;
        },
    });
}


function deleteAssignment(id) {
    if (confirm("Are you sure you want to delete this Assignment?")) {
        $.ajax({
            method: "DELETE",
            url: `/api/assignment/${id}`,
            dataType: "JSON",
            contentType: "application/json",
            beforeSend: addCsrfToken(),
            success: (res) => {
                $("#assignment-table").DataTable().ajax.reload();
            },
        });
    }
}

function getDetail(id) {
    $.ajax({
        method: "GET",
        url: "api/assignment/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            const dead = res.deadline;
            const dates = new Date(dead);
            const formattedDate = formatDate(dates);

            $("#detail-title").val(res.title);
            $("#detail-file").val(res.file_tugas);
            $("#detail-deadline").val(formattedDate);
            $("#detail-lecture").val(res.lecture.name);
            // Handle assigmentSubs if necessary
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
            window.location = "http://localhost:9001/login"
        }
    })
}

function getUpdateData(id) {
    $.ajax({
        method: "GET",
        url: "api/assignment/" + id,
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: addCsrfToken(),
        success: (res) => {
            const dead = res.deadline;
            const dates = new Date(dead);
            const formattedDate = formatDate(dates);
            $("#update-title").val(res.title);
            $("#update-file").val(res.file_tugas);
            $("#update-lecture").val(res.lecture.id);
            $("#update-deadline").val(formattedDate);
            // Handle assigmentSubs if necessary
            $("#assignment-id").val(res.id);
        },
    });
}

function updateAssignment() {
    let titleVal = $("#update-title").val();
    let fileVal = $("#update-file").val();
    let lectureVal = $("#update-lecture").val();
    let assignmentId = $("#assignment-id").val();
    let deadline = $("#update-deadline").val();

    $.ajax({
        method: "PUT",
        url: `/api/assignment/${assignmentId}`,
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify({
            title: titleVal,
            file_tugas: fileVal,
            deadline: deadline,
            lectureId: selectedPersonId,
            // Handle assigmentSubs if necessary
        }),
        success: (res) => {
            $("#update").modal("hide");
            $("#assignment-table").DataTable().ajax.reload();
        },
    });
}

function createAssignment() {
    let titleVal = $("#create-title").val();
    let fileVal = $("#create-file").val();
    // let lectureVal = $("#create-lecture").val();
    console.log(selectedPersonId)
    let deadline = $("#create-deadline").val();
    $.ajax({
        method: "POST",
        url: "/api/assignment",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        contentType: "application/json",
        data: JSON.stringify({
            title: titleVal,
            file_tugas: fileVal,
            deadline: deadline,
            lectureId: selectedPersonId,
            // Handle assigmentSubs if necessary
        }),
        success: (res) => {
            $("#create").modal("hide");
            $("#assignment-table").DataTable().ajax.reload();
        },
    });
}


function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function addCsrfToken() {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function (e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
}
