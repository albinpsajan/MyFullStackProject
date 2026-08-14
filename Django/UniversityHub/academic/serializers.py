from rest_framework import serializers
from .models import Department, Course, Student


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'code', 'credits', 'department', 'semester', 'syllabus']
        # You can use a nested serializer here if you want to show department details


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'email', 'courses', 'profile_picture']
