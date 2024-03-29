# Generated by Django 5.0.3 on 2024-03-06 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PatientChart', '0002_alter_patients_patientbirthdate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_name', models.CharField(max_length=100)),
                ('first_name', models.CharField(max_length=100)),
                ('age', models.IntegerField()),
                ('diagnosis', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.DeleteModel(
            name='Patients',
        ),
    ]
