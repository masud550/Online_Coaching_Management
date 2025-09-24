# backend/api/admin.py
from django.contrib import admin
from .models import Contact, Course, CourseVideo, Enrollment
from users.models import Student

# Inline for Enrollment
class EnrollmentInline(admin.TabularInline):
    model = Enrollment
    extra = 1
    autocomplete_fields = ["student"] 

# Inline for CourseVideo
class CourseVideoInline(admin.TabularInline):
    model = CourseVideo
    extra = 0

# ----------------- Course Admin -----------------
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'fee', 'created_at')
    search_fields = ('title',)
    inlines = [CourseVideoInline, EnrollmentInline]
    exclude = ('teacher', 'institution')  

# ----------------- CourseVideo Admin -----------------
@admin.register(CourseVideo)
class CourseVideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'course', 'order')
    list_filter = ('course',)

# ----------------- Enrollment Admin -----------------
@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'enrolled_at')
    search_fields = ('student__student_id', 'course__title')
    list_filter = ('course',)

# ----------------- Contact Admin -----------------
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at')
    search_fields = ('name', 'email', 'phone')
