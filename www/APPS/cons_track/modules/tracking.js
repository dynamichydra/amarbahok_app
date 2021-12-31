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

      $('#orderidd').html(res.consignment_id[0].consignment_id);
      $('#delstatus').html(capitalizeFirstLetter(res.consignment_id[0].delivery_status));
    var htm = '';
    var n = allcons.length;
    for(var i =0;i<allcons.length;i++){
      htm +=`<div class="orderstatus done">
      <div class="orderstatus-check"><span class="orderstatus-number">${n}</span></div>
      <div class="orderstatus-text">
        <time>${allcons[i].date}</time>
        <p>${capitalizeFirstLetter(allcons[i].consignment_status.toLowerCase())}</p>
        <p>${capitalizeFirstLetter(allcons[i].detail)}</p>
      </div>
    </div>`;
    n--
    };

    $("#conttrkdetail").html(htm);
    })
    }

})();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
