import { useState, useEffect } from 'react'
import { X, Mail, Phone, MapPin, BookOpen, Briefcase, Award, GraduationCap, ChevronRight, ExternalLink, Cpu, FileText, Users } from 'lucide-react'
import { facultyDataMap } from './facultyData'

interface FacultyProfilePageProps {
  facultyName: string
  departmentName: string
  facultyImage?: string | null
  onClose: () => void
}

export default function FacultyProfilePage({ facultyName, departmentName, facultyImage, onClose }: FacultyProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'education' | 'experience' | 'publications' | 'honours'>('about')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Normalize incoming facultyName to search in the map
  const normalizedQuery = (facultyName || '').toLowerCase().replace(/[\s.]/g, '')
  
  // Find key that matches
  const matchedKey = Object.keys(facultyDataMap).find(k => normalizedQuery.includes(k))
  
  // Look up profile data, fallback to generic template
  const data = matchedKey ? {
    ...facultyDataMap[matchedKey],
    image: facultyImage || facultyDataMap[matchedKey].image
  } : {
    name: (facultyName || '').toUpperCase(),
    designation: (facultyName || '').toLowerCase().includes('mariappan') ? 'Associate Professor' : 'Assistant Professor',
    department: `Department of ${departmentName || ''}`,
    email: `${(facultyName || '').toLowerCase().replace(/[\s.]/g, '')}@ritrjpm.ac.in`,
    secondaryEmail: '',
    mobile: 'Contact Admin',
    image: facultyImage || null,
    office: `RIT Campus, Department of ${departmentName}`,
    bioSummary: 'With decades of educational excellence, her research focuses on advancing computing, engineering education, and applied technologies.',
    researchAreas: ['Engineering Education', 'Applied Computing'],
    socials: [
      { label: 'Vidwan ID', url: 'https://ritrjpm.irins.org' }
    ],
    pdfUrl: null,
    education: [
      { degree: 'M.E / M.Tech', field: 'Engineering', university: 'Anna University', year: '-' }
    ],
    experience: [
      { role: 'Faculty Member', org: 'Ramco Institute of Technology', duration: 'Joined RIT' }
    ],
    metrics: null,
    projects: [],
    patents: [],
    honours: [],
    memberships: [],
    journalPubs: [
      'Journal publications and papers are listed in the official faculty file.'
    ],
    conferencePubs: [
      'Conference contributions are listed in the official database.'
    ]
  }

  return (
    <div className="faculty-profile-page-overlay">
      <div className="faculty-profile-container">
        {/* Top Navbar */}
        <header className="profile-navbar">
          <div className="profile-navbar-brand">
            <span className="brand-org">RIT FACULTY GATEWAY</span>
            <span className="brand-pipe">|</span>
            <span className="brand-user">{data.name}</span>
          </div>
          <button className="profile-close-btn" onClick={onClose} aria-label="Close profile page">
            <X size={20} />
            <span>Close</span>
          </button>
        </header>

        {/* Main Grid */}
        <main className="profile-main-grid">
          {/* Left Column: Card */}
          <aside className="profile-left-sidebar">
            <div className="profile-card-sticky">
              <div className="profile-avatar-container">
                {data.image ? (
                  <img src={data.image} alt={data.name} className="profile-avatar-img" />
                ) : (
                  <div className="profile-avatar-placeholder">
                    <GraduationCap size={72} />
                  </div>
                )}
              </div>

              <div className="profile-identity">
                <h1>{data.name}</h1>
                <span className="profile-title-tag">{data.designation}</span>
                <span className="profile-dept-tag">{data.department}</span>
              </div>

              <hr className="profile-card-divider" />

              <div className="profile-contact-details">
                <h3>Contact Details</h3>
                <div className="contact-item">
                  <Mail size={16} />
                  <div>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                    {data.secondaryEmail && <a href={`mailto:${data.secondaryEmail}`} className="sec-email">{data.secondaryEmail}</a>}
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>{data.mobile}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>{data.office}</span>
                </div>
              </div>

              <hr className="profile-card-divider" />

              <div className="profile-external-links">
                <h3>Academic & Research Profiles</h3>
                <div className="links-grid">
                  {data.socials.map((link) => (
                    <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="ext-profile-link">
                      <span>{link.label}</span>
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Content Details */}
          <section className="profile-right-content">
            {/* Navigation Tabs */}
            <div className="profile-tabs-header">
              <button className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
                <BookOpen size={16} />
                <span>Biography</span>
              </button>
              <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
                <GraduationCap size={16} />
                <span>Education</span>
              </button>
              <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
                <Briefcase size={16} />
                <span>Experience</span>
              </button>
              <button className={`tab-btn ${activeTab === 'publications' ? 'active' : ''}`} onClick={() => setActiveTab('publications')}>
                <Award size={16} />
                <span>Publications & Research</span>
              </button>
              <button className={`tab-btn ${activeTab === 'honours' ? 'active' : ''}`} onClick={() => setActiveTab('honours')}>
                <Award size={16} style={{ color: '#d97706' }} />
                <span>Honours & Awards</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="profile-tab-body">
              {activeTab === 'about' && (
                <div className="tab-pane-content fade-in">
                  <h2>Biography & Profile Summary</h2>
                  <p className="bio-lead">
                    {data.name} serves as the {data.designation} in the {data.department} at Ramco Institute of Technology. 
                    With decades of educational excellence, her research focuses on advancing computing, image processing, deep learning, and multivariate analysis.
                  </p>

                  {/* IRINS Metrics Panel */}
                  {data.metrics && (data.metrics.citationsScopus > 0 || data.metrics.journals > 0) && (
                    <div className="profile-section-box">
                      <h3>Research Impact & Statistics</h3>
                      <div className="metrics-dashboard-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        marginTop: '15px'
                      }}>
                        {data.metrics.hIndex > 0 && (
                          <div className="metric-dashboard-card color-hindex" style={{
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)',
                            border: '1px solid rgba(99, 102, 241, 0.25)',
                            borderRadius: '12px',
                            padding: '20px 16px',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            cursor: 'default',
                            boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.05), 0 2px 4px -1px rgba(99, 102, 241, 0.03)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 102, 241, 0.15), 0 4px 6px -2px rgba(99, 102, 241, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.05), 0 2px 4px -1px rgba(99, 102, 241, 0.03)';
                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)';
                          }}>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>h-index</h4>
                            <span style={{ fontSize: '32px', fontWeight: '800', color: '#4f46e5' }}>{data.metrics.hIndex}</span>
                          </div>
                        )}
                        <div className="metric-dashboard-card color-journals" style={{
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          borderRadius: '12px',
                          padding: '20px 16px',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          cursor: 'default',
                          boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.05), 0 2px 4px -1px rgba(16, 185, 129, 0.03)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(16, 185, 129, 0.15), 0 4px 6px -2px rgba(16, 185, 129, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(16, 185, 129, 0.05), 0 2px 4px -1px rgba(16, 185, 129, 0.03)';
                          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.25)';
                        }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Journal Publications</h4>
                          <span style={{ fontSize: '32px', fontWeight: '800', color: '#059669' }}>{data.metrics.journals}</span>
                        </div>
                        <div className="metric-dashboard-card color-conferences" style={{
                          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%)',
                          border: '1px solid rgba(245, 158, 11, 0.25)',
                          borderRadius: '12px',
                          padding: '20px 16px',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          cursor: 'default',
                          boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.05), 0 2px 4px -1px rgba(245, 158, 11, 0.03)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(245, 158, 11, 0.15), 0 4px 6px -2px rgba(245, 158, 11, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(245, 158, 11, 0.05), 0 2px 4px -1px rgba(245, 158, 11, 0.03)';
                          e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.25)';
                        }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Conference Proceedings</h4>
                          <span style={{ fontSize: '32px', fontWeight: '800', color: '#d97706' }}>{data.metrics.conferences}</span>
                        </div>
                        <div className="metric-dashboard-card color-total" style={{
                          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(192, 38, 211, 0.08) 100%)',
                          border: '1px solid rgba(236, 72, 153, 0.25)',
                          borderRadius: '12px',
                          padding: '20px 16px',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          cursor: 'default',
                          boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.05), 0 2px 4px -1px rgba(236, 72, 153, 0.03)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(236, 72, 153, 0.15), 0 4px 6px -2px rgba(236, 72, 153, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(236, 72, 153, 0.05), 0 2px 4px -1px rgba(236, 72, 153, 0.03)';
                          e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.25)';
                        }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#db2777', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Total Research Outputs</h4>
                          <span style={{ fontSize: '32px', fontWeight: '800', color: '#db2777' }}>{data.metrics.journals + data.metrics.conferences + data.metrics.bookChapters}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="profile-section-box">
                    <h3>Research & Domains of Interest</h3>
                    <div className="research-tags-container">
                      {data.researchAreas.map((area, idx) => (
                        <span key={idx} className="research-tag">{area}</span>
                      ))}
                    </div>
                  </div>

                  {data.pdfUrl && (
                    <div className="profile-section-box doc-pdf-box">
                      <h3>Original CV / Bio-data Source</h3>
                      <p>View the fully detailed official PDF bio-data statement for academic citation and credentials verification.</p>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
                        <a 
                          href={data.pdfUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="pdf-download-btn"
                          style={{ textDecoration: 'none' }}
                        >
                          <BookOpen size={16} />
                          <span>View Original Biodata PDF</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="tab-pane-content fade-in">
                  <h2>Educational Qualifications</h2>
                  <div className="profile-table-wrapper">
                    <table className="profile-data-table">
                      <thead>
                        <tr>
                          <th>Degree</th>
                          <th>Branch / Specialization</th>
                          <th>University / Institution</th>
                          <th>Passing Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.education.map((edu, idx) => (
                          <tr key={idx}>
                            <td><strong>{edu.degree}</strong></td>
                            <td>{edu.field}</td>
                            <td>{edu.university}</td>
                            <td><span className="table-year-tag">{edu.year}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="tab-pane-content fade-in">
                  <h2>Professional & Academic Experience</h2>
                  <div className="profile-timeline">
                    {data.experience.map((exp, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-info">
                          <span className="timeline-duration">{exp.duration}</span>
                          <h4>{exp.role}</h4>
                          <p>{exp.org}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'publications' && (
                <div className="tab-pane-content fade-in">
                  <h2>Research, Publications & IP Portfolio</h2>

                  {/* Research Projects */}
                  {data.projects && data.projects.length > 0 && (
                    <div className="profile-section-box">
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Cpu size={18} style={{ color: '#061846' }} />
                        <span>Funded Research Projects</span>
                      </h3>
                      <div style={{ marginTop: '12px' }}>
                        {data.projects.map((proj, idx) => (
                          <div key={idx} style={{
                            background: 'rgba(6, 24, 70, 0.03)',
                            border: '1.5px solid #e2d8c9',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '15px'
                          }}>
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#061846', fontWeight: 700 }}>
                              {proj.title}
                            </h4>
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: '12px',
                              fontSize: '14px'
                            }}>
                              <div><strong>Funding Agency:</strong> {proj.agency}</div>
                              <div><strong>Status:</strong> <span style={{ color: '#059669', fontWeight: 600 }}>{proj.status}</span></div>
                              <div><strong>Role:</strong> {proj.role}</div>
                              <div><strong>Grant/Budget:</strong> {proj.budget}</div>
                              <div><strong>Duration:</strong> {proj.duration}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Patents Section */}
                  {data.patents && data.patents.length > 0 && (
                    <div className="profile-section-box" style={{ marginTop: '30px' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={18} style={{ color: '#d97706' }} />
                        <span>Patents Portfolio ({data.patents.length} Patents)</span>
                      </h3>
                      <div style={{ marginTop: '12px' }}>
                        {data.patents.map((pat, idx) => (
                          <div key={idx} style={{
                            background: '#ffffff',
                            border: '1px solid #e2d8c9',
                            borderRadius: '10px',
                            padding: '16px',
                            marginBottom: '12px'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#0f172a', fontWeight: 700, flex: '1' }}>
                                {pat.title}
                              </h4>
                              <span style={{
                                background: pat.status === 'Published' ? '#dcfce7' : '#fef9c3',
                                color: pat.status === 'Published' ? '#166534' : '#854d0e',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 700
                              }}>
                                {pat.status}
                              </span>
                            </div>
                            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#475569' }}>
                              <strong>Inventors:</strong> {pat.inventors}
                            </p>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '12px',
                              color: '#64748b',
                              borderTop: '1px solid #f1f5f9',
                              paddingTop: '8px'
                            }}>
                              <span><strong>Patent/App ID:</strong> {pat.number}</span>
                              <span><strong>Filed:</strong> {pat.filedDate} {pat.date && `| Published: ${pat.date}`}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Publications */}
                  <div className="profile-section-box" style={{ marginTop: '30px' }}>
                    <h3>Selected Journal Publications ({data.journalPubs.length}+ items)</h3>
                    <ul className="pubs-list">
                      {data.journalPubs.map((pub, idx) => (
                        <li key={idx}>
                          <ChevronRight size={14} className="pub-chevron" />
                          <span>{pub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="profile-section-box" style={{ marginTop: '30px' }}>
                    <h3>Selected Conference Publications ({data.conferencePubs.length}+ items)</h3>
                    <ul className="pubs-list">
                      {data.conferencePubs.map((pub, idx) => (
                        <li key={idx}>
                          <ChevronRight size={14} className="pub-chevron" />
                          <span>{pub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'honours' && (
                <div className="tab-pane-content fade-in">
                  <h2>Honours, Awards & Memberships</h2>

                  {/* Honours & Awards */}
                  {data.honours && data.honours.length > 0 && (
                    <div className="profile-section-box">
                      <h3>Honours and Awards</h3>
                      <div className="profile-timeline" style={{ marginTop: '15px' }}>
                        {data.honours.map((hon, idx) => (
                          <div key={idx} className="timeline-item">
                            <div className="timeline-dot" style={{ backgroundColor: '#d97706' }} />
                            <div className="timeline-info">
                              <span className="timeline-duration" style={{ background: '#fef3c7', color: '#b45309' }}>{hon.year}</span>
                              <h4>{hon.title}</h4>
                              <p>{hon.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Professional Memberships */}
                  {data.memberships && data.memberships.length > 0 && (
                    <div className="profile-section-box" style={{ marginTop: '30px' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Users size={18} style={{ color: '#061846' }} />
                        <span>Membership in Professional Bodies</span>
                      </h3>
                      <div style={{ marginTop: '15px' }}>
                        {data.memberships.map((memb, idx) => (
                          <div key={idx} style={{
                            background: '#ffffff',
                            border: '1px solid #e2d8c9',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px'
                          }}>
                            <div>
                              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#061846', fontWeight: 700 }}>
                                {memb.body}
                              </h4>
                              <span style={{ fontSize: '13px', color: '#475569' }}>{memb.details}</span>
                            </div>
                            <span style={{
                              background: 'rgba(6, 24, 70, 0.08)',
                              color: '#061846',
                              padding: '4px 10px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 700
                            }}>
                              Since {memb.year}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}