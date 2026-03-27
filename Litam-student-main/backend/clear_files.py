import os

files_to_clear = [
    r"C:\Users\subba\Desktop\college website\backend\apps\faculty\admin.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\faculty\views.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\faculty\serializers.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\students\admin.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\students\views.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\students\serializers.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\courses\admin.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\courses\views.py",
    r"C:\Users\subba\Desktop\college website\backend\apps\courses\serializers.py",
]

for f in files_to_clear:
    if os.path.exists(f):
        with open(f, "w") as file:
            file.write("# Cleared for new models\n")
