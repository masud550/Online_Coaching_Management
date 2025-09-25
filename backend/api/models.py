# backend/api/models.py
from django.db import models
from users.models import Student, Teacher, Institution
from django.contrib.postgres.fields import ArrayField 

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    fee = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='courses/', blank=True, null=True)
    teacher = models.ForeignKey(
        Teacher, on_delete=models.CASCADE, related_name='courses',
        null=True, blank=True
    )
    institution = models.ForeignKey(
        Institution, on_delete=models.CASCADE, null=True, blank=True,
        related_name='courses'
    )
    benefits = models.JSONField(default=list, blank=True)  # new
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at', 'id']

    def __str__(self):
        return self.title

class CourseVideo(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='videos')
    title = models.CharField(max_length=200)
    video = models.FileField(upload_to='course_videos/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.course.title} - {self.title}"

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="enrollments")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments")
    enrolled_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        owner = self.student.user.username if self.student.user else "(guest)"
        return f"{owner} - {self.course.title}"

class StudentStory(models.Model):
    student_name = models.CharField(max_length=100)
    message = models.TextField()
    image = models.ImageField(upload_to='stories/')
    year = models.CharField(max_length=20)

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
