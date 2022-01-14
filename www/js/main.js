$(function() {
    'use strict';

    // preloader
    $(".preloader").fadeOut();

    // sidebar
    $('.sidebar').sideNav({
        edge: 'left'
    });

    // sidebar search
    $('.sidebar-search').sideNav({
        edge: 'right'
    });

    // sidebar search
    $('.sidebar-cart').sideNav({
        edge: 'right'
    });

    gettktnotif();
    // navbar on scroll
    /*$(window).on('scroll', function() {

        if ($(document).scrollTop() > 50) {

            $(".navbar").css({
                "box-shadow": "rgba(0, 0, 0, 0.18) 0px 0px 16px"
            });

        } else {

            $(".navbar").css({
                "box-shadow": "none"
            });

        }

    });*/

    // slider
    

    // product-slide
    $(".offer-slide").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 1,
        dots: false
    });
    document.getElementById("cname").innerHTML = userConfig.company;
    if(userConfig.logo != ""){
    document.getElementById("myImg").src = "https://amarbahok.com/uploads/merchants/"+userConfig.logo;
    }

     // Girls
    $(".girl-slide").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 30,
        items: 4,
        dots: false
    });

    // Trending
    $(".trending-slide").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 1,
        dots: false
    });

    // product-slide
    $(".product-slide-two").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 2,
        dots: false
    });

    // product-d-slide
    $(".product-d-slide").owlCarousel({
        items: 1,
        navigation: true,
        slideSpeed: 1000,
        dots: true,
        paginationSpeed: 400,
        loop: false,
        margin: 10,
    });

    // More
    $(".more-slide").owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 10,
        items: 2,
        dots: false
    });

    // tabs
    $('ul.tabs').tabs();

    // collapse
    $('.collapsible').collapsible();

    // testimonial
    $(".testimonial").owlCarousel({
        items: 1,
        loop: false
    })

});

$('#logout').on('click',doLogout);
$('#place_order').on('click',checkProfile);

// window.onbeforeunload = function(){
//     // console.log(userConfig);
//     if(localStorage.getItem("userConfig") == null){
//         // alert("back");
//         // window.location.href = "#/place_order"; 
//         document.location = "#/place_order"; 
//     }
// }


//cart
// window.setInterval(function(){
//   /// call your function here
//   gettktnotif();
// }, 5000);


var intervalId = setInterval(function(){
  gettktnotif();
}, 5000);

function gettktnotif(){
    var useriddd = userConfig.id;
  var form = new FormData();
  form.append("userid", useriddd);

  DM_CORE.apiForm('ticketnotifno',form,function(res){
    console.log(res);
    if(res.tktcnt > 0){
    $('#totalnotifno').html('1');
    // $('#totalnotifnobottom').html(res.tktcnt);
    // $('#totalnotifnobottom').html("<i class='fa fa-ticket badge' style='font-size:24px' value='"+res.tktcnt+"'></i>");
    $('#slide-out-right').html('<li><h5>Notification</h5></li><hr class="hr-line" style="margin-bottom: 10px;"><li><a href="#payment_history"><i class="fa fa-bell-o"></i>You have '+res.tktcnt+' new messages in ticket</a></li>');
    }else{
      $('#totalnotifno').html('0');
      // $('#totalnotifnobottom').html('<i class="fa fa-ticket"></i>');
    $('#slide-out-right').html('<li><h5>Notification</h5></li><hr class="hr-line" style="margin-bottom: 10px;"><li><center>No messages here</cenetr></li>');
    }
  })
}


jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });

    function doLogout(){
      clearInterval(intervalId);
        localStorage.clear();
        window.location.href = "#/login";
    }

    function checkProfile(){
        if(userConfig.office == "" || userConfig.address == "" || userConfig.district == "" || userConfig.police_station == "" || userConfig.company == "" || userConfig.package == ""){
            swal({
                title: "Failure!",
                text: "Please Fill all the Mandatory Details on your Profile first",
                icon: "error",
                button: "Ok",
              });
          window.setTimeout(function() {
            window.location.href = "#/profile";
              }, 1000);
        }else{
            window.location.href = "#/place_order";  
        }
      }

    