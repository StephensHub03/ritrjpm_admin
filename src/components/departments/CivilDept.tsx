import React, { useState } from 'react'
import TiltedCard from '../TiltedCard'
import {
  BookOpen,
  ExternalLink,
  FileText,
  Edit } from 'lucide-react'
import { useCMS } from '../CMSContext'
import { EditDeptSubpageModal } from '../CMSModals'
import { resolveLocalScrapedImage } from '../../utils/localScrapedImages'
import {
  getDeptName,
  getDeptAccentColor,
  isValidDepartmentImage,
  isValidDepartmentText,
  getFileName
} from '../../utils/deptHelpers'
import {
  OverviewSection,
  AboutSection,
  VisionMissionSection,
  FacilitiesSection,
  DefaultSection,
  FacultySection
} from './DeptSubSections'
import type { ContentItem } from './DeptSubSections'
import { PEOSection } from './PEOSection'

interface DeptProps {
  onClose: () => void
}

export const CivilDept: React.FC<DeptProps> = () => {
  const deptCode = 'civil'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { deptSubpages, isAuthenticated } = useCMS()
  const deptData = deptSubpages[deptCode]
  console.log('Reloading civil dept tables...')
  const [showEditModal, setShowEditModal] = useState(false)
  const subpageKeys = deptData ? Object.keys(deptData) : []

  const [activeSubpage, setActiveSubpage] = useState<string>(() => {
    if (subpageKeys.length > 0) {
      return subpageKeys.find((k) => k.toLowerCase().includes('about')) || subpageKeys[0]
    }
    return ''
  })

  const subpageData = deptData && activeSubpage ? deptData[activeSubpage] : null
  const pageUrl = subpageData?.url || `https://www.ritrjpm.ac.in/departments/`
  const rawContentItems: ContentItem[] = subpageData?.content || []

  // Filter content items
  const filteredContentItems = rawContentItems.filter((item) => {
    if (item.type === 'image') {
      return item.src && isValidDepartmentImage(item.src, deptCode, item.alt, pageUrl)
    }
    if (item.text) {
      return isValidDepartmentText(item.text)
    }
    return true
  })

  const isFacultyProfilePage = activeSubpage.toLowerCase().includes('faculty profile') || activeSubpage.toLowerCase().includes('faculty data')

  const facultyMembers = isFacultyProfilePage ? (() => {
    const cleanStr = (val: any): string => {
      if (!val) return '';
      if (typeof val === 'string') return val.trim();
      return (val.text || '').trim();
    };
    let img: string | null = null
    const list: { name: string; designation: string; qualification: string; email: string; image: string | null }[] = []
    rawContentItems.forEach((item) => {
      if (item.type === 'image' && item.src) {
        img = item.src
      } else if (item.type === 'table') {
        const rows = item.rows || []
        if (rows.length >= 4) {
          list.push({
            name: cleanStr(rows[0]?.[1]),
            designation: cleanStr(rows[1]?.[1]),
            qualification: cleanStr(rows[2]?.[1]),
            email: cleanStr(rows[3]?.[1]),
            image: img,
          })
        }
        img = null
      }
    })
    return list
  })() : []

  const isPdfIconImage = (src?: string) => /pdf-icon|new-pdf-icon|pdf-icon4/i.test(src || '')
  
  const galleryImages = activeSubpage.toLowerCase().includes('about')
    ? []
    : filteredContentItems
    .filter((item): item is ContentItem & { type: 'image'; src: string } => item.type === 'image' && Boolean(item.src) && !isPdfIconImage(item.src))
    .map((item) => ({
      ...item,
      localSrc: resolveLocalScrapedImage(item.src),
    }))
    .filter((item) => Boolean(item.localSrc))
    .slice(0, 6)

  const isReadMoreOrGallery = activeSubpage.toLowerCase().includes('read more') || activeSubpage.toLowerCase().includes('gallery')
  const showGalleryEmptyState = isReadMoreOrGallery && galleryImages.length === 0

  const isPdfTab = /news letter|newsletter|magazine|admission/i.test(activeSubpage)

  const textItems = isFacultyProfilePage
    ? filteredContentItems.filter((item) => {
        if (item.type === 'document') return true
        if (item.type === 'table') return false
<<<<<<< HEAD

=======
        if (item.type === 'image') return false
>>>>>>> b959d4d (civil)
        if (item.type === 'heading') return false
        return true
      })
    : filteredContentItems.filter((item) => {
<<<<<<< HEAD

=======
        if (item.type === 'image' && !activeSubpage.toLowerCase().includes('about') && !activeSubpage.toLowerCase().includes('facilit') && !activeSubpage.toLowerCase().includes('lab')) return false
>>>>>>> b959d4d (civil)
        if (isPdfTab && item.type === 'document') return false
        return true
      })

  const pdfAttachmentCards = (() => {
    const isPdfTab = /news letter|newsletter|magazine|admission/i.test(activeSubpage)
    if (!isPdfTab) return []

    // Look for document type items in rawContentItems
    const docItems = rawContentItems.filter((item) => item.type === 'document')
    if (docItems.length > 0) {
      return docItems.map((item) => {
        const isMagazine = /magazine/i.test(item.text || '')
        const yearMatch = item.text ? item.text.match(/\b(20\d{2}-20\d{2}|20\d{2}-\d{2}|20\d{2})\b/) : null
        return {
          year: yearMatch ? yearMatch[1] : 'PDF',
          title: item.text || 'Official Document',
          href: item.href || pageUrl,
          kind: activeSubpage.toLowerCase().includes('admission') ? 'Brochure' : isMagazine ? 'Magazine' : 'Newsletter',
        }
      })
    }

    const tableRows = rawContentItems.find((item) => item.type === 'table')?.rows || []
    const getStr = (val: any): string => {
      if (!val) return '';
      if (typeof val === 'string') return val;
      return val.text || '';
    };
    return tableRows
      .slice(1)
      .filter((row) => row.length >= 2)
      .map((row, index) => {
        const year = getStr(row[0]) || 'PDF'
        const title = row.slice(1).map(getStr).join(' ').trim() || 'Open PDF'
        return {
          year,
          title,
          href: pageUrl,
          kind: activeSubpage.toLowerCase().includes('admission') ? 'Brochure' : index % 2 === 0 ? 'Magazine' : 'Newsletter',
        }
      })
  })()

  const isPEOTab = /peo|pos|pso|program educational|program outcome|program specific/i.test(activeSubpage)

  const renderSubSection = () => {
    const props = {
      deptCode,
      sectionName: activeSubpage,
      content: textItems,
      pageUrl
    }

    if (isPEOTab) {
      return <PEOSection content={rawContentItems} />
    }
    if (activeSubpage.toLowerCase().includes('vision') || activeSubpage.toLowerCase().includes('mission')) {
      return <VisionMissionSection {...props} />
    }
    if (activeSubpage.toLowerCase().includes('about')) {
      return <AboutSection {...props} />
    }
    if (activeSubpage.toLowerCase().includes('facilit') || activeSubpage.toLowerCase().includes('lab')) {
      return <FacilitiesSection {...props} />
    }
    if (activeSubpage.toLowerCase().includes('overview') || activeSubpage.toLowerCase().includes('read more')) {
      return <OverviewSection {...props} />
    }
    return <DefaultSection {...props} />
  }

  const accentColor = getDeptAccentColor(deptCode)
  const deptName = getDeptName(deptCode)

  return (
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
        <header className="dept-content-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="detail-eyebrow" style={{ marginBottom: '8px' }}>
            DEPARTMENT OF {deptName.toUpperCase().replace('&', 'AND')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}>
            <h1 style={{ margin: 0 }}>{activeSubpage}</h1>
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
                <Edit size={14} /> Edit Subpage Content
              </button>
            )}
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

          {showGalleryEmptyState && (
            <div 
              className="detail-image-placeholder-container" 
              style={{ 
                margin: '20px 0', 
                padding: '30px', 
                border: '2px dashed #e2e8f0', 
                borderRadius: '12px', 
                background: '#f8fafc', 
                color: '#64748b', 
                textAlign: 'center' 
              }}
            >
              <span style={{ fontWeight: '600', display: 'block', fontSize: '15px' }}>
                Department gallery images will be updated soon
              </span>
            </div>
          )}

          {false && !showGalleryEmptyState && galleryImages.length > 0 && !isFacultyProfilePage && (
            <section className="detail-image-gallery" aria-label={`${activeSubpage} gallery`}>
              <div className="detail-image-gallery__lead">
                <div className="detail-image-gallery__tag">Official Gallery</div>
                <h2>{activeSubpage}</h2>
                <p>Images are pulled from the local scraped image set and arranged to match the page content.</p>
              </div>
              <div className="detail-image-grid">
                {galleryImages.map((item, index) => {
                  const filename = getFileName(item.src)
                  const imgType = filename.includes('lab') ? 'lab' : filename.includes('award') ? 'award' : 'event'
                  return (
                    <React.Fragment key={`${item.src}-${index}`}>
                      {/* IMG SOURCE: ${filename} | TYPE: ${imgType} | DEPT: ${deptCode.toUpperCase()} | VERIFIED: yes */}
                      <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- IMG SOURCE: ${filename} | TYPE: ${imgType} | DEPT: ${deptCode.toUpperCase()} | VERIFIED: yes -->` }} />
                      <figure className={`detail-image-card ${index === 0 ? 'featured' : ''}`} style={{ overflow: 'visible', background: 'transparent' }}>
                        <TiltedCard
                          imageSrc={item.localSrc || ''}
                          altText={item.alt || `${activeSubpage} image ${index + 1}`}
                          containerHeight="100%"
                          containerWidth="100%"
                          imageHeight="100%"
                          imageWidth="100%"
                          rotateAmplitude={12}
                          scaleOnHover={1.04}
                          showTooltip={false}
                        />
                      </figure>
                    </React.Fragment>
                  )
                })}
              </div>
            </section>
          )}

          {isFacultyProfilePage && facultyMembers.length > 0 && (
            <FacultySection
              facultyMembers={facultyMembers}
              deptName={deptName}
              deptCode={deptCode}
              accentColor={accentColor}
              subpageUrl={subpageData?.url}
            />
          )}
          {renderSubSection()}

          {filteredContentItems.length === 0 && facultyMembers.length === 0 && (
            <div className="detail-empty">
              <p>No content block found. Click the button above to visit the live department site.</p>
            </div>
          )}
        </div>
      </main>
    {showEditModal && (
        <EditDeptSubpageModal
          deptCode={deptCode}
          subpageKey={activeSubpage}
          onClose={() => setShowEditModal(false)}
        />
      )}
      </div>
  )
}

export default CivilDept
