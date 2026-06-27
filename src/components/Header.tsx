import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowRight, BookOpen, GraduationCap, Briefcase, Trophy, Cpu, Phone, Mail, MapPin, Award, type LucideIcon } from 'lucide-react'
import { Button } from './ui/button'
import { navItems } from '../data/constants'

// Complete sub-menu items mapping categories to their scraped page keys
const subMenus: Record<string, { label: string; key: string }[]> = {
  'About': [
    { label: 'Ramco Group', key: 'about-ramco-group' },
    { label: 'Trusts', key: 'about-trusts' },
    { label: 'Governing Council', key: 'about-governing-council' },
    { label: "Founder Chairman's Message", key: 'about-founder-chairman-message' },
    { label: "Chairman's Message", key: 'about-chairman-message' },
    { label: "Director's Message", key: 'about-director-message' },
    { label: "Principal's Message", key: 'about-principal-message' },
    { label: 'Mandatory Disclosure', key: 'about-mandatory-disclosure' },
    { label: 'Information Brochure', key: 'about-information-brochure' },
    { label: 'Quality Policy', key: 'about-quality-policy' },
    { label: 'RIT e-Projects', key: 'about-rit-e-projects' },
  ],
  'Admission': [
    { label: 'Admission Policy / Eligibility', key: 'admission-policy' },
    { label: 'Online Enquiry Form', key: 'admission-enquiry' },
    { label: 'Scholarship / Incentives', key: 'admission-scholarship-incentives' },
    { label: 'Govt. Scholarships', key: 'admission-scholarships-gov' },
    { label: 'Admission Brochure', key: 'admission-brochure' },
  ],
  'Departments': [
    { label: 'B.Tech AI & Data Science', key: 'departments-aids' },
    { label: 'CSE (AI & ML)', key: 'departments-aiml' },
    { label: 'Civil Engineering', key: 'departments-civil' },
    { label: 'Computer Science & Engg', key: 'departments-cse' },
    { label: 'Electrical & Electronics Engg', key: 'departments-eee' },
    { label: 'Electronics & Communication Engg', key: 'departments-ece' },
    { label: 'Mechanical Engineering', key: 'departments-mech' },
    { label: 'B.Tech CS & Business Systems', key: 'departments-csbs' },
    { label: 'B.Tech Information Technology', key: 'departments-it' },
    { label: 'Physics (S&H)', key: 'departments-physics' },
    { label: 'Chemistry (S&H)', key: 'departments-chemistry' },
    { label: 'Mathematics (S&H)', key: 'departments-maths' },
    { label: 'English (S&H)', key: 'departments-english' },
  ],
  'Academics': [
    { label: 'Academic Schedule', key: 'academics-schedule' },
    { label: 'Curriculum & Syllabus', key: 'academics-curriculum' },
    { label: 'Anna Univ Regulation', key: 'academics-regulation' },
  ],
  'Placements': [
    { label: 'Training & Placement Centre', key: 'placements-training-centre' },
    { label: 'Objective', key: 'placements-objective' },
    { label: 'Placement Policy', key: 'placements-policy' },
    { label: 'Placement Procedure', key: 'placements-procedure' },
    { label: 'Hiring Process', key: 'placements-hiring-process' },
    { label: 'Placement Training', key: 'placements-training' },
    { label: 'Placement List (2024-2025)', key: 'placements-list' },
    { label: 'Placement Statistics', key: 'placements-statistics' },
    { label: 'Cisco Ideathon', key: 'placements-ideathon' },
    { label: 'Placement Prospectus', key: 'placements-prospectus' },
    { label: "Placement MoU's", key: 'placements-mous' },
  ],
  'Infrastructure': [
    { label: 'Library', key: 'infrastructure-library' },
    { label: 'Hostel', key: 'infrastructure-hostel' },
    { label: 'Transport', key: 'infrastructure-transport' },
    { label: 'Seminar Hall/VC', key: 'infrastructure-seminar-hall' },
    { label: 'Cafeteria', key: 'infrastructure-cafeteria' },
    { label: 'Sports', key: 'infrastructure-sports' },
    { label: 'Gym', key: 'infrastructure-gym' },
    { label: 'Health Centre', key: 'infrastructure-health-centre' },
    { label: 'Stationery Store', key: 'infrastructure-stationery' },
    { label: 'Outstanding Facilities', key: 'infrastructure-outstanding' },
    { label: 'Student Clubs & Societies', key: 'infrastructure-clubs' },
    { label: 'Auditorium', key: 'infrastructure-auditorium' },
    { label: 'ATM Facility', key: 'infrastructure-atm' },
  ],
  'Activities': [
    { label: 'Awards & Achievements', key: 'activities-awards' },
    { label: 'Professional Societies', key: 'activities-societies' },
    { label: 'Clubs & NSS', key: 'activities-clubs-nss' },
    { label: 'EDC/NISP', key: 'activities-edc' },
    { label: 'College Magazine', key: 'activities-magazine' },
    { label: 'Weekly News Letter', key: 'activities-newsletter' },
    { label: 'IITM PALS', key: 'activities-iitm-pals' },
    { label: 'NCC', key: 'activities-ncc' },
    { label: 'Extension Activities', key: 'activities-extension' },
    { label: 'RIT-RedHat Academy', key: 'activities-redhat' },
    { label: 'Higher Education Details', key: 'activities-higher-education' },
    { label: 'OER Resources', key: 'activities-oer' },
  ],
  'Research': [
    { label: 'Overview', key: 'research-overview' },
    { label: 'RC Policy', key: 'research-policy' },
    { label: 'PhD Awarded', key: 'research-phd-awarded' },
    { label: 'Publications', key: 'research-publications' },
    { label: 'Sponsored Projects', key: 'research-sponsored-projects' },
    { label: 'IPR', key: 'research-ipr' },
    { label: 'AU Recognized Supervisors', key: 'research-supervisors' },
    { label: 'Consultancy', key: 'research-consultancy' },
    { label: 'Research Incentives', key: 'research-incentives' },
  ],
  'IIIC': [
    { label: 'Vision, Mission & Quality', key: 'iic-vision-mission' },
    { label: 'Department Coordinators', key: 'iic-coordinators' },
    { label: 'Institute-Industry MoU', key: 'iic-industry-mou' },
    { label: 'Institute-Institute MoU', key: 'iic-institute-mou' },
    { label: 'MoU Activities', key: 'iic-mou-activities' },
  ],
  'IDEA Lab': [
    { label: 'Vision of AICTE IDEA LAB', key: 'idealab-vision' },
    { label: 'Members', key: 'idealab-members' },
    { label: 'Facilities', key: 'idealab-facilities' },
    { label: 'Activities/Events', key: 'idealab-activities' },
    { label: 'Tender Details', key: 'idealab-tenders' },
  ]
}

