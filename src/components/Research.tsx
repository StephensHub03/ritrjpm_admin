import { useState } from 'react'
import { Eye, Target, Edit } from 'lucide-react'
import { useCMS } from './CMSContext'
import { EditVisionMissionModal } from './CMSModals'

export default function Research() {
  const { homepageConfig, isAuthenticated } = useCMS()
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <section className="immersive reveal-section" id="research" style={{ position: 'relative' }}>
      {isAuthenticated && (
        <button 
          className="section-edit-btn philosophy-edit-btn" 
          onClick={() => setIsEditOpen(true)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            padding: '8px 16px',
            color: '#fff',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <Edit size={14} /> Edit Vision & Mission
        </button>
      )}
      <div className="about-details">
        <h2>Vision & Mission</h2>
        
        <div className="vision-mission-container">
          <div className="philosophy-card vision-card">
            <div className="philosophy-card-header">
              <div className="philosophy-icon-wrapper">
                <Eye size={18} className="philosophy-icon" />
              </div>
              <h3>Vision</h3>
            </div>
            <p>{homepageConfig.vision_text}</p>
          </div>
          
          <div className="philosophy-card mission-card">
            <div className="philosophy-card-header">
              <div className="philosophy-icon-wrapper">
                <Target size={18} className="philosophy-icon" />
              </div>
              <h3>Mission</h3>
            </div>
            <p className="mission-intro">{homepageConfig.mission_intro}</p>
            <ul className="mission-list">
              {homepageConfig.mission_points.map((point, index) => (
                <li key={index}>
                  <span className="bullet-point"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="globe-stage" aria-label="Interactive rotating research globe">
        <div className="orbit-map">
          <span />
          <span />
          <span />
          <strong>RIT</strong>
        </div>
      </div>
      {isEditOpen && <EditVisionMissionModal onClose={() => setIsEditOpen(false)} />}
    </section>
  )
}
