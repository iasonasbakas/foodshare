from django.db import models

class User(models.Model):
	name = models.CharField(max_length=15)
	surname = models.CharField(max_length=15)
	email = models.EmailField()
	username = models.CharField(max_length=25)
	password = models.CharField(max_length=25)
	location = models.CharField(max_length=25)
	photo = models.ImageField()
	
	def __str__(self):
        	return "%s %s %s %s %s %s %s" % (self.name, self.surname, self.email, self.username, self.password, self.location, self.photo)

class Product(models.Model):
	name = models.CharField(max_length=15)
	description = models.CharField(max_length=100)
	price = models.FloatField()

	def __str__(self):
        	return "%s %s %s" % (self.name, self.description, self.price)


class Post(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	description = models.CharField(max_length=100)
	location = models.CharField(max_length=100)
	upload_date = models.DateField('upload_date')
	time = models.TimeField(auto_now_add=True)
	expiration_date = models.DateField('expiration_date')
	product_photo = models.ImageField(null=True)


	def __str__(self):
        	return "%s %s %s %s %s %s %s %s" % (self.user, self.product, self.description, self.location, self.upload_date, self.time, self.expiration_date, self.product_photo)


class Donation(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	name = models.CharField(max_length=15, null=True)
	amount = models.FloatField()
	date = models.DateField(auto_now_add=True)
	time = models.TimeField(auto_now_add=True)
	donation_type = models.BooleanField()
	duration = models.IntegerField()
	message = models.CharField(max_length=100)

	"""def __str__(self):
        	return "%s %s %s %s %s %s %s %s" % (self.user, self.name, self.amount, self.date, self.time, self.donation_type, self.duration, self.message)"""


class Rating(models.Model):
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	rating = models.IntegerField()
	description = models.CharField(max_length=100)

	"""def __str__(self):
        	return "%s %s %s" % (self.post, self.rating, self.description)"""


	
