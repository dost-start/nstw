from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .models import User, UserProfile
from .serializers import RegisterSerializer, UserSerializer


class RegisterAPIView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = RegisterSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		data = serializer.validated_data
		email = data['email']
		password = data['password']
		authority = data.get('authority_level', 'Guest')
		if User.objects.filter(email=email).exists():
			return Response({'error': 'email already registered'}, status=status.HTTP_400_BAD_REQUEST)
		user = User.objects.create_user(email=email, password=password)
		UserProfile.objects.create(user=user, authority_level=authority)
		return Response({'ok': True, 'email': user.email}, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
	permission_classes = [permissions.AllowAny]
	throttle_scope = 'login'

	def post(self, request):
		email = request.data.get('email')
		password = request.data.get('password')
		if not email or not password:
			return Response({'error': 'email and password required'}, status=status.HTTP_400_BAD_REQUEST)
		user = authenticate(request, username=email, password=password)
		if user is None:
			return Response({'error': 'invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
		login(request, user)
		return Response(UserSerializer(user).data)


class LogoutAPIView(APIView):
	# Require authenticated user for logout
	permission_classes = [IsAuthenticated]
	throttle_scope = 'login'

	def post(self, request):
		# Expect refresh token in request body
		refresh_token = request.data.get('refresh')
		if refresh_token:
			try:
				RefreshToken(refresh_token).blacklist()
			except Exception:
				pass
		# Clear server-side session
		logout(request)
		return Response({'ok': True})


class MeAPIView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		return Response(UserSerializer(request.user).data)
