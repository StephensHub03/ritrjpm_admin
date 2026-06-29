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
    HomepageConfig,
)


class HomepageConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageConfig
        fields = '__all__'


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

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if instance.thumbnail:
            request = self.context.get('request')
            if request is not None:
                rep['thumbnail_url'] = request.build_absolute_uri(instance.thumbnail.url)
            else:
                rep['thumbnail_url'] = instance.thumbnail.url
        return rep


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

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if instance.file:
            request = self.context.get('request')
            if request is not None:
                rep['file_url'] = request.build_absolute_uri(instance.file.url)
            else:
                rep['file_url'] = instance.file.url
        return rep


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ['resolved']
