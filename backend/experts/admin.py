from django.contrib import admin
from .models import Expert, Portfolio

class PortfolioInline(admin.TabularInline):
    model = Portfolio
    extra = 1

class ExpertAdmin(admin.ModelAdmin):
    list_display = ("name", "position")
    inlines = [PortfolioInline]

admin.site.register(Expert, ExpertAdmin)
