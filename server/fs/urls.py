from django.urls import re_path

from . import views

app_name = 'fs'

urlpatterns = [
    re_path(r'^posts/?$', views.PostList.as_view()),
    re_path(r'^posts/(?P<pk>\d+)/?$', views.PostDetail.as_view()),
    re_path(r'^user/register/?$', views.ProfileCreate.as_view()),
    # re_path(r'^user/?$', views.UserList.as_view()),
]