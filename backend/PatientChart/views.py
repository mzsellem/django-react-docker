from django.shortcuts import render
from rest_framework import viewsets
from .serializer import PatientSerializer
from . models import Patient
from . serializer import *
from rest_framework.response import Response

# Create your views here.
class PatientView(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()