from django.db import models

class SuccessStory(models.Model):
    name = models.CharField(max_length=120)
    course = models.CharField(max_length=120, blank=True)
    story = models.TextField(blank=True)
    image = models.ImageField(upload_to="success_stories/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
