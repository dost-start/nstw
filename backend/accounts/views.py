
# --- Imports ---
from rest_framework import generics, serializers, status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import UpdateAPIView
from django.contrib.auth import authenticate, login, logout
from .models import User, UserProfile
from .serializers import RegisterSerializer, UserSerializer
from .permissions import IsLGUAdministrator

# --- LGU Admin: List all pending users ---
class PendingUsersListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsLGUAdministrator]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(profile__status='pending')

# --- LGU Admin: Approve or reject a user ---
class UserStatusUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=[('approved', 'approved'), ('rejected', 'rejected')])

class UserStatusUpdateAPIView(UpdateAPIView):
    permission_classes = [IsAuthenticated, IsLGUAdministrator]
    serializer_class = UserStatusUpdateSerializer
    queryset = UserProfile.objects.all()
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile.status = serializer.validated_data['status']
        profile.save()
        return Response({'ok': True, 'user': profile.user.email, 'status': profile.status})


class RegisterAPIView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = RegisterSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		data = serializer.validated_data
		email = data['email']
		password = data['password']
		full_name = data.get('full_name')
		authority = data.get('authority_level')
		contact_number = data.get('contact_number')
		date_of_birth = data.get('date_of_birth')
		address = data.get('address')
		emergency_contact_name = data.get('emergency_contact_name')
		emergency_contact_number = data.get('emergency_contact_number')
		if User.objects.filter(email=email).exists():
			return Response({'error': 'email already registered'}, status=status.HTTP_400_BAD_REQUEST)
		user = User.objects.create_user(
			email=email, 
			password=password
		)
		UserProfile.objects.create(
			user=user,
			full_name=full_name,
			authority_level=authority,
			contact_number=contact_number,
			date_of_birth=date_of_birth,
			address=address,
			emergency_contact_name=emergency_contact_name,
			emergency_contact_number=emergency_contact_number,
			status='pending',
		)
		# Generate JWT token for the new user
		refresh = RefreshToken.for_user(user)
		return Response({
			'ok': True,
			'email': user.email,
			'refresh': str(refresh),
			'access': str(refresh.access_token),
		}, status=status.HTTP_201_CREATED)


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
		# Check if user is approved
		try:
			if user.profile.status != 'approved':
				return Response({'error': 'Account not approved. Please wait for LGU verification.'}, status=status.HTTP_403_FORBIDDEN)
		except Exception:
			return Response({'error': 'User profile not found.'}, status=status.HTTP_400_BAD_REQUEST)
		login(request, user)
		return Response(UserSerializer(user).data)


class LogoutAPIView(APIView):
	# Require authenticated user for logout
	permission_classes = [IsAuthenticated]
	throttle_scope = 'login'

	def post(self, request):
		# Clear server-side session
		logout(request)
		return Response({'ok': True})


class MeAPIView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		return Response(UserSerializer(request.user).data)
