DATABASES = {	
    'default': {	
        'ENGINE': 'django.db.backends.mysql',	
        'NAME': 'foodshare',	
        'USER': 'foodshare_user',	
        'PASSWORD': 'strongpassword',	
        'HOST': '127.0.0.1',	
        'OPTIONS': {	
            'isolation_level': 'read committed'	
        }	
    }	
}	

SECRET_KEY = 'x#vusi-2dt-6r&!_l93-wlrqw1_^pw1gvvpri$_$n5yy#0teej' 