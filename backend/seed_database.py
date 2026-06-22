import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rit_api.settings')
django.setup()

from django.contrib.auth import get_user_model
from college.models import HomepageConfig, News, Placement, Recruiter

User = get_user_model()

def seed():
    print("Seeding database...")

    # 1. Create Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@ritrjpm.ac.in', 'admin123')
        print("Superuser 'admin' created successfully (Password: admin123)")
    else:
        print("Superuser 'admin' already exists.")

    # 2. Homepage Configuration
    config, created = HomepageConfig.objects.get_or_create(id=1)
    
    config.hero_title = "Empowering\nFuture Engineers"
    config.hero_subtitle = "RIT is committed to providing quality education, innovative research and holistic development to build competent professionals for a better tomorrow."
    config.hero_image_url = "/rit1.PNG"

    config.about_badge = "RIT Profile"
    config.about_title = "About Ramco Institute of Technology"
    config.about_lead = "Ramco Institute of Technology was founded with a vision to impart high-quality engineering education at an affordable cost. Under the guidance of our Chairman Shri P.R. Venketrama Raja, we revolutionize the learning environment."
    config.about_description = "Being part of the Ramco Group, widely recognized for its qualitative and innovative brands globally, we set high standards. We empower students with accessible, yet world-class engineering education and prepare them for lifelong learning."
    config.about_image_url = "/rit.JPG"
    config.about_estd = "2013"

    config.vision_text = "To evolve as an Institute of international repute in offering high-quality technical education, Research and extension programmes in order to create knowledgeable, professionally competent and skilled Engineers and Technologists capable of working in multi-disciplinary environment to cater to the societal needs."
    config.mission_intro = "To accomplish its unique vision, the Institute has a far-reaching mission that aims:"
    config.mission_points = [
        "To offer higher education in Engineering and Technology with highest level of quality, Professionalism and ethical standards",
        "To equip the students with up-to-date knowledge in cutting-edge technologies, wisdom, creativity and passion for innovation, and life-long learning skills",
        "To constantly motivate and involve the students and faculty members in the education process for continuously improving their performance to achieve excellence."
    ]

    # Stats corresponding to heroStats
    config.stats = [
        {"label": "Students", "value": "5000+", "icon": "BookOpen", "tone": "pink"},
        {"label": "Qualified Faculty", "value": "300+", "icon": "GraduationCap", "tone": "orange"},
        {"label": "Placement Rate", "value": "92%", "icon": "TrendingUp", "tone": "green"},
        {"label": "Recruiters", "value": "250+", "icon": "Briefcase", "tone": "blue"},
        {"label": "Awards & Recognitions", "value": "120+", "icon": "Trophy", "tone": "purple"}
    ]

    # CTA Buttons
    config.cta_buttons = [
        {"text": "Explore Infrastructure", "link": "#gallery"},
        {"text": "Join Admissions", "link": "#admissions"}
    ]

    config.save()
    print("Homepage configuration seeded successfully.")

    # 3. Placement History (based on live scraped RIT stats)
    placement_data = [
        {"year": 2021, "percentage": 95.0, "highest": 10.0, "average": 3.8},
        {"year": 2022, "percentage": 97.0, "highest": 12.0, "average": 4.2},
        {"year": 2023, "percentage": 88.0, "highest": 15.0, "average": 4.5},
        {"year": 2024, "percentage": 90.0, "highest": 20.0, "average": 4.8},
        {"year": 2025, "percentage": 86.0, "highest": 48.0, "average": 5.2},
    ]

    for data in placement_data:
        p, p_created = Placement.objects.get_or_create(
            year=data["year"],
            defaults={
                "placement_percentage": data["percentage"],
                "highest_package_lpa": data["highest"],
                "average_package_lpa": data["average"]
            }
        )
        if p_created:
            print(f"Seeded placement data for year {data['year']}")

    # 4. Dummy News Items
    from django.utils import timezone
    from django.utils.text import slugify

    news_items = [
        {
            "title": "Admissions Open for 2025-26 Batch",
            "summary": "B.E. / B.Tech Admissions are now open. Apply now!",
            "body": "Ramco Institute of Technology announces that B.E. / B.Tech admissions are officially open for the academic year 2025-2026. Students can apply online through the official admission portal. We offer cutting edge specializations like AI & Data Science, Computer Science and Business Systems, Cyber Security and more.",
            "featured": True,
            "thumbnail_url": "/rit1.PNG"
        },
        {
            "title": "RIT Ranked Among Top Engineering Colleges",
            "summary": "RIT is proud to be recognized for academic excellence.",
            "body": "In the latest national engineering surveys, Ramco Institute of Technology has been ranked among the top emerging institutions in South India. Our consistent placements, high-caliber faculty, and state-of-the-art facilities like the AICTE IDEA Lab have contributed to this prestigious recognition.",
            "featured": True,
            "thumbnail_url": "/rit.JPG"
        },
        {
            "title": "National Technical Symposium - TechRIT 2025",
            "summary": "Annual national level technical symposium showcases engineering talent.",
            "body": "TechRIT 2025 brought together over 1000 participants from colleges nationwide. The symposium featured paper presentation contests, robotics design, coding sprints, and guest lectures from leading scientists.",
            "featured": False,
            "thumbnail_url": "/rit.JPG"
        }
    ]

    for item in news_items:
        slug = slugify(item["title"])
        n, n_created = News.objects.get_or_create(
            slug=slug,
            defaults={
                "title": item["title"],
                "summary": item["summary"],
                "body": item["body"],
                "featured": item["featured"],
                "thumbnail_url": item["thumbnail_url"],
                "published_at": timezone.now()
            }
        )
        if n_created:
            print(f"Seeded news item: '{item['title']}'")

    print("All seeding complete!")

if __name__ == '__main__':
    seed()
