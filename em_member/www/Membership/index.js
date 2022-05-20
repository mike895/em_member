/*
function setCookie(name,value,exp_days) {
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
*/
var delayInMilliseconds = 1000;
var see = document.querySelector('#see').value; 

var medaUrl;

	

document.querySelector('.paywithmeda').addEventListener('click', async () => {
 check()
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
    //var value = 0;
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
       // if (res){
          //  value = 1
        //}
        
        
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
    window.location = medaUrl 
             

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
  document.querySelector("#fee").classList.remove("medapay-hide");
  document.querySelector("#fee").classList.add("medapay-show");

  if (membership_type == 'NEDD') {

    document.querySelector(".dollarAccount").classList.remove("medapay-hide");
    document.querySelector(".dollarAccount").classList.add("medapay-show");

    document.querySelector(".withmeda").classList.add("medapay-hide");
    document.querySelector(".withmeda").classList.remove("medapay-show");
    
    
    
    

  } else {
  
  
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
         /*   else if(r.message == 3){
             dialog = frappe.msgprint({
		    title: __('Notice'),
		    indicator: 'green',
		    message: __('A user has already registered with this Email address ')
		});
	    dialog.show()
	    dialog.$wrapper.find('.modal-dialog').css("height", "175px");
            
            }*/
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
            
               document.querySelector(".withmeda").classList.remove("medapay-hide");
    		document.querySelector(".withmeda").classList.add("medapay-show");

    		document.querySelector(".dollarAccount").classList.add("medapay-hide");
    		document.querySelector(".dollarAccount").classList.remove("medapay-show");
    		
    		

            
            //let awa = 1;
            }
          }
        })


  }

  document.querySelector('#fee').value = amount + (membership_type == 'NEDD' ? "USD" : " ETB");
  let full_name = document.querySelector('#full_name').value;
  let phone_number = document.querySelector('#phone_number').value;



console.log(membership_type)

  //server call to medapay

  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoiNjI3Y2JlOGI3MDMxNDM2NjVjYmIxYmE4Iiwicm9sZSI6Im1lcmNoYW50Iiwic3ViIjoiNjI3Y2JlOGI3MDMxNDM2NjVjYmIxYmE4IiwiaWF0IjoxNjUyNzc0MjI3fQ.VSttZEoBbesVkgova60hjUW-3mAlEui38uQ65frF1pY'; 
  /*const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdG9tZWRhQDM2MGdyb3VuZC5jb20iLCJuYW1lIjoiTWVkYSBWb3VjaGVyIiwicGhvbmUiOiIrMjUxOTEzMDA4NTk1IiwiaXNzIjoiIiwiaWF0IjoxNTk4OTY0NTQwLCJleHAiOjIwMzA1MDA1NDB9.0xCu1GltD3fM8EoZOryDtw7zQMvyBWq1vBbIzQEH1Fk';
  
  
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoiNjI3Y2Q3ZmE3MDMxNDM2NjVjYmIxYmFiIiwicm9sZSI6Im1lcmNoYW50Iiwic3ViIjoiNjI3Y2Q3ZmE3MDMxNDM2NjVjYmIxYmFiIiwiaWF0IjoxNjUyOTQyNTM5fQ.mnrEsr-85bRt7vIld2z9RWirjlQG7_ZccykrvbzbtyU'; 
  */
  
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
        email: document.querySelector('#email').value,
        redirect: 'Membership'
      }
    },
    btn: $('.paywithmeda'),
    callback: (r) => {
      console.log('Called: ', r);
      medaUrl = r.message.link.href
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
      getStatus()
     // */
         
    },
    error: (r) => {

      console.log(r, 'error')
    }
      
      
      
      
  //})
     
      //end of get status
      
     

})

})







// document.querySelector('.logout').addEventListener('click',function(){
//   console.log('logout')
// })
//use Local storage 


