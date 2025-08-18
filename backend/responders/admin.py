from django.contrib import admin
from .models import EmergencyResponderArea, ResponderUnit, ResponderProfile, LGUProfile

admin.site.register(EmergencyResponderArea)
admin.site.register(ResponderUnit)
admin.site.register(ResponderProfile)
admin.site.register(LGUProfile)
