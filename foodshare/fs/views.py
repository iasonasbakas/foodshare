from django.shortcuts import render, get_object_or_404

from django.urls import reverse
from django.utils import timezone
from django.http.response import HttpResponseRedirect

from .models import Post, User, Rating, Donation, Product

def index(request):
    latest_posts = Post.objects.order_by('-upload_date')[:]
    context = {'latest_posts': latest_posts}
    return render(request, 'fs/index.html', context)

def post(request, post_id):
	post = get_object_or_404(Post, pk=post_id)
	return render(request, 'fs/post.html', {'post': post})

def user(request, user_id):
	user = get_object_or_404(User, pk=user_id)
	return render(request, 'fs/user.html', {'user': user})

def product(request, product_id):
	product = get_object_or_404(Product, pk=product_id)
	return render(request, 'fs/product.html', {'product': product})