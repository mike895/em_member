

print("hello", doc)
"""
#	note = frappe.get_doc({
#		'doctype':'Note',
#		'title': f"{doc.name} Added",
#		'public': True,
#		'content': doc.description
#	}) 
	
	note = frappe.db.get_list('Members',fields=['email','full_name','prefix', 'membership_expire_date'])
	now=date.today().strftime("%d/%m/%Y").split('/')[::-1]
	for i in range(note.length):
		
		fromDate = note[i].membership_expire_date.date.split('-')[::-1]
		yearDiff = int(fromDate[0])-int(now[0])
		if now[1] > fromDate[1] :
			monthDiff = int(now[1])-int(fromDate[1])
		else:
			monthDiff = int(fromDate[1])-int(now[1])
		dayDiff = int(fromDate[2])-int(now[2])
		
		if (yearDiff < 1 and yearDiff >= 0) and monthDiff < 3 and (yearDiff !=0 or monthDiff !=0 or dayDiff !=0):
			msg = f"<b>Dear {note[i].prefix}. {note[i]} </b> <br> Your membership is about to expire in {monthDiff} months and {dayDiff} days, please pay your membership fee. "
			frappe.sendmail(doc,note[i].email,msg,'Membership fee notice')

		elif yearDiff == 0 and monthDiff == 0 and dayDiff == 0 :
			msg = f"<b>Dear {note[i].prefix}. {note[i]} </b> <br> Your membership has been terminated, please pay your membership fee. "
			frappe.sendmail(doc,note[i].email,msg,'Membership fee notice')
	"""
