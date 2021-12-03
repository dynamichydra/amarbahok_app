'use strict';

(function() {
  if(localStorage.getItem("userConfig") == null){
    init();
    }else{
      window.location.href = "#/main";
    }

  function init() {
    $('.btm-mnu').hide();
    $('.sidebar').hide();
    $('.content-right').hide();
    $('#signup').on('click',doRegister);
  }

  $(document).ready(function () {
    $('.modal').modal();
})

  function doRegister(){
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    // if(email == ''){
    //   alert('Please provide the valid phone no.');
    //   return false;
    // }
    if($('input[name="tc"]').is(':checked'))
{
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
          }, 2000);
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
  }else{
    swal({
      title: "Failure!",
      // text: o.message,
      html: true,
      text: 'Please read and accept the Terms & Conditions first.',
      icon: "warning",
      button: "OK",
    });
  }


  }
  
})();
