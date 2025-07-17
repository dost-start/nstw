from django.db import models
from responders.models import EmergencyResponderArea

class EmergencyHotline(models.Model):
    name = models.CharField(
        max_length=100,
        help_text="Name of the hotline (e.g., 'National Police', 'Local Fire Dept')."
    )
    phone_number = models.CharField(
        max_length=20,
        help_text="The emergency contact number."
    )
    is_national = models.BooleanField(
        default=False,
        help_text="True if this is a national hotline, False for local."
    )
    area = models.ForeignKey(
        EmergencyResponderArea,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="The specific area this local hotline serves (if not national)."
    )

    def __str__(self):
        return f"{self.name} - {self.phone_number}"

class PublicAnnouncement(models.Model):
    title = models.CharField(
        max_length=200,
        help_text="Title of the public announcement."
    )
    content = models.TextField(
        help_text="Full content of the announcement or news report."
    )
    published_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Date and time when the announcement was published."
    )
    area = models.ForeignKey(
        EmergencyResponderArea,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="The specific area this announcement is relevant to (if localized)."
    )

    def __str__(self):
        return self.title