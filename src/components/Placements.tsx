export default function Placements() {
  return (
    <section className="placements reveal-section" id="placements">
      <div className="section-label">04 / Placements</div>
      <div className="placement-copy">
        <h2>Outcomes presented with motion, evidence, and recruiter momentum.</h2>
        <p>Animated charts, company marquees, success stories, package data, and placement percentage are ready to connect to the API.</p>
      </div>
      <div className="chart-grid">
        <div className="chart-panel placement-bars" aria-label="Placement rate trend from 2022 to 2026">
          {[78, 84, 89, 91, 92].map((value, index) => (
            <span key={value} style={{ '--value': value } as React.CSSProperties} data-value={`${value}%`}>
              <i />
              <small>{2022 + index}</small>
            </span>
          ))}
        </div>
        <div className="chart-panel doughnut">
          <strong>92%</strong>
          <span>Placed</span>
        </div>
      </div>
      <div className="recruiter-strip">
        {['Infosys', 'TCS', 'Zoho', 'Amazon', 'Bosch', 'Accenture', 'Wipro', 'Cognizant'].map((name) => <span key={name}>{name}</span>)}
      </div>
    </section>
  )
}
