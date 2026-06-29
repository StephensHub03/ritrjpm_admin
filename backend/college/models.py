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
    thumbnail = models.ImageField(upload_to='news_thumbnails/', blank=True, null=True)
    thumbnail_url = models.CharField(max_length=500, blank=True, default="")

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
    file = models.FileField(upload_to='announcements/', blank=True, null=True)

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


class HomepageConfig(TimeStampedModel):
    # Hero Section
    hero_title = models.CharField(max_length=255, default="Empowering\nFuture Engineers")
    hero_subtitle = models.TextField(default="RIT is committed to providing quality education, innovative research and holistic development to build competent professionals for a better tomorrow.")
    hero_image_url = models.CharField(max_length=500, default="/rit1.PNG")

    # College Overview
    about_badge = models.CharField(max_length=100, default="RIT Profile")
    about_title = models.CharField(max_length=255, default="About Ramco Institute of Technology")
    about_lead = models.TextField(default="Ramco Institute of Technology was founded with a vision to impart high-quality engineering education at an affordable cost. Under the guidance of our Chairman Shri P.R. Venketrama Raja, we revolutionize the learning environment.")
    about_description = models.TextField(default="Being part of the Ramco Group, widely recognized for its qualitative and innovative brands globally, we set high standards. We empower students with accessible, yet world-class engineering education and prepare them for lifelong learning.")
    about_image_url = models.CharField(max_length=500, default="/rit.JPG")
    about_estd = models.CharField(max_length=50, default="2013")

    # Vision & Mission
    vision_text = models.TextField(default="To evolve as an Institute of international repute in offering high-quality technical education, Research and extension programmes in order to create knowledgeable, professionally competent and skilled Engineers and Technologists capable of working in multi-disciplinary environment to cater to the societal needs.")
    mission_intro = models.TextField(default="To accomplish its unique vision, the Institute has a far-reaching mission that aims:")
    mission_points = models.JSONField(default=list, blank=True, help_text="List of mission points")

    # Statistics
    stats = models.JSONField(default=list, blank=True, help_text="List of stats objects")

    # Homepage Images
    homepage_images = models.JSONField(default=dict, blank=True, help_text="Dictionary of image keys and their URLs")

    # CTA Buttons
    cta_buttons = models.JSONField(default=list, blank=True, help_text="List of CTA buttons")

    def __str__(self) -> str:
        return "Homepage Configuration"

