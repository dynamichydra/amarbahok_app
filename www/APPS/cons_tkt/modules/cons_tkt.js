'use strict';

(function() {
  
  if(localStorage.getItem("userConfig") != null){
    init();
    }else{
      window.location.href = "#/login";
    }

  function init(){
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    getConsDetail();
    // $('#updteordr').on('click',updateOrder);
  }

  function getConsDetail(){
    var editId = localStorage.getItem("considtkt");
    console.log(editId);

    var form = new FormData();
    form.append("constoedit", editId);

    DM_CORE.apiForm('consedit',form,function(res){
      console.log(res);

    var htm = "";
    htm +=`<div class="col s12">
    <div class="input-wrapper">
        <input type="text" id="consignment_id" placeholder="Consignment ID" value="${res.cdata[0].consignment_id}" readonly/>
        <input type="hidden" id="merchant" name="merchant" value="${userConfig.id}">
        <input type="hidden" id="consid" name="consid" value="${editId}">
        </div>
</div>
<div class="col s12" style="margin-bottom: 20px;">
    <div class="input-wrapper">
    <select name="subject" id="subject" required>
                <option value="">Select Subject</option>
                 <option value="Shipping Details">Shipping Details</option>
                 <option value="Parcel Pick">Parcel Pick</option>
                 <option  value="Delivery">Delivery</option>
                 <option  value="Payment">Payment</option>
                 <option  value="Return Parcel">Return Parcel</option>
                 <option  value="Order Cancellation">Order Cancellation</option>
 </select>
    </div>
</div>
 <div class="col s12">
    <div class="input-wrapper">
        <input type="text" id="description" value="" placeholder="Description"/>
    </div>
</div>

<div class="col s12">
    <div class="input-wrapper">
        <button  id="updteordr" onclick="createtkt()">Create</button>
    </div>
</div>`;

      $("#constkt").html(htm);
    })
    }

})();

  function createtkt(){
    var consignment_id = $('#consignment_id').val();
    var merchant = $('#merchant').val();
    var subject = $('#subject').val();
    var description = $('#description').val();
    var consid = $('#consid').val();

    if(subject == ''){
      alert('Please fill all the details');
      return false;
    } else if (description == ''){
      alert('Please fill all the details');
      return false;
    }

    var form = new FormData();
    form.append("consignment_id", consignment_id);
    form.append("merchant", merchant);
    form.append("subject", subject);
    form.append("description", description);
    form.append("consid", consid);

    DM_CORE.apiForm('raiseatkt',form,function(res){
      console.log(res);
      if (res.success == true) {
              swal({
                    title: "Success!",
                    text: res.message,
                    icon: "success",
                    // button: "Aww yiss!",
                  });
              window.setTimeout(function() {
                window.location.href = "#/payment_history";
                  }, 1000);
      } else {
          swal({
                title: "Failure!",
                text: "Failed! pls try again",
                icon: "error",
                button: "Try again",
              });
      }
    })
  }
{/* <div class="col s12">
    <div class="input-wrapper">
        <input type="file" id="file" value="" placeholder="choose a file to upload"/>
    </div>
</div> */}