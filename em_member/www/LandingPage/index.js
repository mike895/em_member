
function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}

var date = new Date();
var month = pad2(date.getMonth()+1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year= date.getFullYear();

var formattedDate = year+"-"+month+"-"+day;



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
        
        
var memb = await $.ajax({
            url: `/api/resource/Members?fields=["name","prefix","full_name","email","profession_specialization","other_specialization","place_of_employmentinstitution","phone_number","membership_type","picture","member_status","membership_expire_date","generate_payment_reference"]&filters=[["Members","email","=","${res.data[0].name}"]]`,
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
//        console.log(memb.data[0].name);
        
        
        
var org = await $.ajax({
            url: `/api/resource/Organizations?fields=["name_1","name","status","phone_number","region","city","website","email","membership_expire_date"]&filters=[["Organizations","email","=","${res.data[0].name}"]]`,
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
//        console.log(org.data[0].name);
        
      
      
       if (memb.data[0] != undefined && org.data[0] == undefined){

	$('[id=reg-mem]').remove();
        document.getElementById("mem_status").innerHTML = memb.data[0].member_status;
        document.getElementById("mem_id").innerHTML = memb.data[0].name;

        document.getElementById("cgcg").src = memb.data[0].picture;
	document.getElementById("mem-pre").innerHTML = memb.data[0].prefix;
        document.getElementById("mem-name").innerHTML =  memb.data[0].full_name;
        
        if (memb.data[0].place_of_employmentinstitution == "other"){
        document.getElementById("memb-desc").innerHTML = memb.data[0].other_specialization;
        }else{
        document.getElementById("memb-desc").innerHTML = memb.data[0].place_of_employmentinstitution;       
        }

        $('[id=org-only]').remove();
        document.getElementById("memb-email").innerHTML = memb.data[0].email;
        document.getElementById("memb-phone").innerHTML = memb.data[0].phone_number;
        document.getElementById("memb-type").innerHTML = memb.data[0].membership_type;
        document.getElementById("profileedit").href = "/Membership";
        
	var dat = memb.data[0].membership_expire_date;
	if (dat != null){
	var myInt = dat[0].concat (dat[1],dat[2],dat[3]);
        var myIntm = dat[5].concat (dat[6]);
        var myIntd = dat[8].concat (dat[9]);
	var mn;
	var md;
	var exp_m;
	var exp_d;
	var exp_y = parseInt(myInt)-year;

	if (parseInt(myIntm) < month){
	 mn = 1;
	exp_m = month - parseInt(myIntm);
	}else{
	mn = 0;
	exp_m = parseInt(myIntm) - month;
	}

	if (parseInt(myIntd) < day){
	md = 1;
	exp_d = day - parseInt(myIntd);
	}else{
	md = 0;
	exp_d = parseInt(myIntd) - day;
	}
	
	console.log(exp_y,exp_m,exp_d);
	if (exp_y <=0 && (md ==1 || exp_d ==0) && (mn ==1 || exp_m == 0)){
	document.getElementById("mem_status").innerHTML = "Inactive";
	
	
	 let res_mem = await $.ajax({
            url: `/api/resource/Members/${memb.data[0].name}`,
            type: 'PUT',
            headers: {
		 'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            data: JSON.stringify({member_status:"Inactive"}),
            success: function(data){
                return data
            },
            error: function(data){
                return data
            }
        })
	document.getElementById("counter").innerHTML ="Your Membership has Expired";
	}else if (exp_y < 0){
//	$('[id=counts]').remove();
	 let res_mem = await $.ajax({
            url: `/api/resource/Members/${memb.data[0].name}`,
            type: 'PUT',
            headers: {
		 'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            data: JSON.stringify({member_status:"Inactive"}),
            success: function(data){
                return data
            },
            error: function(data){
                return data
            }
        })
	document.getElementById("counter").innerHTML ="Your Membership has Expired"; 
	}else if (exp_y > 0){

        }else{
	document.getElementById("counter").innerHTML =exp_d+" days are left for your membership to expire" ;
	} 
	
	}else{
	document.getElementById("counter").innerHTML = "Please pay your Membership Fee";
	}

	
        
        
        }  
        
        else if (memb.data[0] == undefined && org.data[0] != undefined){

	$('[id=reg-mem]').remove();
        document.getElementById("mem_status").innerHTML = org.data[0].status;
        document.getElementById("mem_id").innerHTML = org.data[0].name;

        document.getElementById("cgcg").remove();
	//document.getElementById("mem-pre").innerHTML = memb.data[0].prefix;
        document.getElementById("mem-name").innerHTML =  org.data[0].name_1;
        


        $('[id=mem-only]').remove();
	document.getElementById("memb-city").innerHTML = org.data[0].city;
	document.getElementById("memb-add").innerHTML = org.data[0].region;
	document.getElementById("memb-web").innerHTML = org.data[0].website;
        document.getElementById("memb-email").innerHTML = org.data[0].email;
        document.getElementById("memb-phone").innerHTML = org.data[0].phone_number;
        document.getElementById("memb-type").innerHTML = "Corporate";
        document.getElementById("profileedit").href = "/organizationMember";
        
	var dat = org.data[0].membership_expire_date;
	if (dat != null){
	var myInt = dat[0].concat (dat[1],dat[2],dat[3]);
        var myIntm = dat[5].concat (dat[6]);
        var myIntd = dat[8].concat (dat[9]);
	var mn;
	var md;
	var exp_m;
	var exp_d;
	var exp_y = parseInt(myInt)-year;

	if (parseInt(myIntm) < month){
	 mn = 1;
	exp_m = month - parseInt(myIntm);
	}else{
	mn = 0;
	exp_m = parseInt(myIntm) - month;
	}

	if (parseInt(myIntd) < day){
	md = 1;
	exp_d = day - parseInt(myIntd);
	}else{
	md = 0;
	exp_d = parseInt(myIntd) - day;
	}
	
	console.log(exp_y,exp_m,exp_d);
	if (exp_y <=0 && (md ==1 || exp_d ==0) && (mn ==1 || exp_m == 0)){
	document.getElementById("mem_status").innerHTML = "Inactive";


	 let res_mem = await $.ajax({
            url: `/api/resource/Organizations/${org.data[0].name}`,
            type: 'PUT',
            headers: {
		 'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            data: JSON.stringify({status:"Inactive"}),
            success: function(data){
                return data
            },
            error: function(data){
                return data
            }
        })
	document.getElementById("counter").innerHTML ="Your Membership has Expired";
	
	}else if (exp_y < 0){
//	$('[id=counts]').remove();
	 let res_mem = await $.ajax({
            url: `/api/resource/Organizations/${org.data[0].name}`,
            type: 'PUT',
            headers: {
		 'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            data: JSON.stringify({status:"Inactive"}),
            success: function(data){
                return data
            },
            error: function(data){
                return data
            }
        })
	document.getElementById("counter").innerHTML ="Your Membership has Expired"; 
	}else{
	document.getElementById("counter").innerHTML =exp_d+" days are left for your membership to expire" ;
	} 

       }else{
	document.getElementById("counter").innerHTML = "Please pay your Membership Fee";
	} 



        }else{
	$('[id=about]').remove();
	}
        
        
        
}

land();



/*



 var event_land = async ()=> {

 var event_res = await $.ajax({
            url: '/api/resource/Events?fields=["event_name","status","date","time","location","image"]',
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
        console.log(event_res.data)
        
      for(i=0;i<event_res.data.length;i++){
      
 
      document.getElementById("events-list").innerHTML += " <div class='col-lg-4 col-md-6 d-flex align-items-stretch'>";
	 document.getElementById("events-list").innerHTML += " <div class='icon-box'> <div class=''>";
	 document.getElementById("events-list").innerHTML += " <img src="+event_res.data[i].image+" class='event-img'> </div>";
	 document.getElementById("events-list").innerHTML += " <h4><a>"+event_res.data[i].event_name+"</a></h4> <p>Status :"+event_res.data[i].status+"</p> <p>Date :"+event_res.data[i].date+"</p> <p>Time :"+event_res.data[i].time+"</p> <p>Location :"+event_res.data[i].location+"</p> </div>  ";



     
      let col = document.createElement('div');
      let icon = document.createElement('div');
      let co = document.createElement('div');
      let img = document.createElement('img');
      let h4 = document.createElement('h4');
      let pst = document.createElement('p');
      let pd = document.createElement('p');
      let pt = document.createElement('p');
      let pl = document.createElement('p');
      
      col.class = "col-lg-4 col-md-6 d-flex align-items-stretch";
      icon.class = "icon-box";
      img.class = "event-img";
      co.appendChild(img);
      
      h4.innerHTML = event_res.data[i].event_name;
      pst.innerHTML = event_res.data[i].status;
      pd.innerHTML = event_res.data[i].date;
      pt.innerHTML = event_res.data[i].time;
      pl.innerHTML = event_res.data[i].location;
      
      icon.appendChild(co);
      icon.appendChild(h4);
      icon.appendChild(pst);
      icon.appendChild(pd);
      icon.appendChild(pt);
      icon.appendChild(pl);
      
      col.appendChild(icon);
      document.getElementById("events-list").innerHTML += col;
      
 
      }      
      
     }
        
      
    event_land();  
      
      
   







*/




