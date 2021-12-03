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
    getdisctricts();
    getUserdetail();
    getAjaxPstation(userConfig.district);
    getoffice();
    $('#updateprofile').on('click',updateProfile);
  }

  function getoffice(){
    var form = new FormData();

    DM_CORE.apiForm('offices',form,function(res){
      console.log(res);
      var htm = "<option value = '' disabled selected>Select office</option>";
      var allbranch = res.bdata;
      for(var i =0;i<allbranch.length;i++){
        htm +=`<option value = "${allbranch[i].id}">${allbranch[i].name}</option>`;
      }
      $("#office").html(htm);
      $('#office').val(userConfig.office);
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
      $('#distt').val(userConfig.district);
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
      $('#police_station').val(userConfig.police_station);
    })
  }

  function getUserdetail(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig);

    $('#baccName').val(userConfig.bank_account_name);
    $('#bAccno').val(userConfig.bank_account);
    $('#bName').val(userConfig.bank_name);
    $('#bBranch').val(userConfig.bank_branch);
    $('#brouting').val(userConfig.bank_routing);
    $('#mobile_banking_type').val(userConfig.mobile_banking_type);
    $('#default_pymnt').val(userConfig.default_pymnt);
    $('#mobile_banking_no').val(userConfig.mobile_banking_no);
    }
  }

  function updateProfile(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
    
    var userid = userConfig.id;

    var baccName = $('#baccName').val();
    var bAccno = $('#bAccno').val();
    var bName = $('#bName').val();
    var bBranch = $('#bBranch').val();
    var brouting = $('#brouting').val();
    var mobile_banking_type = $('#mobile_banking_type').val();
    var default_pymnt = $('#default_pymnt').val();
    var mobile_banking_no = $('#mobile_banking_no').val();

    var form = new FormData();
    form.append("userid", userid);
    form.append("baccName", baccName);
    form.append("bAccno", bAccno);
    form.append("bName", bName);
    form.append("bBranch", bBranch);
    form.append("brouting", brouting);
    form.append("mobile_banking_type", mobile_banking_type);
    form.append("default_pymnt", default_pymnt);
    form.append("mobile_banking_no", mobile_banking_no);
    

    DM_CORE.apiForm('updateprofilepayment',form,function(res){
      console.log(res);
      
      if (res.success == true) {
          swal({
                title: "Success!",
                text: "Successfully updated your profile!",
                icon: "success",
                // button: "Aww yiss!",
              });
          window.setTimeout(function() {
            window.location.href = "#/main";
              }, 1000);
            localStorage.setItem('userConfig', btoa(JSON.stringify(res.userdetails)));
            location.reload();
      } else {
          swal({
                title: "Failure!",
                text: "Profile update failed!",
                icon: "error",
                button: "Try again",
              });
      }

      
    })
    }
  }


})();
