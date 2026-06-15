import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="hero-shell" id="home">
      <img src="/rit1.PNG" alt="RIT campus banner" className="hero-image" />
      <div className="hero-content">
        <motion.h1 
          initial={{ opacity: 0, y: 28 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          Empowering<br />
          <span>Future<br className="mobile-break" /> Engineers</span>
        </motion.h1>
        <motion.p 
          className="hero-copy" 
          initial={{ opacity: 0, y: 18 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
        >
          RIT is committed to providing quality education, innovative research and holistic development to build competent professionals for a better tomorrow.
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
    </section>
  )
}
