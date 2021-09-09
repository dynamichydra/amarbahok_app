'use strict';

(function() {
  
  init();

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getUser();
  }

  function getUser(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      document.getElementById("uname").innerHTML = userConfig.company;
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);

    DM_CORE.apiForm('getdash',form,function(res){
      console.log(res);
      document.getElementById("uname").innerHTML = res[0].total_order;
    })
    }
  }
})();
