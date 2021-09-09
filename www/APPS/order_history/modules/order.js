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
      for(var i =0;i<allcons.length;i++){
        htm +=`<div class="items">
        <h3>${allcons[i].consignment_id}</h3>
        <p>Order Date :- ${allcons[i].timestampto}</p>
        <p>Shipping Detail :- ${allcons[i].shipping_name} <br> ${allcons[i].recipient_address}</p>
        <p>Status :- ${allcons[i].delivery_status}<span style ="float:right;">Details..</span></p>
    </div>`;
      }
      $("#hist-item").html(htm);
    })
    }
  }

})();
