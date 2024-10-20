$(document).ready(() => {
loadRole();
})

function loadRole() {
    $.ajax({
      method: "GET",
      url: "api/role",
      dataType: "JSON",
      success: (res) => {
        const selectElement = $("#create-role");
        selectElement.empty();
  
        res.forEach((role) => {
          const option = `<option value="${role.id}">${role.name}</option>`;
          selectElement.append(option);
        });
  
        // Populate regions in the update modal as well
        const updateSelectElement = $("#update-role");
        updateSelectElement.empty();
  
        res.forEach((role) => {
          const option = `<option value="${role.id}">${role.name}</option>`;
          updateSelectElement.append(option);
        });
      },
    });
  }
 
  function register() {
    let nameVal = $("#create-name").val();
    let emailVal = $("#create-email").val();
    let phoneVal = $("#create-phone").val();
    let usernameVal = $("#create-username").val();
    let passwordVal = $("#create-password").val();
    let roleId = $("#create-role").val();
  
    $.ajax({
      method: "POST",
      url: "/register",
      dataType: "JSON",
      beforeSend: addCsrfToken(),
      contentType: "application/json",
      data: JSON.stringify({
        name : nameVal,
        email : emailVal,
        phone : phoneVal,
        usernameVal : usernameVal,
        password : passwordVal,
        role: { id: roleId },
      }),
      
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
  
  