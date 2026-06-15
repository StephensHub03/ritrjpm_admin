import campusHero from '../assets/campus-hero.png'

export default function CampusLife() {
  return (
    <section className="gallery reveal-section" id="gallery">
      <div className="section-label">05 / Campus Life</div>
      <h2>Gallery, clubs, facilities, events, alumni, and student stories share one premium media system.</h2>
      <div className="mosaic">
        {['Innovation lab', 'Convocation', 'Robotics arena', 'Design studio', 'Central library'].map((item, index) => (
          <figure key={item} className={`tile tile-${index + 1}`}>
            <img src={campusHero} alt="" />
            <figcaption>{item}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
