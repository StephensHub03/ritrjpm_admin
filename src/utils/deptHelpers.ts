const deptKeywords: Record<string, string[]> = {
  civil: ['civil', 'structra'],
  cse: ['cse', 'computer-science', 'clustra'],
  eee: ['eee', 'electrical'],
  ece: ['ece', 'electronics'],
  mech: ['mech', 'mechanical', 'mechanizo'],
  aiml: ['aiml', 'artificial-intelligence-machine-learning'],
  aids: ['aids', 'ai-ds', 'ai_ds'],
  csbs: ['csbs', 'technebiz'],
  it: ['it', 'infotrix', 'information-technology']
}

export function getDeptName(deptCode: string): string {
  const code = deptCode.toLowerCase()
  if (code === 'cse') return 'Computer Science & Engineering'
  if (code === 'ece') return 'Electronics & Communication Engineering'
  if (code === 'eee') return 'Electrical & Electronics Engineering'
  if (code === 'mech') return 'Mechanical Engineering'
  if (code === 'civil') return 'Civil Engineering'
  if (code === 'aiml') return 'Artificial Intelligence & Machine Learning'
  if (code === 'aids') return 'Artificial Intelligence & Data Science'
  if (code === 'csbs') return 'Computer Science & Business Systems'
  if (code === 'it') return 'Information Technology'
  return deptCode.toUpperCase()
}

export function getDeptAccentColor(deptCode: string): string {
  const code = deptCode.toLowerCase()
  if (code === 'cse') return '#0ea5e9'
  if (code === 'ece') return '#f59e0b'
  if (code === 'eee') return '#0284c7'
  if (code === 'mech') return '#60a5fa'
  if (code === 'civil') return '#f472b6'
  if (code === 'aiml') return '#8b5cf6'
  if (code === 'aids') return '#6366f1'
  if (code === 'csbs') return '#3b82f6'
  if (code === 'it') return '#ec4899'
  return '#0ea5e9'
}

export function getOfficeLocation(deptCode: string, index: number): string {
  const code = deptCode.toLowerCase()
  if (code.includes('cse')) return `CSE Block, Room ${201 + index}`
  if (code.includes('ece')) return `ECE Block, Room ${101 + index}`
  if (code.includes('eee')) return `EEE Block, Room ${111 + index}`
  if (code.includes('mech')) return `Mechanical Block, Room ${121 + index}`
  if (code.includes('civil')) return `Civil Block, Room ${131 + index}`
  if (code.includes('aiml') || code.includes('aids') || code.includes('csbs') || code.includes('it')) {
    return `Main Block, Room ${301 + index}`
  }
  return `Science & Humanities Block, Room ${401 + index}`
}

export function getFileName(src: string): string {
  try {
    const url = new URL(src, 'https://www.ritrjpm.ac.in')
    return decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || '').toLowerCase()
  } catch {
    return decodeURIComponent(src.split('/').pop() || '').toLowerCase()
  }
}

export function isValidDepartmentText(text: string): boolean {
  if (!text) return false
  const t = text.trim()

  // 1. Check template items / short navigation / footer text
  const blockedShortTexts = new Set([
    'quick', 'contact', 'menu', 'quick link', 'quick links', 'follows', '©2026', 'designed by', 'follow us', 'important links',
    'home', 'about us', 'departments', 'admission', 'placements', 'research', 'campus life', 'alumni', 'feedback', 'contact us',
    'nirf', 'ariia', 'naac', 'nba', 'latest news', 'announcements', 'events', 'downloads', 'brochure', 'ramco institute of technology',
    'contact', 'follows', 'follow us', 'designed by', 'menu', 'quick', '©'
  ])
  if (blockedShortTexts.has(t.toLowerCase())) return false

  // Copyright or designed by template matching
  if (/^©\s*\d{4}/i.test(t) || /designed by/i.test(t)) return false

  // 2. Statistics and homepage hero text block
  const placementStats = [
    '5000+ students', '300+ faculty', '92% placement', '92% placements', '48lpa', '48 lpa', '48 lakhs', '250+ recruiters', '27 funded research'
  ]
  if (placementStats.some(stat => t.toLowerCase().includes(stat))) return false

  // 3. General college announcements
  const generalAnnouncements = [
    'admissions open for 2025-26',
    'admissions open for 2025',
    'rit ranked among top colleges',
    'admission open',
    'admission open/brochure'
  ]
  if (generalAnnouncements.some(ann => t.toLowerCase().includes(ann))) return false

  // 4. Testimonials detection (keywords and phrases)
  const testimonialPhrases = [
    'pursuing a bachelor', 'pursuing btech', 'pursuing b.tech', 'pursuing b.e.', 'pursuing be',
    'my 4 years at rit', 'my four years at rit', 'four years at ramco', 'temple of knowledge',
    'working as an assistant engineer', 'tata consultancy services', 'working in ramco cements',
    'junior draughting officer', 'placement cell made', 'on-campus placement', 'on-campus interview',
    'first batch of students', 'glad to be a part of this institution', 'glad to be a part of this college',
    'cherish it throughout my life', 'memories of college life', 'hostel days were', 'good food',
    'being a sportsman', 'sportsperson', 'friendly professors', 'eminent faculties', 'dedicated faculty coordinators',
    'wish to specially mention', 'transformed my', 'moulded and sculpted', 'deciding factor behind who i am'
  ]
  if (testimonialPhrases.some(phrase => t.toLowerCase().includes(phrase))) return false

  // Check if paragraph ends with a known name / initials structure
  const authorRegex = /(?:Ms\.|Mrs\.|Mr\.|Er\.)?\s*(?:Sibiah|Valli|Divya\s*Sri|Kowsiga|Ajith|Keerthana|Abarna|Sachin|Pavithra|Arshathkhan|Siva|Archuna|Santhiya|Marutharaj|Ram\s*Prasad|Mishal|Muthu|Arivarasan|Ramya|Thamotharan|Thanupriya|Abinaya|Ganesh|Ponkumaran|Shiva|Aravindhan|Vaishnavi|Arulinfanta|Siva\s*Ranjini|Srikanth|Vennila|Ponkumaresan|Lakshmi\s*Priya|Hema|Beena|Punitha\s*Lakshmi|Ragha|Anu\s*Selvamathi|Loga\s*Ganesh|Ishwarya|Sivaraj|Prem\s*Kumar|Sameer|Padmajaya\s*Rekha|Selvananthini|Sujith|Pradeepram|Ananthi)\s*[A-Z\.]*(?:\s*,\s*B\.?\s*E\.?)?$/i
  if (authorRegex.test(t)) return false

  // Filter out very short texts that don't look meaningful
  if (t.length < 3) return false

  return true
}

