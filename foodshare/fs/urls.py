from django.urls import path

from . import views

app_name = 'fs'

urlpatterns = [
    path('', views.index, name='index'),
    path('posts/<int:post_id>/', views.post, name='post'),
    path('posts/postform/', views.postform, name='postform'),
    path('posts/newpost/', views.newpost, name='newpost'),
    path('products/<int:product_id>/', views.product, name='product'),
    path('users/<int:user_id>/', views.user, name='user'),
]