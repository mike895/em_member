document.querySelector('#extension_period').addEventListener('change', (event) => {
document.querySelector('#Membershiptype').value = ""; 

})



 var land = async ()=> {

 var res = await $.ajax({
            url: '/api/resource/User',
            type: 'GET',
            headers: {
		 'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            success: function(data){
                return data
            },
            error: function(data){
                return data
            }
        })
        console.log(res.data[0].name);
                
        
var org = await $.ajax({
            url: `/api/resource/Organizations?fields=["name","email","name_1","industry","phone_number","website"]&filters=[["Organizations","email","=","${res.data[0].name}"]]`,
            type: 'GET',
            headers: {
		 'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            success: function(data){
                return data
            },
            error: function(data){
                return data
            }
        })
        console.log(org.data[0].name);
        
  document.getElementById("OrganizationName").innerHTML = org.data[0].name_1;
  document.getElementById("OrganizationEmail").innerHTML = org.data[0].email;
  document.getElementById("industry").innerHTML = org.data[0].industry;
  document.getElementById("phone_number").innerHTML = org.data[0].phone_number;
  document.getElementById("website").innerHTML = org.data[0].website;




}

land();













let see = document.querySelector('#see').value;

var medaUrl;
var value;	

document.querySelector('.paywithmeda').addEventListener('click', async () => {
value = 1;
 check()
 
})


const check = async function () {
        frappe.call({
          method: 'em_member.em_member.whitelist.checkmember',
          args: {
          	  self: 'self',
		  args: {
		      email: document.querySelector('#OrganizationEmail').value,
		  }
          },
          callback: (r) => {
            console.log(r)
            
            if(r.message == 2){

             dialog = frappe.msgprint({
                    title: __('Notice'),
                    indicator: 'green',
                    message: __('A user has already registered with this Email address ')
                });
            dialog.show()
            dialog.$wrapper.find('.modal-dialog').css("height", "175px");


	    if (value == 1){
	     window.location = medaUrl 
		}
            }
            else if(r.message == 3){
           
            dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
            
            }
            else if(r.message == 4){
           
            dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
            
            }
            else{
            orgform();
            
            }
          }
        })
        
     }



$("form").submit(e=>{

 e.preventDefault();
 //System.Net.ServicePointManager.Expect100Continue = false;
    value = 0;
    check();
})






//method for uploading 
let orgform = async()=>{
    let formdata = $("form").serializeArray().reduce(
        (obj,item)=>(obj[item.name]=item.value, obj),{}
    );
    
    // initialize the form

    // POST to the API
    if(formdata){
        let res = await $.ajax({
            url: '/api/resource/Organizations',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            data: JSON.stringify(formdata),
            success: function(data){
                return data
            },
            error: function(data){
                return data
            }
        })
        console.log(res.data);
   if (value == 0){
   
   }else{
	if (see == 0){
        window.location = medaUrl
	} 
    }
  }

}





const selectElement = document.querySelector('#Membershiptype');

