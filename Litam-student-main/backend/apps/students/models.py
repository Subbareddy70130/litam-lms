from django.db import models
from django.conf import settings

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    roll_number = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)
    year = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.roll_number})"

class StudentResource(models.Model):
    RESOURCE_TYPES = (
        ('notes', 'Notes'),
        ('timetable', 'Timetable'),
        ('results', 'Results'),
    )
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='resources/')
    type = models.CharField(max_length=20, choices=RESOURCE_TYPES)

    def __str__(self):
        return self.title
