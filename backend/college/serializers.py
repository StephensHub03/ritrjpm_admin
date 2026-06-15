from rest_framework import serializers

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


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = '__all__'


class PlacementSerializer(serializers.ModelSerializer):
    recruiters = RecruiterSerializer(many=True, read_only=True)
    recruiter_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Recruiter.objects.all(),
        source='recruiters',
        write_only=True,
        required=False,
    )

    class Meta:
        model = Placement
        fields = '__all__'


class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ['resolved']
