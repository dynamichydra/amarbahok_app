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
    var editId = localStorage.getItem("considedit");
    console.log(editId);

    var form = new FormData();
    form.append("constoedit", editId);

    DM_CORE.apiForm('consedit',form,function(res){
      console.log(res);

    var htm = "";
    htm +=`<div class="col s12">
    <div class="input-wrapper">
        <h4>SHIPPING DETAILS</h4>
    </div>
</div>
 <div class="col s12">
    <div class="input-wrapper">
        <input type="text" id="consignment_id" placeholder="Consignment ID" value="${res.cdata[0].consignment_id}" readonly/>
    </div>
</div>
<div class="col s12">
    <div class="input-wrapper">
        <input type="text" id="recipient_address_shipping" value="${res.sdata[0].recipient_name} ,${res.sdata[0].recipient_address},${res.sdata[0].recipient_number}" placeholder="Recipient Address" readonly/>
    </div>
</div>

 <div class="col s12">
    <div class="input-wrapper">
        <h4>CONSIGNMENT DETAILS</h4>
    </div>
</div>
 <div class="col s12">
    <div class="input-wrapper">
        <input type="text" id="product_id" value="${res.cdata[0].product_id}" placeholder="Product ID / Merchant Order ID"/>
    </div>
</div>
<div class = "col s12" style="margin-bottom: 20px;">
    <div class="input-wrapper">
    <select name="parcel_cat" id="parcel_cat">
       <option value = "" disabled selected>Select Category</option>
                            <option value="accessories">Accessories</option>
                            <option  value="cloths">Cloths</option>
                            <option  value="cosmetics">Cosmetics</option>
                            <option  value="electronics">Electronics</option>
                            <option  value="fragile">Fragile</option>
                            <option  value="grocery">Grocery</option>
                            <option  value="liquid">Liquid</option>
                            <option  value="shoe">Shoe</option>
                            <option  value="others">Others</option>
    </select>
    </div>
 </div>

 <div class="col s12">
    <div class="input-wrapper">
        <input type="number" class="productWeight" id="total_weight" id="total_weight" value="${res.cdata[0].product_weight}" placeholder="Parcel Weight (Kg)"/>
    </div>
</div>
<div class="col s12">
    <div class="input-wrapper">
        <input type="number" id="total_price_product" id="total_price_product" value="${res.cdata[0].product_price}" placeholder="Parcel Price"/>
    </div>
</div>
<div class="col s12">
    <div class="input-wrapper">
        <input type="number" id="cash_collect" name="cash_collect" value="${res.cdata[0].cash_collection}" placeholder="Cash Collection Amount"/>
    </div>
</div>
<div class="col s12">
    <div class="input-wrapper">
        <input type="text" id="notes" value="${res.cdata[0].instructions}" placeholder="Notes"/>
        <input type="hidden" id="package_name" name="package_name" value="${res.cdata[0].package_name}">
        <input type="hidden" name="service_area" id="service_area" value="">
        <input type="hidden" name="service_ps" id="service_ps" value="${res.cdata[0].del_police_station}">
        <input type="hidden" name="id" id="id" value="${res.cdata[0].id}">
        <input type="hidden" name="total_price" id="total_price" value="${res.cdata[0].total_price}">
        <input type="hidden" name="total_cod_price" id="total_cod_price" value="${res.cdata[0].total_cod_charge}">
        <input type="hidden" name="merch_pay" id="merch_pay" value="${res.cdata[0].paytomerch}">
        <input type="hidden" name="promo_code" id="promo_code" value="${res.cdata[0].promo_code}">
        <input type="hidden" name="customeridd" id="customeridd" value="${res.cdata[0].customer}">

        <input type="hidden" name="dcccharge" id="dcccharge" value="">
        <input type="hidden" name="total_cod_charge" id="total_cod_charge" value="">
        <input type="hidden" name="cash_collect" id="cash_collect" value="">
        <input type="hidden" name="excharge" id="excharge" value="">
        </div>
</div>

<div class="col s12">
    <div class="input-wrapper">
        <h4 style="float: left;">Cash Collection:-</h4><b style="float: right;" id="tcash_collect">${res.cdata[0].cash_collection}</b>
    </div>
</div>
<div class="col s12">
    <div class="input-wrapper">
        <h4 style="float: left;">Delivery Charge:-</h4><b style="float: right;" id="td_charge"> - ${res.cdata[0].total_price}</b>
    </div>
</div>
<div class="col s12">
    <div class="input-wrapper">
        <h4 style="float: left;">COD Charge:-</h4><b style="float: right;" id="tcod_charge">${res.cdata[0].total_cod_charge}</b>
    </div>
</div>
<div class="col s12">
    <div class="input-wrapper">
<hr class="total_partition ">
     </div>
</div>
<div class="col s12" style="margin-bottom: 20px;">
    <div class="input-wrapper">
        <h4 style="float: left;">Total Payable Amount:-</h4><b id="tpayable_amount" style="float: right;">${res.cdata[0].paytomerch}</b>
    </div>
</div>

<div class="col s12">
    <div class="input-wrapper">
        <button  id="updteordr" onclick="updateOrder()">UPDATE ORDER</button>
    </div>
</div>`;

      $("#consedit").html(htm);
      $('#parcel_cat').val(res.cdata[0].parcel_category);
      getAjaxServiceArea(res.cdata[0].del_police_station);
    })
    }

})();

