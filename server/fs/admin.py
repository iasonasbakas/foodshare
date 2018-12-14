from django.contrib import admin

from .models import User, Product, Post, Rating, Donation

admin.site.register(User)
admin.site.register(Product)
admin.site.register(Post)
admin.site.register(Rating)
admin.site.register(Donation)