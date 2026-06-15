import { useState } from 'react'
import { X, ExternalLink, FileText, Globe, User, Mail, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import scrapedData from '../data/scraped_content.json'
import deptSubpagesData from '../data/department_subpages.json'
import { resolveLocalScrapedImage } from '../utils/localScrapedImages'

interface ContentItem {
  type: string
  text?: string
  level?: string
  items?: string[]
  rows?: string[][]
  src?: string
  alt?: string
  href?: string
}

interface FacultyMember {
  name: string
  designation: string
  image: string
  qualification: string
  experience: string
  email: string
}

interface SubPageData {
  label: string
  url: string
  content: ContentItem[]
  faculty: FacultyMember[]
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
  const isDept = pageKey?.startsWith('departments-')
  const deptCode = pageKey?.replace('departments-', '') || ''
  
  // Get department subpages if this is a department page
  const deptSubpages = isDept ? (deptSubpagesData as Record<string, Record<string, SubPageData>>)[deptCode] : null
  const subpageKeys = deptSubpages ? Object.keys(deptSubpages) : []
  
  // Local state for active department subpage
  const [activeSubpage, setActiveSubpage] = useState<string>(() => {
    if (subpageKeys.length > 0) {
      return subpageKeys.find((k) => k.toLowerCase().includes('about')) || subpageKeys[0]
    }
    return ''
  })

  // Get active subpage data or flat page data
  const subpageData = deptSubpages && activeSubpage ? deptSubpages[activeSubpage] : null
  const flatPage = pageKey && !isDept ? (scrapedData as Record<string, PageData>)[pageKey] : null

  const pageTitle = isDept ? `${deptCode.toUpperCase()} Department` : flatPage?.title || ''
  const pageUrl = isDept ? (subpageData?.url || `https://www.ritrjpm.ac.in/departments/`) : (flatPage?.url || '')
  const contentItems = isDept ? (subpageData?.content || []) : (flatPage?.content || [])
  const facultyMembers = isDept ? (subpageData?.faculty || []) : []
  const textItems = contentItems.filter((item) => item.type !== 'image')
  const isPdfIconImage = (src?: string) => /pdf-icon|new-pdf-icon|pdf-icon4/i.test(src || '')
  const galleryImages = contentItems
    .filter((item): item is ContentItem & { type: 'image'; src: string } => item.type === 'image' && Boolean(item.src) && !isPdfIconImage(item.src))
    .map((item) => ({
      ...item,
      localSrc: resolveLocalScrapedImage(item.src),
    }))
    .filter((item) => Boolean(item.localSrc))
    .slice(0, 6)
  const pdfAttachmentCards = (() => {
    const isCivilNewsletter = isDept && deptCode === 'civil' && /news letter|newsletter|magazine/i.test(activeSubpage)
    if (!isCivilNewsletter) return []

    const tableRows = contentItems.find((item) => item.type === 'table')?.rows || []
    return tableRows
      .slice(1)
      .filter((row) => row.length >= 2)
      .map((row, index) => {
        const year = row[0] || 'PDF'
        const title = row.slice(1).join(' ').trim() || 'Open PDF'
        return {
          year,
          title,
          href: pageUrl,
          kind: index % 2 === 0 ? 'Magazine' : 'Newsletter',
        }
      })
  })()

  // Renders the structured content blocks (lists, paragraphs, headings, tables, etc.)
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
                      {row.map((cell, cIdx) => (
                        rIdx === 0 ? <th key={cIdx}>{cell}</th> : <td key={cIdx}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        case 'document':
          return (
            <div key={index} className="detail-document-card">
              <FileText size={28} />
              <div>
                <h4>Official Attachment</h4>
                <p>{item.text || 'Document File'}</p>
              </div>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="detail-document-btn">
                <span>View Document</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )
        case 'image':
          if (isPdfIconImage(item.src)) return null
          return (
            <figure key={index} className="detail-content-image">
              {resolveLocalScrapedImage(item.src) && (
                <img
                  src={resolveLocalScrapedImage(item.src) || ''}
                  alt={item.alt || 'RIT official image'}
                  loading="lazy"
                />
              )}
              {item.alt && item.alt !== 'Image' && <figcaption>{item.alt}</figcaption>}
            </figure>
          )
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
                  <h1>{pageTitle}</h1>
                  <div className="detail-source-links">
                    <a href={pageUrl} target="_blank" rel="noopener noreferrer" className="detail-source-link">
                      <Globe size={14} />
                      <span>View official live page</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </header>
                <div className="detail-body detail-body--flat">
                  {pdfAttachmentCards.length > 0 && (
                    <section className="detail-pdf-section" aria-label={`${pageTitle} pdf attachments`}>
                      <div className="detail-image-gallery__lead">
                        <div className="detail-image-gallery__tag">PDF Attachments</div>
                        <h2>{pageTitle}</h2>
                        <p>The original scrape exposed PDF covers as images, so these are shown as attachment cards instead of thumbnails.</p>
                      </div>
                      <div className="detail-pdf-grid">
                        {pdfAttachmentCards.map((attachment, index) => (
                          <a
                            key={`${attachment.year}-${attachment.title}-${index}`}
                            href={attachment.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detail-pdf-card"
                          >
                            <FileText size={26} />
                            <div>
                              <strong>{attachment.title}</strong>
                              <span>{attachment.year} {attachment.kind}</span>
                            </div>
                            <ExternalLink size={14} />
                          </a>
                        ))}
                      </div>
                    </section>
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
                          <figure key={`${item.src}-${index}`} className={`detail-image-card ${index === 0 ? 'featured' : ''}`}>
                            <img
                              src={item.localSrc || ''}
                              alt={item.alt || `${pageTitle} image ${index + 1}`}
                              loading="lazy"
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

            {/* Layout for Department Sidebar-based pages */}
            {isDept && deptSubpages && (
              <div className="dept-view-container">
                {/* Left Sidebar */}
                <aside className="dept-sidebar">
                  <div className="dept-sidebar-header">
                    <BookOpen size={18} />
                    <span>Department Info</span>
                  </div>
                  <nav className="dept-sidebar-nav">
                    {subpageKeys.map((key) => (
                      <button
                        key={key}
                        className={`dept-sidebar-link ${activeSubpage === key ? 'active' : ''}`}
                        onClick={() => setActiveSubpage(key)}
                      >
                        <span className="bullet">»</span>
                        <span className="label-text">{key}</span>
                      </button>
                    ))}
                  </nav>
                </aside>

                {/* Right Scrollable Content Viewport */}
                <main className="dept-main-content">
                  <header className="dept-content-header">
                    <div className="detail-eyebrow">DEPARTMENTS / {deptCode.toUpperCase()} / {activeSubpage.toUpperCase()}</div>
                    <h1>{activeSubpage}</h1>
                    <div className="detail-source-links">
                      <a href={pageUrl} target="_blank" rel="noopener noreferrer" className="detail-source-link">
                        <Globe size={14} />
                        <span>View live official page</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </header>

                  <div className="dept-content-body">
                    {pdfAttachmentCards.length > 0 && (
                      <section className="detail-pdf-section" aria-label={`${activeSubpage} pdf attachments`}>
                        <div className="detail-image-gallery__lead">
                          <div className="detail-image-gallery__tag">PDF Attachments</div>
                          <h2>{activeSubpage}</h2>
                          <p>The original scrape exposed PDF covers as images, so these are shown as attachment cards instead of thumbnails.</p>
                        </div>
                        <div className="detail-pdf-grid">
                          {pdfAttachmentCards.map((attachment, index) => (
                            <a
                              key={`${attachment.year}-${attachment.title}-${index}`}
                              href={attachment.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="detail-pdf-card"
                            >
                              <FileText size={26} />
                              <div>
                                <strong>{attachment.title}</strong>
                                <span>{attachment.year} {attachment.kind}</span>
                              </div>
                              <ExternalLink size={14} />
                            </a>
                          ))}
                        </div>
                      </section>
                    )}
                    {galleryImages.length > 0 && (
                      <section className="detail-image-gallery" aria-label={`${activeSubpage} gallery`}>
                        <div className="detail-image-gallery__lead">
                          <div className="detail-image-gallery__tag">Official Gallery</div>
                          <h2>{activeSubpage}</h2>
                          <p>Images are pulled from the local scraped image set and arranged to match the page content.</p>
                        </div>
                        <div className="detail-image-grid">
                          {galleryImages.map((item, index) => (
                            <figure key={`${item.src}-${index}`} className={`detail-image-card ${index === 0 ? 'featured' : ''}`}>
                              <img
                                src={item.localSrc || ''}
                                alt={item.alt || `${activeSubpage} image ${index + 1}`}
                                loading="lazy"
                              />
                            </figure>
                          ))}
                        </div>
                      </section>
                    )}
                    {/* Faculty Profile Grid (if faculty profiles list is active) */}
                    {facultyMembers.length > 0 && (
                      <div className="faculty-section">
                        <h2 className="faculty-section-title">Faculty Members</h2>
                        <div className="faculty-grid">
                          {facultyMembers.map((fac, idx) => (
                            <article className="faculty-card" key={idx}>
                              <div className="faculty-avatar-wrapper">
                                {fac.image ? (
                                  <img src={fac.image} alt={fac.name} className="faculty-avatar" loading="lazy" />
                                ) : (
                                  <div className="faculty-avatar-placeholder"><User size={36} /></div>
                                )}
                              </div>
                              <div className="faculty-info">
                                <h3>{fac.name}</h3>
                                <p className="faculty-designation">{fac.designation}</p>
                                <p className="faculty-qual">{fac.qualification}</p>
                                {fac.email && (
                                  <a href={`mailto:${fac.email}`} className="faculty-email-btn">
                                    <Mail size={12} />
                                    <span>{fac.email}</span>
                                  </a>
                                )}
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Standard Content items for the active subpage */}
                    {textItems.length > 0 ? (
                      renderContentBlocks(textItems)
                    ) : (
                      facultyMembers.length === 0 && (
                        <div className="detail-empty">
                          <p>No content block found. Click the button above to visit the live department site.</p>
                        </div>
                      )
                    )}
                  </div>
                </main>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
