import { useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import QuickLinksBar from './components/QuickLinksBar'
import Dashboard from './components/Dashboard'
import Marquee from './components/Marquee'
import About from './components/About'
import Research from './components/Research'
import Events from './components/Events'
import Placements from './components/Placements'
import CampusLife from './components/CampusLife'
import Footer from './components/Footer'
import DetailOverlay from './components/DetailOverlay'
import LoadingScreen from './components/LoadingScreen'
import { CMSProvider, useCMS } from './components/CMSContext'
import { LoginModal, AnalyticsModal } from './components/CMSModals'
import './App.css'

function AppContent() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [activePageKey, setActivePageKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, logout } = useCMS()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)

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
            <Events />
            <Placements />
            <CampusLife />
            <Footer onOpenAdmin={() => {
              if (isAuthenticated) {
                alert("You are already logged in as Admin.")
              } else {
                setIsLoginOpen(true)
              }
            }} />

            {/* Render the full-screen Detail Overlay when a page key is active */}
            <DetailOverlay pageKey={activePageKey} onClose={() => setActivePageKey(null)} />

            {/* Modals */}
            <AnimatePresence>
              {isLoginOpen && (
                <LoginModal onClose={() => setIsLoginOpen(false)} />
              )}
              {isAnalyticsOpen && (
                <AnalyticsModal onClose={() => setIsAnalyticsOpen(false)} />
              )}
            </AnimatePresence>
          </main>
        </motion.div>
      )}
    </>
  )
}

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  )
}


