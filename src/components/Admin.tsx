import { Orbit } from 'lucide-react'

export default function Admin() {
  return (
    <section className="admin reveal-section" id="admissions">
      <div className="section-label">06 / CMS + Backend</div>
      <h2>Django REST Framework and PostgreSQL architecture for a secure maintainable site.</h2>
      <div className="admin-grid">
        {['Authentication', 'News', 'Departments', 'Placements', 'Gallery', 'Contact', 'Events', 'Testimonials'].map((api) => (
          <span key={api}><Orbit /> /api/{api.toLowerCase().replaceAll(' ', '-')}</span>
        ))}
      </div>
    </section>
  )
}
