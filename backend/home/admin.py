# backend/home/admin.py
from django.contrib import admin
from .models import Headline, Banner, Marketplace, Client

@admin.register(Headline)
class HeadlineAdmin(admin.ModelAdmin):
    list_display = ['text', 'created_at']

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'created_at']

@admin.register(Marketplace)
class MarketplaceAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name']
