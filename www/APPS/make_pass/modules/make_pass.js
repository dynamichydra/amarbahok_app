'use strict';

(function() {
  
  if(localStorage.getItem("userConfig") == null){
    init();
    }else{
      window.location.href = "#/login";
    }

  function init() {
        $('.btm-mnu').hide();
        $('.sidebar').hide(); 
    $('.content-right').show();
    // $('.modal').modal();
    $('#createpass').on('click',doUpdate);
    document.getElementById("createpass").disabled = true;
  }

  function doUpdate(){
    var usedotp = localStorage.getItem("userOTP");
    var password = $('#oldpass').val();
    var newpass = $('#newpass').val();

    var form = new FormData();
    form.append("usedotp", usedotp);
    form.append("password", password);
    form.append("psw", newpass);

    DM_CORE.apiForm('createpass',form,function(res){
      console.log(res.success)
      if (res.success == true) {
        swal({
              title: "Success!",
              text: res.message,
              icon: "success",
              // button: "Aww yiss!",
            });
        window.setTimeout(function() {
          window.location.href = "#/login";
            }, 1000);
    } else {
        swal({
              title: "Failure!",
              text: res.message,
              icon: "error",
              button: "Try again",
            });
    }

    })


  }

  var myInput = document.getElementById("newpass");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");

  // When the user clicks on the password field, show the message box
  myInput.onfocus = function() {
    document.getElementById("messagebox").style.display = "block";
  }

  // When the user clicks outside of the password field, hide the message box
  myInput.onblur = function() {
    document.getElementById("messagebox").style.display = "none";
  }

  // When the user starts to type something inside the password field
  myInput.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if(myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }

})();

function Validate() {
  var password = document.getElementById("newpass").value;
  var confirmPassword = document.getElementById("confpass").value;
    if (password != confirmPassword) {
        // alert("Passwords do not match, New Password and Confirm Password must be same.");
        document.getElementById("error-message").style.display = "block";
         document.getElementById("createpass").disabled = true;
         return false;
        }
        document.getElementById("error-message").style.display = "none";
        document.getElementById("createpass").disabled = false;
         return true;
    }
