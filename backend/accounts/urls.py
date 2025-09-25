
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', views.RegisterAPIView.as_view(), name='api_register'),
    # JWT Auth endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Optionally keep old login/logout endpoints for session auth
    path('login/', views.LoginAPIView.as_view(), name='api_login'),
    path('logout/', views.LogoutAPIView.as_view(), name='api_logout'),
    path('me/', views.MeAPIView.as_view(), name='api_me'),

    # LGU admin endpoints
    path('pending-users/', views.PendingUsersListAPIView.as_view(), name='pending_users'),
    path('user-status/<int:pk>/', views.UserStatusUpdateAPIView.as_view(), name='user_status_update'),

    # Password reset endpoints
    path('password-reset/request/', views.PasswordResetRequestAPIView.as_view(), name='password_reset_request'),
    path('password-reset/confirm/', views.PasswordResetConfirmAPIView.as_view(), name='password_reset_confirm'),

    # Email verification endpoints
    path('email-verification/request/', views.EmailVerificationRequestAPIView.as_view(), name='email_verification_request'),
    path('email-verification/confirm/', views.EmailVerificationConfirmAPIView.as_view(), name='email_verification_confirm'),
]
