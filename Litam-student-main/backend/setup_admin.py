import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.accounts.models import User

def create_admin():
    username = "Naidu"
    password = "Naidu@143"
    email = "admin@litam.in"

    if not User.objects.filter(username=username).exists():
        user = User.objects.create_superuser(
            username=username,
            password=password,
            email=email,
            first_name="Admin",
            last_name="Naidu",
            role='ADMIN',
            is_verified=True
        )
        print(f"Admin user '{username}' created successfully!")
    else:
        user = User.objects.get(username=username)
        user.set_password(password)
        user.role = 'ADMIN'
        user.is_verified = True
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print(f"Admin user '{username}' already exists. Password and roles updated.")

if __name__ == "__main__":
    create_admin()
