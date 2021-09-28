'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getFinanceListdetail();
    // $('#updteordr').on('click',updateOrder);
  }

  function getFinanceListdetail(){
    var financeId = localStorage.getItem("finid");
    var userid = userConfig.id;
    console.log(financeId);

    var form = new FormData();
    form.append("financeId", financeId);
    form.append("userid", userid);

    DM_CORE.apiForm('financiallistdetail',form,function(res){
      console.log(res);

      var returnCharge = "";
      var invoiceNum = "";

      if(res.findata[0].delivery_status == "returned"){
        if(res.findata[0].deduction_status == "1"){
        returnCharge = res.findata[0].deduction_amount;
        }else{
          returnCharge = res.findata[0].delivery_charge + res.findata[0].return_extra;
        }
      }else{
        returnCharge = 0;
      }

      var payment_status_merchant = capitalizeFirstLetter(res.findata[0].payment_status_merchant);
      var delivery_status = capitalizeFirstLetter(res.findata[0].delivery_status);

      invoiceNum = getinvoicenum(res.findata[0].consignment_id);
    var htm = "";
    htm +=`<div class="col s12">
    <p><b>Payment Status:-</b> ${payment_status_merchant}</p>
    <p><b>Order Date:- </b>${res.findata[0].timestamp}</p>
    <p><b>Status:- </b>${delivery_status}</p>
    <p><b>Consignment ID:- </b>${res.findata[0].consignment_id}</p>
    <p><b>Shipping Details:- </b>${res.findata[0].name} <br> ${res.findata[0].recipient_address} <br> ${res.findata[0].contact}</p>
    <p><b>Cash Collection:- </b>${res.findata[0].cash_collection}</p>
    <p><b>Delivery Charge:- </b>${res.findata[0].delivery_charge}</p>
    <p><b>COD Charge:- </b>${res.findata[0].total_cod_charge}</p>
    <p><b>Return Charge:- </b>${returnCharge}</p>
    <p><b>Less Paid:- </b>${res.findata[0].less_paid_return}</p>
    <p><b>Collected Amount:- </b>${res.findata[0].amount_paid}</p>
    <p><b>Receivable Amount:- </b>${res.findata[0].paytomerch - res.findata[0].less_paid_return}</p>
    <p><b>Invoice No.:- </b><span id = "invno">${res.findata[0].comment}</span></p>
    <p><b>Invoice Date/Time:- </b><span id = "invdate">${res.findata[0].comment}</span></p>

    <center>
      <button class="btn btn-success btn-icon-anim btn-square list-button" onclick="ticketFunction(${res.findata[0].id})">RAISE TICKET</button>
      </center>

    </div>`;

      $("#constkt").html(htm);
    })
    }

    function getinvoicenum(consID){
      // console.log(num);
      var cons = consID;

    var form = new FormData();
    form.append("cons", cons);

    DM_CORE.apiForm('invoicenumber',form,function(res){
      // console.log(res.invid[0]);
      $('#invno').html(res.invid[0].invoice_no);
      $('#invdate').html(res.invid[0].date);
    })
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

})();

function ticketFunction(ccbid){
  localStorage.setItem('considtkt', ccbid);
  window.location.href = "#/cons_tkt";
}