$(document).on('change', '#cash_collect', function (e) {
  var cashtocollect = parseFloat($('[name="cash_collect"]').val());
  var parcelprice = $("#total_price_product").val();
  if(Math.sign(cashtocollect) == -1 ){
    alert("Cash collection should be greater than Parcel price");
    $("#cash_collect").val("");
  }else{
  var tweight = $("#total_weight").val();
  var total_weight = Math.ceil(parseFloat(tweight));
  // console.log('total weight:'+total_weight);
 getAjaxpackageprice(total_weight);
 // document.getElementById('tcash_collect').innerHTML = parseFloat(cashtocollect);
 if(isNaN(cashtocollect)){
   document.getElementById('tcash_collect').innerHTML = 0;
 }else{
 document.getElementById('tcash_collect').innerHTML = parseFloat(cashtocollect);
}
}
});


$(document).on('keyup', '#cash_collect', function (e) {
  var cashtocollect = parseFloat($('[name="cash_collect"]').val());
  var parcelprice = $("#total_price_product").val();
  if(Math.sign(cashtocollect) == -1 ){
    alert("Cash collection should be greater than Parcel price");
    $("#cash_collect").val("");
  }else{
  var tweight = $("#total_weight").val();
  var total_weight = Math.ceil(parseFloat(tweight));
  // console.log('total weight:'+total_weight);
 getAjaxpackageprice(total_weight);
 // document.getElementById('tcash_collect').innerHTML = parseFloat(cashtocollect);
 if(isNaN(cashtocollect)){
   document.getElementById('tcash_collect').innerHTML = 0;
 }else{
 document.getElementById('tcash_collect').innerHTML = parseFloat(cashtocollect);
}
}
});

