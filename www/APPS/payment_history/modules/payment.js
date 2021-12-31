'use strict';

(function() {
  
  if(localStorage.getItem("userConfig") != null){
    init();
    }else{
      window.location.href = "#/login";
    }
  var pageNum = 1;

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    // setEvents();
    getTktList();
    $('#showmore').on('click',setEvents);
  }

  function setEvents(){
    // var lastScrollTop = 0;    

    // window.onscroll = function(ev) {

      // if($(document).height()==$(window).scrollTop()+$(window).height()){
        // alert('I am at the bottom');
        addTogetTktList();
        // Here goes your code.
  //   }

  //   // var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  //   //    if (st > lastScrollTop){
  //   //       // downscroll code
  //   //       if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
  //   //         console.log("you're at the bottom of the page");
  //   //         addToConsList();
  //   //     }
  //   //    }

  //   //    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

      
  // };
  }

  function getTktList(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;
      pageNum = 1;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);
    form.append("limit", 10);

    DM_CORE.apiForm('ticketlist',form,function(res){
      ++pageNum;
      console.log(res);
      var alltkt = res.tktdetail;
      var color = "";
      var htm = "";
      for(var i =0;i<alltkt.length;i++){
        var t = mysqlDatetoJs(alltkt[i].timer);
        var d = prettyDate(t);

        // var y = alltkt[i].timer.split(/[- :]/);
        // var di = new Date(Date.UTC(y[0], y[1]-1, y[2], y[3], y[4], y[5]));
        // var n = di.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })
        if(alltkt[i].status == "close"){
          color = "green";
        }else if(alltkt[i].status == "declined"){
          color = "red";
        }else{
          color = "#e6b800";
        }
        htm +=`<div class="items">
        <h3>${alltkt[i].ticket_no}<a style ="border-radius:20px;" onclick="gettktdetail(${alltkt[i].id})"> (3)</a></h3>
        <p>Consignment No: ${alltkt[i].consignment}</p>
        <p>Customer Name: ${alltkt[i].customer_name}</p>
        <p>Subject: ${alltkt[i].subject}</p>
        <p>Status : <b style="color:${color}">${alltkt[i].status}</b></p>
        <p>Date : ${d}<a style ="float:right;color:blue;" onclick="gettktdetail(${alltkt[i].id})">Detail</a></p>
    </div>`;
      }
      $("#tkt-item").html(htm);
    })
    }
  }

  function addTogetTktList(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);
    form.append("limit", 10);

    DM_CORE.apiForm('ticketlist',form,function(res){
      ++pageNum;
      console.log(res);
      var alltkt = res.tktdetail;
      var color = "";
      var htm = "";
      for(var i =0;i<alltkt.length;i++){
        var t = mysqlDatetoJs(alltkt[i].timer);
        var d = prettyDate(t);

        // var y = alltkt[i].timer.split(/[- :]/);
        // var di = new Date(Date.UTC(y[0], y[1]-1, y[2], y[3], y[4], y[5]));
        // var n = di.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true })
        if(alltkt[i].status == "close"){
          color = "green";
        }else if(alltkt[i].status == "declined"){
          color = "red";
        }else{
          color = "#e6b800";
        }
        
        htm +=`<div class="items">
        <h3>${alltkt[i].ticket_no}</h3>
        <p>Consignment No: ${alltkt[i].consignment}</p>
        <p>Subject: ${alltkt[i].subject}</p>
        <p>Status : <b style="color:${color}">${alltkt[i].status}</b></p>
        <p>Date : ${d}</p>
        <p>Message :${alltkt[i].comment}<a style ="float:right;color:blue;" onclick="gettktdetail(${alltkt[i].id})">Detail</a></p>
    </div>`;
      }
      $("#tkt-item").append(htm);
    })
    }
  }

})();

function gettktdetail(ccid){
  localStorage.setItem('tktidd', ccid);
  window.location.href = "#/tkt_detail";
}

function mysqlDatetoJs(mysqlTimeStamp){
  var t = mysqlTimeStamp.split(/[- :]/);
      return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  }

  function prettyDate(date) {
    var months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return date.getUTCDate() + ', ' + months[date.getUTCMonth()] 
    + ' ' + date.getUTCFullYear();
    }