import { resolveLocalScrapedImage } from '../utils/localScrapedImages'

const campusLifeImages: Record<string, string | null> = {
  'Innovation lab': 'https://www.ritrjpm.ac.in/images/EEE_IOT_Lab.jpg',
  'Convocation': null, // No image found in scrape
  'Robotics arena': 'https://www.ritrjpm.ac.in/images/resz_iot_robo1.png',
  'Design studio': 'https://www.ritrjpm.ac.in/images/cad_pic_1.jpg',
  'Central library': 'https://www.ritrjpm.ac.in/images/library/air-conditioned.jpg',
}

export default function CampusLife() {
  return (
    <section className="gallery reveal-section" id="gallery">
      <div className="section-label">05 / Campus Life</div>
      <h2>Gallery, clubs, facilities, events, alumni, and student stories share one premium media system.</h2>
      <div className="mosaic">
        {['Innovation lab', 'Convocation', 'Robotics arena', 'Design studio', 'Central library'].map((item, index) => {
          const originalUrl = campusLifeImages[item]
          const resolvedSrc = originalUrl ? resolveLocalScrapedImage(originalUrl) : null
          const filename = resolvedSrc ? resolvedSrc.split('/').pop() : ''

          return (
            <figure key={item} className={`tile tile-${index + 1}`}>
              {resolvedSrc ? (
                <>
                  {/* SCRAPED IMAGE MATCHED: {filename} | Category: {item} */}
                  <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- SCRAPED IMAGE MATCHED: ${filename} | Category: ${item} -->` }} />
                  <img src={resolvedSrc} alt={item} />
                </>
              ) : (
                <div className="tile-placeholder" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: '#fff1f2', color: '#be123c', padding: '20px', textAlign: 'center' }}>
                  {/* NO SCRAPED IMAGE FOUND: Convocation */}
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>⚠️ Image Missing</span>
                  <small style={{ fontSize: '11px', marginTop: '2px', opacity: 0.8 }}>Flagged for manual review</small>
                </div>
              )}
              <figcaption>{item}</figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
