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
    $('#signupotp').on('click',getOTPstatus);
  }


  function getOTPstatus(){
    document.getElementById("signupotp").disabled = true;
    document.getElementById("signupotp").innerHTML = "Sending";
    var phone = $('#phone').val();
    var otpgenereated = Math.floor(1000 + Math.random() * 9000);

    var form = new FormData();
form.append("api_token", "IZBcThg1B9REVWFClw8IfYpoq8nU0uDKxZghqNg6");
form.append("senderid", "8801847121242");
form.append("contact_number", phone);
form.append("message", "Your OTP to reset password on AmarBahok is "+otpgenereated);

var settings = {
  "url": "https://api.smsinbd.com/sms-api/sendsms",
  "method": "POST",
  "timeout": 0,
  "processData": false,
  "mimeType": "multipart/form-data",
  "contentType": false,
  "data": form
};

$.ajax(settings).done(function (response) {
  const obj = JSON.parse(response);
  if(obj.status == 'success'){
    // alert("invalid phone no.");
    doRegisterOTp(otpgenereated,phone);
    document.getElementById("signupotp").innerHTML = "OTP Sent";
  }else{
  alert("invalid phone no.");
  // doRegisterOTp(otpgenereated,phone);
  document.getElementById("signupotp").disabled = false;
  document.getElementById("signupotp").innerHTML = "Send OTP";
  }
});
}


function doRegisterOTp(otpgenereated,phone){
  console.log(otpgenereated);

  var form = new FormData();
  form.append("phone", phone);
  form.append("otpsent", otpgenereated);

  DM_CORE.apiForm('forgotwithotp',form,function(res){
    console.log(res.success)
    if (res.success == true) {
      localStorage.setItem('userOTP', otpgenereated);
      swal(res.message, {
  buttons: {
    cancel: "Okay got it",
  },
})
.then((value) => {
  switch (value) {
    default:
      swal("PLease enter the OTP received");
      window.setTimeout(function() {
          // window.location.replace(site_url+"#/login");
          window.location.href = "#/otp";
        }, 2000);
  }
});
}
    // localStorage.setItem('userConfig', btoa(JSON.stringify(res)));
  })
}
  
})();
