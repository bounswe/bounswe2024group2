# Generated by Django 4.2 on 2024-12-10 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketfeed', '0006_merge_20241210_1341'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfoliostock',
            name='quantity',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
