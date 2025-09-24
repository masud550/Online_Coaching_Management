# backend/users/models.py
from django.db import models
from django.contrib.auth.models import User


class Institution(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="Default Institution")

    def __str__(self):
        return self.name

class Student(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL)
    student_id = models.CharField(max_length=20, unique=True)  # Admin assigns this
    full_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    education = models.CharField(max_length=100, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.student_id} - {self.full_name or 'Unassigned'}"


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100, default="Unknown Subject")
    institution = models.ForeignKey(
        Institution,
        related_name="teachers",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.subject}"
