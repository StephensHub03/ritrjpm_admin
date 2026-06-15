import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './LoadingScreen.module.css'

interface LoadingScreenProps {
  onComplete: () => void
}

// Generate static config for background particles
const particleConfig = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 10 + 12,
  delay: Math.random() * -10,
}))

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2800 // 2.8 seconds progress animation
    const intervalTime = 30 // Update every 30ms
    const totalSteps = duration / intervalTime
    const stepIncrement = 100 / totalSteps

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepIncrement
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      const delay = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(delay)
    }
  }, [progress, onComplete])

  return (
    <motion.div
      className={styles.loadingScreen}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className={styles.vignette} />

      {/* Floating dust particles */}
      {particleConfig.map((p) => (
        <motion.div
          key={p.id}
          className={styles.particle}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -120, 0],
            opacity: [0, 0.35, 0.7, 0.35, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Top spacing to offset vertical centering slightly for aesthetics */}
      <div style={{ height: '2vh' }} />

      {/* Centered Content Block */}
      <div className={styles.centerContent}>
        {/* Logo with golden glowing backdrop */}
        <motion.div
          className={styles.logoWrapper}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          <div className={styles.logoGlow} />
          <motion.img
            src="/ritlogo.png"
            alt="Ramco Institute of Technology Logo"
            className={styles.logo}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          Ramco Institute of Technology
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
        >
          Excellence in Education
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          className={styles.divider}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </motion.div>

        {/* Loading Progress Section */}
        <motion.div
          className={styles.progressBarWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <div className={styles.loadingText}>Loading...</div>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.percentage}>{Math.round(progress)}%</div>
        </motion.div>
      </div>



    </motion.div>
  )
}
