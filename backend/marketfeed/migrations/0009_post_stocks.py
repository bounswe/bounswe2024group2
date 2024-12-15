# Generated by Django 4.2 on 2024-12-15 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketfeed', '0008_post_disliked_by_alter_post_liked_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='stocks',
            field=models.ManyToManyField(blank=True, to='marketfeed.stock', verbose_name='associated stocks'),
        ),
    ]
