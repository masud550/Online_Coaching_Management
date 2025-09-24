# backend/users/admin.py
from django.contrib import admin
from django.contrib.auth.models import User
from .models import Student, Teacher, Institution

# Hide default Django User (we manage through Student/Teacher/Institution)
admin.site.unregister(User)


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("student_id", "full_name", "get_username", "get_email", "phone", "education", "age")
    search_fields = ("student_id", "full_name", "email", "phone")

    def get_username(self, obj):
        return obj.user.username if obj.user else "(no user)"
    get_username.short_description = "Username"

    def get_email(self, obj):
        return obj.user.email if obj.user else "(no email)"
    get_email.short_description = "Email"


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ("get_username", "get_email", "subject", "institution")
    search_fields = ("user__username", "user__email", "subject")

    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = "Username"

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = "Email"


@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = ("name", "get_username", "get_email")
    search_fields = ("name", "user__username", "user__email")

    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = "Username"

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = "Email"
