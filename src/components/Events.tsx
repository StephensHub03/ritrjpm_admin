import { useEffect, useRef } from 'react'
import { Calendar, ArrowUpRight, BookOpen, GraduationCap, Award, Code, Cpu, Scale, Leaf } from 'lucide-react'

const latestEvents = [
  {
    title: 'Technical Information Presentation Training',
    date: '2025-2026',
    category: 'Training',
    icon: BookOpen,
    description: 'Specialized training programme on standard operating procedures and best practices for displaying technical information.',
    image: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/Display_TI.jpg',
    link: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/Event_Display_TI.pdf',
  },
  {
    title: 'Enterprise Application Development Lecture',
    date: '2025-2026',
    category: 'Guest Lecture',
    icon: GraduationCap,
    description: 'ACM guest lecture detailing modern patterns, frameworks, and deployment strategies for enterprise-grade applications.',
    image: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/ACM_GuestLecture_Poster.jpg',
    link: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/ACM_GuestLecture_Report.pdf',
  },
  {
    title: 'NLP for Modern AI Systems FDP',
    date: '2025-2026',
    category: 'FDP',
    icon: Award,
    description: 'Faculty Development Programme centered on Natural Language Processing architectures, transformer models, and semantic search.',
    image: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/FDP_Poster.jpg',
    link: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/FDP_Report.pdf',
  },
  {
    title: 'Workshop on Exploring Generative AI',
    date: '2025-2026',
    category: 'Workshop',
    icon: Code,
    description: 'ISTE sponsored national workshop exploring generative algorithms, prompt design, and practical applications of LLMs.',
    image: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/ISTE_ExploringGenAi_Poster.jpg',
    link: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/ISTE_GenAI_workshop_Report.pdf',
  },
  {
    title: 'Robotics and Internet of Things Seminar',
    date: '2025-2026',
    category: 'Seminar',
    icon: Cpu,
    description: 'Two-day national online seminar focusing on autonomous robotic system controls, sensor networks, and IoT cloud platforms.',
    image: 'https://www.ritrjpm.ac.in/images/mechanical/2025-2026/Latest_Event_IORT.png',
    link: 'https://www.ritrjpm.ac.in/images/mechanical/2025-2026/IoRT_Post_Event_report.pdf',
  },
  {
    title: 'Rule of Law and Criminal Justice System',
    date: '2025-2026',
    category: 'Seminar',
    icon: Scale,
    description: 'An educational seminar exploring legal foundations, constitutional rights, and modern reforms in the criminal justice system.',
    image: 'https://www.ritrjpm.ac.in/images/course/event_rule_of_law.jpg',
    link: 'https://www.ritrjpm.ac.in/images/course/law_report.pdf',
  },
  {
    title: 'Recent Trends in Green Chemistry',
    date: '2025-2026',
    category: 'Workshop',
    icon: Award,
    description: 'One-day workshop discussing clean chemical processes, sustainable designs, and environmental safety guidelines.',
    image: 'https://www.ritrjpm.ac.in/images/course/GC1.jpg',
    link: 'https://www.ritrjpm.ac.in/departments/chemistry/chemistry-program-organized-chemistry-program-participation.php',
  },
  {
    title: 'Tree Plantation by Eco Club',
    date: '2025-2026',
    category: 'Eco Activity',
    icon: Leaf,
    description: 'Sustainable campus drive promoting green coverage, conservation awareness, and active community environmental care.',
    image: 'https://www.ritrjpm.ac.in/images/course/tree2.jpg',
    link: 'https://www.ritrjpm.ac.in/images/EcoClub%20word.pdf',
  }
]

export default function Events() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)

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
  }, [])

  return (
    <section className="events-section reveal-section" id="events">
      <div className="events-header">
        <div>
          <div className="section-label">03 / Latest Events</div>
          <h2>Milestones, Hackathons & Campus Highlights</h2>
        </div>
      </div>
      
      <div className="events-track" ref={trackRef}>
        {latestEvents.map((event, index) => {
          const IconComponent = event.icon
          return (
            <a 
              href={event.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`event-card category-${event.category.toLowerCase().replace(/\s+/g, '-')}`} 
              key={`${event.title}-${index}`}
            >
              <div className="event-img-container">
                <img src={event.image} alt={event.title} className="event-img" loading="lazy" />
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
    </section>
  )
}
