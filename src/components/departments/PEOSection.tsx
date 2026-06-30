import React from 'react'
import type { ContentItem } from './DeptSubSections'

interface PEOSectionProps {
  content: ContentItem[]
}

interface PEOBlock {
  type: 'peo' | 'po' | 'pso'
  heading: string
  subtitle?: string
  items: string[]
}

function parsePEOContent(content: ContentItem[]): PEOBlock[] {
  const blocks: PEOBlock[] = []
  let currentBlock: PEOBlock | null = null

  for (const item of content) {
    if (item.type === 'heading') {
      const text = item.text || ''
      const lowerText = text.toLowerCase()

      let detectedType: 'peo' | 'po' | 'pso' | null = null

      if (lowerText.includes('program educational') || lowerText.includes('peo')) {
        detectedType = 'peo'
      } else if ((lowerText.includes('program outcome') || lowerText.includes('program outcomes') || lowerText.includes('po')) && !lowerText.includes('pso') && !lowerText.includes('specific')) {
        detectedType = 'po'
      } else if (lowerText.includes('program specific') || lowerText.includes('pso')) {
        detectedType = 'pso'
      }

      if (detectedType) {
        currentBlock = {
          type: detectedType,
          heading: text,
          items: []
        }
        blocks.push(currentBlock)
      } else if (currentBlock) {
        // If it's a heading but not a main category header, treat it as a subtitle/intro text
        if (!currentBlock.subtitle) {
          currentBlock.subtitle = text
        } else {
          currentBlock.subtitle += ' | ' + text
        }
      }
    } else if (item.type === 'paragraph') {
      const text = item.text || ''
      if (!currentBlock) continue

      const lowerText = text.toLowerCase()
      // Short introductory paragraphs act as subtitles
      if ((lowerText.includes('after') || lowerText.includes('completion') || lowerText.includes('graduates will') || lowerText.includes('students will')) && text.length < 150) {
        currentBlock.subtitle = text
      } else if (text.length > 5) {
        // If PO/PSO items are written as paragraphs rather than list items
        if (currentBlock.type === 'po' && (text.match(/^PO\d+/) || text.includes(':'))) {
          currentBlock.items.push(text)
        } else if (currentBlock.type === 'pso' && (text.match(/^PSO\d+/) || text.includes(':'))) {
          currentBlock.items.push(text)
        }
      }
    } else if (item.type === 'list' && item.items) {
      if (currentBlock) {
        currentBlock.items.push(...item.items)
      }
    }
  }

  return blocks
}

// Split "PEO 1: text" or "Engineering knowledge: text" into bold label + body
function splitLabel(text: string): { label: string; body: string } {
  const colonIdx = text.indexOf(':')
  if (colonIdx > 0 && colonIdx < 60) {
    return {
      label: text.slice(0, colonIdx).trim(),
      body: text.slice(colonIdx + 1).trim(),
    }
  }
  return { label: '', body: text }
}

const SECTION_CONFIG = {
  peo: {
<<<<<<< HEAD
    accent: '#246bfe',
    bg: 'rgba(36,107,254,0.06)',
    border: 'rgba(36,107,254,0.2)',
    badge: 'PEO',
    badgeBg: 'rgba(36,107,254,0.12)',
    badgeColor: '#1a52c8',
    icon: '🎯',
  },
  po: {
    accent: '#07bf51',
    bg: 'rgba(7,191,81,0.06)',
    border: 'rgba(7,191,81,0.2)',
    badge: 'PO',
    badgeBg: 'rgba(7,191,81,0.12)',
    badgeColor: '#059a42',
    icon: '📘',
  },
  pso: {
    accent: '#ec0a78',
    bg: 'rgba(236,10,120,0.06)',
    border: 'rgba(236,10,120,0.2)',
    badge: 'PSO',
    badgeBg: 'rgba(236,10,120,0.12)',
    badgeColor: '#c1076a',
    icon: '🔬',
=======
    accent: '#061846',
    bg: 'rgba(6, 24, 70, 0.02)',
    border: 'rgba(6, 24, 70, 0.07)',
    badge: 'PEO',
    badgeBg: 'rgba(6, 24, 70, 0.05)',
    badgeColor: '#061846',
  },
  po: {
    accent: '#061846',
    bg: 'rgba(6, 24, 70, 0.02)',
    border: 'rgba(6, 24, 70, 0.07)',
    badge: 'PO',
    badgeBg: 'rgba(6, 24, 70, 0.05)',
    badgeColor: '#061846',
  },
  pso: {
    accent: '#061846',
    bg: 'rgba(6, 24, 70, 0.02)',
    border: 'rgba(6, 24, 70, 0.07)',
    badge: 'PSO',
    badgeBg: 'rgba(6, 24, 70, 0.05)',
    badgeColor: '#061846',
>>>>>>> b959d4d (civil)
  },
}

