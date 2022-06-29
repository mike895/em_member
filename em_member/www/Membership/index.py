
import frappe
# from frappe.utils import now
# from frappe import _

def get_context(context):
    email = frappe.session.user
#    branch_API = requests.get('http://18.193.100.79/api/resource/Branch?fields=["name"]')
#    branch_dict = branch_API.json()
#    context.branch = branch_dict['data']
    branch = frappe.db.get_list('Branch')
    context.branchs = branch
    context.email = email
    logedinMember =frappe.db.get_value('Members',{'email':email},['prefix','full_name','last_name','profession_specialization','place_of_employmentinstitution','phone_number','membership_type','picture','email'],as_dict=1)
    print("logedinMember---------------------")
    context.logedinMember = logedinMember
    if logedinMember:
    	context.see = 1
    else:
    	context.see = 0
    print(logedinMember.picture)
    
    
    #frappe.throw(title='Error', msg='This file', exc=FileNotFoundError )
