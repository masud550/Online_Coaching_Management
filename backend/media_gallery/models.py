from django.db import models

# Media Team model
class MediaPerson(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to="media_team/")

    def __str__(self):
        return self.name


# Gallery model
class GalleryItem(models.Model):
    ITEM_TYPES = (
        ('image', 'Image'),
        ('video', 'Video'),
    )
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=10, choices=ITEM_TYPES)
    file = models.FileField(upload_to="gallery/")   # image বা video
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
