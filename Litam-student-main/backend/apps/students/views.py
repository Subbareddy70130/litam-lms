from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import StudentProfile
from apps.courses.models import Mark, Attendance

class StudentDashboardAPIView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        if request.user.role != 'STUDENT':
            return Response({'error': 'Not authorized'}, status=403)
        
        try:
            profile = StudentProfile.objects.get(user=request.user)
            
            # Marks and Pass/Fail parsing logic
            marksObj = Mark.objects.filter(student=profile)
            marks_list = []
            passed_subjects = 0
            failed_subjects = 0
            
            for m in marksObj:
                # Calculate 40% passing criteria logically
                is_pass = float(m.marks_obtained) >= (float(m.total_marks) * 0.4)
                if is_pass: passed_subjects += 1
                else: failed_subjects += 1
                
                marks_list.append({
                    'course_title': m.course.title,
                    'exam_name': m.exam_name,
                    'marks_obtained': m.marks_obtained,
                    'total_marks': m.total_marks,
                    'is_pass': 'PASS' if is_pass else 'FAIL'
                })
            
            # Attendance metrics
            attendances = Attendance.objects.filter(student=profile)
            total_classes = attendances.count()
            present_classes = attendances.filter(status='Present').count()
            attendance_percentage = (present_classes / total_classes * 100) if total_classes > 0 else 0

            data = {
                'profile': {
                    'roll_number': profile.roll_number,
                    'department': profile.department,
                    'year': profile.year,
                },
                'academic_stats': {
                    'passed_subjects': passed_subjects,
                    'failed_subjects': failed_subjects,
                    'attendance_percentage': round(attendance_percentage, 2)
                },
                'marks': marks_list
            }
            return Response(data)
        except StudentProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=404)
