from django.urls import path
from .views import (
    CourseListView,
    CourseDetailView,
    CourseVideoListView,
    EnrollCourseView,
    StudentDashboardView,
    ServiceListView,
    StudentStoryListView,
    ContactCreateView,
)
from users.views import MeView

urlpatterns = [
    path("courses/", CourseListView.as_view(), name="course-list"),
    path("courses/<int:pk>/", CourseDetailView.as_view(), name="course-detail"),
    path("courses/<int:pk>/enroll/", EnrollCourseView.as_view(), name="enroll-course"),
    path("courses/<int:pk>/videos/", CourseVideoListView.as_view(), name="course-videos"),

    path("dashboard/student/", StudentDashboardView.as_view(), name="student-dashboard"),
    path("services/", ServiceListView.as_view(), name="service-list"),
    path("stories/", StudentStoryListView.as_view(), name="student-stories"),
    path("contact/", ContactCreateView.as_view(), name="contact-create"),
    path("me/", MeView.as_view(), name="me"),
]
