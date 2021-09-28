'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getConsList();
  }

  function getConsList(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);

    DM_CORE.apiForm('conslist',form,function(res){
      console.log(res.consdetail);
      var allcons = res.consdetail;
      var htm = "";
      var dstatus = "";
      for(var i =0;i<allcons.length;i++){
        if(allcons[i].delivery_status == 'pending'){
          dstatus = "New";
        }else{
          dstatus = capitalizeFirstLetter(allcons[i].delivery_status);
        }
        htm +=`<div class="items">
        <h3>${allcons[i].consignment_id}</h3>
        <p>Order Date :- ${allcons[i].timestampto}</p>
        <p>Shipping Detail :- ${allcons[i].shipping_name} <br> ${allcons[i].recipient_address}</p>
        <p>Status :- ${dstatus}<span style ="float:right;" onclick="passConsIdc(${allcons[i].id})">Details..</span></p>
    </div>`;
      }
      $("#hist-item").html(htm);
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
