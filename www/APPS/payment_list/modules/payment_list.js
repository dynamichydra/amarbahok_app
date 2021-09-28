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
        // var invDate = date_format( paymnet[i].date, 'MM/dd/yyyy HH:mm:ss' );
        htm +=`<div class="items">
        <h3>${paymnet[i].invoice_no}</h3>
        <p>Invoice Date :- ${date_format( paymnet[i].date, 'MM/dd/yyyy HH:mm:ss' )}</p>
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

function date_format( d, p ) {
  var pad = function (n, l) {
      for (n = String(n), l -= n.length; --l >= 0; n = '0'+n);
      return n;
  };
  var tz = function (n, s) {
      return ((n<0)?'+':'-')+pad(Math.abs(n/60),2)+s+pad(Math.abs(n%60),2);
  };
  return p.replace(/([DdFHhKkMmSsyZ])\1*|'[^']*'|"[^"]*"/g, function (m) {
      l = m.length;
      switch (m.charAt(0)) {
              case 'D': return pad(d.getDayOfYear(), l);
              case 'd': return pad(d.getDate(), l);
              case 'F': return pad(d.getDayOfWeek(i18n), l);
              case 'H': return pad(d.getHours(), l);
              case 'h': return pad(d.getHours() % 12 || 12, l);
              case 'K': return pad(d.getHours() % 12, l);
              case 'k': return pad(d.getHours() || 24, l);
              case 'M': return pad(d.getMonth() + 1, l );
              case 'm': return pad(d.getMinutes(), l);
              case 'S': return pad(d.getMilliseconds(), l);
              case 's': return pad(d.getSeconds(), l);
              case 'y': return (l == 2) ? String(d.getFullYear()).substr(2) : pad(d.getFullYear(), l);
              case 'Z': return tz(d.getTimezoneOffset(), ' ');
              case "'":
              case '"': return m.substr(1, l - 2);
              default: throw new Error('Illegal pattern');
      }
  });
};