from django.db import models
from accounts.models import UserProfile # Import UserProfile from the accounts app

class EmergencyResponderArea(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Name of the emergency responder area (e.g., 'District 1', 'City Proper')."
    )
    description = models.TextField(
        blank=True,
        help_text="Description of the area."
    )
    # Stores GeoJSON polygon coordinates as a JSON string for area boundaries.
    # Example: {"type": "Polygon", "coordinates": [[[lon1, lat1], [lon2, lat2], ...]]}
    polygon_coordinates = models.JSONField(
        blank=True,
        null=True,
        help_text="GeoJSON polygon coordinates defining the area boundary."
    )
    threshold_level = models.IntegerField(
        default=5,
        help_text="Number of reports in this area to trigger 'Bayanihan Act' (community response)."
    )

    def __str__(self):
        return self.name

class ResponderUnit(models.Model):
    UNIT_TYPE_CHOICES = [
        ('Fire', 'Fire Department'),
        ('Police', 'Police Department'),
        ('Medical', 'Medical/Ambulance'),
        ('Rescue', 'Rescue Team'),
        ('Other', 'Other'),
    ]
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Name of the responder unit (e.g., 'Unit Alpha', 'Fire Truck 1')."
    )
    unit_type = models.CharField(
        max_length=20,
        choices=UNIT_TYPE_CHOICES,
        help_text="Type of emergency response unit."
    )
    area_of_operation = models.ForeignKey(
        EmergencyResponderArea,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='responder_units',
        help_text="Primary area this unit operates in."
    )
    # Current real-time location of the unit (optional, for tracking)
    current_latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True,
        help_text="Current latitude of the responder unit."
    )
    current_longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        blank=True,
        null=True,
        help_text="Current longitude of the responder unit."
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Indicates if the unit is currently active/operational."
    )

    def __str__(self):
        return f"{self.name} ({self.unit_type})"

class ResponderProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='responder_profile')
    is_available = models.BooleanField(
        default=True,
        help_text="Indicates if the responder is currently available for dispatch."
    )
    responder_unit = models.ForeignKey(
        ResponderUnit,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='members',
        help_text="The responder unit this individual belongs to."
    )
    on_duty_area = models.ForeignKey(
        EmergencyResponderArea,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="The specific area the responder is currently on duty in."
    )

    def __str__(self):
        return f"Responder: {self.user_profile.user.username}"

class LGUProfile(models.Model):
    """
    Specific profile details for users with 'LGU' authority level.
    """
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='lgu_profile')
    department_name = models.CharField(
        max_length=100,
        help_text="Name of the Local Government Unit department (e.g., 'City Disaster Office')."
    )
    # Add other LGU specific fields if necessary

    def __str__(self: str) -> str:
        return f"LGU: {self.department_name} ({self.user_profile.user.username})"