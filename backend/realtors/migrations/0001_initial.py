# Generated by Django 4.2.5 on 2023-09-09 18:56

import datetime
from django.db import migrations, models
import realtors.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Realtor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('photo', models.ImageField(upload_to=realtors.models.generate_upload_path)),
                ('description', models.TextField(blank=True)),
                ('phone', models.CharField(max_length=20)),
                ('email', models.CharField(max_length=100)),
                ('top_seller', models.BooleanField(default=False)),
                ('date_hired', models.DateTimeField(blank=True, default=datetime.datetime.now)),
            ],
        ),
    ]
