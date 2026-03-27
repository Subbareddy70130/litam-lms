import json
import urllib.request
import urllib.error
import re

data = json.dumps({"username":"test_user_938475", "email":"test938475@test.com", "password":"pw", "first_name":"f", "last_name":"l", "roll_number":"roll_938475", "department":"CSE", "year":1}).encode('utf-8')
req = urllib.request.Request("http://127.0.0.1:8000/api/auth/register/student/", data=data, headers={'Content-Type': 'application/json'})
try:
    urllib.request.urlopen(req)
    print("Success")
except urllib.error.HTTPError as e:
    html = e.read().decode('utf-8')
    with open('err.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Saved to err.html")
except Exception as e:
    print(e)
