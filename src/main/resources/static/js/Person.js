$(document).ready(() => {
  // Load regions into select dropdown
  loadUser();

 
     $("#person-table").DataTable({
       ajax: {
         url: "api/person",
         dataSrc: "",
       },
       columns: [
         {
           data: null,
           render: (data, type, row, meta) => {
             return meta.row + 1;
           },
         },
        
         { data: "name" },
         { data: "email" },
         { data: "phone" },
         { data: "address" },
         {
           data: null,
           render: function(data, type, row, meta) {
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
                 onclick="deletePerson(${data.id})"
               >
                 Delete
               </button>
             `;
           },
         },
       ],
     });
   });
  
   function loadUser() {
    $.ajax({
      method: "GET",
      url: "api/user",
      dataType: "JSON",
      success: (res) => {
        const selectElement = $("#create-user");
        selectElement.empty();
 
        res.forEach((user) => {
          const option = `<option value="${user.id}">${user.username}</option>`;
          selectElement.append(option);
        });
 
        const updateSelectElement = $("#update-user");
        updateSelectElement.empty();
 
        res.forEach((user) => {
          const option = `<option value="${user.id}">${user.username}</option>`;
          updateSelectElement.append(option);
        });
      },
    });
  }

   function deletePerson(id) {
     if (confirm("Are you sure you want to delete this profile?")) {
       $.ajax({
         method: "DELETE",
         url: `/api/person/${id}`,
         dataType: "JSON",
         beforeSend: addCsrfToken(),
         contentType: "application/json",
         success: (res) => {
           $("#person-table").DataTable().ajax.reload();
         },
       });
     }
   }
  
   function getDetail(id) {
     $.ajax({
       method: "GET",
       url: "api/person/" + id,
       dataType: "JSON",
       contentType: "application/json",
       success: (res) => {
         $("#detail-name").val(res.name);
         $("#detail-email").val(res.email);
         $("#detail-phone").val(res.phone);
         $("#detail-address").val(res.address);
         $("#detail-user").val(res.user.username);
       },
     });
   }
  
   function getUpdateData(id) {
     $.ajax({
       method: "GET",
       url: "api/person/" + id,
       dataType: "JSON",
       beforeSend: addCsrfToken(),
       contentType: "application/json",
       success: (res) => {
         $("#update-name").val(res.name);
         $("#update-email").val(res.email);
         $("#update-phone").val(res.phone);
         $("#update-address").val(res.address);
         $("#user-id").val(res.id);
       },
     });
   }

   function updatePerson() {
     let nameVal = $("#update-name").val();
     let emailVal = $("#update-email").val();
     let phoneVal = $("#update-phone").val();
     let addressVal = $("#update-address").val();
     let personId = $("#person-id").val();

     $.ajax({
       method: "PUT",
       url: `/api/person/${personId}`,
       dataType: "JSON",
       contentType: "application/json",
       data: JSON.stringify({
         id: employeeId,
         name: nameVal,
         email: emailVal,
         phone: phoneVal,
         address: addressVal,
       }),
       success: (res) => {
         $("#update").modal("hide");
         table.ajax.reload();
         $("#update-name").val("");
         $("#update-email").val("");
         $("#update-phone").val("");
         $("#update-address").val("");
       },
     });
   }
  
   function createEmployee() {
     let nameVal = $("#create-name").val();
     let emailVal = $("#create-email").val();
     let phoneVal = $("#create-phone").val();
     let addressVal = $("#create-address").val();
  
     $.ajax({
       method: "POST",
       url: "api/employee",
       dataType: "JSON",
       contentType: "application/json",
       beforeSend: addCsrfToken(),
       data: JSON.stringify({
         name: nameVal,
         email: emailVal,
         phone: phoneVal,
         address: addressVal,
       }),
       success: (res) => {
         $("#create").modal("hide");
         $("#employee-table").DataTable().ajax.reload();
         $("#create-name").val("");
         $("#create-email").val("");
         $("#create-phone").val("");
         $("#create-address").val("");
       },
     });
   }