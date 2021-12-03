'use strict';

(function() {
  
  if(localStorage.getItem("userConfig") != null){
    init();
    }else{
      window.location.href = "#/login";
    }

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getTktDetail();
    // $('#updteordr').on('click',updateOrder);
  }

  function getTktDetail(){
    var tcktId = localStorage.getItem("tktidd");
    console.log(tcktId);

    var form = new FormData();
    form.append("tcktId", tcktId);

    DM_CORE.apiForm('gettktd',form,function(res){
      console.log(res);

    var htm = "";
    var t = mysqlDatetoJs(res.tktdetail[0].date_close);
        var d = prettyDate(t);

        const date = new Date(res.tktdetail[0].date_open);
        var dopen = prettyDate(date);
        if(res.tktdetail[0].date_close != ""){
    htm +=`<div class="col s12">
    <p><b>Ticket NO:</b> ${res.tktdetail[0].ticket_no}</p>
    <p><b>Consignment ID: </b>${res.consid[0].consignment_id}</p>
    <p><b>Subject: </b>${res.tktdetail[0].subject}</p>
    <p><b>Date Open: </b>${dopen}<span style="float:right;"><b>Status: </b>${res.tktdetail[0].status}</span></p>
    <p><b>Closure Date: </b>${d}</p>
    <p><b>Message: </b>${res.tktdetail[0].comment}</p>
    </div>`;
        }else{
          htm +=`<div class="col s12">
    <p><b>Ticket NO:</b> ${res.tktdetail[0].ticket_no}</p>
    <p><b>Consignment ID: </b>${res.consid[0].consignment_id}</p>
    <p><b>Subject: </b>${res.tktdetail[0].subject}</p>
    <p><b>Date Open: </b>${dopen}<span style="float:right;"><b>Status: </b>${res.tktdetail[0].status}</span></p>
    <p><b>Closure Date: </b>N/A</p>
    <p><b>Message: </b>${res.tktdetail[0].comment}</p>
    </div>`;
        }

      $("#constkt").html(htm);
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
