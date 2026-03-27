from django.urls import path
from .views import StudentDashboardAPIView

urlpatterns = [
    path('dashboard/', StudentDashboardAPIView.as_view(), name='student-dashboard'),
]
