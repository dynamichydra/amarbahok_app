'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getTktList();
  }

  function getTktList(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);

    DM_CORE.apiForm('ticketlist',form,function(res){
      console.log(res);
      var alltkt = res.tktdetail;
      var htm = "";
      for(var i =0;i<alltkt.length;i++){
        htm +=`<div class="items">
        <h3>${alltkt[i].ticket_no}</h3>
        <p>Consignment No:- ${alltkt[i].consignment}</p>
        <p>Subject:- ${alltkt[i].subject}</p>
        <p>Status :- ${alltkt[i].status}<br>${alltkt[i].timer}</p>
        <p>Message :-${alltkt[i].comment}<span style ="float:right;">Details..</span></p>
    </div>`;
      }
      $("#tkt-item").html(htm);
    })
    }
  }

})();
