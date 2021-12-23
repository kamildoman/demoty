from django.db import models


class Demot(models.Model):
    title = models.CharField(max_length=30)
    subtitle = models.CharField(max_length=150, blank=True, null=True)
    image = models.ImageField(blank=True, null=True, default="cat.jpg")
    upvote = models.IntegerField(default=0)
    downvote = models.IntegerField(default=0)
    ips = models.JSONField(null=True, blank=True)

    def __str__(self) -> str:
        return self.title

