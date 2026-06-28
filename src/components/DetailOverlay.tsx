import { X, Edit } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { resolveLocalScrapedImage } from '../utils/localScrapedImages'
import TiltedCard from './TiltedCard'
import { useCMS } from './CMSContext'
import { useState, useEffect } from 'react'
import { EditFlatPageModal } from './CMSModals'

// Import isolated department components
import CseDept from './departments/CseDept'
import EceDept from './departments/EceDept'
import EeeDept from './departments/EeeDept'
import MechDept from './departments/MechDept'
import CivilDept from './departments/CivilDept'
import AimlDept from './departments/AimlDept'
import AidsDept from './departments/AidsDept'
import CsbsDept from './departments/CsbsDept'
import ItDept from './departments/ItDept'
import PhysicsDept from './departments/PhysicsDept'
import ChemistryDept from './departments/ChemistryDept'
import MathsDept from './departments/MathsDept'
import EnglishDept from './departments/EnglishDept'

interface ContentItem {
  type: string
  text?: string
  level?: string
  items?: string[]
  rows?: (string | { text: string; href: string })[][]
  src?: string
  alt?: string
  href?: string
}

interface PageData {
  key: string
  title: string
  url: string
  content: ContentItem[]
}

interface DetailOverlayProps {
  pageKey: string | null
  onClose: () => void
}

