# Generated by Django 2.1.4 on 2019-02-22 02:22

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('fs', '0004_auto_20190222_0422'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='date',
            field=models.DateField(default=django.utils.timezone.now, verbose_name='date'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='expiration_date',
            field=models.DateField(default=django.utils.timezone.now, verbose_name='expiration date'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='upload_date',
            field=models.DateField(default=django.utils.timezone.now, verbose_name='upload date'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='upload_time',
            field=models.TimeField(default=django.utils.timezone.now, verbose_name='upload time'),
            preserve_default=False,
        ),
    ]
