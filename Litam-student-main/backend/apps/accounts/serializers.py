from rest_framework import serializers
from .models import User
from apps.students.models import StudentProfile
from apps.faculty.models import FacultyProfile
from django.db import transaction
import logging

logger = logging.getLogger(__name__)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'first_name', 'last_name')

class StudentRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    roll_number = serializers.CharField(write_only=True)
    department = serializers.CharField(write_only=True)
    year = serializers.IntegerField(default=1, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'roll_number', 'department', 'year')

    def validate_roll_number(self, value):
        if StudentProfile.objects.filter(roll_number=value).exists():
            raise serializers.ValidationError("A student with this roll number already exists.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role='STUDENT'
        )
        StudentProfile.objects.create(
            user=user,
            roll_number=validated_data['roll_number'],
            department=validated_data['department'],
            year=validated_data.get('year', 1)
        )
        user.is_verified = True
        user.save()
        return user

class FacultyRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    department = serializers.CharField(write_only=True)
    designation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'department', 'designation')

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role='FACULTY'
        )
        FacultyProfile.objects.create(
            user=user,
            department=validated_data['department'],
            designation=validated_data['designation']
        )
        user.is_verified = True
        user.save()
        return user
