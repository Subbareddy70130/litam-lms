from django.urls import path
from .views import (
    FacultyDashboardAPIView, AttendanceAPIView, MarksAPIView, 
    AssignmentAPIView, TimetableAPIView
)

urlpatterns = [
    path('dashboard/', FacultyDashboardAPIView.as_view(), name='faculty-dashboard'),
    path('attendance/<int:course_id>/', AttendanceAPIView.as_view(), name='faculty-attendance'),
    path('marks/', MarksAPIView.as_view(), name='faculty-marks'),
    path('assignments/', AssignmentAPIView.as_view(), name='faculty-assignments'),
    path('timetable/', TimetableAPIView.as_view(), name='faculty-timetable'),
]
