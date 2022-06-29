
import frappe
import requests
import json



@frappe.whitelist(allow_guest=True)
def get_context(context):
        email = frappe.session.user
        response_API = requests.get('http://18.193.100.79/api/resource/Members?fields=["prefix","name","email","membership_expire_date","full_name","middle_name","membership_type","picture","member_status","member_since","profession_specialization"]')
#        r_dict =response_API.json()
#        context.card = response_API
        r_dict =response_API.json()
        for i in r_dict['data']:
              if i['email'] == email:
                     member = i
                     context.card = member
                     context.orgcard = None
        
        org_API = requests.get('http://18.193.100.79/api/resource/Organizations?fields=["name","email","membership_expire_date","status","name_1","member_since"]')
        org_dict = org_API.json()
        #context.card = org_dict
        for j in org_dict['data']:
              if j['email'] == email:
                     org = j
                     context.orgcard = org
                     context.card = None  
       


