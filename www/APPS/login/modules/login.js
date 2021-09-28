'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').hide();
    $('.sidebar').hide();
    $('.content-right').hide();
    $('#login').on('click',doLogin);
  }

  function doLogin(){
    var email = $('#email').val();
    var pwd = $('#password').val();
    if(email == ''){
      alert('Please provide the email');
      return false;
    }
    var form = new FormData();
    form.append("email", email);
    form.append("password", pwd);

    DM_CORE.apiForm('login',form,function(res){
      console.log(res)
      if (res.success == true) {
        if (res.pass_updated == 1) {
          swal({
                title: "Success!",
                text: "Successfully signed in!",
                icon: "success",
                // button: "Aww yiss!",
              });
          window.setTimeout(function() {
            window.location.href = "#/main";
              }, 1000);
            }else{
              swal({
                    title: "Success!",
                    text: "Successfully signed in! please Update your password",
                    icon: "success",
                    // button: "Aww yiss!",
                  });
              window.setTimeout(function() {
                window.location.href = "#/change_password";
                  }, 1000);
            }
            localStorage.setItem('userConfig', btoa(JSON.stringify(res.userdetails)));
      } else {
          swal({
                title: "Failure!",
                text: "Email or Password didn't match!",
                icon: "error",
                button: "Try again",
              });
      }
      
    })


  }
})();
