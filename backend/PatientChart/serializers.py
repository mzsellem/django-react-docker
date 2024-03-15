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
    
    def to_internal_value(self, data):
        snake_case_data = {}
        for key, value in data.items():
            snake_case_key = ''.join(['_' + c.lower() if c.isupper() else c for c in key]).lstrip('_')
            snake_case_data[snake_case_key] = value
        return super().to_internal_value(snake_case_data)

class PatientSerializer(CamelCaseModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'