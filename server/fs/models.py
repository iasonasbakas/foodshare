import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

def scramble_uploaded_filename(instance, filename):
	extension = filename.split(".")[-1]
	return "{}.{}".format(uuid.uuid4(), extension)

class Post(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
	product = models.CharField(max_length=100)
	description = models.CharField(max_length=100)
	location = models.CharField(max_length=100)
	upload_date = models.DateTimeField('upload date', auto_now=True)
	expiration_date = models.DateField('expiration date')
	image = models.ImageField(upload_to='img/', blank=True)
	avatar = models.ImageField(upload_to='img/', blank=True)

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
