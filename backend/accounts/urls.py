from django.urls import path
from . import views
from .token_views import ScopedTokenObtainPairView, ScopedTokenRefreshView

urlpatterns = [
    path('register/', views.RegisterAPIView.as_view(), name='api_register'),
    path('login/', views.LoginAPIView.as_view(), name='api_login'),
    path('logout/', views.LogoutAPIView.as_view(), name='api_logout'),
    path('me/', views.MeAPIView.as_view(), name='api_me'),
    # JWT token endpoints (scoped throttles applied)
    path('token/', ScopedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', ScopedTokenRefreshView.as_view(), name='token_refresh'),
]
