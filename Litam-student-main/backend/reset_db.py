import os
import shutil
import MySQLdb

apps_dir = r"C:\Users\subba\Desktop\college website\backend\apps"
for app in os.listdir(apps_dir):
    app_path = os.path.join(apps_dir, app)
    if not os.path.isdir(app_path): continue
    if app == "__pycache__": continue
    migrations_dir = os.path.join(apps_dir, app, "migrations")
    if os.path.exists(migrations_dir):
        shutil.rmtree(migrations_dir)
        print(f"Removed migrations for {app}")
    # Always recreate an empty migrations module so Django makemigrations works
    os.makedirs(migrations_dir, exist_ok=True)
    with open(os.path.join(migrations_dir, "__init__.py"), "w") as f:
        pass

print("All migrations cleared.")

try:
    db = MySQLdb.connect(host="localhost", user="root", passwd="root")
    cursor = db.cursor()
    cursor.execute("DROP DATABASE IF EXISTS college_db")
    cursor.execute("CREATE DATABASE college_db")
    db.close()
    print("MySQL Database `college_db` recreated successfully.")
except Exception as e:
    print(f"DB Error: {e}")