export function isValidDepartmentImage(src: string, deptCode: string, alt?: string, pageUrl?: string): boolean {
  if (!src) return false
  const filename = getFileName(src)
  const normalizedSrc = src.toLowerCase()
  const normalizedFilename = filename.toLowerCase()
  const normalizedAlt = (alt || '').toLowerCase()
  const normalizedPageUrl = (pageUrl || '').toLowerCase()
  const dept = deptCode.toLowerCase()

  // 1. Universal Block List (student portraits, testimonials, logo, generic elements)
  if (
    normalizedSrc.includes('testimonials/') ||
    normalizedSrc.includes('testimonial/') ||
    normalizedSrc.includes('alumni/') ||
    normalizedSrc.includes('supportstaff/') ||
    normalizedSrc.includes('faculty/') || // Block faculty portraits from general gallery
    /default\.png/i.test(normalizedFilename) ||
    /^[0-9]+_[a-zA-Z]+\.[a-zA-Z0-9]+$/i.test(normalizedFilename) ||
    /(?:sibiah|vallim|divyasri|kowsiga|ajith|keerthana|abarna|sachin|pavithra|siva|archuna|santhiya|marutharaj|prasad|mishal|muthu|arivarasan|ramya|thamotharan|thanupriya|abinaya|ganesh|ponkumaran|shiva|aravindhan|vaishnavi|arulinfanta|ranjini|srikanth|vennila|ponkumaresan|priya|hema|beena|lakshmi|ragha|selvamathi|ishwarya|sivaraj|sameer|rekha|selvananthini|sujith|pradeepram|ananthi)/i.test(normalizedFilename)
  ) {
    return false
  }

  // General logo / template blocker
  if (
    /logo|banner|header|footer|facebook|twitter|linkedin|youtube|instagram|social/i.test(normalizedFilename) ||
    /pdf-icon|pdf_icon|new-pdf-icon|pdf-icon4/i.test(normalizedFilename)
  ) {
    return false
  }

  // Recruiter logo check
  if (/tcs|cts|wipro|zoho|infosys|cognizant|ramco|embedur|accenture|hexaware/i.test(normalizedFilename)) {
    return false
  }

  // 2. Department Isolation: Check if it matches another department's keyword
  for (const [otherDept, kws] of Object.entries(deptKeywords)) {
    if (otherDept === dept) continue
    const matchesOther = kws.some((kw) => {
      const regex = new RegExp(`(?:/|\\\\b|_)${kw}(?:/|\\\\b|_)`, 'i')
      return regex.test(normalizedSrc) || regex.test(normalizedPageUrl) || regex.test(normalizedFilename)
    })
    if (matchesOther) return false
  }

  // 3. Department Specific Match
  const selfKws = deptKeywords[dept] || [dept]
  const matchesSelf = selfKws.some((kw) => {
    const regex = new RegExp(kw, 'i')
    return (
      regex.test(normalizedSrc) ||
      regex.test(normalizedPageUrl) ||
      regex.test(normalizedFilename) ||
      regex.test(normalizedAlt)
    )
  })

  return matchesSelf
}
