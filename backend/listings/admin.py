from django.contrib import admin
from .models import Listing, Photo


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published', 'price', 'list_date', 'realtor')
    list_display_links = ('id', 'title')
    list_filter = ('is_published',)
    search_fields = ('title', 'description', 'address', 'city', 'state', 'zipcode', 'price')
    list_per_page = 25


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('listing', 'image')
