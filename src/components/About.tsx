import { useState } from 'react'
import { Users, Trophy, Award, Smartphone, CheckCircle, Edit } from 'lucide-react'
import TiltedCard from './TiltedCard'
import { useCMS } from './CMSContext'
import { EditAboutModal } from './CMSModals'

export default function About() {
  const { homepageConfig, isAuthenticated } = useCMS()
  const [isEditOpen, setIsEditOpen] = useState(false)

  const rawTitle = homepageConfig.about_title
  const highlightTerm = "Ramco Institute of Technology"
  const hasHighlight = rawTitle.includes(highlightTerm)
  
  let titleNode = <span>{rawTitle}</span>
  if (hasHighlight) {
    const parts = rawTitle.split(highlightTerm)
    titleNode = (
      <>
        {parts[0]}
        <span className="accent-gradient-text">{highlightTerm}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className="about-section" id="about" style={{ position: 'relative' }}>
      {isAuthenticated && (
        <button 
          className="section-edit-btn about-edit-btn" 
          onClick={() => setIsEditOpen(true)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(6, 24, 70, 0.08)',
            border: '1px solid rgba(6, 24, 70, 0.15)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            padding: '8px 16px',
            color: '#061846',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <Edit size={14} /> Edit About Section
        </button>
      )}
      <div className="about-grid-container">
        {/* Left Content: Text & Highlights */}
        <div className="about-left-content">
          <div className="about-badge">{homepageConfig.about_badge}</div>
          <h2>{titleNode}</h2>
          <p className="about-lead">{homepageConfig.about_lead}</p>
          <p className="about-description">{homepageConfig.about_description}</p>

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
            <TiltedCard
              imageSrc={homepageConfig.about_image_url}
              altText="Ramco Institute of Technology Campus"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={10}
              scaleOnHover={1.04}
              showTooltip={false}
              displayOverlayContent
              overlayContent={
                <div className="floating-stats-card" style={{ bottom: '16px', left: '16px', zIndex: 10, position: 'absolute' }}>
                  <Trophy className="stats-icon" size={20} />
                  <div>
                    <div className="stats-num">ESTD</div>
                    <div className="stats-label">{homepageConfig.about_estd}</div>
                  </div>
                </div>
              }
            />
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
        <div className="about-feature-card card-pink">
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
        <div className="about-feature-card card-pink">
          <div className="card-icon-wrapper">
            <Smartphone size={26} strokeWidth={1.5} />
          </div>
          <h3>EDC/NISP</h3>
          <p>Innovation & Incubation</p>
        </div>
      </div>
      {isEditOpen && <EditAboutModal onClose={() => setIsEditOpen(false)} />}
    </section>
  )
}
