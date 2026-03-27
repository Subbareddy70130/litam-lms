import os

urls_to_clear = [
    r"C:\Users\subba\Desktop\college website\backend\apps\faculty\urls.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\students\urls.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\courses\urls.py",
]

for f in urls_to_clear:
    if os.path.exists(f):
        with open(f, "w") as file:
            file.write("urlpatterns = []\n")
