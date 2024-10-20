$(document).ready(() => {
    // Load regions into select dropdown
    let selectedPersonId;
    loadPerson();
    loadMateri();

    // Initialize DataTable
    $("#materi-table").DataTable({
        ajax: {
            url: "api/materi",
            dataSrc: "",
        },
        columns: [
            {
                data: null,
                render: (data, type, row, meta) => {
                    return meta.row + 1;
                },
            },
            {data: "title"},
            // { data: "title" },
            {data: "fileMateri"},
            {data: "lecture.name"},
            {
                data: null,
                // <button
                //   type="button"
                //   class="btn btn-primary"
                //   data-bs-toggle="modal"
                //   data-bs-target="#detail"
                //   onclick="getDetail(${data.id})"
                // >
                //   Detail
                // </button>
                // <button
                //   type="button"
                //   class="btn btn-warning"
                //   data-bs-toggle="modal"
                //   data-bs-target="#update"
                //   onclick="getUpdateData(${data.id})"
                // >
                //   Update
                // </button>
                render: function (data, type, row, meta) {
                    return `
              <button
                type="button"
                class="btn btn-danger"
                onclick="deleteMateri(${data.id})"
              >
                Delete
              </button>
            `;
                },
            },
        ],
    });

    $("#createMateri").submit(function(event) {
        event.preventDefault();
        console.log(selectedPersonId)
        createMateri();
    });
});


function loadPerson() {
    $.ajax({
        method: "GET",
        url: "api/person",
        dataType: "JSON",
        success: (res) => {
            const selectElement = $("#create-person");
            selectElement.empty();

            res.forEach((person) => {
                const option = `<option value="${person.id}">${person.name}</option>`;
                selectElement.append(option);
            });

            // Populate regions in the update modal as well
            const updateSelectElement = $("#update-person");
            updateSelectElement.empty();

            res.forEach((person) => {
                const option = `<option value="${person.id}">${person.name}</option>`;
                updateSelectElement.append(option);
            });

            selectedPersonId = res[0].id;
        },
    });
}

function loadMateri() {
    $.ajax({
        method: "GET",
        url: "api/materi",
        dataType: "JSON",
        success: (res) => {
            const selectElement = $("#create-segment");
            selectElement.empty();

            res.forEach((segment) => {
                const option = `<option value="${segment.id}">${segment.title}</option>`;
                selectElement.append(option);
            });

            // Populate regions in the update modal as well
            const updateSelectElement = $("#update-segment");
            updateSelectElement.empty();

            res.forEach((segment) => {
                const option = `<option value="${segment.id}">${segment.title}</option>`;
                updateSelectElement.append(option);
            });
        },
    });

}

function deleteMateri(id) {
    if (confirm("Are you sure you want to delete this Materi?")) {
        $.ajax({
            method: "DELETE",
            url: `api/materi/${id}`,
            dataType: "JSON",
            contentType: "application/json",
            beforeSend: addCsrfToken(),
            success: (res) => {
                $("#materi-table").DataTable().ajax.reload();
            },
        });
    }
}

function getDetail(id) {
    $.ajax({
        method: "GET",
        url: "api/materi/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#detail-title").val(res.title);
            $("#detail-file").val(res.file_materi);
            $("#detail-lecture").val(res.lecture);
            $("#detail-student").val(res.student);
        },
    });
}

function logout() {
    Swal.fire({
        title: 'Are you sure want to logout this page?',
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
        url: "api/materi/" + id,
        dataType: "JSON",
        contentType: "application/json",
        success: (res) => {
            $("#update-title").val(res.title);
            $("#update-file").val(res.file_materi);
            $("#update-lecture").val(res.lecture);
            $("#update-student").val(res.student);
            $("#materi-id").val(res.id);
        },
    });
}

function updateMateri() {
    let titleVal = $("#update-title").val();
    let fileVal = $("#update-file").val();
    let lectureVal = $("#update-lecture").val();
    let studentVal = $("#update-student").val();
    let materiId = $("#materi-id").val();

    $.ajax({
        method: "PUT",
        url: `/api/materi/${materiId}`,
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify({
            id: materiId,
            title: titleVal,
            file_materi: fileVal,
            lecture: lectureVal,
            student: studentVal,
        }),
        success: (res) => {
            $("#update").modal("hide");
            $("#materi-table").DataTable().ajax.reload();
        },
    });
}

function createMateri() {
  const file = document.getElementById("create-file").files[0];
  const lectureId = selectedPersonId.toString();
  const studentId = document.getElementById("create-student").value;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("lectureId", lectureId);
  formData.append("studentId", studentId);

  $.ajax({
    method: "POST",
    url: "/api/materi",
    data: formData,
    processData: false,
    contentType: false,
    beforeSend: addCsrfToken,
    success: function (res) {
      $("#create").modal("hide");
      $("#materi-table").DataTable().ajax.reload();
    },
    error: function (xhr, status, error) {
      // Penanganan error
      console.log("Error:", error);
    },
  });
}



function addCsrfToken() {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function (e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
}
  