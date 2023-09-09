from datetime import datetime

from django.db import models


def generate_upload_path(instance, filename):
    today = datetime.now()
    return f'photos/{today.year}/{today.month}/{today.day}/{filename}'


class Realtor(models.Model):
    name = models.CharField(max_length=50)
    photo = models.ImageField(upload_to=generate_upload_path)
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    top_seller = models.BooleanField(default=False)
    date_hired = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.name
