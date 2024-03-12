from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import PatientSerializer
from . models import Patient

# what we will see on the page we are trying to route to
def index(request):
    return HttpResponse("Hello, world. You're at the index page.")

def patients(request):
    return HttpResponse("Hello, you're at the patients page.")

class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()