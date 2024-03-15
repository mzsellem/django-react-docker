from rest_framework import serializers
from .models import Patient

# override to_representation to convert snakecase to camelcase
class CamelCaseModelSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        camelcase_ret = {}
        for key, value in ret.items():
            camelcase_key = key.replace('_', ' ').title().replace(' ', '')
            camelcase_ret[camelcase_key[0].lower() + camelcase_key[1:]] = value
        return camelcase_ret

class PatientSerializer(CamelCaseModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Optionally, you can apply camelCase conversion here
        # if needed, but in this case, we don't modify the data
        return data