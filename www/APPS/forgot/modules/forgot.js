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
    $('#reset').on('click',doReset);
  }

  function doReset(){
    document.getElementById("reset").disabled = true;
    document.getElementById("reset").innerHTML = "Sending mail....";
    var email = $('#email').val();
    if(email == ''){
      alert('Please provide the email');
      document.getElementById("reset").disabled = false;
      document.getElementById("reset").innerHTML = "Send Email";
      return false;
    }
    var form = new FormData();
    form.append("email", email);

    DM_CORE.apiForm('resetpass',form,function(res){
      console.log(res)
      window.setTimeout(function() {
        if (res.success == true) {
            swal({
                  title: "Success!",
                  text: "Reset mail has been sent, please check your mail!!",
                  icon: "success",
                  // button: "Aww yiss!",
                });
            // window.setTimeout(function() {
            //   window.location.href = "#/login";
            //     }, 1000);
            // Set the date we're counting down to
            var countDownDate = new Date().setSeconds(new Date().getSeconds() + 45);
            // var y = document.getElementById("timer-div");

            var x = setInterval(function() {

              // Get today's date and time
              var now = new Date().getTime();
                
              // Find the distance between now and the count down date
              var distance = countDownDate - now;
            
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
              // Output the result in an element with id="demo"
              document.getElementById("timer-div").innerHTML = "<p style='float: right;'>Didn't get mail ? try using OTP after <span style='color:red;'>" + seconds +"</span> seconds...</p>";
                
              // If the count down is over, write some text and show button to download
              if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer-div").innerHTML = "<a href='#forgot_otp' style='float:right;margin-top: 3px;'>Click here to try using OTP</a>";
                // document.getElementById("button").style.visibility = "visible";
              }
            }, 1000);
            document.getElementById("reset").innerHTML = "Reset Mail Sent";
        } else {
            swal({
                  title: "Failure!",
                  text: "Something went wrong pls try again!",
                  icon: "error",
                  button: "Try again",
                });

                // Set the date we're counting down to
            var countDownDate = new Date().setSeconds(new Date().getSeconds() + 1);
            // var y = document.getElementById("timer-div");

            var x = setInterval(function() {

              // Get today's date and time
              var now = new Date().getTime();
                
              // Find the distance between now and the count down date
              var distance = countDownDate - now;
            
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
              // Output the result in an element with id="demo"
              document.getElementById("timer-div").innerHTML = "<p style='float: right;'>Didn't get mail ? try using OTP after <span style='color:red;'>" + seconds +"</span> seconds...</p>";
                
              // If the count down is over, write some text and show button to download
              if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer-div").innerHTML = "<a href='#forgot_otp' style='float:right;margin-top: 3px;'>Click here to try using OTP</a>";
                // document.getElementById("button").style.visibility = "visible";
              }
            }, 1000);

                document.getElementById("reset").disabled = false;
                document.getElementById("reset").innerHTML = "Send Email";
        }
    }, 1000);
      
    })


  }
})();
