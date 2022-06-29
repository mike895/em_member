// Copyright (c) 2022, 360ground and contributors
// For license information, please see license.txt

frappe.ui.form.on('Members', {
	 refresh: function(frm) {
	console.log(frm.doc)
	if (frm.doc.email != undefined){
	frappe.call({
                method:"em_member.em_member.whitelist.get_contest",
                args: {email: frm.doc.email},
                callback: function(res) {
        
        var holders = res.message;
	var temp = [];
	var containers = [];
        console.log(holders)
	for (let i=0; i< holders.length; i++){
	for (let j=0; j< frm.doc.payment_history.length; j++){
		if(holders[i].reference == frm.doc.payment_history[j].reference ) {
			temp.push(holders[i])
			}

	}
 	if(temp.length == 0){
		containers.push(holders[i])
		}

	temp = []
	}


	 containers.forEach(container =>{
              //  container["event"] = container.parent
                //container.push({ key: "event", value: container.parent });
                frm.add_child('payment_history',container);
         });

         frm.refresh_field('payment_history');

       		}


            })

	}

	 }
});
