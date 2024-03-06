from rest_framework import serializers
from . models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id','last_name', 'first_name', 'age', 'diagnosis']