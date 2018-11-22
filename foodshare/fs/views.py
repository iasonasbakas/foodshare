from django.shortcuts import render, get_object_or_404

from django.urls import reverse
from django.utils import timezone
from django.http.response import HttpResponseRedirect

from .models import Post, User, Rating, Donation, Product

def index(request):
    latest_posts = Post.objects.order_by('-upload_date')[:]
    allproducts = Product.objects.order_by('-name')[:]
    allusers = User.objects.order_by('-name')[:]
    context = {'latest_posts': latest_posts, 'allproducts': allproducts, 'allusers': allusers}
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

def postform(request):
	return render(request, 'fs/postform.html')

def newpost(request):

	post = Post()

	if request.method == 'POST':
		post.user_id = '1'
		post.product_id = '1'
		post.description = request.POST['description']
		post.location = request.POST['location']
		post.upload_date = timezone.now()
		post.time = timezone.now()
		post.expiration_date = request.POST['expiration_date']
		post.save()
		return HttpResponseRedirect(reverse('fs:index'))

