from django.urls import path

from . import views

app_name = 'fs'

urlpatterns = [
    path('', views.index, name='index'),
    path('posts/<int:post_id>/', views.post, name='post'),
    path('users/<int:user_id>/', views.user, name='user'),
]