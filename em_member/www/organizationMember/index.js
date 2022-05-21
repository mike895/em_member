
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
            /*
             dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
	    */
	    
	     window.location = medaUrl 

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
        window.location = medaUrl 
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
  
document.querySelector("#Membershipfee").classList.remove("medapay-hide");
document.querySelector("#Membershipfee").classList.add("medapay-show");

  
  
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
         /*    dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
            */

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
            
            
  document.querySelector('#Membershipfee').value = amount +" ETB";
  document.querySelector(".paywithmedaOrganization").classList.remove("medapay-hide");
  document.querySelector(".paywithmedaOrganization").classList.add("medapay-show");

  document.querySelector(".withmeda").classList.remove("medapay-hide");
  document.querySelector(".withmeda").classList.add("medapay-show");
            
          
            }
          }
        })
  
  
  
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
        amount: amount,
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

})


      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    


/*



const selectElement = document.querySelector('.membership-select');

selectElement.addEventListener('change', (event) => {
let membership_type;
let amount;

membership_type = event.target.value;

  
  switch (membership_type) {
    case 'Associate':
      amount = '1';
      break;
    case 'Junior(Medical Students)':
      amount = '100';
      break;
    case 'Regular':
      amount = '500';
      break;
    case 'Corporate':
      amount = '10000';
      break;
    case 'Honorable':
      amount = '0';
      break;
    case 'Lifetime':
      amount = '5000';
      break;
    case 'NEDD':
      amount = '100';
      break;
    default:
      amount = '0';
      break;
  }
  document.querySelector("#fee").classList.remove("medapay-hide");
  document.querySelector("#fee").classList.add("medapay-show");

  if (membership_type == 'NEDD') {

    document.querySelector(".dollarAccount").classList.remove("medapay-hide");
    document.querySelector(".dollarAccount").classList.add("medapay-show");

    document.querySelector(".withmeda").classList.add("medapay-hide");
    document.querySelector(".withmeda").classList.remove("medapay-show");

  } else {
    document.querySelector(".withmeda").classList.remove("medapay-hide");
    document.querySelector(".withmeda").classList.add("medapay-show");

    document.querySelector(".dollarAccount").classList.add("medapay-hide");
    document.querySelector(".dollarAccount").classList.remove("medapay-show");

  }

  document.querySelector('#fee').value = amount + (membership_type == 'NEDD' ? "USD" : " ETB");
  let full_name = document.querySelector('#full_name').value;
  let phone_number = document.querySelector('#phone_number').value;



console.log(membership_type)

  //server call to medapay

  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdG9tZWRhQDM2MGdyb3VuZC5jb20iLCJuYW1lIjoiTWVkYSBWb3VjaGVyIiwicGhvbmUiOiIrMjUxOTEzMDA4NTk1IiwiaXNzIjoiIiwiaWF0IjoxNTk4OTY0NTQwLCJleHAiOjIwMzA1MDA1NDB9.0xCu1GltD3fM8EoZOryDtw7zQMvyBWq1vBbIzQEH1Fk';
  let link;

  //call the whitelist functions 
  frappe.call({
    method: 'em_member.em_member.whitelist.paywithMeda',
    args: {
      self: 'self',
      args: {

        accessToken: accessToken,
        membership_type: membership_type,
        amount: amount,
        full_name: full_name,
        phone_number: phone_number,
        redirect: 'Membership'
      }
    },
    btn: $('.paywithmeda'),
    callback: (r) => {
      // console.log(r,'success');
      // console.log(r.message.link.href,'success');
      // console.log(r.message.billReferenceNumber,'success');
      billReference = r.message.billReferenceNumber;
      document.querySelector('#reference').value = billReference;
      billLink = r.message.link.href;
      console.log(billLink);
      console.log(document.querySelector('.paywithmeda'),'there is element tho');
      document.querySelector('.paywithmeda').href = billLink;

      //run the callback function here 
      
      //  send email automatically 
      // frappe.call({
      //   method:'em_member.em_member.whitelist.send_email',
      //   callback:(r)=>{
      //     console.log('email send successfully:)',r)
      //   },
      //   error:(r)=>{
      //     console.log('email error:)',r)

         }
       })
       
      /*
GET https://api.sandboax.pay.meda.chat/v1/bills/1000000
  */

