from rest_framework import generics, status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Course, CourseVideo, StudentStory, Contact, Enrollment
from .serializers import (
    CourseSerializer,
    CourseVideoSerializer,
    StudentStorySerializer,
    ContactSerializer,
    EnrollmentSerializer,
)
from users.models import Student


# ---------------- Enroll in a Course ----------------
class EnrollCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            return Response({"error": "Student profile not found."}, status=400)

        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response({"error": "Course not found."}, status=404)

        enrollment, created = Enrollment.objects.get_or_create(student=student, course=course)
        if not created:
            return Response({"message": "Already enrolled."}, status=200)
        return Response({"message": "Enrolled successfully!"}, status=201)


# ---------------- Course List ----------------
class CourseListView(ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


# ---------------- Course Detail ----------------
class CourseDetailView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # lookup_field = "pk"  # Not needed, pk is default


# ---------------- Course Videos (only for enrolled students) ----------------
class CourseVideoListView(ListAPIView):
    serializer_class = CourseVideoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs["pk"]
        try:
            student = Student.objects.get(user=self.request.user)
        except Student.DoesNotExist:
            raise ValidationError("Only students can access course videos.")

        if not Enrollment.objects.filter(student=student, course_id=pk).exists():
            raise ValidationError("You are not enrolled in this course.")

        return CourseVideo.objects.filter(course_id=pk).order_by("order")

# ---------------- Student Success Stories ----------------
class StudentStoryListView(generics.ListAPIView):
    queryset = StudentStory.objects.all()
    serializer_class = StudentStorySerializer


# ---------------- Contact ----------------
class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


# ---------------- Student Dashboard (Enrolled Courses) ----------------
class StudentDashboardView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            student = Student.objects.get(user=user)
        except Student.DoesNotExist:
            return Enrollment.objects.none()
        return Enrollment.objects.filter(student=student)
