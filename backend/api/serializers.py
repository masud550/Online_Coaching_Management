from rest_framework import serializers
from .models import Course, CourseVideo, Enrollment, Service, StudentStory, Contact
from users.models import Teacher, Institution

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'user']

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'name']

class CourseVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseVideo
        fields = ['id', 'title', 'video', 'order']

class CourseSerializer(serializers.ModelSerializer):
    videos = CourseVideoSerializer(many=True, read_only=True)
    image = serializers.ImageField(use_url=True)  

    class Meta:
        model = Course
        fields = ["id", "title", "description", "fee", "image", "videos"]
class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)  

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'enrolled_at']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'icon', 'detail']

class StudentStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentStory
        fields = ['id', 'student_name', 'message', 'image', 'year']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
