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
    document.getElementById("login").disabled = true;
    document.getElementById("login").innerHTML = "Logging in....";
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
      localStorage.setItem('userConfig', btoa(JSON.stringify(res.userdetails)));
      window.setTimeout(function() {
      if (res.success == true) {
        if (res.pass_updated == 1) {
          window.location.href = "#/main";
            swal('Successfully signed in!', {
              title: "Success!",
              icon: "success",
        buttons: {
          cancel: "Ok",
        },
      })
      .then((value) => {
        switch (value) {
          default:
                location.reload();
        }
      });
              
            }else{
              window.location.href = "#/change_password";
            swal('Successfully signed in! please Update your password!', {
        buttons: {
          cancel: "Ok",
        },
      })
      .then((value) => {
        switch (value) {
          default:
                location.reload();
        }
      });
            }
            
      } else {
          swal({
                title: "Failure!",
                text: "Email or Password didn't match!",
                icon: "error",
                button: "Try again",
              });
      }
    }, 1000);
      
    })


  }
})();
