const quickLinks = [
  {
    label: 'Online Fee Payment',
    href: 'https://epayments.in.worldline.com/ritrjpm?swith=rollnumber',
    tone: 'red',
  },
  {
    label: 'New Admission 2026-27 Online Fee',
    href: 'https://epayments.in.worldline.com/ritrjpm_new_enrollment',
    tone: 'navy',
  },
  {
    label: 'Alumni',
    href: 'https://alumni.ritrjpm.ac.in/',
    tone: 'crimson',
  },
  {
    label: 'E-Governance',
    href: 'https://www.ritrjpm.ac.in/campuslogin/',
    tone: 'blue',
  },
  {
    label: 'Incubation',
    href: 'https://www.ritrjpm.ac.in/',
    tone: 'gold',
  },
  {
    label: 'ME CSE Admission',
    href: 'https://www.ritrjpm.ac.in/me-cse-admission/',
    tone: 'slate',
  },
  {
    label: 'Wanted',
    href: 'https://www.ritrjpm.ac.in/images/Faculty_Recruitment_26-27.pdf',
    tone: 'red',
  },
] as const

export default function QuickLinksBar() {
  return (
    <section className="quick-links-bar" aria-label="Quick access links">
      <div className="quick-links-track">
        {quickLinks.map((link) => (
          <a
            key={link.label}
            className={`quick-link-pill quick-link-pill--${link.tone}`}
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
