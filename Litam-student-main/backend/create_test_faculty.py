import os
import django
import sys

# Set up Django environment
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.accounts.models import User
from apps.faculty.models import FacultyProfile
from apps.courses.models import Course

def create_test_faculty():
    username = 'test_faculty'
    password = 'password123'
    email = 'faculty@example.com'
    
    if User.objects.filter(username=username).exists():
        print(f"User {username} already exists.")
        user = User.objects.get(username=username)
    else:
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name='Dr. Test',
            last_name='Faculty',
            role='FACULTY'
        )
        print(f"Created user {username}.")
    
    # Create FacultyProfile
    profile, created = FacultyProfile.objects.get_or_create(
        user=user,
        defaults={
            'department': 'Computer Science',
            'designation': 'Senior Professor',
            'employee_id': 'EMP001'
        }
    )
    if created:
        print("Created FacultyProfile.")
    else:
        print("FacultyProfile already exists.")

    # Create a test course
    course, created = Course.objects.get_or_create(
        title='Data Structures',
        defaults={
            'duration': '4 months',
            'eligibility': 'B.Tech',
            'faculty': profile
        }
    )
    if created:
        print(f"Created course {course.title} for faculty.")
    else:
        print(f"Course {course.title} already exists.")

if __name__ == '__main__':
    create_test_faculty()