export default function DetailOverlay({ pageKey, onClose }: DetailOverlayProps) {
  const { flatPages, isAuthenticated } = useCMS()
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    if (pageKey) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [pageKey])

  const isDept = pageKey?.startsWith('departments-')
  const deptCode = pageKey?.replace('departments-', '') || ''

  // Get flat page data if this is not a department
  const flatPage = pageKey && !isDept ? (flatPages as Record<string, PageData>)[pageKey] : null

  const pageTitle = flatPage?.title || ''

  const contentItems = flatPage?.content || []

  const isPdfIconImage = (src?: string) => /pdf-icon|new-pdf-icon|pdf-icon4/i.test(src || '')
  
  const textItems = contentItems.filter((item) => item.type !== 'image')
  const galleryImages = contentItems
    .filter((item): item is ContentItem & { type: 'image'; src: string } => item.type === 'image' && Boolean(item.src) && !isPdfIconImage(item.src))
    .map((item) => ({
      ...item,
      localSrc: resolveLocalScrapedImage(item.src),
    }))
    .filter((item) => Boolean(item.localSrc))
    .slice(0, 6)

  const originalImageCount = contentItems.filter((item) => item.type === 'image' && !isPdfIconImage(item.src)).length
  const showNoImagePlaceholder = originalImageCount > 0 && galleryImages.length === 0

  // Renders flat page content blocks (lists, paragraphs, headings, tables, etc.)
  const renderContentBlocks = (items: ContentItem[]) => {
    if (!items || items.length === 0) return null

    return items.map((item, index) => {
      switch (item.type) {
        case 'heading': {
          const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
          const HeadingTag = (validHeadingLevels.includes(item.level || '') ? item.level : 'h3') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
          return (
            <HeadingTag key={index} className="detail-content-heading">
              {item.text}
            </HeadingTag>
          )
        }
        case 'paragraph':
          return (
            <p key={index} className="detail-content-paragraph">
              {item.text}
            </p>
          )
        case 'list':
          return (
            <ul key={index} className="detail-content-list">
              {item.items?.map((li, idx) => (
                <li key={idx}>{li}</li>
              ))}
            </ul>
          )
        case 'table':
          return (
            <div key={index} className="detail-table-wrapper">
              <table className="detail-content-table">
                <tbody>
                  {item.rows?.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx === 0 ? 'table-header' : undefined}>
                      {row.map((cell, cIdx) => {
                        if (typeof cell === 'object' && cell !== null && 'href' in cell) {
                          return rIdx === 0 ? <th key={cIdx}><a href={cell.href} target="_blank" rel="noopener noreferrer">{cell.text}</a></th> : <td key={cIdx}><a href={cell.href} target="_blank" rel="noopener noreferrer">{cell.text}</a></td>
                        }
                        return rIdx === 0 ? <th key={cIdx}>{cell as React.ReactNode}</th> : <td key={cIdx}>{cell as React.ReactNode}</td>
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        case 'document':
          if (!item.href) return null
          return (
            <div key={index} className="detail-document-link-wrapper" style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center' }}>
              <a 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '12px 24px',
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', marginRight: '8px', flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {item.text || 'View Document'}
              </a>
            </div>
          )
        case 'image':
          return null
        default:
          return null
      }
    })
  }

  return (
    <AnimatePresence>
      {pageKey && (
        <motion.div
          className="detail-overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`detail-overlay-content ${isDept ? 'dept-layout' : ''}`}
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="detail-close-btn" onClick={onClose} aria-label="Close page details">
              <X />
            </button>

            {/* Layout for Non-Department flat pages */}
            {!isDept && (
              <>
                <header className="detail-header">
                  <div className="detail-eyebrow">
                    {pageKey?.split('-')[0].toUpperCase()} / {pageKey?.split('-').slice(1).join(' ').toUpperCase()}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', width: '100%' }}>
                    <h1 style={{ margin: 0 }}>{pageTitle}</h1>
                    {isAuthenticated && (
                      <button
                        onClick={() => setShowEditModal(true)}
                        style={{
                          background: 'rgba(236, 10, 120, 0.1)',
                          border: '1px solid rgba(236, 10, 120, 0.25)',
                          borderRadius: '20px',
                          padding: '6px 14px',
                          color: '#ec0a78',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Edit size={14} /> Edit Page Content
                      </button>
                    )}
                  </div>

                </header>
                <div className="detail-body detail-body--flat">
                  {showNoImagePlaceholder && (
                    <div className="detail-image-placeholder-container" style={{ margin: '20px 0', padding: '30px', border: '2px dashed #f43f5e', borderRadius: '12px', background: '#fff1f2', color: '#be123c', textAlign: 'center' }}>
                      <span style={{ fontWeight: '750', display: 'block', fontSize: '15px' }}>⚠️ No Scraped Image Found: {pageTitle}</span>
                      <small style={{ display: 'block', marginTop: '4px', opacity: 0.85 }}>Flagged for manual review</small>
                    </div>
                  )}
                  {galleryImages.length > 0 && (
                    <section className="detail-image-gallery" aria-label={`${pageTitle} gallery`}>
                      <div className="detail-image-gallery__lead">
                        <div className="detail-image-gallery__tag">Official Gallery</div>
                        <h2>{pageTitle}</h2>
                        <p>These visuals are resolved from the local scraped image library so the page stays fast and offline-friendly.</p>
                      </div>
                      <div className="detail-image-grid">
                        {galleryImages.map((item, index) => (
                          <figure key={`${item.src}-${index}`} className={`detail-image-card ${index === 0 ? 'featured' : ''}`} style={{ overflow: 'visible', background: 'transparent' }}>
                            <TiltedCard
                              imageSrc={item.localSrc || ''}
                              altText={item.alt || `${pageTitle} image ${index + 1}`}
                              containerHeight="100%"
                              containerWidth="100%"
                              imageHeight="100%"
                              imageWidth="100%"
                              rotateAmplitude={12}
                              scaleOnHover={1.04}
                              showTooltip={false}
                            />
                          </figure>
                        ))}
                      </div>
                    </section>
                  )}
                  {textItems.length > 0 ? (
                    renderContentBlocks(textItems)
                  ) : (
                    <div className="detail-empty">
                      <p>No content found for this page. Please refer to the official live website.</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Layout for Department Sidebar-based pages: Delegated to isolated sub-components */}
            {isDept && (
              <>
                {(() => {
                  switch (deptCode.toLowerCase()) {
                    case 'cse':
                      return <CseDept onClose={onClose} />
                    case 'ece':
                      return <EceDept onClose={onClose} />
                    case 'eee':
                      return <EeeDept onClose={onClose} />
                    case 'mech':
                      return <MechDept onClose={onClose} />
                    case 'civil':
                      return <CivilDept onClose={onClose} />
                    case 'aiml':
                      return <AimlDept onClose={onClose} />
                    case 'aids':
                      return <AidsDept onClose={onClose} />
                    case 'csbs':
                      return <CsbsDept onClose={onClose} />
                    case 'it':
                      return <ItDept onClose={onClose} />
                    case 'physics':
                      return <PhysicsDept onClose={onClose} />
                    case 'chemistry':
                      return <ChemistryDept onClose={onClose} />
                    case 'maths':
                      return <MathsDept onClose={onClose} />
                    case 'english':
                      return <EnglishDept onClose={onClose} />
                    default:
                      return (
                        <div className="detail-empty">
                          <p>Unknown department.</p>
                        </div>
                      )
                  }
                })()}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
      {showEditModal && pageKey && (
        <EditFlatPageModal pageKey={pageKey} onClose={() => setShowEditModal(false)} />
      )}
    </AnimatePresence>
  )
}
