import { Eye, Target } from 'lucide-react'

export default function Research() {
  return (
    <section className="immersive reveal-section" id="research">
      <div className="about-details">
        <div className="section-label">02 / Core Philosophy</div>
        <h2>Vision & Mission</h2>
        
        <div className="vision-mission-container">
          <div className="philosophy-card vision-card">
            <div className="philosophy-card-header">
              <div className="philosophy-icon-wrapper">
                <Eye size={18} className="philosophy-icon" />
              </div>
              <h3>Vision</h3>
            </div>
            <p>
              To evolve as an Institute of international repute in offering high-quality technical education, 
              Research and extension programmes in order to create knowledgeable, professionally competent 
              and skilled Engineers and Technologists capable of working in multi-disciplinary environment 
              to cater to the societal needs.
            </p>
          </div>
          
          <div className="philosophy-card mission-card">
            <div className="philosophy-card-header">
              <div className="philosophy-icon-wrapper">
                <Target size={18} className="philosophy-icon" />
              </div>
              <h3>Mission</h3>
            </div>
            <p className="mission-intro">To accomplish its unique vision, the Institute has a far-reaching mission that aims:</p>
            <ul className="mission-list">
              <li>
                <span className="bullet-point"></span>
                <span>To offer higher education in Engineering and Technology with highest level of quality, Professionalism and ethical standards</span>
              </li>
              <li>
                <span className="bullet-point"></span>
                <span>To equip the students with up-to-date knowledge in cutting-edge technologies, wisdom, creativity and passion for innovation, and life-long learning skills</span>
              </li>
              <li>
                <span className="bullet-point"></span>
                <span>To constantly motivate and involve the students and faculty members in the education process for continuously improving their performance to achieve excellence.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="globe-stage" aria-label="Interactive rotating research globe">
        <div className="orbit-map">
          <span />
          <span />
          <span />
          <strong>RIT</strong>
        </div>
      </div>
    </section>
  )
}
