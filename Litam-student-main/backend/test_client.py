import os
import django
import traceback

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.test import Client

c = Client()
try:
    response = c.post('/api/auth/register/student/', {
        "username": "otp_test_999", "email": "nnaidu8033@gmail.com", 
        "password": "pw", "first_name": "test", "last_name": "user", 
        "roll_number": "otp_roll_999", "department": "CSE", "year": 2026
    }, content_type='application/json')
    print("STATUS CODE:", response.status_code)
    try:
        print("JSON RESPONSE:", response.json())
    except Exception:
        print("HTML FRAGMENT:")
        print(response.content.decode('utf-8')[:500])
except Exception as e:
    print("CAUGHT EXCEPTION:")
    traceback.print_exc()
