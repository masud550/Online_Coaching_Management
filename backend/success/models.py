from django.db import models


class SuccessStory(models.Model):
    name = models.CharField(max_length=120)
    course = models.CharField(max_length=120, blank=True)
    story = models.TextField(blank=True)
    image = models.ImageField(upload_to="success_stories/", blank=True, null=True)
    testimonial = models.TextField(blank=True, null=True)  # extra testimonial
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Achievement(models.Model):
    success_story = models.ForeignKey(
        SuccessStory, related_name="achievements", on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.text[:50]} ({self.success_story.name})"