function getAjaxpackageprice(total_weight){
  var total_weight = $("#total_weight").val();
  var package_id = $("#package_name").val();
  var chargearea = $("#service_area").val();
  var actualparcelprice = $("#total_price_product").val();
  var parcelprice = $("#cash_collect").val();
  console.log(total_weight);

  var form = new FormData();
    form.append("package_id", package_id);

  DM_CORE.apiForm('getpackage',form,function(res){

  console.log(res);
       var pdata= res;
       var extraweight = (total_weight-1);
         var totaldc=$('#total_price');
         var totalcod=$('#total_cod_charge');
         var dcchargee=$('#dcccharge');
         var exchargee=$('#excharge');
           totaldc.empty();
           totalcod.empty();
           if(chargearea == "urban"){
             var extrchrg = (extraweight*pdata[0].urban_extra_chrg);
             var totdc = parseInt(pdata[0].urban_dc);
             var totaldchrg = parseInt(pdata[0].urban_dc) + parseInt(extrchrg);
             if(pdata[0].cod == 1){
               var totalcodchrg = ((pdata[0].urban_cod_chrg / 100) * parcelprice).toFixed(2)
             }else{
               var totalcodchrg = 0;
             }

           }else if(chargearea == "suburban"){
             var extrchrg = (extraweight*pdata[0].sub_urban_extra_chrg);
             var totdc = parseInt(pdata[0].sub_urban_dc);
             var totaldchrg = parseInt(pdata[0].sub_urban_dc) + parseInt(extrchrg);
             if(pdata[0].cod == 1){
               var totalcodchrg = ((pdata[0].sub_urban_cod_chrg / 100) * parcelprice).toFixed(2)
             }else{
               var totalcodchrg = 0;
             }
           }else if(chargearea == "metro"){
             var extrchrg = (extraweight*pdata[0].metro_extra_chrg);
             var totdc = parseInt(pdata[0].metro_dc);
             var totaldchrg = parseInt(pdata[0].metro_dc) + parseInt(extrchrg);
             if(pdata[0].cod == 1){
               var totalcodchrg = ((pdata[0].metro_cod_chrg / 100) * parcelprice).toFixed(2)
             }else{
               var totalcodchrg = 0;
             }
           }
           var totaldeduction = parseFloat(totaldchrg)+parseFloat(totalcodchrg);
           var totalpayamount = parcelprice - totaldeduction;
           var extraamounttocollect = parseFloat(parcelprice)-parseFloat(actualparcelprice);
           console.log('total dc'+totaldeduction+'total payable'+totalpayamount);
           console.log(totaldchrg+'/'+totalcodchrg);
           $("#extra_amount").val(extraamounttocollect);
           totaldc.val(totaldchrg);
           totalcod.val(totalcodchrg);
           dcchargee.val(totdc);
           exchargee.val(extrchrg);
           document.getElementById('td_charge').innerHTML = '-'+parseFloat(totaldchrg);
           $('#total_price').val(totaldchrg);
           document.getElementById('tcod_charge').innerHTML = '-'+parseFloat(totalcodchrg);
           $('#total_cod_price').val(totalcodchrg);
           document.getElementById('tpayable_amount').innerHTML = parseFloat(totalpayamount).toFixed(2);
           $('#merch_pay').val(totalpayamount);
            getPromoPrice();
           // getGrandTotal();
      //  }


       })

}

function getAjaxServiceArea(service_ps){
  var total_weight = $("#total_weight").val();
  console.log(service_ps);
  var form = new FormData();
    form.append("service_ps", service_ps);

    DM_CORE.apiForm('getps_area',form,function(res){

       var sdata= res;
       console.log(sdata);
         var servicearea=$('#service_area');
           servicearea.empty();
           servicearea.val(sdata.data[0].area);
       
      //  getAjaxpackageprice(total_weight);
      })
}

