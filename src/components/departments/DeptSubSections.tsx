import React from 'react'
import { FileText, ExternalLink } from 'lucide-react'
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
  rows?: string[][]
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

function getImageType(filename: string, alt: string): 'lab' | 'award' | 'event' {
  const f = filename.toLowerCase()
  const a = alt.toLowerCase()
  if (f.includes('lab') || f.includes('facility') || f.includes('equip') || a.includes('lab') || a.includes('facility')) {
    return 'lab'
  }
  if (f.includes('award') || f.includes('achieve') || f.includes('win') || a.includes('award') || a.includes('achieve')) {
    return 'award'
  }
  return 'event'
}

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
        return (
          <React.Fragment key={index}>
            {/* SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} */}
            <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} -->` }} />
            <HeadingTag className="detail-content-heading">
              {item.text}
            </HeadingTag>
          </React.Fragment>
        )
      }
      case 'paragraph':
        return (
          <React.Fragment key={index}>
            {/* SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} */}
            <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} -->` }} />
            <p className="detail-content-paragraph">
              {item.text}
            </p>
          </React.Fragment>
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
        const validRows = item.rows?.filter(row => {
          return row.every(cell => isValidDepartmentText(cell))
        }) || []
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
                      {row.map((cell, cIdx) => (
                        rIdx === 0 ? <th key={cIdx}>{cell}</th> : <td key={cIdx}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        )
      }
      case 'document':
        return (
          <React.Fragment key={index}>
            {/* SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} */}
            <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- SOURCE: scraped | DEPT: ${deptCode.toUpperCase()} | SECTION: ${sectionName} -->` }} />
            <div className="detail-document-card">
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
          </React.Fragment>
        )
      case 'image': {
        if (isPdfIconImage(item.src)) return null
        if (!item.src) return null
        
        const filename = getFileName(item.src)
        const isValid = isValidDepartmentImage(item.src, deptCode, item.alt, pageUrl)
        const localSrc = isValid ? resolveLocalScrapedImage(item.src) : null

        if (isValid && localSrc) {
          const type = getImageType(filename, item.alt || '')
          const caption = item.alt && item.alt !== 'Image' ? item.alt : undefined
          return (
            <React.Fragment key={index}>
              {/* IMG SOURCE: ${filename} | TYPE: ${type} | DEPT: ${deptCode.toUpperCase()} | VERIFIED: yes */}
              <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- IMG SOURCE: ${filename} | TYPE: ${type} | DEPT: ${deptCode.toUpperCase()} | VERIFIED: yes -->` }} />
              <figure className="detail-content-image" style={{ overflow: 'visible', background: 'transparent' }}>
                <TiltedCard
                  imageSrc={localSrc}
                  altText={item.alt || `${getDeptName(deptCode)} image`}
                  captionText={caption}
                  containerHeight="auto"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.03}
                  showTooltip={Boolean(caption)}
                />
              </figure>
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment key={index}>
              {/* UNCLASSIFIED IMAGE: ${filename} - manual review */}
              <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- UNCLASSIFIED IMAGE: ${filename} - manual review -->` }} />
            </React.Fragment>
          )
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
