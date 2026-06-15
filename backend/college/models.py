from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Department(TimeStampedModel):
    name = models.CharField(max_length=140)
    slug = models.SlugField(unique=True)
    overview = models.TextField()
    vision = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    labs = models.JSONField(default=list, blank=True)
    curriculum_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.name


class Faculty(TimeStampedModel):
    department = models.ForeignKey(Department, related_name='faculty', on_delete=models.CASCADE)
    name = models.CharField(max_length=140)
    designation = models.CharField(max_length=140)
    bio = models.TextField(blank=True)
    photo_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.name


class News(TimeStampedModel):
    title = models.CharField(max_length=180)
    slug = models.SlugField(unique=True)
    summary = models.TextField()
    body = models.TextField()
    published_at = models.DateTimeField()
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-published_at']

    def __str__(self) -> str:
        return self.title


class Event(TimeStampedModel):
    title = models.CharField(max_length=180)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=180, blank=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['starts_at']

    def __str__(self) -> str:
        return self.title


class Recruiter(TimeStampedModel):
    name = models.CharField(max_length=120)
    logo_url = models.URLField(blank=True)
    website = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.name


class Placement(TimeStampedModel):
    year = models.PositiveIntegerField()
    placement_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    highest_package_lpa = models.DecimalField(max_digits=6, decimal_places=2)
    average_package_lpa = models.DecimalField(max_digits=6, decimal_places=2)
    recruiters = models.ManyToManyField(Recruiter, blank=True)

    class Meta:
        ordering = ['-year']

    def __str__(self) -> str:
        return f'Placement {self.year}'


class GalleryItem(TimeStampedModel):
    title = models.CharField(max_length=160)
    image_url = models.URLField()
    category = models.CharField(max_length=80, blank=True)
    featured = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title


class Announcement(TimeStampedModel):
    title = models.CharField(max_length=160)
    message = models.TextField()
    active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title


class Testimonial(TimeStampedModel):
    name = models.CharField(max_length=140)
    role = models.CharField(max_length=140)
    quote = models.TextField()
    photo_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.name


class ContactMessage(TimeStampedModel):
    name = models.CharField(max_length=140)
    email = models.EmailField()
    subject = models.CharField(max_length=180)
    message = models.TextField()
    resolved = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.subject
