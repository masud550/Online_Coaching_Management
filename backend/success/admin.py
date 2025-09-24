from django.contrib import admin
from .models import SuccessStory

@admin.register(SuccessStory)
class SuccessStoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'course', 'created_at')
    readonly_fields = ('created_at',)
