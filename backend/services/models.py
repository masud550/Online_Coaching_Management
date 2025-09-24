from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=200)
    details = models.TextField()
    logo = models.ImageField(upload_to="services/")

    def __str__(self):
        return self.title
