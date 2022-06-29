

import frappe
import requests
import json



@frappe.whitelist(allow_guest=True)
def get_context(context):

	response_API = requests.get('http://18.193.100.79/api/resource/Events?fields=["event_name","status","image","time","location","date"]')

	r_dict = response_API.json()
	context.event = r_dict


"""
from calendar import month
from pickle import FALSE
import frappe
from frappe.utils import today
from datetime import date
import datetime 
# from frappe.utils import now
# from frappe import _

def checkPaymentStatus(email,refno):
    rdate=frappe.db.get_value('Payment',{'email':email,"reference":refno},['date'],as_dict=1)
    if not rdate:
        return
    fromDate =rdate.date.split('-')[::-1]
    now=today().split('-')

    yearDiff = int(fromDate[0])-int(now[0])
    monthDiff = int(fromDate[1])-int(now[1])
    dayDiff = int(fromDate[2])-int(now[2])

    if yearDiff == 0:
        return False
    if monthDiff >1:
        return False
    if monthDiff ==1:
        return 'One month left till Membership expire'
    if monthDiff ==0 and dayDiff==0:
        frappe.db.set_value('Members', email, {
				'member_status':'Expired'
				})
			
def clear_cache(user=None):
	cache = frappe.cache()

	groups = ( "user_recent", "user_roles", "user_doc", "lang",
		"defaults", "user_permissions", "roles", "home_page", "linked_with",
		"desktop_icons", 'portal_menu_items')

	if user:
		for name in groups:
			cache.hdel(name, user)
		cache.delete_keys("user:" + user)
		frappe.defaults.clear_cache(user)
	else:
		for name in groups:
			cache.delete_key(name, user)
		clear_global_cache()
		frappe.defaults.clear_cache()



@frappe.whitelist(allow_guest=True)
def get_context(context):
   # 
    #context.kk="jjjj"
#frappe.cache()
    email = frappe.session.user
    context.email = email
  logedinMember =frappe.db.get_value('Members',{'email':email},['prefix','name','full_name','profession_specialization','other_specialization','place_of_employmentinstitution','phone_number','membership_type','picture','member_status','membership_id','membership_expire_date','generate_payment_reference'],as_dict=1)
    logedinorg =frappe.db.get_value('Organizations',{'email':email},['name_1','name','status','phone_number','region','city','website','email','membership_expire_date'],as_dict=1)
    if logedinMember and not logedinorg:
    	context.logedinMember = logedinMember
    	context.logedinorg = None    	
    	exp_date = logedinMember.membership_expire_date.strftime("%d/%m/%Y").split('/')[::-1]
    	print(exp_date[0])
    	#todays = datetime.date.today().split(',')
    	x = datetime.datetime.now()
    	years = int(exp_date[0])- x.year
    	print(years)
    	if int(exp_date[1]) < x.month:
    		mn =1
    		months = x.month-int(exp_date[1])
    	else:
    		mn = 0
    		months = int(exp_date[1])-x.month
    	if int(exp_date[2]) < x.day:
    		md =1
    		dates = x.day-int(exp_date[2])
    	else:
    		md = 0
    		dates = int(exp_date[2])- x.day
    	
    	print(months,dates)
    	if years <= 0 and (md ==1 or dates ==0) and (mn == 1 or months == 0):
    		context.stat = 0
    		print("-----yes------",logedinMember.name)
    		frappe.db.set_value('Members',logedinMember.name,'member_status','Inactive')
    		logedinMember.member_status =  "Inactive"
    	elif years > 0:
    		context.stat = 2 	
    	else:
    		context.stat = 1
    		context.years = years
    		context.months = months
    		context.dates = dates 
        
            	
    
    	
    elif logedinorg and not logedinMember:
        context.logedinorg = logedinorg
        context.logedinMember=None    	
        exp_date = logedinorg.membership_expire_date.strftime("%d/%m/%Y").split('/')[::-1]
        #
        print(exp_date)
        #todays = datetime.date.today().split(',')
        x = datetime.datetime.now()
        years = int(exp_date[0])- x.year
        print(years)
        
        if int(exp_date[1]) < x.month:
        	mn = 1
        	months = x.month-int(exp_date[1])
        else:
        	mn = 0
        	months = int(exp_date[1])-x.month
        if int(exp_date[2]) < x.day:
        	md = 1
        	dates = x.day-int(exp_date[2])
        else:
        	md = 0
        	dates = int(exp_date[2])- x.day
        
        if years <= 0 and (md ==1 or dates == 0) and (mn == 1 or months == 0):
        	context.stat = 0
        	print("-----yes1------",logedinorg.name)
        	frappe.db.set_value('Organizations',logedinorg.name,'status','Inactive')
        	logedinorg.status =  "Inactive"
        elif years > 0:
        	context.stat = 2
        	
        else:
        	print("asdfgh",logedinorg.status )
        	context.stat = 1
        	context.years = years
        	context.months = months
        	context.dates = dates 
            
    
    
    

        if not context.logedinMember:
    	    context.Certification = "unavailable"    
    	    context.membershipStatus = "your membership status is Inactive"
        else:
    	# get the certification data and add to fileds 
    	# get all the events list
            Certification = frappe.db.get_value('Certification',{'email':email},['type','date','content'],as_dict=1)
            context.Certification = Certification   
            
            exp_date = logedinMember.membership_expire_date.split('-')[::-1]
            todays = today().split('/')[::-1]
            years = int(exp_date[0])-int(todays[0])
            if int(exp_date[1]) < int(todays[1]):
            	months = int(todays[1])-int(exp_date[1])
            else:
            	months = int(exp_date[1])-int(todays[1])
                        
            if int(exp_date[2]) < int(todays[2]):
            	dates = int(todays[2])-int(exp_date[2])
            else:
            	dates = int(exp_date[2])-int(todays[2])
            	
            	
            context.years = years
            context.months = months
            context.dates = dates            
            
    	
    	
"""
    	
    	
    	
    	
