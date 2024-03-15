from django.db import models

# Create your models here.
class Patient(models.Model):
    lastName=models.CharField(max_length=100)
    firstName=models.CharField(max_length=100)
    age=models.IntegerField()
    diagnosis=models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.lastName + " " + self.firstName
