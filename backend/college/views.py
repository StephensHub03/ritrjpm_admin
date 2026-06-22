from rest_framework import permissions, viewsets, response

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
    HomepageConfig,
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
    HomepageConfigSerializer,
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


class HomepageConfigViewSet(viewsets.ModelViewSet):
    queryset = HomepageConfig.objects.all()
    serializer_class = HomepageConfigSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        config, created = HomepageConfig.objects.get_or_create(id=1)
        serializer = self.get_serializer(config)
        return response.Response(serializer.data)


class AnalyticsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        visitor_analytics = {
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            "page_views": [12000, 19000, 15000, 25000, 22000, 30000],
            "unique_visitors": [4000, 6000, 5500, 9000, 8000, 11000]
        }
        
        dept_stats = {
            "labels": ["CSE", "ECE", "EEE", "Mech", "Civil", "AI&DS", "CSBS", "IT"],
            "students": [480, 420, 240, 300, 180, 240, 120, 180],
            "faculty": [24, 22, 15, 18, 12, 12, 8, 10]
        }
        
        placements = Placement.objects.all().order_by('year')
        if placements.exists():
            placement_labels = [f"{p.year-1}-{str(p.year)[2:]}" for p in placements]
            placement_rates = [float(p.placement_percentage) for p in placements]
        else:
            placement_labels = ["2020-21", "2021-22", "2022-23", "2023-24", "2024-25"]
            placement_rates = [95, 97, 88, 90, 86]

        placement_stats = {
            "labels": placement_labels,
            "rates": placement_rates
        }

        event_attendance = {
            "labels": ["Symposium", "AI Workshop", "Sports Meet", "Hackathon", "IPR Seminar"],
            "attendance": [450, 120, 600, 85, 150]
        }

        downloads_count = {
            "labels": ["Brochure", "Curriculum", "Newsletter", "Application Form", "Calendar"],
            "counts": [1240, 850, 430, 980, 310]
        }

        gallery_views = {
            "labels": ["Campus", "Laboratories", "Sports", "Events", "Hostel"],
            "views": [5400, 3200, 1500, 4800, 1200]
        }

        return response.Response({
            "visitor_analytics": visitor_analytics,
            "dept_stats": dept_stats,
            "placement_stats": placement_stats,
            "event_attendance": event_attendance,
            "downloads_count": downloads_count,
            "gallery_views": gallery_views
        })

