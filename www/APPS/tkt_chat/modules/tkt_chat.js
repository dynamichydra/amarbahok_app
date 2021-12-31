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
    $('#sendmsg').on('click',sendMessage);
    getTktChat();
    // $('#updteordr').on('click',updateOrder);
    window.setInterval(function(){
      /// call your function here
      getTktChat();
    }, 5000);
  }

  function sendMessage(e){
    console.log("hi");
    var mesg = $('#mesg').val();

    var userName = userConfig.name;
    var ticketno = $('#ticketno').val();
    var ticketiid = $('#ticketid').val();

    var form = new FormData();
    form.append("txtmsg", mesg);
    form.append("tckttid", ticketiid);
    form.append("tcktnno", ticketno);
    form.append("name", userName);

    DM_CORE.apiForm('sendmsg',form,function(res){
      console.log(res);
      e.preventDefault();
      e.stopPropagation();
      getTktChat();
    })
  }

  function getTktChat(){
    var tcktChatId = localStorage.getItem("tktchat");
    console.log(tcktChatId);

    var form = new FormData();
    form.append("tcktChatId", tcktChatId);

    DM_CORE.apiForm('gettktchat',form,function(res){
      console.log(res);
      $('#tktno').html(res.ticket_no);
      $('#ticketno').val(res.ticket_no);
      $('#ticketid').val(res.ticket_id);
    var htm = "";
    // var t = mysqlDatetoJs(res.tktdetail[0].date_close);
    //     var d = prettyDate(t);

    //     const date = new Date(res.tktdetail[0].date_open);
    //     var dopen = prettyDate(date);
        for(var i =0;i<res.chat.length;i++){
        if(res.chat[i].sender == userConfig.name){
    htm +=`<div class="col s12">
    <div class="panel panel-success panel-comment pull-right" style="background-color: #01c853;float:right;">
                                    <div class="panel-heading" >
                                        <strong style="opacity: .6; font-size: 12px; color: #ff3300">ME : &nbsp;&nbsp;&nbsp;</strong>
                                        <small>${res.chat[i].time}</small><br/>
                                        ${res.chat[i].text}
                                    </div>
                                </div>
    `;
        }else{
          htm +=`
          <div class="panel panel-warning panel-comment pull-left" style="background-color: #fec107;float:left;">
          <div class="panel-heading" >
              <strong style="opacity: .6; font-size: 12px; color: #ff3300">${res.chat[i].sender}:</strong>
              <small>${res.chat[i].time}</small><br/>
              ${res.chat[i].text}
          </div>
      </div>
    </div>`;
        }
      }

      $("#tktchatdetail").html(htm);
    })
    }

})();

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
