import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltedCardProps {
  imageSrc: string
  altText: string
  captionText?: string
  containerHeight?: React.CSSProperties['height']
  containerWidth?: React.CSSProperties['width']
  imageHeight?: React.CSSProperties['height']
  imageWidth?: React.CSSProperties['width']
  rotateAmplitude?: number
  scaleOnHover?: number
  showMobileWarning?: boolean
  showTooltip?: boolean
  displayOverlayContent?: boolean
  overlayContent?: React.ReactNode
}

export default function TiltedCard({
  imageSrc,
  altText,
  captionText,
  containerHeight = '300px',
  containerWidth = '300px',
  imageHeight = '100%',
  imageWidth = '100%',
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent,
}: TiltedCardProps) {
  const [hovered, setHovered] = useState(false)

  // Motion values for x/y mouse coordinate ratios relative to center (-0.5 to 0.5)
  const rotateXVal = useMotionValue(0)
  const rotateYVal = useMotionValue(0)

  // Spring configurations for smooth tilting physics
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }

  // Map x/y ratio values to rotation degrees
  const rotateX = useSpring(useTransform(rotateXVal, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]), springConfig)
  const rotateY = useSpring(useTransform(rotateYVal, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]), springConfig)

  // Scale motion value
  const scale = useSpring(hovered ? scaleOnHover : 1, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Normalize coordinates to -0.5 to 0.5 relative to center of component
    const normalizedX = (x / rect.width) - 0.5
    const normalizedY = (y / rect.height) - 0.5

    rotateXVal.set(normalizedY) // Move y mouse coordinate to rotate X axis
    rotateYVal.set(normalizedX) // Move x mouse coordinate to rotate Y axis
  }

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    rotateXVal.set(0)
    rotateYVal.set(0)
  }

  return (
    <div
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="tilted-card-container"
    >
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
          cursor: 'pointer',
        }}
        className="tilted-card-inner"
      >
        {/* Render main image */}
        <img
          src={imageSrc}
          alt={altText}
          style={{
            width: imageWidth,
            height: imageHeight,
            objectFit: 'cover',
            objectPosition: 'center top',
            borderRadius: '16px',
            display: 'block',
            filter: hovered
              ? 'contrast(1.08) saturate(1.15) brightness(1.04) drop-shadow(0 0 0 transparent)'
              : 'contrast(1.06) saturate(1.12) brightness(1.02)',
            boxShadow: hovered
              ? '0 32px 64px -12px rgba(0,0,0,0.55), 0 0 0 3px rgba(36,107,254,0.25)'
              : '0 16px 40px -8px rgba(0,0,0,0.38), 0 0 0 2px rgba(36,107,254,0.12)',
            transition: 'box-shadow 0.35s ease, filter 0.35s ease',
            imageRendering: 'high-quality' as React.CSSProperties['imageRendering'],
          }}
        />

        {/* Overlay Content rendering if displayOverlayContent is active */}
        {displayOverlayContent && overlayContent && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transform: 'translateZ(30px)', // Create depth for 3D overlay
              transformStyle: 'preserve-3d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            {overlayContent}
          </div>
        )}

        {/* Tooltip / Caption rendering if showTooltip is active */}
        {showTooltip && captionText && hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute',
              bottom: '-35px',
              left: '50%',
              transform: 'translateX(-50%) translateZ(40px)',
              background: 'rgba(9, 14, 27, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '6px 12px',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            }}
            className="tilted-card-tooltip"
          >
            {captionText}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
