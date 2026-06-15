# RIT Premium College Website

A cinematic official college website scaffold built with React 19, TypeScript, Vite, Tailwind CSS, shadcn-style source components, Framer Motion, GSAP, Lenis, React Three Fiber, tsParticles, Chart.js, and a Django REST Framework backend designed for PostgreSQL.

## Frontend

```bash
npm install
npm run dev
npm run build
```

The main experience lives in `src/App.tsx` and includes:

- Cinematic campus hero using a generated project-local visual asset
- Smooth Lenis scrolling and GSAP scroll-triggered reveals
- Framer Motion entrance, cursor-linked hero motion, and overlay navigation
- tsParticles hero layer with mouse repulsion
- React Three Fiber research globe
- Chart.js placement visualizations
- Department, gallery, CMS/API, admissions, and footer sections

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py makemigrations college
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
```

PostgreSQL connection settings are read from `backend/.env`.

API routes are exposed under `/api/` for announcements, contacts, departments, events, faculty, gallery, news, placements, recruiters, and testimonials. Authenticated admin users can write content through Django Admin or the DRF browsable API.

## Asset

The hero image was generated with the built-in image generation tool and copied into `src/assets/campus-hero.png` for project use.
