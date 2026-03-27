import urllib.request
import ssl
import os

url = 'https://litam.in/newsite/wp-content/uploads/2021/04/Litam-Logo.png'
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

img_path = r"C:\Users\subba\Desktop\college website\frontend\public\images\litam-logo.png"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx) as r, open(img_path, 'wb') as f:
        f.write(r.read())
    print("Downloaded logo.")
except Exception as e:
    print(f"Error: {e}")
