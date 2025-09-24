# backend/services/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'short_details', 'logo_preview')
    search_fields = ('title', 'details')
    list_per_page = 25
    readonly_fields = ('logo_preview',)

    def logo_preview(self, obj):
        if obj.logo and hasattr(obj.logo, 'url'):
            return format_html(
                '<img src="{}" style="width:70px; height:auto; border-radius:6px; object-fit:cover;" />',
                obj.logo.url
            )
        return "-"
    logo_preview.short_description = "Logo Preview"

    def short_details(self, obj):
        if not obj.details:
            return "-"
        return obj.details if len(obj.details) <= 60 else obj.details[:57] + "..."
    short_details.short_description = "Details"
