# Generated by Django 4.0 on 2021-12-20 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='demot',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='demot',
            name='subtitle',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
