import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useCMS } from './CMSContext'
import { Edit } from 'lucide-react'
import { EditHeroModal } from './CMSModals'

export default function Hero() {
  const { homepageConfig, isAuthenticated } = useCMS()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const titleParts = homepageConfig.hero_title.replace(/\\n/g, '\n').split('\n')

  // Smooth scroll-driven parallax vertical translation for the background image
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 60])

  // Framer Motion variants for stagger-animating the founder item cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.35
      }
    }
  } as const

  const itemVariants = {
    hidden: { opacity: 0, x: -28 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring' as const, stiffness: 90, damping: 15 }
    }
  } as const

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

      <motion.img 
        src={homepageConfig.hero_image_url} 
        alt="RIT campus banner" 
        className="hero-image" 
        initial={{ scale: 1.15, opacity: 0.6 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        style={{ y }}
      />

      {/* Founders / Leadership Section */}
      <motion.div 
        className="hero-founders-absolute"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-founder-item" variants={itemVariants}>
          <img src="/manager1.jpg" alt="Shri P.R. Ramasubrahmaneya Rajha" className="hero-founder-photo" />
          <div className="hero-founder-info">
            <span className="hero-founder-name">Shri P.R. Ramasubrahmaneya Rajha</span>
            <span className="hero-founder-title">Founder Chairman</span>
          </div>
        </motion.div>
        <motion.div className="hero-founder-item" variants={itemVariants}>
          <img src="/manager2.jpg" alt="Shri P.R. Venketrama Raja" className="hero-founder-photo" />
          <div className="hero-founder-info">
            <span className="hero-founder-name">Shri P.R. Venketrama Raja</span>
            <span className="hero-founder-title">Chairman</span>
          </div>
        </motion.div>
      </motion.div>

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
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.2 }}
        >
          {homepageConfig.hero_subtitle}
        </motion.p>
      </div>

      <motion.aside 
        className="accreditation-card" 
        aria-label="Accreditations"
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 15, delay: 0.65 }}
      >
        <strong>NAAC</strong>
        <span>A+</span>
        <small>GRADE</small>
        <hr />
        <strong>NBA</strong>
        <small>ACCREDITED</small>
        <hr />
        <strong>AUTONOMOUS</strong>
        <small>INSTITUTION</small>
      </motion.aside>
      {isEditOpen && <EditHeroModal onClose={() => setIsEditOpen(false)} />}
    </section>
  )
}

