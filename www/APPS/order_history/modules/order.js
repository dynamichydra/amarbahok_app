'use strict';

(function() {
  
  init();
  var pageNum = 1;

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    // setEvents();
    getConsList();
    $('#showmore').on('click',setEvents);
  }

  function setEvents(){
    // var lastScrollTop = 0;    

    // window.onscroll = function(ev) {

      // if($(document).height()==$(window).scrollTop()+$(window).height()){
        // alert('I am at the bottom');
        addToConsList();
        // Here goes your code.
    // }

      
  // };
  }

  // function setEvents(){
  //   var lastScrollTop = 0;    

  //   window.onscroll = function(ev) {

  //     if($(document).height()==$(window).scrollTop()+$(window).height()){
  //       // alert('I am at the bottom');
  //       addToConsList();
  //       // Here goes your code.
  //   }

  //   // var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  //   //    if (st > lastScrollTop){
  //   //       // downscroll code
  //   //       if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
  //   //         console.log("you're at the bottom of the page");
  //   //         addToConsList();
  //   //     }
  //   //    }

  //   //    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

      
  // };
  // }

  function getConsList(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;
      pageNum = 1;
    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);
    // form.append("limit", pageNum);

    DM_CORE.apiForm('conslist',form,function(res){
      ++pageNum;
      console.log(res.consdetail);
      var allcons = res.consdetail;
      var htm = "";
      var dstatus = "";
      var scolor = "";
      for(var i =0;i<allcons.length;i++){
        if(allcons[i].delivery_status == 'pending'){
          dstatus = "New";
          scolor="blue";
        } else if(allcons[i].delivery_status == 'cancelled'){
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="red";
        } else if(allcons[i].delivery_status == 'delivered'){
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="green";
        } else if(allcons[i].delivery_status == 'in-transit'){
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="yellow";
        } else if(allcons[i].delivery_status == 'reschedule'){
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="brown";
        }else{
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="orange";
        }
        htm +=`<div class="items">
        <h3>${allcons[i].consignment_id}</h3>
        <p>Order Date : ${allcons[i].timestampto}</p>
        <p>Shipping Detail : ${allcons[i].shipping_name} <br> ${allcons[i].recipient_address}</p>
        <p>Status : <b style="color:${scolor}">${dstatus}</b><a style ="float:right;color:blue;" onclick="passConsIdc(${allcons[i].id})">Detail</a></p>
    </div>`;
      }
      $("#hist-item").html(htm);
    })
    }
  }

  function addToConsList(){
    console.log('pagenumber='+pageNum+' offset='+10*(pageNum-1))
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", 10*(pageNum-1));
    // form.append("limit", pageNum);

    DM_CORE.apiForm('conslist',form,function(res){
      ++pageNum;
      console.log(res.consdetail);
      var allcons = res.consdetail;
      var htm = "";
      var dstatus = "";
      var scolor = "";
      for(var i =0;i<allcons.length;i++){
        if(allcons[i].delivery_status == 'pending'){
          dstatus = "New";
          scolor="blue";
        } else if(allcons[i].delivery_status == 'cancelled'){
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="red";
        } else if(allcons[i].delivery_status == 'delivered'){
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="green";
        } else if(allcons[i].delivery_status == 'in-transit'){
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="yellow";
        } else if(allcons[i].delivery_status == 'reschedule'){
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="brown";
        }else{
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
          scolor="orange";
        }
        htm +=`<div class="items">
        <h3>${allcons[i].consignment_id}</h3>
        <p>Order Date : ${allcons[i].timestampto}</p>
        <p>Shipping Detail : ${allcons[i].shipping_name} <br> ${allcons[i].recipient_address}</p>
        <p>Status : <b style="color:${scolor}">${dstatus}</b><a style ="float:right;color:blue;" onclick="passConsIdc(${allcons[i].id})">Detail</a></p>
    </div>`;
      }
      $("#hist-item").append(htm);
    })
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

})();

function passConsIdc(ccid){
  localStorage.setItem('consid', ccid);
  window.location.href = "#/cons_detail";
}
