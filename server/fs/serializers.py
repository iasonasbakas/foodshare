from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ValidationError
import re

from .models import Post, User, Profile, Donation, Rating, Product


class PostSerializer(serializers.ModelSerializer):

    description = serializers.CharField(
        required=True,
    )

    location = serializers.CharField(
        required=True,
        min_length=3,
    )

    expiration_date = serializers.DateField(
        required=True
    )

    def create(self, validated_data):
        user = validated_data['user']
        product = validated_data['product']
        description = validated_data['description']
        location = validated_data['location']
        upload_date = validated_data['upload_date']
        time = validated_data['time']
        expiration_date = validated_data['expiration_date']
        post = Post(user=user, product=product, description=description, location=location, upload_date=upload_date,
                    time=time, expiration_date= expiration_date)
        post.save()
        return validated_data

    class Meta:
        model = Post
        fields = ('id', 'user', 'product', 'description',
        		  'location', 'upload_date', 'time', 'expiration_date', 'product_photo')

class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
        )
    username = serializers.CharField(
            min_length=6,
            validators=[UniqueValidator(queryset=User.objects.all())]
        )
    password = serializers.CharField(min_length=8)
    first_name = serializers.CharField(
        required=True,
        min_length=2
        )
    last_name = serializers.CharField(
        required=True,
        min_length=2
        )
    location = serializers.CharField(
        required=True,
        min_length=2
        )
    photo = serializers.CharField(
        required=True,
        min_length=2
        )

    def validate_username(self, value):
        data = self.get_initial()
        if not (re.match("^[a-zA-Z0-9_]*$", value)):
            raise ValidationError("Ensure this field doesn't contain any special characters")
        return value

    def validate_first_name(self, value):
        data = self.get_initial()
        if not (re.match("^[a-zA-Z0-9_]*$", value)):
            raise ValidationError("Ensure this field doesn't contain any special characters")
        return value

    def validate_last_name(self, value):
        data = self.get_initial()
        if not (re.match("^[a-zA-Z0-9_]*$", value)):
            raise ValidationError("Ensure this field doesn't contain any special characters")
        return value

    def validate_location(self, value):
        data = self.get_initial()
        if not (re.match("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$", value)):
            raise ValidationError("Ensure this field doesn't contain any special characters")
        return value

    def validate_photo(self, value):
        data = self.get_initial()
        if not (re.match("^[a-zA-Z0-9_]*$", value)):
            raise ValidationError("Ensure this field doesn't contain any special characters")
        return value

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email'].lower()
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        photo = validated_data['photo']
        location = validated_data['location']
        user = User(username=username, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        profile = Profile(user=user, location=location, photo=photo)
        user.save()
        return validated_data

    class Meta:
        model = Profile
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'location', 'photo')

class DonationSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = validated_data['user']
        name = validated_data['name']
        amount = validated_data['amount']
        duration = validated_data['duration']
        message = validated_data['message']
        donation = Donation(user=user, name=name, amount=amount, duration=duration, message=message)
        donation.save()
        return validated_data

    class Meta:
        model = Donation
        fields = ('id', 'user', 'name', 'amount', 'duration', 'message')

class RatingSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        post = validated_data['post']
        rating = validated_data['rating']
        description = validated_data['description']
        rating = Rating(post=post, rating=rating, description=description)
        rating.save()
        return validated_data

    class Meta:
        model = Rating
        fields = ('post', 'rating', 'description')

class ProductSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        name = validated_data['name']
        description = validated_data['description']
        price = validated_data['price']
        product = Product(name=name, description=description, price=price)
        product.save()
        return validated_data

    class Meta:
        model = Product
        fields = ('name', 'description', 'price')