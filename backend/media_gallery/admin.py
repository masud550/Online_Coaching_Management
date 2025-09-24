from django.contrib import admin
from .models import MediaPerson, GalleryItem

@admin.register(MediaPerson)
class MediaPersonAdmin(admin.ModelAdmin):
    list_display = ("name", "role")

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ("title", "type", "created_at")
    list_filter = ("type",)
