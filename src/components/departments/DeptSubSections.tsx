import React from 'react'
import { School, GraduationCap, User } from 'lucide-react'
import { resolveLocalScrapedImage } from '../../utils/localScrapedImages'
import TiltedCard from '../TiltedCard'
import {
  isValidDepartmentText,
  isValidDepartmentImage,
  getFileName,
  getDeptName
} from '../../utils/deptHelpers'


export interface ContentItem {
  type: string
  text?: string
  level?: string
  items?: string[]
  rows?: (string | { text: string; href: string })[][]
  src?: string
  alt?: string
  href?: string
}

interface SectionProps {
  deptCode: string
  sectionName: string
  content: ContentItem[]
  pageUrl: string
}

const isPdfIconImage = (src?: string) => /pdf-icon|new-pdf-icon|pdf-icon4/i.test(src || '')

export function renderContentBlocks(items: ContentItem[], deptCode: string, sectionName: string, pageUrl: string) {
  if (!items || items.length === 0) return null

  return items.map((item, index) => {
    // 1. Text checks
    if (item.text && !isValidDepartmentText(item.text)) {
      return null
    }

    switch (item.type) {
      case 'heading': {
        const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        const HeadingTag = (validHeadingLevels.includes(item.level || '') ? item.level : 'h3') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        
        // HOD headings and h6 do not require sub-content
        const isHODHeading = HeadingTag === 'h6' || (item.text || '').includes('Head') || (item.text || '').includes('HOD') || (item.text || '').includes('Professor')
        
        // Lookahead to ensure there is valid content before the next heading or end of array
        let hasContent = isHODHeading
        if (!hasContent) {
          for (let i = index + 1; i < items.length; i++) {
            const nextItem = items[i]
            if (nextItem.type === 'heading') break // Found next heading, stop checking
            
            let isValid = true
            if (nextItem.text && !isValidDepartmentText(nextItem.text)) isValid = false
            
            if (isValid) {
              if (nextItem.type === 'image') {
                if (isPdfIconImage(nextItem.src)) isValid = false
                else if (!nextItem.src) isValid = false
                else if (!isValidDepartmentImage(nextItem.src, deptCode, nextItem.alt, pageUrl)) isValid = false
              } else if (nextItem.type === 'list') {
                const validListItems = nextItem.items?.filter(isValidDepartmentText) || []
                if (validListItems.length === 0) isValid = false
              } else if (nextItem.type === 'table') {
                const validRows = nextItem.rows?.filter(row => row.every(cell => isValidDepartmentText(typeof cell === 'string' ? cell : cell.text))) || []
                if (validRows.length === 0) isValid = false
              } else if (nextItem.type === 'document') {
                 isValid = false
              } else if (nextItem.type === 'paragraph') {
                 // Paragraph is valid if text is valid (which is already checked above)
              } else {
                 isValid = false // Unknown type
              }
            }
            
            if (isValid) {
              hasContent = true
              break
            }
          }
        }

        if (!hasContent) {
          return null // Skip heading without content
        }
        
        const prevItem = index > 0 ? items[index - 1] : null
        const isPrevProfileImage = prevItem && prevItem.type === 'image' && prevItem.src && (() => {
          const fn = getFileName(prevItem.src)
          return fn.includes('photo') || fn.includes('head') || fn.includes('kaliappan') || (prevItem.alt || '').toLowerCase().includes('hod') || (prevItem.alt || '').toLowerCase().includes('head') || (prevItem.alt || '').toLowerCase().includes('principal')
        })()

        const isCentered = HeadingTag === 'h6' || (item.text || '').includes('Head') || (item.text || '').includes('HOD') || (item.text || '').includes('Professor')
        
        // Skip if this heading is an HOD label that follows a profile image, as it's already rendered inside the caption wrapper
        if (isCentered && isPrevProfileImage) {
          return null
        }

        const cleanText = (item.text || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '').trim()
        const cleanDeptName = getDeptName(deptCode).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '').trim()
        const cleanSection = sectionName.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '').trim()
        
        const isRedundant =
          cleanText === cleanDeptName ||
          cleanText === `departmentof${cleanDeptName}` ||
          cleanText === `btech${cleanDeptName}` ||
          cleanText === cleanSection ||
          cleanText === 'aboutthedepartment'
          
        if (isRedundant && HeadingTag !== 'h6') {
          return null
        }
        return (
          <React.Fragment key={index}>
            {/* SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} */}
            <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} -->` }} />
            <HeadingTag 
              className="detail-content-heading"
              style={isCentered ? { textAlign: 'center', marginTop: '12px', color: '#061846', fontSize: '15px', fontWeight: 700 } : undefined}
            >
              {item.text}
            </HeadingTag>
          </React.Fragment>
        )
      }
      case 'paragraph':
        return (
          <p key={index} className={`detail-content-paragraph${index === 0 ? ' detail-content-paragraph--lead' : ''}`}>
            {item.text}
          </p>
        )
      case 'list': {
        const validListItems = item.items?.filter(isValidDepartmentText) || []
        if (validListItems.length === 0) return null
        return (
          <React.Fragment key={index}>
            {/* SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} */}
            <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} -->` }} />
            <ul className="detail-content-list">
              {validListItems.map((li, idx) => (
                <li key={idx}>{li}</li>
              ))}
            </ul>
          </React.Fragment>
        )
      }
      case 'table': {
        const validRows = item.rows || []
        if (validRows.length === 0) return null

        return (
          <React.Fragment key={index}>
            {/* SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} */}
            <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} -->` }} />
            <div className="detail-table-wrapper">
              <table className="detail-content-table">
                <tbody>
                  {validRows.map((row, rIdx) => (
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
          </React.Fragment>
        )
      }
      case 'document':
        return null
      case 'image': {
        if (isPdfIconImage(item.src)) return null
        if (!item.src) return null
        
        const filename = getFileName(item.src)
        const isValid = isValidDepartmentImage(item.src, deptCode, item.alt, pageUrl)
        const localSrc = isValid ? resolveLocalScrapedImage(item.src) : null

        if (isValid && localSrc) {
          const isProfileImage = filename.includes('photo') || filename.includes('head') || filename.includes('kaliappan') || (item.alt || '').toLowerCase().includes('hod') || (item.alt || '').toLowerCase().includes('head') || (item.alt || '').toLowerCase().includes('principal')

          if (isProfileImage) {
            const nextItem = items[index + 1]
            const isNextHODHeading = nextItem && nextItem.type === 'heading' && ((nextItem.text || '').includes('Head') || (nextItem.text || '').includes('HOD') || (nextItem.text || '').includes('Professor'))
            const hodTitle = isNextHODHeading ? nextItem.text : null

            return (
              <React.Fragment key={index}>
                <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- IMG SOURCE: ${filename} | TYPE: profile | DEPT: ${deptCode.toUpperCase()} | VERIFIED: yes -->` }} />
                <div className="dept-profile-image-wrapper">
                  <figure className="detail-content-image dept-profile-figure" style={{ overflow: 'visible', background: 'transparent', border: 0, margin: 0, padding: 0 }}>
                    <TiltedCard
                      imageSrc={localSrc}
                      altText={item.alt || `${getDeptName(deptCode)} HOD`}
                      containerHeight="420px"
                      containerWidth="440px"
                      imageHeight="420px"
                      imageWidth="440px"
                      rotateAmplitude={5}
                      scaleOnHover={1.03}
                      showTooltip={false}
                    />
                  </figure>
                  <div className="dept-profile-caption">
                    <span className="dept-profile-badge">Department Head</span>
                    <p className="dept-profile-label" style={{ fontSize: '15px', color: '#64748b', fontWeight: 500, margin: '2px 0 4px 0' }}>{getDeptName(deptCode)}</p>
                    {hodTitle && (
                      <h3 className="hod-name-heading" style={{ margin: '6px 0 0 0', fontSize: '24px', fontWeight: 800, color: '#061846', letterSpacing: '-0.02em', lineHeight: '1.2', textTransform: 'uppercase' }}>
                        {hodTitle}
                      </h3>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )
          }

          return null
        } else {
          return null
        }
      }
      default:
        return null
    }
  })
}

