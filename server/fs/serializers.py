from rest_framework import serializers
from .models import Post, User

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'user', 'product', 'description',
        		  'location', 'upload_date', 'time', 'expiration_date', 'product_photo')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'surname', 'email,' 'username', 'password', 'location', 'photo')