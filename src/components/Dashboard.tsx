import { useState, useRef, useEffect } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { announcements, events, heroStats } from '../data/constants'

const galleryVideos = [
  {
    id: 'bunmrk8BY4Y',
    title: 'RIT Campus Tour & Infrastructure',
    description: 'Explore our modern academic infrastructure, labs, and green campus spaces.',
  },
  {
    id: 'SDK2rzj8fzA',
    title: 'Departments & Excellence',
    description: 'Highlight of Departments and Academics',
  },
  {
    id: '-RdFNnPuybI',
    title: 'State-of-the-Art Research Facilities',
    description: 'A walkthrough of advanced laboratories and platforms supporting innovation.',
  },
  {
    id: 'JvAIKcQeUT8',
    title: 'Ramco Institute of Technology Sports',
    description: 'Explore our sports infrastructure, athletic training, and student achievements in tournaments.',
  },
]

export default function Dashboard() {
  const [playingIds, setPlayingIds] = useState<Record<string, boolean>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  const cardRefCallback = (el: HTMLElement | null) => {
    if (!el) return

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('data-video-id')
              if (id) {
                setPlayingIds((prev) => ({ ...prev, [id]: true }))
                observerRef.current?.unobserve(entry.target)
              }
            }
          })
        },
        { threshold: 0.25 }
      )
    }

    observerRef.current.observe(el)
  }

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <section className="home-dashboard" aria-label="RIT overview">
      <div className="stats-ribbon">
        {heroStats.map((stat) => {
          const Icon = stat.icon
          return (
            <article className="stat-item" data-tone={stat.tone} key={stat.label}>
              <span><Icon /></span>
              <div>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </div>
            </article>
          )
        })}
      </div>

      <div className="campus-gallery-section">
        <div className="gallery-heading">
          <p className="gallery-eyebrow">Campus Gallery</p>
          <h2>Experience RIT in Motion</h2>
          <span className="heading-divider" aria-hidden="true"><i /><i /><i /></span>
        </div>

        <div className="gallery-grid">
          {galleryVideos.map((video) => {
            const isPlaying = playingIds[video.id]
            return (
              <article
                className="gallery-card"
                key={video.id}
                data-video-id={video.id}
                ref={(el) => cardRefCallback(el)}
              >
                <div className="video-container">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&disablekb=1&fs=0&modestbranding=1&iv_load_policy=3&playsinline=1&rel=0`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="video-iframe"
                    ></iframe>
                  ) : (
                    <div
                      className="video-thumbnail-wrapper"
                      onClick={() => setPlayingIds(prev => ({ ...prev, [video.id]: true }))}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={`${video.title} Thumbnail`}
                        className="video-thumbnail"
                        loading="lazy"
                      />
                      <div className="play-button-overlay">
                        <span className="play-icon-glow">
                          <Play className="play-icon" size={20} fill="currentColor" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="updates-grid">
        <section className="events-panel">
          <div className="panel-title">
            <h3>Upcoming Events</h3>
            <a href="#home">View All Events <ArrowRight /></a>
          </div>
          <div className="event-list">
            {events.map(([month, day, title, text, date]) => (
              <article className="event-card" key={title}>
                <time>
                  <span>{month}</span>
                  <strong>{day}</strong>
                </time>
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                  <small>{date}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="announcements-panel">
          <div className="panel-title">
            <h3>Announcements</h3>
            <a href="#home">View All <ArrowRight /></a>
          </div>
          <div className="announcement-list">
            {announcements.map(([day, month, title, text]) => (
              <article className="announcement-card" key={title}>
                <time>
                  <strong>{day}</strong>
                  <span>{month}</span>
                </time>
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
