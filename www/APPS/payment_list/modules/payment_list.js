'use strict';

(function() {
  
  init();
  var pageNum = 1;

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    setEvents();
    getpymntList();
  }

  function setEvents(){
    var lastScrollTop = 0;    

    window.onscroll = function(ev) {

      if($(document).height()==$(window).scrollTop()+$(window).height()){
        // alert('I am at the bottom');
        addTogetpymntList();
        // Here goes your code.
    }
      
  };
  }

  function getpymntList(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;
      pageNum = 1;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);
    form.append("limit", 10);

    DM_CORE.apiForm('paymnetlist',form,function(res){
      ++pageNum;
      console.log(res);
      var paymnet = res.pmtdata;
      var htm = "";
      for(var i =0;i<paymnet.length;i++){
        var t = mysqlDatetoJs(paymnet[i].date);
        var d = prettyDate(t);

        htm +=`<div class="items">
        <h3>${paymnet[i].invoice_no}</h3>
        <p>Invoice Date : ${d}</p>
        <p>Cash Collection : ${paymnet[i].cash_collection}</p>
        <p>Delivery Charge : ${paymnet[i].del_charge}</p>
        <p>COD Charge : ${paymnet[i].cod_charge}</p>
        <p>Return Charge : ${paymnet[i].return_charge}</p>
        <p>Collected Amount : ${paymnet[i].collected}</p>
        <p>Amount Paid : ${paymnet[i].amount_paid}<a style ="float:right;color:blue;" onclick="getInvDetail(${paymnet[i].id})">Detail</a></p>
    </div>`;
      }
      $("#pymnt-item").html(htm);
    })
    }
  }

  function addTogetpymntList(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);
    form.append("limit", 10);

    DM_CORE.apiForm('paymnetlist',form,function(res){
      ++pageNum;
      console.log(res);
      var paymnet = res.pmtdata;
      var htm = "";
      for(var i =0;i<paymnet.length;i++){
        var t = mysqlDatetoJs(paymnet[i].date);
        var d = prettyDate(t);

        htm +=`<div class="items">
        <h3>${paymnet[i].invoice_no}</h3>
        <p>Invoice Date : ${d}</p>
        <p>Cash Collection : ${paymnet[i].cash_collection}</p>
        <p>Delivery Charge : ${paymnet[i].del_charge}</p>
        <p>COD Charge : ${paymnet[i].cod_charge}</p>
        <p>Return Charge : ${paymnet[i].return_charge}</p>
        <p>Collected Amount : ${paymnet[i].collected}</p>
        <p>Amount Paid : ${paymnet[i].amount_paid}<a style ="float:right;color:blue;" onclick="getInvDetail(${paymnet[i].id})">Detail</a></p>
    </div>`;
      }
      $("#pymnt-item").append(htm);
    })
    }
  }

})();

function getInvDetail(ccid){
  localStorage.setItem('pmntid', ccid);
  window.location.href = "#/payment_detail";
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
