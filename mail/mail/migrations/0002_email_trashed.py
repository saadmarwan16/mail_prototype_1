# Generated by Django 3.1.4 on 2020-12-31 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mail', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='trashed',
            field=models.BooleanField(default=False),
        ),
    ]
