'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getpymntList();
  }

  function getpymntList(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);

    DM_CORE.apiForm('paymnetlist',form,function(res){
      console.log(res);
      var paymnet = res.pmtdata;
      var htm = "";
      for(var i =0;i<paymnet.length;i++){
        htm +=`<div class="items">
        <h3>${paymnet[i].invoice_no}</h3>
        <p>Invoice Date :- ${paymnet[i].date}</p>
        <p>Cash Collection :- ${paymnet[i].cash_collection}</p>
        <p>Delivery Charge :- ${paymnet[i].del_charge}</p>
        <p>COD Charge :- ${paymnet[i].cod_charge}</p>
        <p>Return Charge :- ${paymnet[i].return_charge}</p>
        <p>Collected Amount :- ${paymnet[i].collected}</p>
        <p>Amount Paid :- ${paymnet[i].amount_paid}<span style ="float:right;" onclick="getInvDetail(${paymnet[i].id})">View..</span></p>
    </div>`;
      }
      $("#pymnt-item").html(htm);
    })
    }
  }

})();

function getInvDetail(ccid){
  localStorage.setItem('pmntid', ccid);
  window.location.href = "#/payment_detail";
}
