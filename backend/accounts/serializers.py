from rest_framework import serializers
from .models import User, UserProfile


class RegisterSerializer(serializers.Serializer):
    #User
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    #UserProfile
    full_name = serializers.CharField(max_length=100, required=True)
    authority_level = serializers.CharField(max_length=20)
    contact_number = serializers.CharField(max_length=15)
    date_of_birth = serializers.DateField()
    address = serializers.CharField(max_length=100)
    emergency_contact_name = serializers.CharField(max_length=100, required=False, allow_blank=True)
    emergency_contact_number = serializers.CharField(max_length=15, required=False, allow_blank=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'authority_level')
