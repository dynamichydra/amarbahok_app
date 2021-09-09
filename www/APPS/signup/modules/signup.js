'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').hide();
    $('.sidebar').hide();
    $('.content-right').hide();
    $('#signup').on('click',doRegister);
  }

  function doRegister(){
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    // if(email == ''){
    //   alert('Please provide the valid phone no.');
    //   return false;
    // }
    var form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("phone", phone);

    DM_CORE.apiForm('register',form,function(res){
      console.log(res.success)
      if (res.success == true) {
        swal(res.message, {
    buttons: {
      cancel: "Okay got it",
    },
  })
  .then((value) => {
    switch (value) {
      default:
        swal("Password Sent to EMAIL");
        window.setTimeout(function() {
            // window.location.replace(site_url+"#/login");
            window.location.href = "#/login";
          }, 4000);
    }
  });
} else {
    swal({
          title: "Failure!",
          // text: o.message,
          html: true,
          text: res.message,
          icon: "warning",
          button: "OK",
        });
}
      // localStorage.setItem('userConfig', btoa(JSON.stringify(res)));
    })


  }
  
})();