/*
      

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
              method: 'em_member.em_member.whitelist.updateStatus',
              args: {
                req: {
                  status: status,
                  data: r.message

                }

              },
              callback: (r) => {
                // console.log(r,'sucess with the payment ')
                //   frappe.msgprint({
                //     title: __('Successfully'),
                //     indicator: 'green',
                //     message: __('Payment proceed successfully')
                // });

              },
              erorr: (e) => {
                // console.log(r,'sucess with the payment ')
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
      
  })
     
      //end of get status
      









 //upload image to file manager in frappe
        if(res.data && imagedata){
            let imgresponse = await fetch('/api/method/upload_file', {
                headers: {
                    'X-Frappe-CSRF-Token': frappe.csrf_token
                },
                method: 'POST',
                body: imagefile
            })
            .then(res=>res.json())
            .then(data=>{
            
            console.log(data);

                //update the created document inorder to add the images
                if(data.message){

                    $.ajax({
                        url:`/api/resource/Members/${res.data.name}`,
                        type: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Frappe-CSRF-Token': frappe.csrf_token
                        },
                        data: JSON.stringify({picture:data.message.file_url}),
                        success: function(data){
                      
                            return data
                        },
                        error: function(data){
                            return data
                        }
                    })
                }
            })
        }














/*



const selectElement = document.querySelector('#Membershiptype');

selectElement.addEventListener('change', (event) => {

  // console.log(event.target.value)

  let membership_type = event.target.value;
  let amount;
  switch (membership_type) {
    case 'Corporate':
      amount = '1';
      break;
  }
  document.querySelector("#Membershipfee").classList.remove("medapay-hide");
  document.querySelector("#Membershipfee").classList.add("medapay-show");

  document.querySelector('#Membershipfee').value = amount +" ETB";
  document.querySelector(".paywithmedaOrganization").classList.remove("medapay-hide");
  document.querySelector(".paywithmedaOrganization").classList.add("medapay-show");

  document.querySelector(".withmeda").classList.remove("medapay-hide");
  document.querySelector(".withmeda").classList.add("medapay-show");


  // save to the document 

 let newOrganization = {};

 newOrganization.Name = document.querySelector('#OrganizationName').value;
 newOrganization.email = document.querySelector('#OrganizationEmail').value;
 newOrganization.Industry = document.querySelector('#industy').value;
 newOrganization.Region = document.querySelector('#region').value;
 newOrganization.City  = document.querySelector('#city').value;
 newOrganization.PhoneNumber = document.querySelector('#phone_number').value;
 newOrganization.RegionTwo  = document.querySelector('#region2').value;
 newOrganization.CityTwo  = document.querySelector('#city2').value;
 newOrganization.PhoneNumberTwo  = document.querySelector('#phone_number2').value;
 newOrganization.website  = document.querySelector('#website').value;



 frappe.call({
    method: 'em_member.em_member.whitelist.saveOrganization',
    args: {
      self: 'self',
      args: newOrganization
    },
    callback: (r) => {
        console.log(r,"success")
    },
    error: (r) => {

        console.log(r, 'error')
      }
    })

    //server call to medapay 
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdG9tZWRhQDM2MGdyb3VuZC5jb20iLCJuYW1lIjoiTWVkYSBWb3VjaGVyIiwicGhvbmUiOiIrMjUxOTEzMDA4NTk1IiwiaXNzIjoiIiwiaWF0IjoxNTk4OTY0NTQwLCJleHAiOjIwMzA1MDA1NDB9.0xCu1GltD3fM8EoZOryDtw7zQMvyBWq1vBbIzQEH1Fk';
    let link;
    let full_name = document.querySelector('#OrganizationName').value;
    let phone_number = document.querySelector('#phone_number').value;

  //call the whitelist functions 
  frappe.call({
    method: 'em_member.em_member.whitelist.paywithMeda',
    args: {
      self: 'self',
      args: {

        accessToken: accessToken,
        membership_type: ' Corporate ',
        amount: amount,
        full_name: full_name,
        phone_number: phone_number,
        redirect: 'organizationMember'
      }
    },
    btn: $('.paywithmeda'),
    callback: (r) => {
      // console.log(r,'success');
      // console.log(r.message.link.href,'success');
      // console.log(r.message.billReferenceNumber,'success');
      billReference = r.message.billReferenceNumber;
      document.querySelector('#reference').value = billReference;
      billLink = r.message.link.href;
      document.querySelector('.paywithmeda').href = billLink;

     

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
            // console.log(r,'sucess with the payment ')
            /*
            
            Get the status 
            */
            
            /*
            let status = r.message.status;
            frappe.call({
              method: 'em_member.em_member.whitelist.saveAndUpdateOrganization',
              args: {
                req: {
                  status: status,
                  data: r.message

                }

              },
              callback: (r) => {
                console.log(r,'sucess with the payment ')
                   frappe.msgprint({
                     title: __('Successfully'),
                   indicator: 'green',
                   message: __('Payment proceed successfully')
                 });

              },
              erorr: (e) => {
                // console.log(r,'sucess with the payment ')
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
      const minutes = 1;
      const interval = minutes * 1000;

      setInterval(function () {
        // catch all the errors.
        let status = getStatus()
          .catch(console.log);
        // if(status == 'PAYED'){
        //   console.log
        // }
      }, interval);

    },
    error: (r) => {

      console.log(r, 'error')
    }
  })


});



*/
