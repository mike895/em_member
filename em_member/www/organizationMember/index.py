import frappe
def get_context(context):
    email = frappe.session.user
    context.email = email
    logedinorg =frappe.db.get_value('Organizations',{'email':email},['name_1','industry','phone_number','website'],as_dict=1)
    context.logedinorg = logedinorg
    
    if logedinorg:
    	context.see = 1
    else:
    	context.see = 0
    print("looooooooo",logedinorg)
    
