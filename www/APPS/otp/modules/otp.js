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
    $('#submit_otp').on('click',setPass);
  }

  function setPass(){
    document.getElementById("submit_otp").disabled = true;
    document.getElementById("submit_otp").innerHTML = "Submitting....";
    var enteredotp = $('#userotp').val();

    if(enteredotp == ''){
      alert('Please enter the otp received');
      document.getElementById("submit_otp").disabled = false;
      document.getElementById("submit_otp").innerHTML = "Submit";
      return false;
    }

    if(localStorage.getItem("userOTP") != null){
      var otpsent = localStorage.getItem("userOTP");
    }
    // console.log(otpsent+enteredotp);
    if(otpsent == enteredotp){
      console.log('matched');
            swal({
                  title: "Success!",
                  text: "OTP verified successfully! please set your password",
                  icon: "success",
                  // button: "Aww yiss!",
                });
            window.setTimeout(function() {
              window.location.href = "#/make_pass";
                }, 1000);
        } else {
            swal({
                  title: "Failure!",
                  text: "OTP didn't matched pls try again!",
                  icon: "error",
                  button: "Try again",
                });
                document.getElementById("submit_otp").disabled = false;
                document.getElementById("submit_otp").innerHTML = "Submit";
              }


  }
})();
