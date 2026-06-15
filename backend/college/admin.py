from django.contrib import admin

from .models import (
    Announcement,
    ContactMessage,
    Department,
    Event,
    Faculty,
    GalleryItem,
    News,
    Placement,
    Recruiter,
    Testimonial,
)

admin.site.register(Announcement)
admin.site.register(ContactMessage)
admin.site.register(Department)
admin.site.register(Event)
admin.site.register(Faculty)
admin.site.register(GalleryItem)
admin.site.register(News)
admin.site.register(Placement)
admin.site.register(Recruiter)
admin.site.register(Testimonial)
