# backend/users/admin_forms.py
from django import forms
from .models import Student, Teacher, Institution

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['user', 'student_id', 'full_name', 'email', 'phone', 'education', 'age']

class TeacherForm(forms.ModelForm):
    class Meta:
        model = Teacher
        fields = ['user', 'subject', 'institution']

class InstitutionForm(forms.ModelForm):
    class Meta:
        model = Institution
        fields = ['user', 'name']
