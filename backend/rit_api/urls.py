from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from college.views import (
    AnnouncementViewSet,
    UploadDeptFileView,
    SaveDeptSubpagesView,
    ContactMessageViewSet,
    DepartmentViewSet,
    EventViewSet,
    FacultyViewSet,
    GalleryItemViewSet,
    NewsViewSet,
    PlacementViewSet,
    RecruiterViewSet,
    TestimonialViewSet,
    HomepageConfigViewSet,
    AnalyticsViewSet,
)

router = DefaultRouter()
router.register('announcements', AnnouncementViewSet)
router.register('contacts', ContactMessageViewSet)
router.register('departments', DepartmentViewSet)
router.register('events', EventViewSet)
router.register('faculty', FacultyViewSet)
router.register('gallery', GalleryItemViewSet)
router.register('news', NewsViewSet)
router.register('placements', PlacementViewSet)
router.register('recruiters', RecruiterViewSet)
router.register('testimonials', TestimonialViewSet)
router.register('homepage-config', HomepageConfigViewSet)
router.register('analytics', AnalyticsViewSet, basename='analytics')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/upload-dept-file/', UploadDeptFileView.as_view(), name='upload_dept_file'),
    path('api/save-dept-subpages/', SaveDeptSubpagesView.as_view(), name='save_dept_subpages'),
    path('api/auth/', include('rest_framework.urls')),
    path('api/auth/token/', obtain_auth_token),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