// Sidecards details for each Mega Menu Category
const menuHighlights: Record<string, { title: string; desc: string; stat?: string; icon: LucideIcon }> = {
  'About': { title: 'Excellence Since 2013', desc: 'RIT was founded by the prestigious Ramco Group to build engineering leaders.', icon: GraduationCap },
  'Admission': { title: 'Admissions Open 2026-27', desc: 'Apply today for B.E/B.Tech and M.E degrees. Various scholarships available.', stat: 'Counselling Code 4678', icon: BookOpen },
  'Departments': { title: '9 Specializations', desc: 'Modern academic laboratories and highly qualified faculty members.', stat: '27 Research Labs', icon: Cpu },
  'Academics': { title: 'Industry-Aligned', desc: 'Innovative curriculum focused on building practical, job-ready capabilities.', icon: Trophy },
  'Placements': { title: 'Outstanding Outcomes', desc: 'Join top MNC recruits with industry-leading CTC options.', stat: '92% Placement Rate', icon: Briefcase },
  'Infrastructure': { title: 'Smart Green Campus', desc: 'World-class academic buildings, advanced laboratories, and hostels.', stat: '100% Eco-Friendly', icon: GraduationCap },
  'Activities': { title: 'Vibrant Campus Life', desc: 'Participate in professional societies, technical clubs, NCC and sports.', icon: Trophy },
  'Research': { title: 'Innovation Focus', desc: 'Funded projects, consultancy services and active research centers.', stat: '120+ Awards', icon: Cpu },
  'IIIC': { title: 'Active Industry Connect', desc: 'MoUs and joint initiatives with prominent industrial companies.', icon: Briefcase },
  'IDEA Lab': { title: 'AICTE Sponsored', desc: 'First-of-its-kind digital prototyping lab supporting student innovators.', stat: '₹1.1 Crore Lab', icon: Cpu }
}

interface HeaderProps {
  onSelectPage: (key: string) => void
}

