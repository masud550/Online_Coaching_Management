from django.contrib import admin
from .models import SuccessStory, Achievement


class AchievementInline(admin.TabularInline):
    model = Achievement
    extra = 1


@admin.register(SuccessStory)
class SuccessStoryAdmin(admin.ModelAdmin):
    list_display = ("name", "course", "created_at")
    readonly_fields = ("created_at",)
    inlines = [AchievementInline]
