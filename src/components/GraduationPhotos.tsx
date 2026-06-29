import './GraduationBook.css'

export default function GraduationPhotos() {
  return (
    <section className="graduation-section reveal-section" id="graduation">
      <div className="graduation-copy" style={{ position: 'relative' }}>
        <h2>Graduation Chronicles</h2>
        <p>
          Step through our history as we celebrate the milestones, academic triumphs, and proud moments of success of our graduates.
        </p>
      </div>
      
      <div style={{ 
        height: '420px', 
        position: 'relative', 
        overflow: 'visible', 
        width: '100%',
        marginTop: '20px', 
        marginBottom: '140px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        {/* Preload images */}
        <div className="imgLoader"></div>

        <div className="book-container">
          <div className="book">
            <div className="gap"></div>
            <div className="pages">
              <div className="page"></div>
              <div className="page"></div>
              <div className="page"></div>
              <div className="page"></div>
              <div className="page"></div>
              <div className="page"></div>
            </div>
            <div className="flips">
              <div className="flip flip1">
                <div className="flip flip2">
                  <div className="flip flip3">
                    <div className="flip flip4">
                      <div className="flip flip5">
                        <div className="flip flip6">
                          <div className="flip flip7"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
