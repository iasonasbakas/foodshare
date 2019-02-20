from .models import Post, User, Profile, Donation, Product
from .serializers import PostSerializer, ProfileSerializer, DonationSerializer, ProductSerializer
from rest_framework import generics
from rest_framework.response import Response

from rest_framework import status
from rest_framework.views import exception_handler

from django.contrib.staticfiles import views

from rest_framework import permissions

def index(request, path=''):
    if (path.endswith('.js')):
        return views.serve(request, path)
    else:
        return views.serve(request, 'index.html')

def custom_exception_handler(exc, context):
 # Call REST framework's default exception handler first,
 # to get the standard error response.
 response = exception_handler(exc, context)

 # Now add the HTTP status code to the response.
 if response is not None:
     # Make sure the message gets in the "data" property
     # and the status in the "status" property.
     response = Response(data=str(response.data),
                         status=response.status_code)
 else:
     # Create a new Response from scratch.
     response = Response(data=str(exc), status=status.HTTP_400_BAD_REQUEST)

 return response

class PostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        product = self.request.query_params.get('product', None)
        if product is not None:
            queryset = queryset.filter(product__contains=product)
        return queryset

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class ProfileList(generics.ListCreateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class DonationList(generics.ListCreateAPIView):
    serializer_class = DonationSerializer
    queryset = Donation.objects.all()

class DonationDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DonationSerializer
    queryset = Donation.objects.all()
