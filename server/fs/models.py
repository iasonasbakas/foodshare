from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

class Product(models.Model):
	name = models.CharField(max_length=15)
	description = models.CharField(max_length=100)
	price = models.FloatField()

class Post(models.Model):
	user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user')
	product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product')
	description = models.CharField(max_length=100)
	location = models.CharField(max_length=100)
	upload_date = models.DateTimeField('upload date')
	expiration_date = models.DateField('expiration date')

class Donation(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	name = models.CharField(max_length=15, null=True)
	amount = models.FloatField()
	date = models.DateField('date')
	duration = models.IntegerField()
	message = models.CharField(max_length=100)

class Rating(models.Model):
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	rating = models.IntegerField()
	description = models.CharField(max_length=100)
