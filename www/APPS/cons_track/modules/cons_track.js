'use strict';

(function() {
  
  init();

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
      <p><b>Consignment ID:</b> ${res.consignment_id[0].consignment_id}</p>
      <p><b>Customer Name: </b>${res.customer[0].recipient_name}</p>
      <p><b>Customer Address: </b>${res.customer[0].recipient_address}</p>
      <p><b>Contact No : </b>${res.customer[0].recipient_number}<span style ="float:right;"><b>Parcel Weight : </b>${res.consignment_id[0].total_weight}</span></p>
      <p><b>Parcel Price: </b>TK ${res.consignment_id[0].total_price_product}<span style ="float:right;"><b>Cash Collection: </b>TK ${res.consignment_id[0].cash_collection}</span></p>
      
      <p><b>Delivery Charge: </b>TK ${res.consignment_id[0].total_price}<span style ="float:right;"><b>COD Charge: </b>TK ${res.consignment_id[0].total_cod_charge}</span></p>
      </div>
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
