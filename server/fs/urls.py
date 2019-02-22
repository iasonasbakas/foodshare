from django.urls import re_path

from . import views

app_name = 'fs'

urlpatterns = [
    re_path(r'^posts/?$', views.PostList.as_view()),
    re_path(r'^posts/(?P<pk>\d+)/?$', views.PostDetail.as_view()),
    re_path(r'^posts/create/?$', views.PostList.as_view()),
    re_path(r'^register/?$', views.UserList.as_view()),
    re_path(r'^donations/create/?$', views.DonationList.as_view()),
    re_path(r'^donations/?$', views.DonationList.as_view()),
    re_path(r'^donations/(?P<pk>\d+)/?$', views.DonationDetail.as_view()),
    re_path(r'^users/?$', views.UserList.as_view()),
    re_path(r'^users/(?P<pk>\d+)/?$', views.UserDetail.as_view()),
    re_path(r'^products/?$', views.ProductList.as_view()),
    re_path(r'^products/(?P<pk>\d+)/?$', views.ProductDetail.as_view()),
]