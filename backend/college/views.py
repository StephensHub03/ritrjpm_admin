from rest_framework import permissions, viewsets

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
from .serializers import (
    AnnouncementSerializer,
    ContactMessageSerializer,
    DepartmentSerializer,
    EventSerializer,
    FacultySerializer,
    GalleryItemSerializer,
    NewsSerializer,
    PlacementSerializer,
    RecruiterSerializer,
    TestimonialSerializer,
)


class AdminWriteViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DepartmentViewSet(AdminWriteViewSet):
    queryset = Department.objects.prefetch_related('faculty').all()
    serializer_class = DepartmentSerializer
    lookup_field = 'slug'


class FacultyViewSet(AdminWriteViewSet):
    queryset = Faculty.objects.select_related('department').all()
    serializer_class = FacultySerializer


class NewsViewSet(AdminWriteViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    lookup_field = 'slug'


class EventViewSet(AdminWriteViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class RecruiterViewSet(AdminWriteViewSet):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer


class PlacementViewSet(AdminWriteViewSet):
    queryset = Placement.objects.prefetch_related('recruiters').all()
    serializer_class = PlacementSerializer


class GalleryItemViewSet(AdminWriteViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer


class AnnouncementViewSet(AdminWriteViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer


class TestimonialViewSet(AdminWriteViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]
