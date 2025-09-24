# backend/users/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Student, Course, Enrollment 


class RegisterWithStudentIDSerializer(serializers.ModelSerializer):
    student_id = serializers.CharField(required=False, allow_blank=True)
    course = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'student_id', 'course']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id', None)
        course_name = validated_data.pop('course', None)
        password = validated_data.pop('password')

        # Create user
        user = User.objects.create_user(password=password, **validated_data)

        # Create or link Student
        if student_id:
            student, _ = Student.objects.get_or_create(student_id=student_id)
        else:
            student = Student.objects.create(student_id=f"AUTO-{user.id}")

        student.user = user
        student.save()

        # If course provided, auto enroll
        if course_name:
            try:
                course = Course.objects.get(title=course_name)
                Enrollment.objects.get_or_create(student=student, course=course)
            except Course.DoesNotExist:
                pass

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

