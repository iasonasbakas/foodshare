# Generated by Django 2.1.7 on 2019-02-25 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fs', '0005_auto_20190225_0639'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='upload_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='upload date'),
        ),
    ]