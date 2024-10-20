$(document).ready(function() {
    $('#role-table').DataTable({
      ajax: {
        url: "/api/role",
        dataSrc: ""
      },
      columns: [
        {
          data: null,
          render: function(data, type, row, meta) {
            return meta.row + 1;
          }
        },
        { data: "name" },
        {
          data: null,
          render: function(data, type, row, meta) {
            return `
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detail" onclick="getDetail(${data.id})">
                Detail
              </button>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update" onclick="getUpdateData(${data.id})">
                Update
              </button>
              <button type="button" class="btn btn-danger" onclick="deleteRole(${data.id})">
                Delete
              </button>
            `;
          }
        }
      ]
    });
  });
  
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
          beforeSend: addCsrfToken
        });
        window.location = "http://localhost:9001/login";
      }
    });
  }
  
  function deleteRole(id) {
    if (confirm("Are you sure you want to delete this role?")) {
      $.ajax({
        method: "DELETE",
        url: `/api/role/${id}`,
        dataType: "JSON",
        beforeSend: addCsrfToken,
        contentType: "application/json",
        success: function(res) {
          $("#role-table").DataTable().ajax.reload();
        }
      });
    }
  }
  
  function getDetail(id) {
    $.ajax({
      method: "GET",
      url: `/api/role/${id}`,
      dataType: "JSON",
      contentType: "application/json",
      success: function(res) {
        $("#detail-name").val(res.name);
      }
    });
  }
  
  function getUpdateData(id) {
    $.ajax({
      method: "GET",
      url: `/api/role/${id}`,
      dataType: "JSON",
      contentType: "application/json",
      success: function(res) {
        $("#update-name").val(res.name);
        $("#role-id").val(res.id);
      }
    });
  }
  
  function createRole() {
    var roleName = $("#create-name").val();
    var roleData = { name: roleName };
  
    $.ajax({
      method: "POST",
      url: "/api/role",
      dataType: "JSON",
      beforeSend: addCsrfToken,
      contentType: "application/json",
      data: JSON.stringify(roleData),
      success: function(res) {
        $("#role-table").DataTable().ajax.reload();
        $("#create").modal("hide");
        $("#create-name").val("");
      }
    });
  }
  
  function updateRole() {
    var roleName = $("#update-name").val();
    var roleId = $("#role-id").val();
    var roleData = { id: roleId, name: roleName };
  
    $.ajax({
      method: "PUT",
      url: `/api/role/${roleId}`,
      dataType: "JSON",
      beforeSend: addCsrfToken,
      contentType: "application/json",
      data: JSON.stringify(roleData),
      success: function(res) {
        $("#role-table").DataTable().ajax.reload();
        $("#update").modal("hide");
        $("#update-name").val("");
        $("#role-id").val("");
      }
    });
  }
  
  function addCsrfToken(xhr) {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    xhr.setRequestHeader(header, token);
  }