selectElement.addEventListener('change', (event) => {

  let membership_type = event.target.value;
  let amount;
  switch (membership_type) {
    case 'Corporate':
      amount = '1';
      break;
  }


if(document.getElementById("extension_period").value > 0){
  var ext_period = document.getElementById("extension_period").value;  
document.querySelector("#Membershipfee").classList.remove("medapay-hide");
document.querySelector("#Membershipfee").classList.add("medapay-show");

  
  /*
  frappe.call({
          method: 'em_member.em_member.whitelist.checkmember',
          args: {
          	  self: 'self',
		  args: {
		      email: document.querySelector('#OrganizationEmail').value,
		  }
          },
          callback: (r) => {
            console.log(r.message,"hello")
            if(r.message == 2){
	document.querySelector('Membershiptype').value = ""; 
         dialog = frappe.msgprint({
                    title: __('Notice'),
                    indicator: 'green',
                    message: __('Please fill the correct Extension period')
                });
            dialog.show()
            dialog.$wrapper.find('.modal-dialog').css("height", "175px");


         /*    dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
            

  		//window.location = medaUrl 
            }
            
            if(r.message == 3){
             dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
            

            }
   
             else if(r.message == 4){
           
            dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
            
            }
            else{
            */
            
//  document.querySelector('#Membershipfee').value = amount +" ETB";
  document.querySelector(".paywithmedaOrganization").classList.remove("medapay-hide");
  document.querySelector(".paywithmedaOrganization").classList.add("medapay-show");

  document.querySelector(".withmeda").classList.remove("medapay-hide");
  document.querySelector(".withmeda").classList.add("medapay-show");
            
          
    /*        }
          }
        })
  
  */
  let v = parseInt(amount);
if(membership_type != "Lifetime"){
var fv = v*ext_period;
}else{ fv = v; }
console.log(typeof v, fv.toString())

  document.querySelector('#Membershipfee').value = fv.toString() +" ETB";

  let full_name = document.querySelector('#OrganizationName').value;
  let phone_number = document.querySelector('#phone_number').value;
  let email = document.querySelector('#OrganizationEmail').value;
  
console.log(membership_type)

  //server call to medapay
/*
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdG9tZWRhQDM2MGdyb3VuZC5jb20iLCJuYW1lIjoiTWVkYSBWb3VjaGVyIiwicGhvbmUiOiIrMjUxOTEzMDA4NTk1IiwiaXNzIjoiIiwiaWF0IjoxNTk4OTY0NTQwLCJleHAiOjIwMzA1MDA1NDB9.0xCu1GltD3fM8EoZOryDtw7zQMvyBWq1vBbIzQEH1Fk';

   const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoiNjI3Y2JlOGI3MDMxNDM2NjVjYmIxYmE4Iiwicm9sZSI6Im1lcmNoYW50Iiwic3ViIjoiNjI3Y2JlOGI3MDMxNDM2NjVjYmIxYmE4IiwiaWF0IjoxNjUyNzc0MjI3fQ.VSttZEoBbesVkgova60hjUW-3mAlEui38uQ65frF1pY'; 
  */
   const accessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdG9tZWRhQDM2MGdyb3VuZC5jb20iLCJuYW1lIjoiTWVkYSBWb3VjaGVyIiwicGhvbmUiOiIrMjUxOTEzMDA4NTk1IiwiaXNzIjoiIiwiaWF0IjoxNTk4OTY0NTQwLCJleHAiOjIwMzA1MDA1NDB9.p-QGfkmRtUlGTQhthS5PW1Ora6E4E-i5VMLjzAo96mY';
  
 
  let link;

  //call the whitelist functions 
  frappe.call({
    method: 'em_member.em_member.whitelist.paywithMeda',
    args: {
      self: 'self',
      args: {

        accessToken: accessToken,
        membership_type: membership_type,
        amount: fv.toString(),
        extension_period: ext_period,
        full_name: full_name,
        phone_number: phone_number,
        email: document.querySelector('#OrganizationEmail').value,
        redirect: 'organizationMember'
      }
    },
    btn: $('.paywithmeda'),
    callback: (r) => {
      medaUrl = r.message.link.href;
      billReference = r.message.billReferenceNumber;
      document.querySelector('#reference').value = billReference;
      billLink = r.message.link.href;
      console.log(billLink);
      console.log(document.querySelector('.paywithmeda'),'there is element tho');
      //document.querySelector('.paywithmeda').href = billLink;
     
      //run the callback function here 
      
      //  send email automatically 
      // frappe.call({
      //   method:'em_member.em_member.whitelist.send_email',
      //   callback:(r)=>{
      //     console.log('email send successfully:)',r)
      //   },
      //   error:(r)=>{
      //     console.log('email error:)',r)

     
      /*
GET https://api.sandboax.pay.meda.chat/v1/bills/1000000
  */

      
      const getStatus = async function () {
        frappe.call({
          method: 'em_member.em_member.whitelist.getStatus',
          args: {
            req: {
              billReference: billReference,
              accessToken: accessToken,
            }

          },
          callback: (r) => {
            // console.log(r,'success with the payment ')
          
          
            let status = r.message.status;
            frappe.call({
              method: 'em_member.em_member.whitelist.UpdateOrganization',
              args: {
                req: {
                  status: status,
                  data: r.message

                }

              },
              callback: (r) => {
                // console.log(r,'success with the payment ')
                //   frappe.msgprint({
                //     title: __('Successfull'),
                //     indicator: 'green',
                //     message: __('Payment proceed successfully')
                // });

              },
              error: (e) => {
                // console.log(r,'success with the payment ')
                frappe.msgprint({
                  title: __('Failed'),
                  indicator: 'green',
                  message: __('Payment process Failed')
                });
                console.log(e, "error")
              }
            })


            // end of changing the status 
            // console.log(r.message.status)
            return r.message.status
          },
          error: (r) => {
            console.log(r, 'error with the payment')
          }
          
        })

      }
    getStatus();
         
    },
    error: (r) => {

      console.log(r, 'error')
    }
      
      
      
      
  //})
     
      //end of get status
      
     

})


}else{
document.querySelector('#Membershiptype').value = ""; 
  //     alert('Please fill a correct Etension Period');

         dialog = frappe.msgprint({
                    title: __('Notice'),
                    indicator: 'green',
                    message: __('Please fill the correct Extension period')
                });
            dialog.show()
            dialog.$wrapper.find('.modal-dialog').css("height", "175px");


}




})
      
      
      
      
      
      
      
      
      
      
      
      
