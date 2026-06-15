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
import Admin from './components/Admin'
import Footer from './components/Footer'
import DetailOverlay from './components/DetailOverlay'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [activePageKey, setActivePageKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
          <main>
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
            <Admin />
            <Footer />

            {/* Render the full-screen Detail Overlay when a page key is active */}
            <DetailOverlay pageKey={activePageKey} onClose={() => setActivePageKey(null)} />
          </main>
        </motion.div>
      )}
    </>
  )
}

export default App