$(document).on('keyup', '#total_weight', function (e) {
  var product_weight = $("#total_weight").val();
  // alert(product_weight);
  if(product_weight >0){
  var total_weight = product_weight;
  getAjaxpackageprice(Math.ceil(total_weight));
 }
 else{
     $('[name="total_weight"]').val('');
     $('#total_weight').empty();
 }
  });

  $(document).on('change', '#total_weight', function (e) {
  
  var product_weight = $("#total_weight").val();
  // alert(product_weight);
  if(product_weight >0){
  var total_weight = product_weight;

  getAjaxpackageprice(Math.ceil(total_weight));
 }
 else{
     $('[name="total_weight"]').val('');
     $('#total_weight').empty();
 }
  });

  function updateOrder(){
    var cash_collect = $('#cash_collect').val();
    var total_price = $('#total_price').val();
    var total_cod_price = $('#total_cod_price').val();
    var merch_pay = $('#merch_pay').val();
    var product_id = $('#product_id').val();
    var total_price_product = $('#total_price_product').val();
    var total_weight = $('#total_weight').val();
    var notes = $('#notes').val();
    var parcel_cat = $('#parcel_cat').val();
    var id = $('#id').val();

    var form = new FormData();
    form.append("cash_collect", cash_collect);
    form.append("total_price", total_price);
    form.append("total_cod_price", total_cod_price);
    form.append("merch_pay", merch_pay);
    form.append("product_id", product_id);
    form.append("total_price_product", total_price_product);
    form.append("total_weight", total_weight);
    form.append("notes", notes);
    form.append("parcel_cat", parcel_cat);
    form.append("id", id);

    DM_CORE.apiForm('updateorder',form,function(res){
      console.log(res);
      if (res.success == true) {
              swal({
                    title: "Success!",
                    text: "Consignment updated successfully",
                    icon: "success",
                    // button: "Aww yiss!",
                  });
              window.setTimeout(function() {
                window.location.href = "#/order_history";
                  }, 1000);
      } else {
          swal({
                title: "Failure!",
                text: "Update Failed! pls try again",
                icon: "error",
                button: "Try again",
              });
      }
    })
  }


  function getPromoPrice(){
    var sarea = $("#service_area").val();
    var promo_code = $("#promo_code").val();
    var customer = $("#customeridd").val();
    // var product_weight = parseFloat($('#total_weight').val());
    // console.log(sarea);

    var dcchrg = $("#dcccharge").val();
    var extrchrg = $("#excharge").val();
    var totalcodchrg = $("#total_cod_charge").val();
    var parcelprice = $("#cash_collect").val();
    // console.log('dcchrg'+dcchrg);
    var form = new FormData();
form.append("promo_code", promo_code);
form.append("customer", customer);

DM_CORE.apiForm('getDiscounredprice',form,function(res){
  console.log(res.disp[0].metro_dc_dis);
  var totaldc=$('#total_price');
          totaldc.empty();
        // if(res.success == "true"){
          console.log('true');
          
          //  if(sarea == "urban"){
          //    disc = res.disp[0].urban_dc_dis;
          //    ex_disc = res.disp[0].urban_extra_chrg_dis;
          //  }else if (sarea == "suburban") {
          //    disc = res.disp[0].sub_urban_dc_dis;
          //    ex_disc = res.disp[0].sub_urban_extra_chrg_dis;
          //  }else {
          //    disc = res.disp[0].metro_dc_dis;
          //    ex_disc = res.disp[0].metro_extra_chrg_dis;
          //  }

          if(sarea == "urban"){
            var finaldc = dcchrg - parseFloat(res.disp[0].urban_dc_dis);
            if(extrchrg > 0){
            var finalexchrg = extrchrg - parseFloat(res.disp[0].urban_extra_chrg_dis);
            var finalexchrg = Math.trunc(finalexchrg);
          // }
            var totaldchrg = parseFloat(finaldc)+parseFloat(finalexchrg);
          }else{
              var totaldchrg = parseFloat(finaldc);
            }
          }else if (sarea == "suburban") {
            var finaldc = dcchrg - parseFloat(res.disp[0].sub_urban_dc_dis);
            if(extrchrg > 0){
            var finalexchrg = extrchrg - parseFloat(res.disp[0].sub_urban_extra_chrg_dis);
            var finalexchrg = Math.trunc(finalexchrg);
          // }
            var totaldchrg = parseFloat(finaldc)+parseFloat(finalexchrg);
          }else{
              var totaldchrg = parseFloat(finaldc);
            }
          }else {
            var finaldc = dcchrg - parseFloat(res.disp[0].metro_dc_dis);
            if(extrchrg > 0){
            var finalexchrg = extrchrg - parseFloat(res.disp[0].metro_extra_chrg_dis);
            var finalexchrg = Math.trunc(finalexchrg);
            console.log('finaldc'+res.metro_dc_dis+'finalexchrg'+res.metro_extra_chrg_dis);
          // }
            var totaldchrg = parseFloat(finaldc)+parseFloat(finalexchrg);
          }else{
              var totaldchrg = parseFloat(finaldc);
            }
          }
          var totaldeduction = parseFloat(totaldchrg)+parseFloat(totalcodchrg);
          var totalpayamount = parseFloat(parcelprice) - parseFloat(totaldeduction);
          totaldc.val(totaldchrg);
          // totalcod.val(totalcodchrg);
          // dcchargee.val(dccharge);
          // exchargee.val(extrchrg);
          document.getElementById('td_charge').innerHTML = '-'+parseFloat(totaldchrg);
          // document.getElementById('tcod_charge').innerHTML = '-'+parseFloat(totalcodchrg);
          if(isNaN(totalpayamount)){
          document.getElementById('tpayable_amount').innerHTML = '-'+parseFloat(totaldeduction);
        }else{
          document.getElementById('tpayable_amount').innerHTML = parseFloat(totalpayamount).toFixed(2);
        }
      // }


         })
  }
