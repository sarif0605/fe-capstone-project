$(document).ready(() => {
    // Load assignments, submissions, and segments into select dropdowns
    loadAssignments();
    loadSubmissions();
    loadSegments();

    // Initialize DataTable
    $("#assigmentSub-table").DataTable({
        ajax: {
            url: "/api/sub",
            dataSrc: "",
        },
        columns: [
            {
                data: null,
                render: (data, type, row, meta) => {
                    return meta.row + 1;
                },
            },
            { data: "start_date" },
            { data: "end_date" },
            { data: "assignment.title" },
            { data: "submission.title" },
            { data: "segment.title" },
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
                            onclick="deleteAssigmentSub(${data.id})"
                        >
                            Delete
                        </button>
                    `;
                },
            },
        ],
    });
});

function loadAssignments() {
    $.ajax({
        method: "GET",
        url: "/api/assignment",
        dataType: "JSON",
        success: (res) => {
            const selectElement = $("#create-assignment");
            selectElement.empty();

            res.forEach((assignment) => {
                const option = `<option value="${assignment.id}">${assignment.title}</option>`;
                selectElement.append(option);
            });

            // Populate assignments in the update modal as well
            const updateSelectElement = $("#update-assignment");
            updateSelectElement.empty();

            res.forEach((assignment) => {
                const option = `<option value="${assignment.id}">${assignment.title}</option>`;
                updateSelectElement.append(option);
            });
        },
    });
}

function loadSubmissions() {
    $.ajax({
        method: "GET",
        url: "/api/submission",
        dataType: "JSON",
        success: (res) => {
            const selectElement = $("#create-submission");
            selectElement.empty();

            res.forEach((submission) => {
                const option = `<option value="${submission.id}">${submission.title}</option>`;
                selectElement.append(option);
            });

            // Populate submissions in the update modal as well
            const updateSelectElement = $("#update-submission");
            updateSelectElement.empty();

            res.forEach((submission) => {
                const option = `<option value="${submission.id}">${submission.title}</option>`;
                updateSelectElement.append(option);
            });
        },
    });
}

function loadSegments() {
    $.ajax({
        method: "GET",
        url: "/api/segment",
        dataType: "JSON",
        success: (res) => {
            const selectElement = $("#create-segment");
            selectElement.empty();

            res.forEach((segment) => {
                const option = `<option value="${segment.id}">${segment.title}</option>`;
                selectElement.append(option);
            });

            // Populate segments in the update modal as well
            const updateSelectElement = $("#update-segment");
            updateSelectElement.empty();

            res.forEach((segment) => {
                const option = `<option value="${segment.id}">${segment.title}</option>`;
                updateSelectElement.append(option);
            });
        },
    });
}

function deleteAssigmentSub(id) {
    if (confirm("Are you sure you want to delete this AssigmentSub?")) {
        $.ajax({
            method: "DELETE",
            url: `/api/sub/${id}`,
            dataType: "JSON",
            contentType: "application/json",
            success: (res) => {
                $("#assigmentSub-table").DataTable().ajax.reload();
            },
        });
    }
}

function getDetail(id) {
    $.ajax({
        method: "GET",
        url: "/api/sub/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#detail-start-date").val(res.start_date);
            $("#detail-end-date").val(res.end_date);
            $("#detail-assignment").val(res.assignment.title);
            $("#detail-submission").val(res.submission.title);
            $("#detail-segment").val(res.segment.title);
        },
    });
}

function getUpdateData(id) {
    $.ajax({
        method: "GET",
        url: "/api/sub/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#update-start-date").val(res.start_date);
            $("#update-end-date").val(res.end_date);
            $("#update-assignment").val(res.assignment.id);
            $("#update-submission").val(res.submission.id);
            $("#update-segment").val(res.segment.id);
            $("#assigmentSub-id").val(res.id);
        },
    });
}

function updateAssigmentSub() {
    let startDateVal = $("#update-start-date").val();
    let endDateVal = $("#update-end-date").val();
    let assignmentIdVal = $("#update-assignment").val();
    let submissionIdVal = $("#update-submission").val();
    let segmentIdVal = $("#update-segment").val();
    let assigmentSubId = $("#assigmentSub-id").val();

    $.ajax({
        method: "PUT",
        url: `/api/sub/${assigmentSubId}`,
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify({
            id: assigmentSubId,
            start_date: startDateVal,
            end_date: endDateVal,
            assignment: {
                id: assignmentIdVal
            },
            submission: {
                id: submissionIdVal
            },
            segment: {
                id: segmentIdVal
            }
        }),
        success: (res) => {
            $("#update").modal("hide");
            $("#assigmentSub-table").DataTable().ajax.reload();
        },
    });
}

function createAssigmentSub() {
    let startDateVal = $("#create-start-date").val();
    let endDateVal = $("#create-end-date").val();
    let assignmentIdVal = $("#create-assignment").val();
    let submissionIdVal = $("#create-submission").val();
    let segmentIdVal = $("#create-segment").val();

    $.ajax({
        method: "POST",
        url: "/api/sub",
        dataType: "JSON",
        beforeSend: addCsrfToken(),
        contentType: "application/json",
        data: JSON.stringify({
            start_date: startDateVal,
            end_date: endDateVal,
            assignment: {
                id: assignmentIdVal
            },
            submission: {
                id: submissionIdVal
            },
            segment: {
                id: segmentId
            }
        }),
        success: (res) => {
            $("#create").modal("hide");
            $("#assigmentSub-table").DataTable().ajax.reload();
        },
    });
}
