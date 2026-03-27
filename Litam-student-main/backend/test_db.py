import MySQLdb

combinations = [
    ("root", ""),
    ("root", "root"),
    ("root", "password"),
    ("root", "1234"),
    ("root", "mysql")
]

for user, pwd in combinations:
    try:
        db = MySQLdb.connect(host="localhost", user=user, passwd=pwd)
        print(f"Success with {user} and password '{pwd}'")
        db.close()
        break
    except Exception as e:
        print(f"Failed {user} with '{pwd}' -> {e}")
