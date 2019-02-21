from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Product(models.Model):
	name = models.CharField(max_length=15)
	description = models.CharField(max_length=100)
	price = models.FloatField()

class Post(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	description = models.CharField(max_length=100)
	location = models.CharField(max_length=100)
	upload_date = models.DateField('upload_date')
	time = models.TimeField('time')
	expiration_date = models.DateField('expiration_date')
	product_photo = models.ImageField(null=True)

class Donation(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	name = models.CharField(max_length=15, null=True)
	amount = models.FloatField()
	date = models.DateField(auto_now_add=True)
	time = models.TimeField(auto_now_add=True)
	duration = models.IntegerField()
	message = models.CharField(max_length=100)

class Rating(models.Model):
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	rating = models.IntegerField()
	description = models.CharField(max_length=100)