export default function Header({ onSelectPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})

  const toggleMobileExpand = (label: string) => {
    setMobileExpanded(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <>
      <header className="site-header">
        {/* Top Info Bar */}
        <div className="header-top-bar">
          <div className="top-bar-container">
            <div className="nav-contact-group">
              <a href="tel:+914563233400"><Phone size={13} /> 04563 233400 / 04563 233401</a>
              <a href="mailto:rit@ritrjpm.ac.in"><Mail size={13} /> rit@ritrjpm.ac.in</a>
              <span className="nav-location"><MapPin size={13} /> Rajapalayam, Tamil Nadu</span>
            </div>
            <div className="nav-counselling-code" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.03em' }}>
              <Award size={13} style={{ color: '#fbbf24' }} />
              <span>Counselling Code : 4678</span>
            </div>
            <div className="nav-quick-links">
              {['Students', 'Parents', 'Faculty', 'Alumni', 'ERP Portal'].map((item) => (
                <a href="#home" key={item}>{item}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="navbar unified-nav" aria-label="Primary navigation">
          {/* Center: Navigation Links */}
          <div className="nav-links">
            {navItems.map((item) => {
              const menuKey = item.label === 'IIIC' ? 'IIIC' : item.label
              const items = subMenus[menuKey]

              return (
                <div className="nav-item-container" key={item.label}>
                  <a
                    href={item.href}
                    className={`${item.label === 'Home' ? 'active' : ''} ${activeSubmenu === item.label ? 'hover-active' : ''}`}
                    onClick={(e) => {
                      if (items) {
                        e.preventDefault()
                        setActiveSubmenu(prev => prev === item.label ? null : item.label)
                      }
                    }}
                  >
                    {item.label}
                    {items && (
                      <ChevronDown
                        size={12}
                        className="chevron"
                        style={{
                          transform: activeSubmenu === item.label ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease',
                          marginLeft: '4px'
                        }}
                      />
                    )}
                  </a>
                </div>
              )
            })}
          </div>

          {/* Right: Actions */}
          <div className="nav-actions">
            <Button asChild className="apply-button">
              <a href="https://www.ritrjpm.ac.in/onlineapplication/" target="_blank" rel="noreferrer">
                Apply Now <ArrowRight size={14} />
              </a>
            </Button>
            <Button variant="secondary" size="icon" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu />
            </Button>
          </div>
        </nav>
      </header>

      {/* Glassmorphic Side Navigation Drawer */}
      <AnimatePresence>
        {activeSubmenu && subMenus[activeSubmenu === 'IIIC' ? 'IIIC' : activeSubmenu] && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubmenu(null)}
            />

            {/* Drawer panel */}
            <motion.div
              className="nav-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            >
              {/* Premium Background Glow Effect circles */}
              <div className="drawer-glow-1" />
              <div className="drawer-glow-2" />

              <div className="drawer-header">
                <div>
                  <span className="drawer-category-meta">EXPLORE SECTION</span>
                  <h2>{activeSubmenu}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveSubmenu(null)}
                  className="drawer-close-btn"
                  aria-label="Close drawer"
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="drawer-content">
                {/* Showcase Highlight Card */}
                {menuHighlights[activeSubmenu] && (
                  <div className="drawer-highlight">
                    <div className="highlight-card">
                      <div className="highlight-icon">
                        {(() => {
                          const Icon = menuHighlights[activeSubmenu].icon
                          return <Icon size={24} />
                        })()}
                      </div>
                      <h3>{menuHighlights[activeSubmenu].title}</h3>
                      <p>{menuHighlights[activeSubmenu].desc}</p>
                      {menuHighlights[activeSubmenu].stat && (
                        <div className="highlight-badge">
                          {menuHighlights[activeSubmenu].stat}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Submenu Links list */}
                <div className="drawer-links-section">
                  <h3>Available Sections</h3>
                  <div className="drawer-links-list">
                    {subMenus[activeSubmenu === 'IIIC' ? 'IIIC' : activeSubmenu].map((subItem, index) => {
                      const itemNumber = String(index + 1).padStart(2, '0')
                      return (
                        <button
                          key={subItem.key}
                          onClick={() => {
                            onSelectPage(subItem.key)
                            setActiveSubmenu(null)
                          }}
                          className="drawer-dropdown-link"
                        >
                          <span className="link-number">{itemNumber}</span>
                          <span className="text">{subItem.label}</span>
                          <ArrowRight size={16} className="link-arrow" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className="overlay-menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="overlay-header">
              <strong>Navigation Menu</strong>
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X />
              </Button>
            </div>

            <div className="overlay-links-container">
              {navItems.map((item) => {
                const menuKey = item.label === 'IIIC' ? 'IIIC' : item.label
                const items = subMenus[menuKey]
                const isExpanded = mobileExpanded[item.label]

                return (
                  <div key={item.label} className="mobile-nav-group">
                    {items ? (
                      <>
                        <button
                          className="mobile-group-title"
                          onClick={() => toggleMobileExpand(item.label)}
                        >
                          <span>{item.label}</span>
                          <ChevronDown size={18} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                        </button>
                        {isExpanded && (
                          <div className="mobile-sub-links">
                            {items.map((subItem) => (
                              <button
                                key={subItem.key}
                                onClick={() => {
                                  onSelectPage(subItem.key)
                                  setMenuOpen(false)
                                }}
                                className="mobile-sub-link"
                              >
                                {subItem.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <a href={item.href} onClick={() => setMenuOpen(false)} className="mobile-group-title-link">
                        {item.label}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
