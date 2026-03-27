from rest_framework import serializers
from apps.courses.models import Course, Attendance, Mark, Timetable, Assignment, Submission
from apps.students.models import StudentProfile

class TimetableSerializer(serializers.ModelSerializer):
    course_name = serializers.ReadOnlyField(source='course.title')
    
    class Meta:
        model = Timetable
        fields = ['id', 'course', 'course_name', 'day', 'start_time', 'end_time', 'room_number']

class AssignmentSerializer(serializers.ModelSerializer):
    course_name = serializers.ReadOnlyField(source='course.title')
    submission_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Assignment
        fields = ['id', 'course', 'course_name', 'title', 'description', 'deadline', 'created_at', 'submission_count']

class SubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.user.first_name')
    student_roll = serializers.ReadOnlyField(source='student.roll_number')

    class Meta:
        model = Submission
        fields = ['id', 'assignment', 'student', 'student_name', 'student_roll', 'file', 'grade', 'feedback', 'submitted_at']

class AttendanceSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.user.first_name')
    
    class Meta:
        model = Attendance
        fields = ['id', 'student', 'student_name', 'course', 'date', 'status']

class MarkSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.user.first_name')
    
    class Meta:
        model = Mark
        fields = ['id', 'student', 'student_name', 'course', 'marks_obtained', 'total_marks', 'exam_name']
