import { useState, useRef, useEffect } from 'react'
import { ArrowRight, Play, Edit, Plus, Trash } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { events } from '../data/constants'
import TiltedCard from './TiltedCard'
import OrbitImages from './OrbitImages'
import { useCMS } from './CMSContext'
import { EditStatsModal, EditCampusGalleryModal, AddEditNewsModal } from './CMSModals'

export default function Dashboard() {
  const { homepageConfig, newsList, galleryVideos, isAuthenticated, deleteNewsItem } = useCMS()
  const [playingIds, setPlayingIds] = useState<Record<string, boolean>>({})
  const [activeModal, setActiveModal] = useState<'stats' | 'gallery' | 'news_add' | 'news_edit' | null>(null)
  const [editingNewsItem, setEditingNewsItem] = useState<any | null>(null)
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
    <section className="home-dashboard" aria-label="RIT overview" style={{ position: 'relative' }}>
      {isAuthenticated && (
        <button
          onClick={() => setActiveModal('stats')}
          style={{
            position: 'absolute',
            top: '-20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(6, 24, 70, 0.08)',
            border: '1px solid rgba(6, 24, 70, 0.15)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            padding: '8px 16px',
            color: '#061846',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <Edit size={14} /> Edit Stats
        </button>
      )}
      <div className="stats-ribbon">
        {homepageConfig.stats.map((stat) => {
          const IconComponent = (LucideIcons as any)[stat.icon] || LucideIcons.BookOpen
          return (
            <article className="stat-item" data-tone={stat.tone} key={stat.label}>
              <span><IconComponent /></span>
              <div>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </div>
            </article>
          )
        })}
      </div>

      <div className="campus-gallery-section" style={{ position: 'relative' }}>
        {isAuthenticated && (
          <button
            onClick={() => setActiveModal('gallery')}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10,
              background: 'rgba(6, 24, 70, 0.08)',
              border: '1px solid rgba(6, 24, 70, 0.15)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              padding: '8px 16px',
              color: '#061846',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Edit size={14} /> Edit Gallery
          </button>
        )}
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
                      style={{ overflow: 'visible', background: 'transparent', height: '100%', width: '100%' }}
                    >
                      <TiltedCard
                        imageSrc={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        altText={`${video.title} Thumbnail`}
                        containerHeight="100%"
                        containerWidth="100%"
                        imageHeight="100%"
                        imageWidth="100%"
                        rotateAmplitude={10}
                        scaleOnHover={1.05}
                        showTooltip={false}
                        displayOverlayContent
                        overlayContent={
                          <div className="play-button-overlay" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6, 24, 70, 0.25)', borderRadius: '12px' }}>
                            <span className="play-icon-glow" style={{ transform: 'translateZ(25px)' }}>
                              <Play className="play-icon" size={20} fill="currentColor" />
                            </span>
                          </div>
                        }
                      />
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

      <div className="campus-orbit-section" style={{ marginTop: '25px', marginBottom: '25px', position: 'relative', textAlign: 'center', background: '#FAF0E2', padding: '24px 16px', borderRadius: '24px' }}>
        <div className="gallery-heading" style={{ marginBottom: '16px', gap: '4px' }}>
          <p className="gallery-eyebrow" style={{ fontSize: '0.8rem', marginBottom: 0 }}>Student's Life</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: 0 }}>RIT Campus Life</h2>
          <span className="heading-divider" aria-hidden="true" style={{ marginTop: '2px' }}><i /><i /><i /></span>
        </div>
        <OrbitImages
          images={[
            "/boy.jpg",
            "/girls.jpg",
            "/girls1.jpg",
            "/libgirl.jpg",
            "/sir.jpg",
            "/sportboy.jpg"
          ]}
          shape="ellipse"
          radiusX={580}
          radiusY={200}
          rotation={-8}
          duration={30}
          itemSize={200}
          responsive={true}
          radius={320}
          direction="normal"
          fill
          showPath
          paused={false}
        />
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3>Announcements</h3>
              {isAuthenticated && (
                <button
                  onClick={() => setActiveModal('news_add')}
                  style={{
                    background: 'rgba(236, 10, 120, 0.1)',
                    border: '1px solid rgba(236, 10, 120, 0.25)',
                    borderRadius: '12px',
                    padding: '4px 10px',
                    color: '#ec0a78',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Plus size={12} /> Add
                </button>
              )}
            </div>
            <a href="#home">View All <ArrowRight /></a>
          </div>
          <div className="announcement-list">
            {newsList.map((item) => {
              const dateObj = new Date(item.published_at)
              const day = String(dateObj.getDate()).padStart(2, '0')
              const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase()
              return (
                <article className="announcement-card" key={item.id}>
                  <time>
                    <strong>{day}</strong>
                    <span>{month}</span>
                  </time>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1 }}>
                    {item.thumbnail_url && (
                      <img
                        src={item.thumbnail_url}
                        alt="News thumbnail"
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <h4 style={{ margin: 0 }}>{item.title}</h4>
                        {isAuthenticated && (
                          <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
                            <button
                              onClick={() => {
                                setEditingNewsItem(item)
                                setActiveModal('news_edit')
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'rgba(255,255,255,0.6)',
                                cursor: 'pointer',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Edit Announcement"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this announcement?')) {
                                  deleteNewsItem(item.id)
                                }
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'rgba(244,63,94,0.6)',
                                cursor: 'pointer',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Delete Announcement"
                            >
                              <Trash size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                      <p>{item.summary}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>

      {activeModal === 'stats' && <EditStatsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'gallery' && <EditCampusGalleryModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'news_add' && <AddEditNewsModal newsItem={null} onClose={() => setActiveModal(null)} />}
      {activeModal === 'news_edit' && <AddEditNewsModal newsItem={editingNewsItem} onClose={() => { setActiveModal(null); setEditingNewsItem(null); }} />}
    </section>
  )
}

