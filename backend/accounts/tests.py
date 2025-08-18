from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from django.core.cache import cache
from rest_framework import status


class AccountsAPITest(TestCase):
	def setUp(self):
		self.client = APIClient()
		# Clear cache so throttling state does not leak between tests
		cache.clear()

	def test_register_and_jwt_and_me(self):
		# Register
		url = reverse('api_register')
		resp = self.client.post(url, {'email': 'a@example.com', 'password': 'pass1234'}, format='json')
		self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

		# Obtain token
		token_url = reverse('token_obtain_pair')
		resp = self.client.post(token_url, {'email': 'a@example.com', 'password': 'pass1234'}, format='json')
		self.assertEqual(resp.status_code, status.HTTP_200_OK)
		self.assertIn('access', resp.data)
		access = resp.data['access']

		# Access protected me endpoint with JWT
		me_url = reverse('api_me')
		self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
		resp = self.client.get(me_url)
		self.assertEqual(resp.status_code, status.HTTP_200_OK)
		self.assertEqual(resp.data.get('email'), 'a@example.com')

	def test_token_obtain_throttling(self):
		# Register a user first
		self.client.post(reverse('api_register'), {'email': 'b@example.com', 'password': 'pass1234'}, format='json')
		token_url = reverse('token_obtain_pair')
		# send more requests than the throttle allows (login scope = 5/min)
		responses = []
		for i in range(7):
			resp = self.client.post(token_url, {'email': 'b@example.com', 'password': 'pass1234'}, format='json')
			responses.append(resp)
		# The configured throttle for token_obtain is 10/min -> send 12 requests to exceed it
		for i in range(7, 12):
			resp = self.client.post(token_url, {'email': 'b@example.com', 'password': 'pass1234'}, format='json')
			responses.append(resp)
		# At least one response should be 429 Too Many Requests
		self.assertTrue(any(r.status_code == status.HTTP_429_TOO_MANY_REQUESTS for r in responses))

	def test_token_refresh_throttling(self):
		# Register and obtain refresh token
		self.client.post(reverse('api_register'), {'email': 'c@example.com', 'password': 'pass1234'}, format='json')
		obtain = self.client.post(reverse('token_obtain_pair'), {'email': 'c@example.com', 'password': 'pass1234'}, format='json')
		self.assertEqual(obtain.status_code, status.HTTP_200_OK)
		refresh = obtain.data.get('refresh')
		refresh_url = reverse('token_refresh')
		responses = []
		for i in range(12):
			resp = self.client.post(refresh_url, {'refresh': refresh}, format='json')
			responses.append(resp)
		# Expect at least one 429 due to token_refresh rate of 10/min
		self.assertTrue(any(r.status_code == status.HTTP_429_TOO_MANY_REQUESTS for r in responses))

	def test_login_session_and_me(self):
		# Register
		self.client.post(reverse('api_register'), {'email': 'd@example.com', 'password': 'pass1234'}, format='json')
		# Login via session-based login endpoint
		login_url = reverse('api_login')
		resp = self.client.post(login_url, {'email': 'd@example.com', 'password': 'pass1234'}, format='json')
		self.assertEqual(resp.status_code, status.HTTP_200_OK)
		# Me endpoint should return authenticated user using session cookie
		me_url = reverse('api_me')
		resp = self.client.get(me_url)
		self.assertEqual(resp.status_code, status.HTTP_200_OK)
		self.assertEqual(resp.data.get('email'), 'd@example.com')

	def test_logout_blacklists_refresh(self):
		# Register and obtain refresh token
		self.client.post(reverse('api_register'), {'email': 'e@example.com', 'password': 'pass1234'}, format='json')
		obtain = self.client.post(reverse('token_obtain_pair'), {'email': 'e@example.com', 'password': 'pass1234'}, format='json')
		self.assertEqual(obtain.status_code, status.HTTP_200_OK)
		refresh = obtain.data.get('refresh')
		access = obtain.data.get('access')
		# Authenticate the request (logout now requires authentication)
		self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
		# Logout by sending refresh token in body (current implementation supports this)
		logout_resp = self.client.post(reverse('api_logout'), {'refresh': refresh}, format='json')
		self.assertEqual(logout_resp.status_code, status.HTTP_200_OK)
		# Attempt to refresh using same token should now fail (blacklisted)
		refresh_resp = self.client.post(reverse('token_refresh'), {'refresh': refresh}, format='json')
		self.assertNotEqual(refresh_resp.status_code, status.HTTP_200_OK)


