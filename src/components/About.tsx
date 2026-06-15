import { Users, Trophy, Award, Smartphone, CheckCircle } from 'lucide-react'

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-grid-container">
        {/* Left Content: Text & Highlights */}
        <div className="about-left-content">
          <div className="about-badge">RIT Profile</div>
          <h2>
            About <span className="green-text">Ramco Institute of Technology</span>
          </h2>
          <p className="about-lead">
            Ramco Institute of Technology was founded with a vision to impart high-quality
            engineering education at an affordable cost. Under the guidance of our
            Chairman Shri P.R. Venketrama Raja, we revolutionize the learning environment.
          </p>
          <p className="about-description">
            Being part of the Ramco Group, widely recognized for its qualitative and innovative
            brands globally, we set high standards. We empower students with accessible,
            yet world-class engineering education and prepare them for lifelong learning.
          </p>

          <div className="about-highlights">
            <div className="highlight-item">
              <CheckCircle size={18} className="highlight-icon" />
              <span>Industry-Aligned Curriculum</span>
            </div>
            <div className="highlight-item">
              <CheckCircle size={18} className="highlight-icon" />
              <span>State-of-the-Art Research Labs</span>
            </div>
          </div>
        </div>

        {/* Right Content: Modern Layered Image Frame */}
        <div className="about-right-content">
          <div className="layered-frame-wrapper">
            <div className="frame-bg-accent" />
            <div className="image-card">
              {/* SCRAPED IMAGE MATCHED: rit.JPG | Campus main building photo */}
              <img src="/rit.JPG" alt="Ramco Institute of Technology Campus" className="about-campus-image" />
              <div className="floating-stats-card">
                <Trophy className="stats-icon" size={20} />
                <div>
                  <div className="stats-num">ESTD</div>
                  <div className="stats-label">2013</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Modern Action Cards */}
      <div className="about-cards-grid">
        <div className="about-feature-card card-navy">
          <div className="card-icon-wrapper">
            <Users size={26} strokeWidth={1.5} />
          </div>
          <h3>MoUs</h3>
          <p>Industry Partnerships</p>
        </div>
        <div className="about-feature-card card-green">
          <div className="card-icon-wrapper">
            <Trophy size={26} strokeWidth={1.5} />
          </div>
          <h3>Clubs & NSS</h3>
          <p>Student Communities</p>
        </div>
        <div className="about-feature-card card-navy">
          <div className="card-icon-wrapper">
            <Award size={26} strokeWidth={1.5} />
          </div>
          <h3>Certification</h3>
          <p>ISO & Quality Standards</p>
        </div>
        <div className="about-feature-card card-green">
          <div className="card-icon-wrapper">
            <Smartphone size={26} strokeWidth={1.5} />
          </div>
          <h3>EDC/NISP</h3>
          <p>Innovation & Incubation</p>
        </div>
      </div>
    </section>
  )
}
