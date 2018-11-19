from django.shortcuts import render, get_object_or_404
from .models import Post

def index(request):
	latest_posts = Post.objects.order_by('-date', 'description')[:]
	return render(request, 'fs/index.html', {'latest_posts': latest_posts})

def post(request, post_id):
	post = get_object_or_404(Post, pk=post_id)
	return render(request, 'fs/posts.html', {'post': post})

def profile(request, user_id):
	return render(request, 'fs/profile.html', {'profile': user_id})