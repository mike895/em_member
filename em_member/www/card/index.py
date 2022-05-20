
from calendar import month
from pickle import FALSE
import frappe
from frappe.utils import today
# from frappe.utils import now
# from frappe import _


def get_context(context):
    email = frappe.session.user
    context.email = email
    print(email)
    logedinMembercard =frappe.db.get_value( 'Members',{'email':email},['prefix','name','full_name','membership_type','picture','member_status','membership_id'],as_dict=1)
    context.logedinMembercard = logedinMembercard
    print(logedinMembercard)
        
    
    

