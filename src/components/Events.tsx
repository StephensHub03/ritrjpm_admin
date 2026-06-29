import { useEffect, useRef, useState } from 'react'
import { Calendar, ArrowUpRight, BookOpen, GraduationCap, Award, Code, Cpu, Scale, Leaf, Edit } from 'lucide-react'
import { resolveLocalScrapedImage } from '../utils/localScrapedImages'
import { useCMS } from './CMSContext'
import { EditEventsModal } from './CMSModals'

const iconMap: Record<string, any> = {
  BookOpen, GraduationCap, Award, Code, Cpu, Scale, Leaf, Calendar
}

export default function Events() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)
  const { eventsList, isAuthenticated } = useCMS()
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const interval = setInterval(() => {
      if (isHovered.current) return

      const firstCard = track.firstElementChild as HTMLElement
      if (!firstCard) return

      const cardWidth = firstCard.offsetWidth
      const gap = 16 // CSS gap size
      const scrollAmount = cardWidth + gap

      const { scrollLeft, scrollWidth, clientWidth } = track
      
      // Calculate the current active index from the scroll position
      const currentIndex = Math.round(scrollLeft / scrollAmount)
      let nextIndex = currentIndex + 1

      // If the next card exceeds the scrollable area, wrap back to the beginning
      if (nextIndex * scrollAmount + clientWidth > scrollWidth + 10) {
        nextIndex = 0
      }

      track.scrollTo({
        left: nextIndex * scrollAmount,
        behavior: 'smooth'
      })
    }, 3000) // Autoplay scrolls every 3 seconds

    const handleMouseEnter = () => {
      isHovered.current = true
    }
    const handleMouseLeave = () => {
      isHovered.current = false
    }

    track.addEventListener('mouseenter', handleMouseEnter)
    track.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearInterval(interval)
      track.removeEventListener('mouseenter', handleMouseEnter)
      track.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [eventsList])

  return (
    <section className="events-section reveal-section" id="events" style={{ position: 'relative' }}>
      {isAuthenticated && (
        <button 
          className="admin-edit-btn" 
          style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}
          onClick={() => setIsEditOpen(true)}
        >
          <Edit size={16} /> Edit Events
        </button>
      )}

      <div className="events-header">
        <div>
          <h2>Milestones, Hackathons & Campus Highlights</h2>
        </div>
      </div>
      
      <div className="events-track" ref={trackRef}>
        {eventsList.map((event, index) => {
          const IconComponent = iconMap[event.icon] || Calendar
          return (
            <a 
              href={event.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`event-card category-${event.category.toLowerCase().replace(/\s+/g, '-')}`} 
              key={`${event.title}-${index}`}
            >
              <div className="event-img-container">
                {(() => {
                  const resolvedImg = resolveLocalScrapedImage(event.image) || event.image;
                  const filename = resolvedImg.split('/').pop() || '';
                  return (
                    <>
                       {/* SCRAPED IMAGE MATCHED: {filename} | Event: {event.title} */}
                       <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- SCRAPED IMAGE MATCHED: ${filename} | Event: ${event.title} -->` }} />
                       <img src={resolvedImg} alt={event.title} className="event-img" loading="lazy" />
                    </>
                  );
                })()}
              </div>
              
              <div className="event-content">
                <div className="event-meta">
                  <span className="event-category">
                    <IconComponent size={12} className="meta-icon" />
                    <span>{event.category}</span>
                  </span>
                  <span className="event-date">
                    <Calendar size={11} />
                    <span>{event.date}</span>
                  </span>
                </div>
                
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                
                <div className="event-action-link">
                  <span>View Event Report (PDF)</span>
                  <ArrowUpRight size={14} className="arrow-icon" />
                </div>
              </div>
            </a>
          )
        })}
      </div>

      {isEditOpen && <EditEventsModal onClose={() => setIsEditOpen(false)} />}
    </section>
  )
}
