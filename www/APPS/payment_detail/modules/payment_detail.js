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
          returnCharge = parseFloat(paymnet[i].total_price) + parseFloat(paymnet[i].return_extra);
        }
      }else{
        returnCharge = 0;
      }

      if(paymnet[i].delivery_status == "delivered"){
        paidamount = parseFloat(paymnet[i].paytomerch) - parseFloat(paymnet[i].less_paid_return);
      }else if(paymnet[i].delivery_status == "returned"){
        paidamount = parseFloat(paymnet[i].amount_paid) - parseFloat(paymnet[i].deduction_amount);
      } else{
        paidamount = paymnet[i].amount_paid - (parseFloat(paymnet[i].total_price) + parseFloat(paymnet[i].total_cod_charge) + parseFloat(paymnet[i].return_extra));
      }

      var t = mysqlDatetoJs(paymnet[i].timestamp);
        var d = prettyDate(t);

      htm +=`<div class="items">
      <h3>${paymnet[i].consignment_id}</h3>
      <p>Order Date : ${d}</p>
      <p>Cash Collection : ${paymnet[i].cash_collection}</p>
      <p>Delivery Charge : ${paymnet[i].total_price}</p>
      <p>COD Charge : ${paymnet[i].total_cod_charge}</p>
      <p>Return Charge : ${returnCharge}</p>
      <p>Collected Amount : ${paymnet[i].amount_paid}</p>
      <p>Amount Paid : ${paidamount}</p>
  </div>`;
    }

      $("#pymtnd").html(htm);
    })
    }

})();

function mysqlDatetoJs(mysqlTimeStamp){
  var t = mysqlTimeStamp.split(/[- :]/);
      return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  }

  function prettyDate(date) {
    var months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return date.getUTCDate() + ', ' + months[date.getUTCMonth()] 
    + ' ' + date.getUTCFullYear();
    }
    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
