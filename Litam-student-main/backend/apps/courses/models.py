from django.db import models
from apps.students.models import StudentProfile
from apps.faculty.models import FacultyProfile

class Course(models.Model):
    title = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    eligibility = models.TextField()
    faculty = models.ForeignKey(FacultyProfile, on_delete=models.SET_NULL, null=True, related_name='courses')

    def __str__(self):
        return self.title

class Attendance(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='attendance')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=(('Present', 'Present'), ('Absent', 'Absent')))

    class Meta:
        unique_together = ('student', 'course', 'date')

class Mark(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='marks')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='marks')
    marks_obtained = models.DecimalField(max_digits=5, decimal_places=2)
    total_marks = models.DecimalField(max_digits=5, decimal_places=2, default=100)
    exam_name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('student', 'course', 'exam_name')

class Timetable(models.Model):
    DAYS_OF_WEEK = (
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday'),
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='timetables')
    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()
    room_number = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.course.title} - {self.day} ({self.start_time})"

class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    description = models.TextField()
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey('students.StudentProfile', on_delete=models.CASCADE, related_name='submissions')
    file = models.FileField(upload_to='assignments/submissions/')
    grade = models.CharField(max_length=10, blank=True, null=True)
    feedback = models.TextField(blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} - {self.assignment.title}"
