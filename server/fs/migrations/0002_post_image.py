# Generated by Django 2.1.7 on 2019-02-24 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, upload_to='img/'),
        ),
    ]
