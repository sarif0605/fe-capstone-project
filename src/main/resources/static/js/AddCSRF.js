function addCsrfToken() {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function (e, xhr, options) {
      xhr.setRequestHeader(header, token);
    });
  }
  
  function logout() {
    Swal.fire({
      title: "Are you sure want to logout this page?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          method: "POST",
          url: "logout",
          dataType: "JSON",
          beforeSend: addCsrfToken(),
        });
        window.location = "http://localhost:9001/login";
      }
    });
  }