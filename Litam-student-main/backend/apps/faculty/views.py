from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import FacultyProfile
from apps.courses.models import Course, Attendance, Mark, Timetable, Assignment, Submission
from apps.students.models import StudentProfile
from .serializers import (
    AttendanceSerializer, MarkSerializer, AssignmentSerializer, 
    TimetableSerializer, SubmissionSerializer
)

class FacultyDashboardAPIView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        if request.user.role != 'FACULTY':
            return Response({'error': 'Not authorized'}, status=403)
        
        try:
            profile = FacultyProfile.objects.get(user=request.user)
            assigned_courses = Course.objects.filter(faculty=profile)
            students = StudentProfile.objects.filter(department=profile.department)
            
            return Response({
                'profile': {
                    'name': f"{request.user.first_name} {request.user.last_name}",
                    'department': profile.department,
                    'designation': profile.designation,
                    'employee_id': profile.employee_id,
                },
                'total_assigned_students': students.count(),
                'total_assigned_courses': assigned_courses.count(),
                'recent_students': [{
                    'roll_number': s.roll_number,
                    'name': f"{s.user.first_name} {s.user.last_name}",
                    'year': s.year
                } for s in students[:5]]
            })
        except FacultyProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=404)

class AttendanceAPIView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, course_id):
        students = StudentProfile.objects.filter(department=request.user.faculty_profile.department)
        return Response([{
            'id': s.id,
            'name': f"{s.user.first_name} {s.user.last_name}",
            'roll_number': s.roll_number
        } for s in students])

    def post(self, request, course_id):
        data = request.data # List of {student_id, status, date}
        course = Course.objects.get(id=course_id)
        for item in data:
            Attendance.objects.update_or_create(
                student_id=item['student_id'],
                course=course,
                date=item['date'],
                defaults={'status': item['status']}
            )
        return Response({'message': 'Attendance marked successfully'})

class MarksAPIView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = MarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AssignmentAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        profile = FacultyProfile.objects.get(user=self.request.user)
        return Assignment.objects.filter(course__faculty=profile)

class TimetableAPIView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = TimetableSerializer

    def get_queryset(self):
        profile = FacultyProfile.objects.get(user=self.request.user)
        return Timetable.objects.filter(course__faculty=profile)
