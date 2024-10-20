$(document).ready(() => {
  // Load regions into select dropdown
  loadPerson();

  // Initialize DataTable
  $("#segment-table").DataTable({
    ajax: {
      url: "api/segment",
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
      { data: "start_date" },
      { data: "end_date" },
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
              onclick="deleteSegment(${data.id})"
            >
              Delete
            </button>
          `;
        },
      },
    ],
  });

  $("#updateForm").submit(function(event) {
    event.preventDefault();

    const formData = {
      title: $("#update-title").val(),
      start_date: $("#update-start-date").val(),
      end_date: $("#update-end-date").val(),
      id: $("#segment-id").val(),
      lecture: { id : $("#update-person").val()},
      description: $("#update-descr").val()
    };

    updateSegment(formData);
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
    },
  });
}

function deleteSegment(id) {
  if (confirm("Are you sure you want to delete this Segment?")) {
    $.ajax({
      method: "DELETE",
      url: `/api/segment/${id}`,
      dataType: "JSON",
      contentType: "application/json",
      beforeSend: addCsrfToken(),
      success: (res) => {
        $("#segment-table").DataTable().ajax.reload();
      },
    });
  }
}

function getDetail(id) {
  $.ajax({
    method: "GET",
    url: "api/segment/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      const datestart = res.start_date;
      const dateend = res.end_date;
      const date1 = new Date(datestart);
      const date2 = new Date(dateend);

      const formattedDate = formatDate(date1);
      const formattedDate2 = formatDate(date2);

      $("#detail-title").val(res.title);
      $("#detail-start-date").val(formattedDate);
      $("#detail-end-date").val(formattedDate2);
      $("#detail-person").val(res.lecture.name);
      $("#detail-descr").val(res.description);
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
      window.location = "http://localhost:9001/login"
    }
  })
}

function getUpdateData(id) {
  $.ajax({
    method: "GET",
    url: "api/segment/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      const datestart = res.start_date;
      const dateend = res.end_date;
      const date1 = new Date(datestart);
      const date2 = new Date(dateend);

      const formattedDate = formatDate(date1);
      const formattedDate2 = formatDate(date2);
      $("#update-title").val(res.title);
      $("#update-start-date").val(formattedDate);
      $("#update-end-date").val(formattedDate2);
      $("#update-person").val(res.lecture.id);
      $("#segment-id").val(res.id);
    },
  });
}

function updateSegment(formdata) {
  // var url = "http:localhost:9001/api/segment/"+formdata.segmentId;
  $.ajax({
    method: "PUT",
    url: "api/segment/" + formdata.id,
    // url: url,
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(formdata),
    beforeSend: addCsrfToken(),
    success: (res) => {
      $("#update").modal("hide");
      $("#segment-table").DataTable().ajax.reload();
    },
  });
}

function createSegment() {
  let titleVal = $("#create-title").val();
  let startVal = $("#create-start-date").val();
  let endVal = $("#create-end-date").val();
  let personId = $("#create-person").val();
  let descr = $("#create-descr").val();

  $.ajax({
    method: "POST",
    url: "/api/segment",
    dataType: "JSON",
    beforeSend: addCsrfToken(),
    contentType: "application/json",
    data: JSON.stringify({
      title: titleVal,
      start_date: startVal,
      end_date: endVal,
      lecture: { id: personId },
      description: descr,
    }),
    success: (res) => {
      $("#create").modal("hide");
      $("#segment-table").DataTable().ajax.reload();
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