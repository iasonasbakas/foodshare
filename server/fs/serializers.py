from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ValidationError
import re

from .models import Post, User, Donation, Rating, Product


class PostSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField(many=False)

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

    image = serializers.ImageField(
        required=True
    )

    def create(self, validated_data):
        user = validated_data['user']
        product = validated_data['product']
        description = validated_data['description']
        location = validated_data['location']
        upload_date = validated_data['upload_date']
        expiration_date = validated_data['expiration_date']
        image = validated_data['upload image']
        post = Post(user=user, product=product, description=description, location=location, upload_date=upload_date,
                     expiration_date= expiration_date, image=image)
        post.save()
        return validated_data

    class Meta:
        model = Post
        fields = ('id', 'user', 'product', 'description', 'location', 'upload_date', 'expiration_date', 'image')

class UserSerializer(serializers.ModelSerializer):

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

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email'].lower()
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        user = User(username=username, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return validated_data

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')

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
        fields = ('id', 'post', 'rating', 'description')

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
        fields = ('id', 'name', 'description', 'price')