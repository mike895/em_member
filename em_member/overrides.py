import frappe

def clear_website_cache(path=None):
    frappe.clear_cache()
