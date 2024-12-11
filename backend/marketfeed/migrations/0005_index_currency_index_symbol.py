# Generated by Django 4.2 on 2024-12-06 20:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('marketfeed', '0004_index'),
    ]

    operations = [
        migrations.AddField(
            model_name='index',
            name='currency',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='marketfeed.currency'),
        ),
        migrations.AddField(
            model_name='index',
            name='symbol',
            field=models.CharField(max_length=250, null=True, unique=True),
        ),
    ]