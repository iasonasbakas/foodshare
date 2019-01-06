from django.contrib import admin

from .models import  Product, Post, Rating, Donation, Profile

admin.site.register(Profile)
admin.site.register(Product)
admin.site.register(Post)
admin.site.register(Rating)
admin.site.register(Donation)
