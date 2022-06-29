
document.querySelector('#extension_period').addEventListener('change', (event) => {
document.querySelector('.membership-select').value = ""; 

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
  //      console.log(res.data[0].name);
        
        
var memb = await $.ajax({
            url: `/api/resource/Members?fields=["name","prefix","full_name","email","geder","profession_specialization","other_specialization","place_of_employmentinstitution","phone_number","membership_type","picture","member_status","membership_expire_date","generate_payment_reference"]&filters=[["Members","email","=","${res.data[0].name}"]]`,
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
 
//       console.log(memb.data[0].name);



document.getElementById("full_name").innerHTML = memb.data[0].full_name;

document.getElementById("last_name").innerHTML = memb.data[0].last_name;

document.getElementById("phone_number").innerHTML = memb.data[0].phone_number;

document.getElementById("email").innerHTML = memb.data[0].email;





  }

land();






var value;
var see = document.querySelector('#see').value; 

var medaUrl;

	

document.querySelector('.paywithmeda').addEventListener('click', async () => {
value = 1;
 check();
})
  // for attaching payment receipt for NEDD members
document.querySelector('.sendReceipt').addEventListener('click', async ()=> {
   // let formreceipt= {"email":document.querySelector('#email').value};
   let formreceipt = $('#email').serializeArray().reduce(
        (obj,item)=>(obj[item.name]=item.value, obj),{}
    );
    let attachdata = $('#paymentRecipt')[0].files[0];
    


  // initialize the form
    let attachfile = new FormData()
    if(attachdata){
        // file 
        attachfile.append('file', attachdata);
    } 
    
if (formreceipt){

 let res = await $.ajax({
            url: '/api/resource/Receipt',
            type: 'POST',
            headers: {
		 'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            data: JSON.stringify(formreceipt),
            success: function(data){
                return data
            },
            error: function(data){
                return data
            }
        })
        console.log(res);

  
 if(res.data && attachdata){
 //upload image to file manager in frappe
  console.log(res);
 
    let fileresponse = await fetch('/api/method/upload_file', {
        headers: {
            'X-Frappe-CSRF-Token': frappe.csrf_token
        },
        method: 'POST',
        body: attachfile
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);

        //update the created document inorder to add the images
        if(data.message){

            $.ajax({
                url:`/api/resource/Receipt/${res.data.name}`,
                type: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Frappe-CSRF-Token': frappe.csrf_token
                },
                data: JSON.stringify({receipt:data.message.file_url}),//check file _url
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



}

})
    




var check = async function () {
        frappe.call({
          method: 'em_member.em_member.whitelist.checkmember',
          args: {
          	  self: 'self',
		  args: {
		      email: document.querySelector('#email').value,
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

            }
            else if(r.message == 3){
		if (see == 0){
		 dialog = frappe.msgprint({
                    title: __('Notice'),
                    indicator: 'green',
                    message: __('Successfully Saved')
                });
            dialog.show()
            dialog.$wrapper.find('.modal-dialog').css("height", "175px");

	}


           /*
            dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
	    */
		if (value == 1){

	    window.location = medaUrl 
            }

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
            addform();
            
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
let addform = async()=>{
    let formdata = $("form").serializeArray().reduce(
        (obj,item)=>(obj[item.name]=item.value, obj),{}
    );
    let imagedata = $('#profilePicture')[0].files[0];
    let secimagedata = $('#Educational_Credentials')[0].files[0];
    
 

    // initialize the form
    let imagefile = new FormData()
    let secimgfile = new FormData()
    if(imagedata){
        // file 
        imagefile.append('file', imagedata);
    } 

    if(secimagedata){
        secimgfile.append('file', secimagedata);
    } 
console.log('Form data: ', formdata)
    // POST to the API
    if(formdata){
        let res = await $.ajax({
            url: '/api/resource/Members',
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
            console.log('error', data)
                return data
            }
        })
        console.log(res.data);
   
        
        //uploadfile
        if(res.data && secimagedata){
            let imgresponse = await fetch('/api/method/upload_file', {
                headers: {
                    'X-Frappe-CSRF-Token': frappe.csrf_token
                },
                method: 'POST',
                body: secimgfile
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
                        data: JSON.stringify({educational_credentials:data.message.file_url}),
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
       
   if(value == 0){
   
   }else{     
   if (see == 0){
   window.location = medaUrl
    } 
     }        

   }

}



function displayOther(triggerElement, targetElement) {

  const professionSelector = document.querySelector(triggerElement);
  professionSelector.addEventListener('change', (event) => {

    let selectValue = event.target.value;
    if (selectValue == "other") {

      document.querySelector(targetElement).classList.remove("medapay-hide");
      document.querySelector(targetElement).classList.add("medapay-show");
    } else {
      document.querySelector(targetElement).classList.add("medapay-hide");
      document.querySelector(targetElement).classList.remove("medapay-show");

    }

  })
}
displayOther('.profession_specialization-select', "#otherSpe");
displayOther('.place_of_employmentinstitution-select', "#otherWork");




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

if(document.getElementById("extension_period").value > 0){
  var ext_period = document.getElementById("extension_period").value; 
  document.querySelector("#fee").classList.remove("medapay-hide");
  document.querySelector("#fee").classList.add("medapay-show");

  if (membership_type == 'NEDD') {

    document.querySelector(".dollarAccount").classList.remove("medapay-hide");
    document.querySelector(".dollarAccount").classList.add("medapay-show");

    document.querySelector(".withmeda").classList.add("medapay-hide");
    document.querySelector(".withmeda").classList.remove("medapay-show");
    
    
    
    

  } else {
  
  /*
  frappe.call({
          method: 'em_member.em_member.whitelist.checkmember',
          args: {
          	  self: 'self',
		  args: {
		      email: document.querySelector('#email').value,
		  }
          },
          callback: (r) => {
            console.log(r.message,"hello")
            
            if(r.message == 2){
             dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
            

            }
           else if(r.message == 3){
             /*dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
            
            window.location = medaUrl 
            
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
            else{*/
            
               document.querySelector(".withmeda").classList.remove("medapay-hide");
    		document.querySelector(".withmeda").classList.add("medapay-show");

    		document.querySelector(".dollarAccount").classList.add("medapay-hide");
    		document.querySelector(".dollarAccount").classList.remove("medapay-show");
    		
    		
/*
            
            //let awa = 1;
            }
          }
        })

*/
  }
let v = parseInt(amount);
if(membership_type != "Lifetime"){
var fv = v*ext_period;
}else{ fv = v; }
console.log(typeof v, fv.toString())

  document.querySelector('#fee').value = fv.toString() + (membership_type == 'NEDD' ? "USD" : " ETB");
  let full_name = document.querySelector('#full_name').value;
  let phone_number = document.querySelector('#phone_number').value;



console.log(membership_type)

  //server call to medapay
/*
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoiNjI3Y2Q3ZmE3MDMxNDM2NjVjYmIxYmFiIiwicm9sZSI6Im1lcmNoYW50Iiwic3ViIjoiNjI3Y2Q3ZmE3MDMxNDM2NjVjYmIxYmFiIiwiaWF0IjoxNjUyOTQyNTM5fQ.mnrEsr-85bRt7vIld2z9RWirjlQG7_ZccykrvbzbtyU'; 
  */
  
 
// const accessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoiNjI5ZGVjM2FkMGNjNmIyZjkxZWM5ZGIxIiwicm9sZSI6Im1lcmNoYW50Iiwic3ViIjoiNjI5ZGVjM2FkMGNjNmIyZjkxZWM5ZGIxIiwiaWF0IjoxNjU1MTk3ODg4fQ.KNdqCbjuHDzqELMC57n_TyP9vs_HXPuEWHwDyuZuFkk';  
 
  const accessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdG9tZWRhQDM2MGdyb3VuZC5jb20iLCJuYW1lIjoiTWVkYSBWb3VjaGVyIiwicGhvbmUiOiIrMjUxOTEzMDA4NTk1IiwiaXNzIjoiIiwiaWF0IjoxNTk4OTY0NTQwLCJleHAiOjIwMzA1MDA1NDB9.0xCu1GltD3fM8EoZOryDtw7zQMvyBWq1vBbIzQEH1Fk';
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
        email: document.querySelector('#email').value,
        redirect: 'Membership'
      }
    },
    btn: $('.paywithmeda'),
    callback: (r) => {
      console.log('Called: ', r);
      medaUrl = r.message.link.href;
      //check();
      //console.log(awa);
      // console.log(r.message.link.href,'success');
      // console.log(r.message.billReferenceNumber,'success');
      billReference = r.message.billReferenceNumber;
      document.querySelector('#reference').value = billReference;
      billLink = r.message.link.href;
      console.log(billLink);
      console.log(document.querySelector('.paywithmeda'),'there is element tho');
      //document.querySelector('.paywithmeda').href = billLink;
      
      
 
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
              method: 'em_member.em_member.whitelist.updateStatus',
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
          
        });

      }
      getStatus();
     // */
         
    },
    error: (r) => {

      console.log(r, 'error')
    }
      
      
      
      
  //})
     
      //end of get status
      
     

})


}else{
document.querySelector('.membership-select').value = ""; 
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

