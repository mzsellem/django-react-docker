# Generated by Django 5.0.3 on 2024-03-06 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PatientChart', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patients',
            name='PatientBirthdate',
            field=models.IntegerField(),
        ),
    ]
