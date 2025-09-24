from django.db import models

class Expert(models.Model):
    name = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    image = models.ImageField(upload_to="experts/")
    qualification = models.TextField(blank=True, null=True)
    expertise = models.TextField(help_text="Comma separated skills")  
    facebook = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Portfolio(models.Model):
    expert = models.ForeignKey(
        Expert, related_name="portfolio", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} ({self.expert.name})"
