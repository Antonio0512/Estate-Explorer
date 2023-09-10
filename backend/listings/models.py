from django.db import models
from django.utils.timezone import now

from realtors.models import Realtor


class Photo(models.Model):
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='photos/%Y/%m/%d/')


class Listing(models.Model):
    class SaleType(models.TextChoices):
        FOR_SALE = 'For Sale'
        FOR_RENT = 'For Rent'

    class HomeType(models.TextChoices):
        HOUSE = 'House'
        CONDO = 'Condo'
        TOWNHOUSE = 'Townhouse'

    realtor = models.ForeignKey(Realtor, on_delete=models.DO_NOTHING)
    slug = models.CharField(max_length=200, unique=True)
    title = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=15)
    description = models.TextField(blank=True)
    sale_type = models.CharField(max_length=50, choices=SaleType.choices, default=SaleType.FOR_SALE)
    price = models.PositiveIntegerField()
    bedrooms = models.PositiveIntegerField()
    bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
    home_type = models.CharField(max_length=50, choices=HomeType.choices, default=HomeType.HOUSE)
    sqft = models.PositiveIntegerField()
    open_house = models.BooleanField(default=False)
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/')
    photos_secondary = models.ManyToManyField(Photo, related_name='listings')
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)

    def __str__(self):
        return self.title
