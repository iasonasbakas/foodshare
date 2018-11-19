from django.contrib import admin
from django.urls import include, path
from django.http.response import HttpResponseRedirect

urlpatterns = [
    path('', lambda r: HttpResponseRedirect('fs/')),
    path('fs/', include('fs.urls')),
    path('admin/', admin.site.urls),

]
