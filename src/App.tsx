import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import QuickLinksBar from './components/QuickLinksBar'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import Marquee from './components/Marquee'
import About from './components/About'
import Research from './components/Research'
import DepartmentsInterest from './components/DepartmentsInterest'
import Events from './components/Events'
import Placements from './components/Placements'
import CampusLife from './components/CampusLife'
import GraduationPhotos from './components/GraduationPhotos'
import Footer from './components/Footer'
import DetailOverlay from './components/DetailOverlay'
import LoadingScreen from './components/LoadingScreen'
import FacultyProfilePage from './components/FacultyProfilePage'
import { CMSProvider, useCMS } from './components/CMSContext'
import { LoginModal, AnalyticsModal } from './components/CMSModals'
import './App.css'

function AppContent() {
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [activePageKey, setActivePageKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, logout } = useCMS()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)
  const [activeFacultyProfile, setActiveFacultyProfile] = useState<{ name: string; departmentName: string; image?: string | null } | null>(null)

  useEffect(() => {
    const handleViewProfile = (e: Event) => {
      const customEvent = e as CustomEvent<{ name: string; departmentName: string; image?: string | null }>
      setActiveFacultyProfile(customEvent.detail)
    }
    window.addEventListener('view-faculty-profile', handleViewProfile)
    return () => {
      window.removeEventListener('view-faculty-profile', handleViewProfile)
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Admin Banner */}
          {isAuthenticated && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '40px',
                background: 'rgba(9, 14, 27, 0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#ec0a78' }}>🛠️</span>
                <span>Admin Edit Mode Active</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setIsAnalyticsOpen(true)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
                >
                  View Analytics
                </button>
                <button
                  onClick={() => setIsAdminPanelOpen(true)}
                  style={{
                    background: 'rgba(45, 212, 191, 0.15)',
                    border: '1px solid rgba(45, 212, 191, 0.3)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    color: '#2dd4bf',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(45, 212, 191, 0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(45, 212, 191, 0.15)')}
                >
                  CMS Dashboard
                </button>
                <button
                  onClick={logout}
                  style={{
                    background: 'rgba(244, 63, 94, 0.15)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    color: '#f43f5e',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.15)')}
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          <main style={isAuthenticated ? { paddingTop: '40px' } : {}}>
            <motion.div className="scroll-progress" style={{ scaleX: progress }} />
            <Header onSelectPage={setActivePageKey} />
            <Hero />
            <QuickLinksBar />
            <Dashboard />
            <Marquee />
            <About />
            <Research />
            <DepartmentsInterest onSelectPage={setActivePageKey} />
            <Events />
            <Placements />
            <CampusLife />
            <GraduationPhotos />
            <Footer onOpenAdmin={() => {
              navigate('/admin')
            }} />

            {/* Render the full-screen Detail Overlay when a page key is active */}
            <DetailOverlay pageKey={activePageKey} onClose={() => setActivePageKey(null)} />

            {activeFacultyProfile && (
              <FacultyProfilePage 
                facultyName={activeFacultyProfile.name}
                departmentName={activeFacultyProfile.departmentName}
                facultyImage={activeFacultyProfile.image}
                onClose={() => setActiveFacultyProfile(null)}
              />
            )}

            {/* Modals */}
            <AnimatePresence>
              {isLoginOpen && (
                <LoginModal onClose={() => setIsLoginOpen(false)} />
              )}
              {isAnalyticsOpen && (
                <AnalyticsModal onClose={() => setIsAnalyticsOpen(false)} />
              )}
              {isAdminPanelOpen && (
                <AdminPanel onClose={() => setIsAdminPanelOpen(false)} />
              )}
            </AnimatePresence>
          </main>
        </motion.div>
      )}
    </>
  )
}

const AdminRoute = () => {
  const { isAuthenticated } = useCMS()
  const navigate = useNavigate()
  
  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  
  return (
    <div style={{ background: '#090e1b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoginModal onClose={() => navigate('/')} />
    </div>
  )
}

export default function App() {
  return (
    <CMSProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </CMSProvider>
  )
}


