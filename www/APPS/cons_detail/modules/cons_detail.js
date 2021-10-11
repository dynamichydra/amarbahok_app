'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getConsDetail();
  }

  function getConsDetail(){
    var consss = localStorage.getItem("consid");
    console.log(consss);
    // if(localStorage.getItem("userConfig") != null){
    //   console.log(userConfig.id);
    //   var userid = userConfig.id;

    var form = new FormData();
    form.append("constoget", consss);

    DM_CORE.apiForm('consdata',form,function(res){
      console.log(res);
      var htm = "";
      var dstatus = "";
      if(res.cdata[0].delivery_status == 'pending'){
        dstatus = "New";
      }else{
        dstatus = capitalizeFirstLetter(res.cdata[0].delivery_status);
      }
      if(res.cdata[0].cons_status == 'pending'){
      htm +=`<p><b>Consignment ID:</b> ${res.cdata[0].consignment_id}</p>
      <p><b>Pickup Office: </b>${res.cdata[0].office}</p>
      <p><b>Order Date: </b>${res.cdata[0].timestamp}</p>
      <p><b>Product ID: </b>${res.cdata[0].product_id}</p>
      <p><b>Shipping Details: </b>${res.cdata[0].shipping_name} <br> ${res.cdata[0].recipient_address} ${res.cdata[0].recipient_address_2} ${res.cdata[0].recipient_area} ${res.cdata[0].recipient_city} <br> ${res.cdata[0].recipient_number}</p>
      <p><b>Note: </b>${res.cdata[0].instructions}</p>
      <p><b>Cash Collection: </b>${res.cdata[0].cash_collection}<span style="float:right;"><b>Parcel Value: </b>${res.cdata[0].total_price_product}</span></p>
      <p><b>Delivery Charge: </b>${res.cdata[0].total_price}<span style="float:right;"><b>COD Charge: </b>${res.cdata[0].total_cod_charge}</span></p></p>
      <p><b>Parcel Weight: </b>${res.cdata[0].total_weight}<span style="float:right;"><b>Status: </b>${dstatus}</span></p><br><br>
      <center>
      <button class="btn btn-default btn-icon-anim btn-square list-button" onclick="editFunction(${res.cdata[0].id})">EDIT</i></button>&nbsp;
      <button class="btn btn-success btn-icon-anim btn-square list-button" onclick="ticketFunction(${res.cdata[0].id})">RAISE TICKET</button>&nbsp;<br><br>
      <button class="btn btn-success btn-icon-anim btn-square list-button" onclick="trackFunction(${res.cdata[0].id})">TRACK</i></button>
      </center>`;
      }else{
        htm +=`<p><b>Consignment ID:</b> ${res.cdata[0].consignment_id}</p>
      <p><b>Pickup Office: </b>${res.cdata[0].office}</p>
      <p><b>Order Date: </b>${res.cdata[0].timestamp}</p>
      <p><b>Product ID: </b>${res.cdata[0].product_id}</p>
      <p><b>Shipping Details: </b>${res.cdata[0].shipping_name} <br> ${res.cdata[0].recipient_address} <br> ${res.cdata[0].recipient_number}</p>
      <p><b>Note: </b>${res.cdata[0].instructions}</p>
      <p><b>Cash Collection: </b>${res.cdata[0].cash_collection}<span style="float:right;"><b>Parcel Value: </b>${res.cdata[0].total_price_product}</span></p>
      <p><b>Delivery Charge: </b>${res.cdata[0].total_price}<span style="float:right;"><b>COD Charge: </b>${res.cdata[0].total_cod_charge}</span></p>
      <p><b>Parcel Weight: </b>${res.cdata[0].total_weight}<span style="float:right;"><b>Status: </b>${dstatus}</span></p><br><br>
      <center>
      <button class="btn btn-success btn-icon-anim btn-square list-button" onclick="ticketFunction(${res.cdata[0].id})">RAISE TICKET</button>&nbsp;
      <button class="btn btn-success btn-icon-anim btn-square list-button" onclick="trackFunction(${res.cdata[0].id})">TRACK</button>
      </center>`;
      }

      $("#cons-item").html(htm);
    })
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

})();

function editFunction(ccbid){
  localStorage.setItem('considedit', ccbid);
  window.location.href = "#/cons_edit";
}

function ticketFunction(ccbid){
  localStorage.setItem('considtkt', ccbid);
  window.location.href = "#/cons_tkt";
}

function trackFunction(ccbid){
  localStorage.setItem('trackid', ccbid);
  window.location.href = "#/cons_track";
}
