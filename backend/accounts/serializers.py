from rest_framework import serializers
from .models import User, UserProfile


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    authority_level = serializers.CharField(default='Guest')


class UserSerializer(serializers.ModelSerializer):
    authority_level = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('email', 'authority_level')

    def get_authority_level(self, obj):
        profile = getattr(obj, 'profile', None)
        return profile.authority_level if profile else None
