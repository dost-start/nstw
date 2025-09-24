from rest_framework import serializers
from .models import User, UserProfile


class RegisterSerializer(serializers.Serializer):
    #User
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    #UserProfile
    full_name = serializers.CharField(max_length=100, required=True)
    authority_level = serializers.ChoiceField(choices=[
        ('Responder', 'Responder'),
        ('User', 'User'),
        ('LGU Administrator', 'LGU Administrator'),
    ])
    contact_number = serializers.CharField(max_length=15)
    date_of_birth = serializers.DateField()
    address = serializers.CharField(max_length=100)
    emergency_contact_name = serializers.CharField(max_length=100, required=False, allow_blank=True)
    emergency_contact_number = serializers.CharField(max_length=15, required=False, allow_blank=True)

class UserSerializer(serializers.ModelSerializer):
    authority_level = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('email', 'authority_level')

    def get_authority_level(self, obj):
        # Return authority_level from related UserProfile
        if hasattr(obj, 'profile'):
            return obj.profile.authority_level
        return None