/*

function showPreview(event){
  if(event.target.files.length > 0){
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("file-ip-1-preview");
    preview.src = src;
    preview.style.display = "block";
  }
}
                

//////
console.log(localStorage)

function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
};
var inputForms = {
  prefix: document.getElementById('prefixSelector'),
  titleSelector: document.getElementById('titleSelector'),
  fullName: document.getElementById('full_name'),
  genderSelector: document.getElementById('genderSelector'),
  profilePicture: document.getElementById('profilePicture'),
  phoneNumber: document.getElementById('phone_number'),
  email: document.getElementById('email'),
  profession: document.getElementById('profession_specialization'),
  placeEmployment: document.getElementById('place_of_employmentinstitution'),
  memberShip: document.getElementById('membership'),
  // image:document.getElementById('image'),
  // reference:document.getElementById('reference')
  birthDate: document.querySelector('.dateValue')

};

function populateStorage() {
  localStorage.setItem('prefix', inputForms.prefix.value);
  localStorage.setItem('tileSelector', inputForms.titleSelector.value);
  localStorage.setItem('full_name', inputForms.fullName.value);
  localStorage.setItem('genderSelector', inputForms.genderSelector.value);
  localStorage.setItem('profilePicture', inputForms.profilePicture.value);
  localStorage.setItem('phone_number', inputForms.phoneNumber.value);
  localStorage.setItem('email', inputForms.email.value);
  localStorage.setItem('profession_specialization', inputForms.profession.value);
  localStorage.setItem('place_of_employmentinstitution', inputForms.placeEmployment.value);
  localStorage.setItem('membership', inputForms.memberShip.value);
  // localStorage.setItem('reference', inputForms.reference.value);
  localStorage.setItem('birthdate', inputForms.birthDate.value)

  setStyles();
}
function setStyles() {

  var prefix = localStorage.getItem('prefix');
  var titleSelector = localStorage.getItem('tileSelector');
  var fullName = localStorage.getItem('full_name');
  var genderSelector = localStorage.getItem('genderSelector');
  var profilePicture = localStorage.getItem('profilePicture');
  var phoneNumber = localStorage.getItem('phone_number');
  var email = localStorage.getItem('email');
  var profession = localStorage.getItem('profession_specialization');
  var placeEmployment = localStorage.getItem('place_of_employmentinstitution');
  var memberShip = localStorage.getItem('membership');
  var birthdate = localStorage.getItem('birthdate');
  // var reference = localStorage.getItem('reference');



  //make it DRY i am lazy though :)
  inputForms.prefix.value = prefix;
  inputForms.titleSelector.value = titleSelector;
  inputForms.fullName.value = fullName;
  inputForms.genderSelector.value = genderSelector;
  inputForms.profilePicture.value = profilePicture;
  inputForms.phoneNumber.value = phoneNumber;
  inputForms.email.value = email;
  inputForms.profession.value = profession;
  inputForms.placeEmployment.value = placeEmployment;
  inputForms.memberShip.value = memberShip;
  inputForms.birthDate.value = birthdate;
  // inputForms.image.value = reference;
};

(function (inputForms) {
  Object.values(inputForms).forEach(element => {
    if (element)
      element.addEventListener('change', populateStorage)
  })
}
)(inputForms);





(() => {
  if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    if (!localStorage.getItem('full_name')) {
      populateStorage();
    } else {
      setStyles();
    }

  }
  else {
    // Too bad, no localStorage for us
  }
})();

document.querySelector('.sendReceipt').addEventListener('click', event => {
  // let sendReceipt = document.querySelector(".sendReceipt");
  let newmember = {};
  newmember.image = document.querySelector('#paymentRecipt').files[0]
  frappe.call({
    method: 'em_member.em_member.whitelist.sendReceipt',

    callback: (r) => {
      console.log(r, 'success');
      // now attach the image 

      let imageFile = new FormData();
      if (newmember.image) {
        imageFile.append('file', newmember.image);

        fetch('/api/method/upload_file', {
          headers: {
            'X-Frappe-CSRF-Token': frappe.csrf_token
          },
          method: 'POST',
          body: imageFile
        }).then(res => res.json())
          .then(data => {
            console.log('data', data);
            //append to the doctype 
            if (data.message) {
              //update member
              frappe.call({
                method: 'em_member.em_member.whitelist.attachImage',
                args: {
                  self: 'self',
                  args: {
                    url: data.message.file_url,
                    from: 'receipt'
                  }
                },
                callback: (r) => {

                  frappe.msgprint({
                    title: __('Successfully'),
                    indicator: 'green',
                    message: __('Receipt sent successfully')
                  });
                },
                error: (r) => {
                  frappe.msgprint({
                    title: __('Failed'),
                    indicator: 'red',
                    message: __('Failed to send Receipt')
                  })

                  console.log(r, 'error Image')
                }
              })


            }

          })
      }

    },
    error: (r) => {

      console.log(r, 'error')
    }
  })

});

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



// fill detail 
// document.querySelector('.filldetail').addEventListener('click', event => {
//   let detail = document.querySelector(".detail-section");

//   if (detail.classList.contains('medapay-hide')) {

//     detail.classList.add("medapay-show");
//     detail.classList.remove("medapay-hide");

//   } else {

//     detail.classList.add("medapay-hide");
//     detail.classList.remove("medapay-show");

//   }
// });



const selectElement = document.querySelector('.membership-select');

selectElement.addEventListener('change', (event) => {

  // console.log(event.target.value)

  let membership_type = event.target.value;
  let amount;
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
      amout = '0';
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

      //   }
      // })
       
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

  //  save the users  

  //add the member to the database 
  //  1.when click save the data to the data base and link the data to database 
  let newmember = {}



  // newmember.image= event.target.result;
  newmember.image = document.querySelector('#profilePicture').files[0];


  // console.log('the image link', newmember.image)
  // console.log('the image link2', document.querySelector('#profilePicture').value);
  newmember.doctype = "Member"

  newmember.title = document.querySelector('#titleSelector').value;
  newmember.full_name = document.querySelector('#full_name').value;
  newmember.gender = document.querySelector('#genderSelector').value;
  newmember.prefix = document.querySelector('#prefixSelector').value;
  // console.log('member prefix-------->',newmember.prefix)
  newmember.phone_number = document.querySelector('#phone_number').value;
  newmember.email = document.querySelector('#email').value;
  newmember.specialization = document.querySelector('#profession_specialization').value;
  newmember.place_of_employmentinstitution = document.querySelector('#place_of_employmentinstitution').value;
  newmember.membership = document.querySelector('#membership').value;
  newmember.feeamount = document.querySelector('#fee').value;
  newmember.reference = document.querySelector('#reference').value

  // console.log(newmember,'adding the new member ');

  // get the value of the new values 
  newmember.otherspc = document.querySelector('#otherSpe').value;
  newmember.otherWork = document.querySelector('#otherSpe').value;
  



////////////////////////////////////////////////////////////////////





const membergetStatus = async function () {
        frappe.call({
          method: 'em_member.em_member.whitelist.membergetStatus',
          args: {
            req: {
            	prefix:input['prefix'],
		titleoptional:input['title'],
		full_name:input['full_name'],
		geder:input['gender'],
		phone_number:input['phone_number'],
		email:input['email'],
		profession_specialization:input['specialization'],
		place_of_employmentinstitution:input['place_of_employmentinstitution'],
		membership_type:input['membership'],
		membership_fee_amount:input['feeamount'],
		generate_payment_reference:input['reference'],
            
            }

          },
          callback: (r) => {
            // console.log(r,'success with the payment ')
           
           
            let status = r.message.status;
            frappe.call({
              method: 'em_member.em_member.whitelist.saveUsers',
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
                //     message: __('Payment proceed successfully') user
                // });

              },
              erorr: (e) => {
                // console.log(r,'sucess with the user ')
                frappe.msgprint({
                  title: __('Failed'),
                  indicator: 'green',
                  message: __('Registration process Failed')
                });
                console.log(e, "error")
              }
            })






            // end of changing the status 
            // console.log(r.message.status)
            return r.message.status
          },
          error: (r) => {
            console.log(r, 'error with the registration')
          }
        })

      }
      //const minutes = 1;
     // const interval = minutes * 1000;

      //setInterval(function () {
        // catch all the errors.
        //let status = getStatus()
         // .catch(console.log);
        // if(status == 'PAYED'){
        //   console.log
        // }
     // }, interval);





    },
    error: (r) => {

      console.log(r, 'error')
    }
  })





///////////////////////////////////////////////////////////////////



  frappe.call({
    method: 'em_member.em_member.whitelist.saveUsers',
    args: {
      self: 'self',
      args: newmember
    },
    callback: (r) => {
      // console.log(r,'success');
      // now attach the image 

      let imageFile = new FormData();
      if (newmember.image) {
        imageFile.append('file', newmember.image);

        fetch('/api/method/upload_file', {
          headers: {
            'X-Frappe-CSRF-Token': frappe.csrf_token
          },
          method: 'POST',
          body: imageFile
        }).then(res => res.json())
          .then(data => {
            //  console.log('data',data);
            //append to the doctype 
            if (data.message) {
              //update member
              frappe.call({
                method: 'em_member.em_member.whitelist.attachImage',
                args: {
                  self: 'self',
                  args: {
                    url: data.message.file_url,
                    from: 'profile'
                  }
                },
                callback: (r) => {

                  // console.log(r,'success Image')
                },
                error: (r) => {

                  console.log(r, 'error Image')
                }
              })


            }

          })
      }
    },
    error: (r) => {

      console.log(r, 'error')
    }
  })

  // console.log(newmember)
  // console.log('i out of the  in the event listner')

  //now try to add the value to frappe 

});


document.querySelector('.saveUpdate').addEventListener('click',()=>{

  
  let additionalContact={};


  //Additional contact's 
  additionalContact.additionalFullname = document.querySelector('#additionalFullname').value;
  additionalContact.additionalEmail = document.querySelector('#additionalEmail').value;
  additionalContact.additionalPhone = document.querySelector('#additionalPhone').value;
   
  
  //Graduated from  
  additionalContact.Institution = document.querySelector('#Institution').value;
  additionalContact.UndergradeContactuate = document.querySelector('#UndergradeContactuate').value;
  additionalContact.Yearofcompletion = document.querySelector('#Yearofcompletion').value;

  // region , city, pobox 
  additionalContact.region = document.querySelector('#region').value;
  additionalContact.city = document.querySelector('#city').value;
  additionalContact.pobox = document.querySelector('#pobox').value;


  additionalContact.date = document.querySelector('#date').value;


  frappe.call({
    method: 'em_member.em_member.whitelist.saveAdditional',
    args: {
      self: 'self',
      args: additionalContact
    },
    callback: (r) => {
      console.log('additional successfull')
    },
    error: (r) => {

      console.log(r, 'error')
    }
  })
//})

});










/*  
  
  
  
  
  "img",
  
  "email",

 
  "undergrade_contactuate",
 
  "unemployedseeking_employment",
  "unemployednot_seeking_employment",
  "membership_id",

  
  "generate_payment_reference",
  "member_status"












let imagefile = new FormData();
imagefile.append('file_url','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.javatpoint.com%2Fjavascript-tutorial&psig=AOvVaw1htRqUBmEBSAg3xLGKJ-vm&ust=1652187368465000&source=images&cd=vfe&ved=0CA4Q3YkBahcKEwiI0rDcu9L3AhUAAAAAHQAAAAAQAw');
imagefile.append('doctype', 'Members');
imagefile.append('docname', 'b5678a45e2');
fetch('/api/method/upload_file', {
    headers: {
        'X-Frappe-CSRF-Token': frappe.csrf_token
    },
    method: 'POST',
    body: imagefile

}).then(res => res.json())

*/


