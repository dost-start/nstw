from django.contrib import admin
from .models import EmergencyReport, ReportMedia, ResponseTimeLog

admin.site.register(EmergencyReport)
admin.site.register(ReportMedia)
admin.site.register(ResponseTimeLog)
