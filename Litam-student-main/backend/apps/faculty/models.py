from django.db import models
from django.conf import settings

class FacultyProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='faculty_profile')
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    qualification = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='faculty/', blank=True, null=True, default='faculty/default.png')

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"
