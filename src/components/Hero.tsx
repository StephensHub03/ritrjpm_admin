import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCMS } from './CMSContext'
import { Edit } from 'lucide-react'
import { EditHeroModal } from './CMSModals'

export default function Hero() {
  const { homepageConfig, isAuthenticated } = useCMS()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const titleParts = homepageConfig.hero_title.replace(/\\n/g, '\n').split('\n')

  return (
    <section className="hero-shell" id="home" style={{ position: 'relative' }}>
      {isAuthenticated && (
        <button 
          className="section-edit-btn hero-edit-btn" 
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
            color: '#061846',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Edit size={14} /> Edit Hero
        </button>
      )}

      <img src={homepageConfig.hero_image_url} alt="RIT campus banner" className="hero-image" />
      <div className="hero-content">
        <motion.h1 
          initial={{ opacity: 0, y: 28 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          {titleParts[0]}
          {titleParts.length > 1 && (
            <>
              <br />
              <span style={{ whiteSpace: 'pre-line' }}>{titleParts.slice(1).join('\n')}</span>
            </>
          )}
        </motion.h1>
        <motion.p 
          className="hero-copy" 
          initial={{ opacity: 0, y: 18 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
        >
          {homepageConfig.hero_subtitle}
        </motion.p>
      </div>

      <aside className="accreditation-card" aria-label="Accreditations">
        <strong>NAAC</strong>
        <span>A+</span>
        <small>GRADE</small>
        <hr />
        <strong>NBA</strong>
        <small>ACCREDITED</small>
        <hr />
        <strong>AUTONOMOUS</strong>
        <small>INSTITUTION</small>
      </aside>
      {isEditOpen && <EditHeroModal onClose={() => setIsEditOpen(false)} />}
    </section>
  )
}

