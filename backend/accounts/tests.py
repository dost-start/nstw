from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status


class AccountsAPITest(TestCase):
	def setUp(self):
		self.client = APIClient()

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
