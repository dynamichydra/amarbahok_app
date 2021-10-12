'use strict';

(function() {
  
  init();
  var pageNum = 1;

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    // setEvents();
    getFinanceList();
    $('#showmore').on('click',setEvents);
  }

  function setEvents(){
    // var lastScrollTop = 0;    

    // window.onscroll = function(ev) {

      // if($(document).height()==$(window).scrollTop()+$(window).height()){
        // alert('I am at the bottom');
        addTogetFinanceList();
        // Here goes your code.
    // }

      
  // };
  }

  function getFinanceList(){
    if(localStorage.getItem("userConfig") != null){
      // console.log(userConfig.id);
      var userid = userConfig.id;
      pageNum = 1;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);

    DM_CORE.apiForm('financiallist',form,function(res){
      ++pageNum;
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
        <p>Consignment No: ${alllist[i].consignment_id}</p>
        <p>Receivable Amount: ${paytomerch}</p>
        <p>Invoice No: <span id = inv${[i]}></span></p>
        <p>Date-Time: <span id = invdt${[i]}></span><a style ="float:right;color:blue;" onclick="getfindetail(${alllist[i].id})">Detail</a></p>
    </div>`;
      }
      $("#fin-item").html(htm);
    })
    }
  }

  function addTogetFinanceList(){
    if(localStorage.getItem("userConfig") != null){
      // console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);

    DM_CORE.apiForm('financiallist',form,function(res){
      ++pageNum;
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
        invoiceNum = getinvoicenum(alllist[i].consignment_id , pageNum+[i]);
        htm +=`<div class="items">
        <h3 style="color:${statColor}">${status}</h3>
        <p>Consignment No: ${alllist[i].consignment_id}</p>
        <p>Receivable Amount: ${paytomerch}</p>
        <p>Invoice No: <span id = inv${[pageNum]}${[i]}></span></p>
        <p>Date-Time: <span id = invdt${[pageNum]}${[i]}></span><a style ="float:right;color:blue;" onclick="getfindetail(${alllist[i].id})">Detail</a></p>
    </div>`;
      }
      $("#fin-item").append(htm);
    })
    }
  }

  function getinvoicenum(consID , num){
      console.log(num);
      var cons = consID;

    var form = new FormData();
    form.append("cons", cons);

    DM_CORE.apiForm('invoicenumber',form,function(res){
      console.log(res.invid[0].invoice_no);
      $('#inv'+num).html(res.invid[0].invoice_no);
      var t = mysqlDatetoJs(res.invid[0].date);
        var d = prettyDate(t);
        var tme= formatAMPM(t);
      $('#invdt'+num).html(d+' '+tme);
    })
}

})();

function getfindetail(ccid){
  localStorage.setItem('finid', ccid);
  window.location.href = "#/finance_detail";
}
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