interface PEOCardProps {
  index: number
  text: string
  type: 'peo' | 'po' | 'pso'
}

const PEOCard: React.FC<PEOCardProps> = ({ index, text, type }) => {
  const cfg = SECTION_CONFIG[type]
  const { label, body } = splitLabel(text)
  const num = index + 1

  return (
    <div
      className="peo-item-card"
      style={{
        display: 'flex',
        gap: '14px',
        alignItems: 'flex-start',
        padding: '14px 18px',
        borderRadius: '12px',
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        marginBottom: '10px',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
    >
      {/* Number badge */}
      <div
        style={{
<<<<<<< HEAD
          minWidth: '36px',
          height: '36px',
          borderRadius: '50%',
          background: cfg.accent,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '13px',
          flexShrink: 0,
          marginTop: '1px',
          boxShadow: `0 2px 8px ${cfg.accent}44`,
=======
          minWidth: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'rgba(6, 24, 70, 0.05)',
          border: '1px solid rgba(6, 24, 70, 0.12)',
          color: '#061846',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 750,
          fontSize: '12px',
          flexShrink: 0,
          marginTop: '2px',
>>>>>>> b959d4d (civil)
        }}
      >
        {num}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {label && (
          <span
            style={{
              fontWeight: 700,
              color: cfg.accent,
              fontSize: '13.5px',
              display: 'block',
              marginBottom: '3px',
              letterSpacing: '0.01em',
            }}
          >
            {label}
          </span>
        )}
        <span
          style={{
            fontSize: '14px',
            color: '#374151',
            lineHeight: '1.65',
          }}
        >
          {body}
        </span>
      </div>
    </div>
  )
}

interface PEOSectionBlockProps {
  block: PEOBlock
}

const PEOSectionBlock: React.FC<PEOSectionBlockProps> = ({ block }) => {
  const cfg = SECTION_CONFIG[block.type]

  return (
    <div
      className="peo-section-block"
      style={{
        marginBottom: '36px',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '6px',
        }}
      >
        <div
          style={{
            width: '4px',
            height: '36px',
            borderRadius: '4px',
            background: cfg.accent,
            flexShrink: 0,
          }}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: cfg.badgeBg,
                color: cfg.badgeColor,
                padding: '2px 8px',
                borderRadius: '20px',
              }}
            >
<<<<<<< HEAD
              {cfg.icon} {cfg.badge}
=======
              {cfg.badge}
>>>>>>> b959d4d (civil)
            </span>
          </div>
          <h3
            style={{
              margin: '3px 0 0 0',
              fontSize: '16px',
              fontWeight: 800,
              color: '#061846',
              letterSpacing: '-0.01em',
            }}
          >
            {block.heading}
          </h3>
        </div>
      </div>

      {/* Subtitle / intro */}
      {block.subtitle && (
        <p
          style={{
            fontSize: '13.5px',
            color: '#64748b',
            margin: '8px 0 12px 16px',
            fontStyle: 'italic',
          }}
        >
          {block.subtitle}
        </p>
      )}

      {!block.subtitle && (
        <div style={{ marginBottom: '12px' }} />
      )}

      {/* Items */}
      <div style={{ paddingLeft: '0' }}>
        {block.items.map((item, idx) => (
          <PEOCard key={idx} index={idx} text={item} type={block.type} />
        ))}
      </div>
    </div>
  )
}

export const PEOSection: React.FC<PEOSectionProps> = ({ content }) => {
  const blocks = parsePEOContent(content)

  const hasContent = blocks.length > 0

  if (!hasContent) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '15px' }}>
        No PEO/PO/PSO content available for this department.
      </div>
    )
  }


  return (
    <section
      className="peo-section-root"
      aria-label="PEOs, POs and PSOs"
      style={{ paddingTop: '8px' }}
    >


      {/* Sections */}
      {blocks.map((block, idx) => (
        <PEOSectionBlock key={idx} block={block} />
      ))}
    </section>
  )
}

export default PEOSection
