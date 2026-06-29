from django.conf import settings
from rest_framework import permissions, viewsets, response, status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
import json

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
    parser_classes = (MultiPartParser, FormParser, JSONParser)


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


class UploadDeptFileView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        file_obj = request.FILES.get('file')
        dept_code = request.data.get('deptCode')
        subpage_key = request.data.get('subpageKey')

        if not file_obj or not dept_code or not subpage_key:
            return response.Response({'error': 'file, deptCode, and subpageKey are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create directory public/uploads/departments/{deptCode}/{subpageKey}/
        # Make subpageKey safe for directories by replacing spaces and slashes
        safe_subpage_key = subpage_key.replace('/', '_').replace('\\', '_')
        target_dir = settings.BASE_DIR.parent / 'public' / 'uploads' / 'departments' / dept_code / safe_subpage_key
        target_dir.mkdir(parents=True, exist_ok=True)

        # Ensure safe filename
        safe_filename = file_obj.name.replace(' ', '_')
        file_path = target_dir / safe_filename
        
        with open(file_path, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)

        url = f'/uploads/departments/{dept_code}/{safe_subpage_key}/{safe_filename}'
        return response.Response({'url': url})


class SaveDeptSubpagesView(APIView):
    def put(self, request, format=None):
        data = request.data
        if not data:
            return response.Response({'error': 'No data provided.'}, status=status.HTTP_400_BAD_REQUEST)

        file_path = settings.BASE_DIR.parent / 'src' / 'data' / 'department_subpages.json'
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            return response.Response({'status': 'success'})
        except Exception as e:
            return response.Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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

