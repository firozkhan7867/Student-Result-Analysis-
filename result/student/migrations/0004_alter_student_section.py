# Generated by Django 3.2.12 on 2022-08-25 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0003_auto_20220821_1354'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='section',
            field=models.IntegerField(blank=True, default=1),
        ),
    ]