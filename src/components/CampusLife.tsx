import { useState } from 'react'
import { resolveLocalScrapedImage } from '../utils/localScrapedImages'
import TiltedCard from './TiltedCard'
import { useCMS } from './CMSContext'
import { Edit, Save, X } from 'lucide-react'

const DEFAULT_MOSAIC_IMAGES = [
  { key: 'Campus Life', url: '/clg3.png' },
  { key: 'Sports Ground', url: '/g1.png' },
  { key: 'Yoga Center', url: '/clg8.png' },
  { key: 'Ladies Amenity ', url: '/clg77.png' },
  { key: ' Auditorium ', url: '/auditorium.png' },
  { key: 'Wash Area', url: '/wa.png' },
  { key: 'Stationary Shop', url: '/shop1.png' },
  { key: 'Gym', url: '/gym1.png' },
  { key: 'Hostel', url: '/h1.png' },
]

export default function CampusLife() {
  const { homepageConfig, updateHomepageConfig, isAuthenticated } = useCMS()
  const [showModal, setShowModal] = useState(false)

  const configImages = homepageConfig.homepage_images || {}
  const mosaicItems = DEFAULT_MOSAIC_IMAGES.map((item) => ({
    key: item.key,
    url: configImages[item.key] || item.url,
  }))

  return (
    <section className="gallery reveal-section" id="gallery" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gallery, clubs, facilities, events, alumni, and student stories share one premium media system.</h2>
        {isAuthenticated && (
          <button
            onClick={() => setShowModal(true)}
            style={{
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              marginLeft: '20px',
              flexShrink: 0
            }}
          >
            <Edit size={14} /> Edit Mosaic Images
          </button>
        )}
      </div>

      <div className="mosaic">
        {mosaicItems.map((item, index) => {
          const originalUrl = item.url
          const resolvedSrc = originalUrl ? resolveLocalScrapedImage(originalUrl) : null
          const filename = resolvedSrc ? resolvedSrc.split('/').pop() : ''

          return (
            <figure key={item.key} className={`tile tile-${index + 1}`} style={{ overflow: 'visible', background: 'transparent' }}>
              {resolvedSrc ? (
                <>
                  {/* SCRAPED IMAGE MATCHED: {filename} | Category: {item.key} */}
                  <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- SCRAPED IMAGE MATCHED: ${filename} | Category: ${item.key} -->` }} />
                  <TiltedCard
                    imageSrc={resolvedSrc}
                    altText={item.key}
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showTooltip={false}
                    displayOverlayContent
                    overlayContent={
                      <figcaption style={{
                        position: 'absolute',
                        left: '14px',
                        bottom: '12px',
                        padding: '7px 10px',
                        borderRadius: '999px',
                        background: 'rgba(2, 6, 23, 0.75)',
                        backdropFilter: 'blur(4px)',
                        color: '#fff',
                        fontSize: '13px',
                        transform: 'translateZ(20px)',
                      }}>
                        {item.key}
                      </figcaption>
                    }
                  />
                </>
              ) : (
                <div className="tile-placeholder" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: '#fff1f2', color: '#be123c', padding: '20px', textAlign: 'center', borderRadius: '12px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>⚠️ Image Missing</span>
                  <small style={{ fontSize: '11px', marginTop: '2px', opacity: 0.8 }}>Flagged for manual review</small>
                </div>
              )}
            </figure>
          )
        })}
      </div>

      {showModal && (
        <EditCampusMosaicModal
          onClose={() => setShowModal(false)}
          currentImages={configImages}
          onSave={async (updatedImages) => {
            await updateHomepageConfig({ homepage_images: updatedImages })
            setShowModal(false)
          }}
        />
      )}
    </section>
  )
}

interface EditCampusMosaicModalProps {
  onClose: () => void
  currentImages: Record<string, string>
  onSave: (images: Record<string, string>) => Promise<void>
}

function EditCampusMosaicModal({ onClose, currentImages, onSave }: EditCampusMosaicModalProps) {
  const [images, setImages] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    DEFAULT_MOSAIC_IMAGES.forEach((item) => {
      initial[item.key] = currentImages[item.key] || item.url
    })
    return initial
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await onSave(images)
    setIsSaving(false)
  }

  return (
    <div className="admin-overlay-backdrop" onClick={onClose}>
      <div
        className="admin-login-card"
        style={{ width: '100%', maxWidth: '650px', textAlign: 'left', background: '#090e1b', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#ffffff' }}>Edit Campus Life Mosaic Images</h2>
          <button className="admin-close-btn" style={{ position: 'static', width: '30px', height: '30px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
            {DEFAULT_MOSAIC_IMAGES.map((item) => (
              <div key={item.key} style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{item.key}</label>
                <input
                  type="text"
                  value={images[item.key] || ''}
                  onChange={(e) => setImages({ ...images, [item.key]: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={isSaving}
            style={{ padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Gallery Images'}
          </button>
        </form>
      </div>
    </div>
  )
}
