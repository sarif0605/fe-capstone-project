 $("#user-table").DataTable({
     ajax: {
       url: "api/user",
       dataSrc: "",
     },
     columns: [
       {
         data: null,
         render: (data, type, row, meta) => {
           return meta.row + 1;
         },
       },
     
       { data: "username" },
       { 
         data: "isEnabled",
         render: (data, type, row, meta) => {
           return data ? "Yes" : "No";
         }
       },
       { 
         data: "isAccountNonLocked",
         render: (data, type, row, meta) => {
           return data ? "Yes" : "No";
         }
       },
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
               class="btn btn-primary"
               data-bs-toggle="modal"
               data-bs-target="#update"
               onclick="getUpdateData(${data.id})"
             >
               Update
             </button>
             <button
               type="button"
               class="btn btn-danger"
               onclick="deleteUser(${data.id})"
             >
               Delete
             </button>
           `;
         },
       },
     ],
   });
  
   function deleteUser(id) {
     if (confirm("Are you sure you want to delete this user?")) {
       $.ajax({
         method: "DELETE",
         url: `/api/user/${id}`,
         dataType: "JSON",
         beforeSend: addCsrfToken(),
         contentType: "application/json",
         success: (res) => {
           $("#user-table").DataTable().ajax.reload();
         },
       });
     }
   }
  
   function getDetail(id) {
     $.ajax({
       method: "GET",
       url: "api/user/" + id,
       dataType: "JSON",
       contentType: "application/json",
       success: function (res) {
         $("#detail-username").val(res.username);
         $("#detail-isEnabled").val(res.isEnabled ? "Yes" : "No");
         $("#detail-isAccountNonLocked").val(res.isAccountNonLocked ? "Yes" : "No");
         $("#detail").modal("show");
       },
     });
   }
  
   function getUpdateData(id) {
     $.ajax({
       method: "GET",
       url: "api/user/" + id,
       dataType: "JSON",
       beforeSend: addCsrfToken(),
       contentType: "application/json",
       success: function (res) {
         $("#update-username").val(res.username);
         $("#update-isEnabled").prop("checked", res.isEnabled);
         $("#update-isAccountNonLocked").prop("checked", res.isAccountNonLocked);
         $("#user-id").val(res.id);
         $("#update").modal("show");
       },
     });
   }
  
   function updateUserData() {
     let id = $("#user-id").val();
     let username = $("#update-username").val();
     let password = $("#update-password").val();
     let isEnabled = $("#update-isEnabled").is(":checked");
     let isAccountNonLocked = $("#update-isAccountNonLocked").is(":checked");
  
     let user = {
       id: id,
       username: username,
       password: password,
       isEnabled: isEnabled,
       isAccountNonLocked: isAccountNonLocked,
     };
  
     $.ajax({
       method: "PUT",
       url: `/api/user/${id}`,
       dataType: "JSON",
       contentType: "application/json",
       beforeSend: addCsrfToken(),
       data: JSON.stringify(user),
       success: (res) => {
         $("#update").modal("hide");
         $("#user-table").DataTable().ajax.reload();
       },
     });
   }
  
   function createUser() {
     let username = $("#create-username").val();
     let password = $("#create-password").val();
     let isEnabled = $("#create-isEnabled").is(":checked");
     let isAccountNonLocked = $("#create-isAccountNonLocked").is(":checked");
  
     let user = {
       username: username,
       password: password,
       isEnabled: isEnabled,
       isAccountNonLocked: isAccountNonLocked,
     };
  
     $.ajax({
       method: "POST",
       url: "api/user",
       dataType: "JSON",
       contentType: "application/json",
       beforeSend: addCsrfToken(),
       data: JSON.stringify(user),
       success: (res) => {
         $("#create").modal("hide");
         $("#user-table").DataTable().ajax.reload();
         $("#create-username").val("");
         $("#create-password").val("");
         $("#create-isEnabled").prop("checked", false);
         $("#create-isAccountNonLocked").prop("checked", false);
       },
     });
   }