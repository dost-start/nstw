from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from django.core.cache import cache
from rest_framework import status



class AccountsAPITest(TestCase):
	def setUp(self):
		self.client = APIClient()
		cache.clear()

	def test_register_and_jwt_and_me(self):
		# Register
		url = reverse('api_register')
		registration_data = {
			'email': 'a@example.com',
			'password': 'pass1234',
			'full_name': 'Test User',
			'authority_level': 'User',
			'contact_number': '1234567890',
			'date_of_birth': '2000-01-01',
			'address': 'Test Address'
		}
		resp = self.client.post(url, registration_data, format='json')
		self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

		# Approve user
		from accounts.models import UserProfile
		profile = UserProfile.objects.get(user__email='a@example.com')
		profile.status = 'approved'
		profile.save()

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

	def test_login_requires_approval(self):
		# Register user
		register_url = reverse('api_register')
		resp = self.client.post(register_url, {
			'email': 'test_approval@example.com',
			'password': 'testpass123',
			'full_name': 'Test User',
			'authority_level': 'User',
			'contact_number': '1234567890',
			'date_of_birth': '2000-01-01',
			'address': 'Test Address'
		}, format='json')
		self.assertEqual(resp.status_code, 201)
		# Try login (should fail)
		login_url = reverse('api_login')
		resp = self.client.post(login_url, {
			'email': 'test_approval@example.com',
			'password': 'testpass123'
		}, format='json')
		self.assertEqual(resp.status_code, 403)
		# Approve user
		from accounts.models import UserProfile
		profile = UserProfile.objects.get(user__email='test_approval@example.com')
		profile.status = 'approved'
		profile.save()
		# Try login again (should succeed)
		resp = self.client.post(login_url, {
			'email': 'test_approval@example.com',
			'password': 'testpass123'
		}, format='json')
		self.assertEqual(resp.status_code, 200)

	def test_lgu_admin_can_list_and_approve_users(self):
		# Register a pending user
		reg_data = {
			'email': 'pending@example.com',
			'password': 'testpass123',
			'full_name': 'Pending User',
			'authority_level': 'User',
			'contact_number': '1234567890',
			'date_of_birth': '2000-01-01',
			'address': 'Test Address'
		}
		self.client.post(reverse('api_register'), reg_data, format='json')

		# Create and login as LGU admin
		from accounts.models import User, UserProfile
		admin = User.objects.create_user(email='admin@example.com', password='adminpass')
		# Create profile for admin user
		from django.core.exceptions import ObjectDoesNotExist
		try:
			admin_profile = UserProfile.objects.get(user=admin)
		except ObjectDoesNotExist:
			admin_profile = UserProfile.objects.create(
				user=admin,
				full_name='LGU Admin',
				authority_level='LGU Administrator',
				contact_number='1234567890',
				date_of_birth='1980-01-01',
				address='Admin Address',
				status='approved'
			)
		else:
			admin_profile.full_name = 'LGU Admin'
			admin_profile.authority_level = 'LGU Administrator'
			admin_profile.contact_number = '1234567890'
			admin_profile.date_of_birth = '1980-01-01'
			admin_profile.address = 'Admin Address'
			admin_profile.status = 'approved'
			admin_profile.save()
		# Reload admin user to ensure userprofile is attached
		admin = User.objects.get(email='admin@example.com')
		assert hasattr(admin, 'profile'), 'Admin user does not have a profile!'
		# Obtain JWT for admin
		resp = self.client.post(reverse('token_obtain_pair'), {'email': 'admin@example.com', 'password': 'adminpass'}, format='json')
		self.assertEqual(resp.status_code, 200)
		access = resp.data['access']
		self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')

		# List pending users
		resp = self.client.get(reverse('pending_users'))
		self.assertEqual(resp.status_code, 200)
		emails = [u['email'] for u in resp.data]
		self.assertIn('pending@example.com', emails)

		# Approve the pending user
		from accounts.models import UserProfile
		pending_profile = UserProfile.objects.get(user__email='pending@example.com')
		url = reverse('user_status_update', args=[pending_profile.pk])
		resp = self.client.patch(url, {'status': 'approved'}, format='json')
		self.assertEqual(resp.status_code, 200)
		pending_profile.refresh_from_db()
		self.assertEqual(pending_profile.status, 'approved')


