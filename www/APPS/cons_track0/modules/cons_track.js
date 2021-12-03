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
    getConsDetail();
    // $('#updteordr').on('click',updateOrder);
  }

  function getConsDetail(){
    var Idtofetch = localStorage.getItem("trackid");
    console.log(Idtofetch);

    var form = new FormData();
    form.append("considtofetch", Idtofetch);

    DM_CORE.apiForm('trackdetail',form,function(res){
      console.log(res);
      var allcons = res.consignmentDetail;

      var htm2 = `<div class="col s12">
      <p><b>Consignment ID:</b> ${res.consignment_id[0].consignment_id}</p></div>
      <div class="col s12">
            <div class="manuTab active">
                <h3>Track History</h3>
            </div>
        </div>`;
    var htm = `<tr>
    <th>DATE</th>
    <th>STATUS</th>
    <th>EVENT</th>
  </tr>`;
    for(var i =0;i<allcons.length;i++){
      htm +=`<tr>
        <td>${allcons[i].date}</td>
        <td>${allcons[i].consignment_status}</td>
        <td>${allcons[i].detail}</td>
      </tr>`;
    };

    $("#conttrkdetail").html(htm2);
      $("#constrk").html(htm);
    })
    }

})();
