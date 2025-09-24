# backend/home/models.py
from django.db import models

class Headline(models.Model):
    text = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class Banner(models.Model):
    image = models.ImageField(upload_to="banners/")
    title = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Banner {self.id}"

class Marketplace(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="marketplace/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Client(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="clients/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
