import urllib.request
import ssl
from html.parser import HTMLParser
import os
from urllib.parse import urljoin

url = 'https://litam.in/newsite/' # Added trailing slash for urljoin
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

class ImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.img_urls = []
    
    def handle_starttag(self, tag, attrs):
        if tag == 'img':
            for name, value in attrs:
                if name == 'src':
                    self.img_urls.append(value)

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req, context=ctx)
    html = response.read().decode('utf-8', errors='ignore')

    parser = ImageParser()
    parser.feed(html)

    img_dir = r"C:\Users\subba\Desktop\college website\frontend\public\images"
    os.makedirs(img_dir, exist_ok=True)

    print(f"Found {len(parser.img_urls)} image URLs")
    
    # Filter valid URLs
    valid_urls = []
    for src in parser.img_urls:
        if not src: continue
        img_url = urljoin(url, src)
        if img_url.startswith('http'):
            valid_urls.append(img_url)

    print(f"Filtering down to {len(valid_urls)} valid image URLs")
    count = 0
    # Let's try downloading up to 6 unique big images (ignore tiny icons or base64)
    # usually sliders or gallery images have jpg/png
    for img_url in valid_urls:
        if img_url.endswith('.svg') or img_url.endswith('.gif'):
            continue # ignore svg/icons
        try:
            img_name = os.path.basename(img_url.split('?')[0])
            if not img_name: img_name = f"image_{count}.jpg"
            img_path = os.path.join(img_dir, img_name)
            
            # Avoid overwriting and duplicate names
            if os.path.exists(img_path):
                img_name = f"dup_{count}_{img_name}"
                img_path = os.path.join(img_dir, img_name)

            req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, context=ctx) as r, open(img_path, 'wb') as f:
                data = r.read()
                # Skip tiny images
                if len(data) > 10240: # > 10KB
                    f.write(data)
                    print(f"Downloaded: {img_name}")
                    count += 1
            
            if count >= 6:
                break
        except Exception as e:
            print(f"Failed to download {img_url}: {e}")
            
except Exception as e:
    print(f"Error scraping master URL: {e}")
