var disc = "0";
  var ex_disc = "0";

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
    getconsid();
    getdisctricts();
    $('#package_name').val(userConfig.package);
    $('#customeridd').val(userConfig.id);
    $('#service_ps').val(userConfig.district);
    $('#service_dis').val(userConfig.police_station);
    $('#select_branch').val(userConfig.office);
    console.log(userConfig);
    getAjaxcoupon();
    getPromoPrice();
    $('#placeOrder').on('click',submitOrder);
  }

  function getconsid(){
    var form = new FormData();

    DM_CORE.apiForm('getconsid',form,function(res){
      console.log(res);
      $('#consignment_id').val(res.autono);
    })
  }

  function getdisctricts(){
    var form = new FormData();

    DM_CORE.apiForm('districts',form,function(res){
      console.log(res);
      var htm = "<option value = '' disabled selected>Select District</option>";
      var alldist = res.distdata;
      for(var i =0;i<alldist.length;i++){
        htm +=`<option value = "${alldist[i].id}">${alldist[i].district_name}</option>`;
      }
      $("#distt").html(htm);
    })
  }

  $("#distt").on('change', function(e) {
    var dist = $("#distt").val();
    console.log(dist);
    getAjaxPstation(dist);
  });

  function getAjaxPstation(dist){
  console.log(dist);
  var form = new FormData();
    form.append("district", dist);

    DM_CORE.apiForm('stationlist',form,function(res){
      console.log(res);

      var htm = "<option value = '' disabled selected>Select Police Station</option>";
      var allps = res.pstdata;
      for(var i =0;i<allps.length;i++){
        htm +=`<option value = "${allps[i].id}">${allps[i].station_name}</option>`;
      }
      $("#police_station").html(htm);
    })
  }

  $("#police_station").on('change', function(e) {
    console.log('ps');
      var policeStation = $("#police_station").val();
      var product_weight = parseFloat($('#parcel_wt').val());
      console.log(product_weight);
      console.log(policeStation);

      // if(isNaN(product_weight)){
      // }else{
        getAjaxServiceArea(policeStation);
      // }
    });

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
               getPromoPrice();
           
          //  getAjaxpackageprice(total_weight);
          })
    }

    function getAjaxpackageprice(total_weight){
      console.log(disc);
      var total_weight = Math.ceil($("#parcel_wt").val());
      var package_id = $("#package_name").val();
      var chargearea = $("#service_area").val();
      var actualparcelprice = $("#parcel_price").val();
      var parcelprice = $("#cash_collect").val();
      console.log(total_weight);
    
      var form = new FormData();
        form.append("package_id", package_id);
    
      DM_CORE.apiForm('getpackage',form,function(res){
    
      console.log(res);
           var pdata= res;
           var extraweight = (total_weight-1);
             var totaldc=$('#total_price');
             var totalcod=$('#total_cod_price');
             var dcchargee=$('#dcccharge');
             var exchargee=$('#excharge');
               totaldc.empty();
               totalcod.empty();
               if(chargearea == "urban"){
                if(extraweight > 0){
                  ex_disc = parseFloat(ex_disc);
                var extrchrg = (extraweight*pdata[0].urban_extra_chrg) - (extraweight*ex_disc);
              }else{
                var extrchrg = (extraweight*pdata[0].urban_extra_chrg);
              }
                var dccharge = parseInt(pdata[0].urban_dc) - parseFloat(disc);
                var totaldchrg = parseInt(dccharge) + parseInt(extrchrg);
                if(pdata[0].cod == 1){
                  var totalcodchrg = ((pdata[0].urban_cod_chrg / 100) * parcelprice).toFixed(2)
                }else{
                  var totalcodchrg = 0;
                }

              }else if(chargearea == "suburban"){
                if(extraweight > 0){
                  ex_disc = parseFloat(ex_disc);
                var extrchrg = (extraweight*pdata[0].sub_urban_extra_chrg) - (extraweight*ex_disc);
              }else{
                var extrchrg = (extraweight*pdata[0].sub_urban_extra_chrg);
              }
                var dccharge = parseInt(pdata[0].sub_urban_dc) - parseFloat(disc);
                var totaldchrg = parseInt(dccharge) + parseInt(extrchrg);
                if(pdata[0].cod == 1){
                  var totalcodchrg = ((pdata[0].sub_urban_cod_chrg / 100) * parcelprice).toFixed(2)
                }else{
                  var totalcodchrg = 0;
                }
              }else if(chargearea == "metro"){
                if(extraweight > 0){
                  ex_disc = parseFloat(ex_disc);
                var extrchrg = (extraweight*pdata[0].metro_extra_chrg) -  (extraweight*ex_disc);
              }else{
                var extrchrg = (extraweight*pdata[0].metro_extra_chrg);
              }
                var dccharge = parseInt(pdata[0].metro_dc) - parseFloat(disc);
                var totaldchrg = parseInt(dccharge) + parseInt(extrchrg);
                if(pdata[0].cod == 1){
                  var totalcodchrg = ((pdata[0].metro_cod_chrg / 100) * parcelprice).toFixed(2)
                }else{
                  var totalcodchrg = 0;
                }
              }
              var totaldeduction = parseFloat(totaldchrg)+parseFloat(totalcodchrg);
              var totalpayamount = parseFloat(parcelprice) - parseFloat(totaldeduction);
              var extraamounttocollect = parseFloat(parcelprice)-parseFloat(actualparcelprice);
               // console.log('total dc'+totaldeduction+'total payable'+totalpayamount);
               // console.log(totaldchrg+'/'+totalcodchrg);
               $("#extra_amount").val(extraamounttocollect);
               totaldc.val(totaldchrg);
               totalcod.val(totalcodchrg);
              //  dcchargee.val(totdc);
               exchargee.val(extrchrg);
               document.getElementById('td_charge').innerHTML = '-'+parseFloat(totaldchrg);
               $('#total_price').val(totaldchrg);
               document.getElementById('tcod_charge').innerHTML = '-'+parseFloat(totalcodchrg);
               $('#total_cod_price').val(totalcodchrg);
               document.getElementById('tpayable_amount').innerHTML = parseFloat(totalpayamount).toFixed(2);
               $('#merch_pay').val(totalpayamount);
              //  getPromoPrice(chargearea);
               // getGrandTotal();
          //  }
    
    
           })
    
    }

    $(document).on('keyup', '#parcel_wt', function (e) {
      var product_weight = $("#parcel_wt").val();
      // alert(product_weight);
      if(product_weight >0){
      var total_weight = product_weight;
      getAjaxpackageprice(Math.ceil(total_weight));
     }
     else{
         $('[name="parcel_wt"]').val('');
         $('#total_weight').empty();
     }
      });
    
      $(document).on('change', '#parcel_wt', function (e) {
      
      var product_weight = $("#parcel_wt").val();
      // alert(product_weight);
      if(product_weight >0){
      var total_weight = product_weight;
    
      getAjaxpackageprice(Math.ceil(total_weight));
     }
     else{
         $('[name="parcel_wt"]').val('');
         $('#total_weight').empty();
     }
      });

      $(document).on('change', '#cash_collect', function (e) {
        var cashtocollect = parseFloat($("#cash_collect").val());
        var parcelprice = $("#parcel_price").val();
        var product_weight = $("#parcel_wt").val();
        if(Math.sign(cashtocollect) == -1  || product_weight == ""){
          alert("Cash collection cannot be negative / please input parcel weight first");
          $("#cash_collect").val("");
        }else{
        var tweight = $("#parcel_wt").val();
        var total_weight = Math.ceil(parseFloat(tweight));
        // console.log('total weight:'+total_weight);
       getAjaxpackageprice(total_weight);
       // document.getElementById('tcash_collect').innerHTML = parseFloat(cashtocollect);
       console.log();
       if(isNaN(cashtocollect)){
         document.getElementById('tcash_collect').innerHTML = 0;
       }else{
       document.getElementById('tcash_collect').innerHTML = parseFloat(cashtocollect);
      }
      }
      });
      
      
      $(document).on('keyup', '#cash_collect', function (e) {
        var cashtocollect = parseFloat($("#cash_collect").val());
        var parcelprice = $("#parcel_price").val();
        var product_weight = $("#parcel_wt").val();
        if(Math.sign(cashtocollect) == -1  || product_weight == ""){
          alert("Cash collection cannot be negative / please input parcel weight first");
          $("#cash_collect").val("");
        }else{
        var tweight = $("#parcel_wt").val();
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

      function getPromoPrice(){
        var sarea = $("#service_area").val();
        var promo_code = $("#promo_code").val();
        var customer = $("#customeridd").val();
        var product_weight = parseFloat($('#parcel_wt').val());
        var form = new FormData();
    form.append("promo_code", promo_code);
    form.append("customer", customer);

    DM_CORE.apiForm('getDiscounredprice',form,function(res){
      console.log(res.disp[0].metro_dc_dis);
            // if(res.success == "true"){
              
               if(sarea == "urban"){
                 disc = res.disp[0].urban_dc_dis;
                 ex_disc = res.disp[0].urban_extra_chrg_dis;
               }else if (sarea == "suburban") {
                 disc = res.disp[0].sub_urban_dc_dis;
                 ex_disc = res.disp[0].sub_urban_extra_chrg_dis;
               }else {
                 disc = res.disp[0].metro_dc_dis;
                 ex_disc = res.disp[0].metro_extra_chrg_dis;
               }
          // }
          // getGrandTotal();
          console.log(disc);
          console.log(ex_disc);
          if(isNaN(product_weight)){
          }else{
          getAjaxpackageprice(product_weight);
        }
            //  }
   
   
             })
      }

      function getAjaxcoupon(){

        var customer = $("#customeridd").val();
        var form = new FormData();
          form.append("cid", customer);
      
          DM_CORE.apiForm('getpromo',form,function(res){
            console.log(res);
            $('#promo_code').val(res.codedata[0].promo_code);
          })
      
      }

})();

function submitOrder(){

  document.getElementById("placeOrder").disabled = true;
  document.getElementById("placeOrder").innerHTML = "processing....";

  var consignment_id = $('#consignment_id').val();
  var recipient_name = $('#recipient_name').val();
  var recipient_number = $('#recipient_number').val();
  var recipient_address_shipping = $('#recipient_address_shipping').val();
  var distt = $('#distt').val();
  var police_station = $('#police_station').val();

  var category = $('#category').val();
  var parcel_wt = $('#parcel_wt').val();
  var parcel_price = $('#parcel_price').val();
  var customeridd = $('#customeridd').val();
  var promo_code = $('#promo_code').val();

  var package_name = $('#package_name').val();
  var service_ps = $('#service_ps').val();
  var service_dis = $('#service_dis').val();
  var excharge = $('#excharge').val();
  var select_branch = $('#select_branch').val();


  var cash_collect = $('#cash_collect').val();
  var total_price = $('#total_price').val();
  var total_cod_price = $('#total_cod_price').val();
  var merch_pay = $('#merch_pay').val();
  var product_id = $('#product_id').val();
  var total_price_product = $('#parcel_price').val();
  var total_weight = $('#parcel_wt').val();
  var notes = $('#notes').val();
  var id = $('#id').val();

  var form = new FormData();
  form.append("consignment_id", consignment_id);
  form.append("select_branch", select_branch);
  form.append("recipient_name", recipient_name);
  form.append("recipient_number", recipient_number);
  form.append("recipient_address_shipping", recipient_address_shipping);
  form.append("distt", distt);
  form.append("police_station", police_station);
  form.append("category", category);
  form.append("parcel_wt", parcel_wt);
  form.append("parcel_price", parcel_price);
  form.append("customeridd", customeridd);
  form.append("promo_code", promo_code);
  form.append("package_name", package_name);
  form.append("service_ps", service_ps);
  form.append("service_dis", service_dis);
  form.append("excharge", excharge);

  form.append("cash_collect", cash_collect);
  form.append("total_price", total_price);
  form.append("total_cod_price", total_cod_price);
  form.append("merch_pay", merch_pay);
  form.append("product_id", product_id);
  form.append("total_price_product", total_price_product);
  form.append("total_weight", total_weight);
  form.append("notes", notes);
  form.append("parcel_cat", category);

  DM_CORE.apiForm('submitorder',form,function(res){
    console.log(res);
    if (res.success == true) {
            swal({
                  title: "Success!",
                  text: "Consignment saved successfully",
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
            document.getElementById("placeOrder").disabled = false;
  document.getElementById("placeOrder").innerHTML = "PLACE ORDER";
    }
  })
}

function checkMobile() {
  if(!$('#recipient_number').val().match('[0-9]{11}'))  {
              document.getElementById('recipient_number').value = '';
               alert("Please put 11 digit mobile number");
               return;
           }
}




