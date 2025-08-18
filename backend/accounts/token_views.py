from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class ScopedTokenObtainPairView(TokenObtainPairView):
    throttle_scope = 'token_obtain'


class ScopedTokenRefreshView(TokenRefreshView):
    throttle_scope = 'token_refresh'
