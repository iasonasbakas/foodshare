from django.urls import re_path

from . import views

app_name = 'fs'

urlpatterns = [
    re_path('^posts/?$', views.PostList.as_view()),
    re_path(r'^posts/(?P<pk>\d+)/?$', views.PostDetail.as_view()),
]