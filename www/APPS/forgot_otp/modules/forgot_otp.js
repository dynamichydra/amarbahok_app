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
    // $('#signupotp').on('click',getOTPstatus);
    $('#signupotp').on('click',checkmobile);
  }

  function checkmobile(){
    document.getElementById("signupotp").disabled = true;
      document.getElementById("signupotp").innerHTML = "Sending";
    var phone = $('#phone').val();

  if(phone == ''){
    alert('Please input the Phone no first');
    return false;
  }
    // if(email == ''){
    //   alert('Please provide the valid phone no.');
    //   return false;
    // }
    var form = new FormData();
    form.append("phone", phone);
  
    DM_CORE.apiForm('checkmobile_reset_otp',form,function(res){
      console.log(res.success)
      if (res.success == true) {
        getOTPstatus();
  } else {
    swal({
          title: "Failure!",
          // text: o.message,
          html: true,
          text: res.message,
          icon: "warning",
          button: "OK",
        });
        document.getElementById("signupotp").disabled = false;
      document.getElementById("signupotp").innerHTML = "Send OTP";
  }
      // localStorage.setItem('userConfig', btoa(JSON.stringify(res)));
    })

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
