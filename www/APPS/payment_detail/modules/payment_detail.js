'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getpymntdetail();
    // $('#updteordr').on('click',updateOrder);
  }

  function getpymntdetail(){
    var pId = localStorage.getItem("pmntid");
    var userid = userConfig.id;
    console.log(pId);

    var form = new FormData();
    form.append("pId", pId);
    DM_CORE.apiForm('paymentlistdetail',form,function(res){
      var paymnet = res.pymtdata;
      console.log(res);
    var htm = "";
    htm +=``;
    var returnCharge = "";
      var paidamount = "";

    for(var i =0;i<paymnet.length;i++){

      if(paymnet[i].delivery_status == "returned"){
        if(paymnet[i].deduction_status == "1"){
        returnCharge = paymnet[i].deduction_amount;
        }else{
          returnCharge = paymnet[i].total_price + paymnet[i].return_extra;
        }
      }else{
        returnCharge = 0;
      }

      if(paymnet[i].delivery_status == "delivered"){
        paidamount = paymnet[i].paytomerch - paymnet[i].less_paid_return;
      }else if(paymnet[i].delivery_status == "returned"){
        paidamount = paymnet[i].amount_paid - paymnet[i].deduction_amount;
      } else{
        paidamount = paymnet[i].amount_paid - (paymnet[i].total_price + paymnet[i].total_cod_charge + paymnet[i].return_extra);
      }

      htm +=`<div class="items">
      <h3>${paymnet[i].consignment_id}</h3>
      <p>Order Date :- ${paymnet[i].timestamp}</p>
      <p>Cash Collection :- ${paymnet[i].cash_collection}</p>
      <p>Delivery Charge :- ${paymnet[i].total_price}</p>
      <p>COD Charge :- ${paymnet[i].total_cod_charge}</p>
      <p>Return Charge :- ${returnCharge}</p>
      <p>Collected Amount :- ${paymnet[i].amount_paid}</p>
      <p>Amount Paid :- ${paidamount}</p>
  </div>`;
    }

      $("#pymtnd").html(htm);
    })
    }

})();

