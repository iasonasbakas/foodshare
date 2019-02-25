from django.contrib import admin

from .models import  Post, Rating, Donation

admin.site.register(Post)
admin.site.register(Rating)
admin.site.register(Donation)
