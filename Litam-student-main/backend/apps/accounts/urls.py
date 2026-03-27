from django.urls import path
from .views import StudentRegisterView, FacultyRegisterView, LoginView, AdminDashboardAPIView

urlpatterns = [
    path('register/student/', StudentRegisterView.as_view(), name='register_student'),
    path('register/faculty/', FacultyRegisterView.as_view(), name='register_faculty'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin-dashboard/', AdminDashboardAPIView.as_view(), name='admin_dashboard'),
]
