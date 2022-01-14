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
    // $('#signupotp').on('click',getOTPstatus);
    $('#signupotp').on('click',checkmobile);
  }

  $(document).ready(function () {
    $('.modal').modal();
})

  function doRegister(){
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    
    if(name == ''){
      alert('Please input the name first');
      return false;
    }
  
    if(email == ''){
      alert('Please input the email first');
      return false;
    }
  
    if(phone == ''){
      alert('Please input the Phone no first');
      return false;
    }
    
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

  function checkmobile(){
    var phone = $('#phone').val();
    var name = $('#name').val();
    var email = $('#email').val();

  if(name == ''){
    alert('Please input the name first');
    return false;
  }

  if(email == ''){
    alert('Please input the email first');
    return false;
  }

  if(phone == ''){
    alert('Please input the Phone no first');
    return false;
  }
    // if(email == ''){
    //   alert('Please provide the valid phone no.');
    //   return false;
    // }
    if($('input[name="tc"]').is(':checked'))
  {
    var form = new FormData();
    form.append("phone", phone);
    form.append("email", email);
  
    DM_CORE.apiForm('checkmobileforotp',form,function(res){
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


  function getOTPstatus(){
    var phone = $('#phone').val();
    var otpgenereated = Math.floor(1000 + Math.random() * 9000);

    var form = new FormData();
form.append("api_token", "IZBcThg1B9REVWFClw8IfYpoq8nU0uDKxZghqNg6");
form.append("senderid", "8801847121242");
form.append("contact_number", phone);
form.append("message", "Your OTP to register on AmarBahok is "+otpgenereated);

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
    doRegisterOTp(otpgenereated);
  }else{
  alert("invalid phone no.");
  }
});
}


function doRegisterOTp(otpgenereated){
  console.log(otpgenereated);
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
  form.append("otpsent", otpgenereated);

  DM_CORE.apiForm('registerwithotp',form,function(res){
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
