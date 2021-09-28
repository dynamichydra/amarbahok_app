'use strict';

(function() {
  
  init();

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
    htm +=`<div class="col s12">
    <p><b>Ticket NO:-</b> ${res.tktdetail[0].ticket_no}</p>
    <p><b>Consignment ID:- </b>${res.consid[0].consignment_id}</p>
    <p><b>Subject:- </b>${res.tktdetail[0].subject}</p>
    <p><b>Date:- </b>${res.tktdetail[0].date_open}</p>
    <p><b>Status:- </b>${res.tktdetail[0].status}</p>
    <p><b>Closure Date:- </b>${res.tktdetail[0].date_close}</p>
    <p><b>Message:- </b>${res.tktdetail[0].comment}</p>
    </div>`;

      $("#constkt").html(htm);
    })
    }

})();