export const OverviewSection: React.FC<SectionProps> = ({ deptCode, sectionName, content, pageUrl }) => {
  return (
    <section className="dept-section-overview" aria-label={`${sectionName} overview`}>
      {renderContentBlocks(content, deptCode, sectionName, pageUrl)}
    </section>
  )
}

export const AboutSection: React.FC<SectionProps> = ({ deptCode, sectionName, content, pageUrl }) => {
  return (
    <section className="dept-section-about" aria-label={`${sectionName} details`}>
      {renderContentBlocks(content, deptCode, sectionName, pageUrl)}
    </section>
  )
}

export const VisionMissionSection: React.FC<SectionProps> = ({ deptCode, sectionName, content, pageUrl }) => {
  return (
    <section className="dept-section-vision-mission" aria-label={`${sectionName} vision and mission`}>
      {renderContentBlocks(content, deptCode, sectionName, pageUrl)}
    </section>
  )
}

export const FacilitiesSection: React.FC<SectionProps> = ({ deptCode, sectionName, content, pageUrl }) => {
  return (
    <section className="dept-section-facilities" aria-label={`${sectionName} facilities`}>
      {renderContentBlocks(content, deptCode, sectionName, pageUrl)}
    </section>
  )
}

export const DefaultSection: React.FC<SectionProps> = ({ deptCode, sectionName, content, pageUrl }) => {
  return (
    <section className="dept-section-default" aria-label={sectionName}>
      {renderContentBlocks(content, deptCode, sectionName, pageUrl)}
    </section>
  )
}

