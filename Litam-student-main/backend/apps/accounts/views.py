from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from .serializers import StudentRegistrationSerializer, FacultyRegistrationSerializer, UserSerializer
from apps.students.models import StudentProfile
from apps.faculty.models import FacultyProfile
from apps.courses.models import Course

class StudentRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = StudentRegistrationSerializer

class FacultyRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = FacultyRegistrationSerializer


class LoginView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Debugging: Check if user exists at all
        user_exists = User.objects.filter(username=username).exists()
        if not user_exists:
            return Response({'error': f'User "{username}" does not exist.'}, status=400)

        user = authenticate(username=username, password=password)

        if user is not None:

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': user.role,
                'user': UserSerializer(user).data
            })

        return Response({'error': 'Incorrect password. Please try again.'}, status=400)

class AdminDashboardAPIView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        if request.user.role != 'ADMIN':
            return Response({'error': 'Not authorized'}, status=403)
        
        return Response({
            'total_students': StudentProfile.objects.count(),
            'total_faculty': FacultyProfile.objects.count(),
            'total_courses': Course.objects.count(),
            'recent_users': UserSerializer(User.objects.order_by('-date_joined')[:5], many=True).data
        })
