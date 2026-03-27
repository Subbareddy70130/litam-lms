import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.accounts.models import User

username = 'Naidu'
password = 'Naidu@143'
email = 'nnaidu8033@gmail.com'

user, created = User.objects.get_or_create(username=username, defaults={'email': email, 'role': 'ADMIN', 'is_staff': True, 'is_superuser': True, 'is_verified': True})

if created:
    user.set_password(password)
    user.save()
    print(f"Admin user '{username}' created successfully.")
else:
    user.set_password(password)
    user.role = 'ADMIN'
    user.is_staff = True
    user.is_superuser = True
    user.is_verified = True
    user.save()
    print(f"Admin user '{username}' already existed; updated role and password.")