interface FacultySectionProps {
  facultyMembers: { name: string; designation: string; qualification: string; email: string; image: string | null }[]
  deptName: string
  deptCode: string
  accentColor: string
  subpageUrl?: string
}

export const FacultySection: React.FC<FacultySectionProps> = ({ facultyMembers, deptName, deptCode: _deptCode, accentColor, subpageUrl }) => {
  return (
    <div className="faculty-section">
      <h2 className="faculty-section-title" style={{ borderColor: accentColor }}>
        Department of {deptName}
      </h2>
      <div className="faculty-grid-premium">
        {facultyMembers.map((fac, idx) => {
          const localSrc = resolveLocalScrapedImage(fac.image)

          // Extract qualification prefix (e.g. "Ph.D" or "M.E" or "M.Tech" etc.)
          const qual = fac.qualification || ''
          const match = qual.match(/^(ph\.d|m\.e\.|m\.s\.|m\.tech|m\.sc|m\.phil|b\.e\.|b\.tech|ms|phd)\s*(?:at|from|in)?\s*(.*)$/i)
          
          return (
            <article className="faculty-card-premium" key={idx}>
              {/* Left Side: Avatar Column with gradients & badges */}
              <div className="faculty-avatar-column-premium">
                <div className="avatar-gradient-bg">
                  {/* Dot Grid Top Left */}
                  <div className="avatar-dot-grid-tl"></div>
                  
                  {localSrc ? (
                    <img src={localSrc} alt={fac.name} className="avatar-img-premium" loading="lazy" />
                  ) : (
                    <div className="avatar-placeholder-premium"><User size={54} /></div>
                  )}
                  
                  {/* Golden curve border accent */}
                  <div className="avatar-gold-accent"></div>
                </div>
              </div>
              
              {/* Right Side: Info Column */}
              <div className="faculty-info-column-premium">
                {/* Dot Grid Top Right */}
                <div className="info-dot-grid-tr"></div>
                
                {/* Name */}
                <h3 className="faculty-name-premium">{fac.name.toUpperCase()}</h3>
                
                {/* Designation tag bar */}
                <div className="info-designation-bar-premium">
                  <div className="info-user-icon-box">
                    <User size={16} className="info-user-icon" />
                  </div>
                  <span className="faculty-role-premium">{fac.designation}</span>
                </div>
                
                <div className="info-divider-gold"></div>
                
                {/* Department row */}
                <div className="info-detail-row-premium">
                  <div className="detail-icon-box-premium">
                    <School size={16} />
                  </div>
                  <div className="detail-text-box-premium">
                    <span className="detail-label-premium">Department</span>
                    <span className="detail-value-premium">Department of {deptName}</span>
                  </div>
                </div>
                
                <div className="info-divider-gray"></div>
                
                {/* Qualification row */}
                <div className="info-detail-row-premium">
                  <div className="detail-icon-box-premium">
                    <GraduationCap size={16} />
                  </div>
                  <div className="detail-text-box-premium">
                    <span className="detail-label-premium">Qualification</span>
                    <span className="detail-value-premium">
                      {match ? (
                        <>
                          <strong>{match[1]}</strong> {match[2] ? `at ${match[2]}` : ''}
                        </>
                      ) : (
                        qual
                      )}
                    </span>
                  </div>
                </div>
                
                {/* View Profile Button at bottom right */}
                <a 
                  href={subpageUrl || '#'} 
                  onClick={(e) => {
                    e.preventDefault();
                    const event = new CustomEvent('view-faculty-profile', {
                      detail: { name: fac.name, departmentName: deptName, image: localSrc }
                    });
                    window.dispatchEvent(event);
                  }}
                  className="faculty-view-profile-btn-premium"
                >
                  <span className="btn-text">View Profile</span>
                  <span className="btn-arrow-circle">→</span>
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
