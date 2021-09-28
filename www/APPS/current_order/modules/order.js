'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getFinanceList();
  }

  function getFinanceList(){
    if(localStorage.getItem("userConfig") != null){
      // console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);

    DM_CORE.apiForm('financiallist',form,function(res){
      // console.log(res);
      var alllist = res.findata;
      var htm = "";
      var paytomerch = "";
      var status= "";
      var statColor = "";
      var invoiceNum = "";
      for(var i =0;i<alllist.length;i++){
        if(alllist[i].delivery_status == "delivered"){
          paytomerch =  alllist[i].paytomerch -parseFloat(alllist[i].less_paid_return);
        }else if(alllist[i].delivery_status == "returned"){
          if(alllist[i].deduction_status == 1){
            paytomerch = alllist[i].amount_paid-parseFloat(alllist[i].deduction_amount);
        }else{
          paytomerch = parseFloat(alllist[i].amount_paid) - (alllist[i].delivery_charge + parseFloat(alllist[i].total_cod_charge) + parseFloat(alllist[i].return_extra));
        }
        }

        if(alllist[i].payment_status_merchant == "paid"){
          status = "PAID";
          statColor = "green";
        }else if(alllist[i].payment_status_merchant == "due"){
          status = "DUE";
          statColor = "red";
        }
        invoiceNum = getinvoicenum(alllist[i].consignment_id , [i]);
        htm +=`<div class="items">
        <h3 style="color:${statColor}">${status}</h3>
        <p>Consignment No:- ${alllist[i].consignment_id}</p>
        <p>Receivable Amount:- ${paytomerch}</p>
        <p>Invoice No:- <span id = inv${[i]}></span></p>
        <p>Date-Time:- ${alllist[i].timestamp}<span style ="float:right;" onclick="getfindetail(${alllist[i].id})">Details..</span></p>
    </div>`;
      }
      $("#fin-item").html(htm);
    })
    }
  }

  function getinvoicenum(consID , num){
      // console.log(num);
      var cons = consID;

    var form = new FormData();
    form.append("cons", cons);

    DM_CORE.apiForm('invoicenumber',form,function(res){
      console.log(res.invid[0].invoice_no);
      $('#inv'+num).html(res.invid[0].invoice_no);
    })
}

})();

function getfindetail(ccid){
  localStorage.setItem('finid', ccid);
  window.location.href = "#/finance_detail";
}
