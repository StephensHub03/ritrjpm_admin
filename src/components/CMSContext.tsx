import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import scrapedData from '../data/scraped_content.json'
import deptSubpagesData from '../data/department_subpages.json'

export interface StatItem {
  label: string
  value: string
  icon: string
  tone: string
}

export interface EventItem {
  id: number
  title: string
  date: string
  category: string
  icon: string
  description: string
  image: string
  link: string
}

export interface CtaButton {
  text: string
  link: string
}

export interface HomepageConfig {
  hero_title: string
  hero_subtitle: string
  hero_image_url: string
  about_badge: string
  about_title: string
  about_lead: string
  about_description: string
  about_image_url: string
  about_estd: string
  vision_text: string
  mission_intro: string
  mission_points: string[]
  stats: StatItem[]
  cta_buttons: CtaButton[]
  homepage_images?: Record<string, string>
}

export interface NewsItem {
  id: number
  title: string
  slug: string
  summary: string
  body: string
  published_at: string
  featured: boolean
  thumbnail_url: string
}

export interface AnnouncementItem {
  id: number
  title: string
  message: string
  active: boolean
  file_url?: string
}

export interface PlacementItem {
  id?: number
  year: number
  placement_percentage: number
  highest_package_lpa: number
  average_package_lpa: number
}

interface CMSContextType {
  isAuthenticated: boolean
  token: string | null
  homepageConfig: HomepageConfig
  newsList: NewsItem[]
  announcementsList: AnnouncementItem[]
  placementsList: PlacementItem[]
  eventsList: EventItem[]
  flatPages: Record<string, any>
  deptSubpages: Record<string, any>
  galleryVideos: any[]
  isApiConnected: boolean
  isLoading: boolean
  login: (u: string, p: string) => Promise<boolean>
  logout: () => void
  updateHomepageConfig: (data: Partial<HomepageConfig>) => Promise<boolean>
  createNewsItem: (data: Omit<NewsItem, 'id' | 'slug'>, file: File | null) => Promise<boolean>
  updateNewsItem: (id: number, data: Partial<NewsItem>, file: File | null) => Promise<boolean>
  deleteNewsItem: (id: number) => Promise<boolean>
  toggleFeaturedNews: (id: number, featured: boolean) => Promise<boolean>
  fetchAnalytics: () => Promise<any>
  updatePlacementsList: (list: PlacementItem[]) => Promise<boolean>
  updateEventsList: (list: EventItem[]) => Promise<boolean>
  updateFlatPage: (pageKey: string, title: string, content: any[]) => Promise<boolean>
  updateDeptSubpage: (deptCode: string, subpageKey: string, content: any[]) => Promise<boolean>
  uploadDeptFile: (file: File, deptCode: string, subpageKey: string) => Promise<string | null>
  uploadGlobalFile: (file: File) => Promise<string | null>
  updateGalleryVideos: (videos: any[]) => Promise<boolean>
  createAnnouncement: (data: Omit<AnnouncementItem, 'id'>, file: File | null) => Promise<boolean>
  updateAnnouncement: (id: number, data: Partial<AnnouncementItem>, file: File | null) => Promise<boolean>
  deleteAnnouncement: (id: number) => Promise<boolean>
}

const CMSContext = createContext<CMSContextType | undefined>(undefined)

const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  hero_title: "Empowering\nFuture Engineers",
  hero_subtitle: "RIT is committed to providing quality education, innovative research and holistic development to build competent professionals for a better tomorrow.",
  hero_image_url: "/rit1.PNG",
  about_badge: "RIT Profile",
  about_title: "About Ramco Institute of Technology",
  about_lead: "Ramco Institute of Technology was founded with a vision to impart high-quality engineering education at an affordable cost. Under the guidance of our Chairman Shri P.R. Venketrama Raja, we revolutionize the learning environment.",
  about_description: "Being part of the Ramco Group, widely recognized for its qualitative and innovative brands globally, we set high standards. We empower students with accessible, yet world-class engineering education and prepare them for lifelong learning.",
  about_image_url: "/rit.JPG",
  about_estd: "2013",
  vision_text: "To evolve as an Institute of international repute in offering high-quality technical education, Research and extension programmes in order to create knowledgeable, professionally competent and skilled Engineers and Technologists capable of working in multi-disciplinary environment to cater to the societal needs.",
  mission_intro: "To accomplish its unique vision, the Institute has a far-reaching mission that aims:",
  mission_points: [
    "To offer higher education in Engineering and Technology with highest level of quality, Professionalism and ethical standards",
    "To equip the students with up-to-date knowledge in cutting-edge technologies, wisdom, creativity and passion for innovation, and life-long learning skills",
    "To constantly motivate and involve the students and faculty members in the education process for continuously improving their performance to achieve excellence."
  ],
  stats: [
    { label: "Students", value: "5000+", icon: "BookOpen", tone: "pink" },
    { label: "Qualified Faculty", value: "300+", icon: "GraduationCap", tone: "orange" },
    { label: "Placement Rate", value: "92%", icon: "TrendingUp", tone: "green" },
    { label: "Recruiters", value: "250+", icon: "Briefcase", tone: "blue" },
    { label: "Awards & Recognitions", value: "120+", icon: "Trophy", tone: "purple" }
  ],
  cta_buttons: [
    { text: "Explore Infrastructure", link: "#gallery" },
    { text: "Join Admissions", link: "#admissions" }
  ],
  homepage_images: {}
}

const DEFAULT_NEWS_LIST: NewsItem[] = [
  {
    id: 1,
    title: "Admissions Open for 2025-26 Batch",
    slug: "admissions-open-for-2025-26-batch",
    summary: "B.E. / B.Tech Admissions are now open. Apply now!",
    body: "Ramco Institute of Technology announces that B.E. / B.Tech admissions are officially open for the academic year 2025-2026. Students can apply online through the official admission portal.",
    published_at: "2026-05-25T10:00:00Z",
    featured: true,
    thumbnail_url: "/rit1.PNG"
  },
  {
    id: 2,
    title: "RIT Ranked Among Top Engineering Colleges",
    slug: "rit-ranked-among-top-engineering-colleges",
    summary: "RIT is proud to be recognized for academic excellence.",
    body: "In the latest national engineering surveys, Ramco Institute of Technology has been ranked among the top emerging institutions in South India.",
    published_at: "2026-05-20T10:00:00Z",
    featured: true,
    thumbnail_url: "/rit.JPG"
  }
]

const DEFAULT_EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Technical Information Presentation Training',
    date: '2025-2026',
    category: 'Training',
    icon: 'BookOpen',
    description: 'Specialized training programme on standard operating procedures and best practices for displaying technical information.',
    image: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/Display_TI.jpg',
    link: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/Event_Display_TI.pdf',
  },
  {
    id: 2,
    title: 'Enterprise Application Development Lecture',
    date: '2025-2026',
    category: 'Guest Lecture',
    icon: 'GraduationCap',
    description: 'ACM guest lecture detailing modern patterns, frameworks, and deployment strategies for enterprise-grade applications.',
    image: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/ACM_GuestLecture_Poster.jpg',
    link: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/ACM_GuestLecture_Report.pdf',
  },
  {
    id: 3,
    title: 'NLP for Modern AI Systems FDP',
    date: '2025-2026',
    category: 'FDP',
    icon: 'Award',
    description: 'Faculty Development Programme centered on Natural Language Processing architectures, transformer models, and semantic search.',
    image: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/FDP_Poster.jpg',
    link: 'https://www.ritrjpm.ac.in/images/pdf/2025-2026/LE/FDP_Report.pdf',
  },
]

const API_BASE = "http://localhost:9000/api"

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('rit_admin_token'))
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(token))
  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(DEFAULT_HOMEPAGE_CONFIG)
  const [newsList, setNewsList] = useState<NewsItem[]>(DEFAULT_NEWS_LIST)
  const [announcementsList, setAnnouncementsList] = useState<AnnouncementItem[]>([])
  const [placementsList, setPlacementsList] = useState<PlacementItem[]>(() => {
    const local = localStorage.getItem('rit_local_placements')
    return local ? JSON.parse(local) : [
      { year: 2021, placement_percentage: 95.0, highest_package_lpa: 10.0, average_package_lpa: 3.8 },
      { year: 2022, placement_percentage: 97.0, highest_package_lpa: 12.0, average_package_lpa: 4.2 },
      { year: 2023, placement_percentage: 88.0, highest_package_lpa: 15.0, average_package_lpa: 4.5 },
      { year: 2024, placement_percentage: 90.0, highest_package_lpa: 20.0, average_package_lpa: 4.8 },
      { year: 2025, placement_percentage: 86.0, highest_package_lpa: 48.0, average_package_lpa: 5.2 }
    ]
  })
  const [eventsList, setEventsList] = useState<EventItem[]>(() => {
    const local = localStorage.getItem('rit_local_events')
    return local ? JSON.parse(local) : DEFAULT_EVENTS
  })
  const [flatPages, setFlatPages] = useState<Record<string, any>>(() => {
    const local = localStorage.getItem('rit_local_scraped_pages')
    return local ? JSON.parse(local) : scrapedData
  })
  const [deptSubpages, setDeptSubpages] = useState<Record<string, any>>(() => {
    const local = localStorage.getItem('rit_local_dept_subpages')
    if (local) {
      try {
        const parsed = JSON.parse(local)
        let changed = false
        if (parsed?.aids?.['Read More..']) {
          delete parsed.aids['Read More..']
          changed = true
        }
        const aidsAboutContent = parsed?.aids?.['About the Department']?.content
        if (aidsAboutContent && aidsAboutContent[0] && aidsAboutContent[0].type === 'document' && aidsAboutContent[0].href && aidsAboutContent[0].href.includes('Faculty_Recruitment')) {
          aidsAboutContent.shift()
          changed = true
        }
        if (changed) {
          localStorage.setItem('rit_local_dept_subpages', JSON.stringify(parsed))
        }
        const aidsAbout = parsed?.aids?.['About the Department']?.content
        if (aidsAbout && (aidsAbout.length > 11 || (aidsAbout[9] && aidsAbout[9].src && aidsAbout[9].src.includes('KaliappanRecentPhoto')))) {
          localStorage.removeItem('rit_local_dept_subpages')
          return deptSubpagesData
        }
        return parsed
      } catch {
        return deptSubpagesData
      }
    }
    return deptSubpagesData
  })
  const [galleryVideos, setGalleryVideos] = useState<any[]>(() => {
    const local = localStorage.getItem('rit_local_gallery_videos')
    return local ? JSON.parse(local) : [
      { id: 'bunmrk8BY4Y', title: 'RIT Campus Tour & Infrastructure', description: 'Explore our modern academic infrastructure, labs, and green campus spaces.' },
      { id: 'SDK2rzj8fzA', title: 'Departments & Excellence', description: 'Highlight of Departments and Academics' },
      { id: '-RdFNnPuybI', title: 'State-of-the-Art Research Facilities', description: 'A walkthrough of advanced laboratories and platforms supporting innovation.' },
      { id: 'JvAIKcQeUT8', title: 'Ramco Institute of Technology Sports', description: 'Explore our sports infrastructure, athletic training, and student achievements in tournaments.' }
    ]
  })
  const [isApiConnected, setIsApiConnected] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Test API Connectivity and Load Initial Data
  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      // 1. Fetch Homepage Config
      const configRes = await fetch(`${API_BASE}/homepage-config/`)
      if (configRes.ok) {
        let configData = await configRes.json()
        
        // Restore customized images from localStorage if backend still has defaults
        const localDataStr = localStorage.getItem('rit_local_homepage_config')
        if (localDataStr) {
          try {
            const localData = JSON.parse(localDataStr)
            if (localData.hero_image_url && localData.hero_image_url !== "/rit1.PNG" && configData.hero_image_url === "/rit1.PNG") {
              configData = localData
              
              // Attempt to sync the restored local data back to the server in the background
              if (token && !token.startsWith('mock')) {
                fetch(`${API_BASE}/homepage-config/1/`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                  },
                  body: JSON.stringify(localData)
                }).catch(console.error)
              }
            }
          } catch(e) {}
        }
        
        setHomepageConfig(configData)
        setIsApiConnected(true)
      } else {
        throw new Error("Failed to load backend config")
      }

      // 2. Fetch News
      const newsRes = await fetch(`${API_BASE}/news/`)
      if (newsRes.ok) {
        const newsData = await newsRes.json()
        setNewsList(newsData)
      }

      // 3. Fetch Placements
      const placementsRes = await fetch(`${API_BASE}/placements/`)
      if (placementsRes.ok) {
        const placementsData = await placementsRes.json()
        const formatted = placementsData.map((p: any) => ({
          id: p.id,
          year: p.year,
          placement_percentage: parseFloat(p.placement_percentage),
          highest_package_lpa: parseFloat(p.highest_package_lpa),
          average_package_lpa: parseFloat(p.average_package_lpa)
        })).sort((a: any, b: any) => a.year - b.year)
        setPlacementsList(formatted)
      }

      // 4. Fetch Announcements
      const announcementsRes = await fetch(`${API_BASE}/announcements/`)
      if (announcementsRes.ok) {
        const announcementsData = await announcementsRes.json()
        setAnnouncementsList(announcementsData)
      }
    } catch (e) {
      console.warn("Backend API not reachable or failed. Using LocalStorage fallback.", e)
      setIsApiConnected(false)
      
      // Load fallback from LocalStorage if exists
      const localConfig = localStorage.getItem('rit_local_homepage_config')
      if (localConfig) {
        setHomepageConfig(JSON.parse(localConfig))
      }
      
      const localNews = localStorage.getItem('rit_local_news')
      if (localNews) {
        setNewsList(JSON.parse(localNews))
      }

      const localPlacements = localStorage.getItem('rit_local_placements')
      if (localPlacements) {
        setPlacementsList(JSON.parse(localPlacements))
      }

      const localVideos = localStorage.getItem('rit_local_gallery_videos')
      if (localVideos) {
        setGalleryVideos(JSON.parse(localVideos))
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Login Handler
  const login = async (username: string, password: string): Promise<boolean> => {
    if (isApiConnected) {
      try {
        const res = await fetch(`${API_BASE}/auth/token/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
        if (res.ok) {
          const data = await res.json()
          localStorage.setItem('rit_admin_token', data.token)
          setToken(data.token)
          setIsAuthenticated(true)
          return true
        }
      } catch (e) {
        console.error("Login request failed", e)
      }
    }
    
    // Local fallback login
    if (username === 'admin' && password === 'admin123') {
      const mockToken = 'mock-local-token-xyz'
      localStorage.setItem('rit_admin_token', mockToken)
      setToken(mockToken)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  // Logout Handler
  const logout = () => {
    localStorage.removeItem('rit_admin_token')
    setToken(null)
    setIsAuthenticated(false)
  }

  // Helper to convert files to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Update Homepage Config
  const updateHomepageConfig = async (data: Partial<HomepageConfig>): Promise<boolean> => {
    const updated = { ...homepageConfig, ...data }

    if (isApiConnected && token) {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }
        if (!token.startsWith('mock')) {
          headers['Authorization'] = `Token ${token}`
        }
        
        // Single row id=1
        const res = await fetch(`${API_BASE}/homepage-config/1/`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(data)
        })
        if (res.ok) {
          setHomepageConfig(updated)
          return true
        }
      } catch (e) {
        console.error("Failed to sync homepage config with backend API", e)
      }
    }

    // LocalStorage Fallback
    localStorage.setItem('rit_local_homepage_config', JSON.stringify(updated))
    setHomepageConfig(updated)
    return true
  }

  // Create News Item
  const createNewsItem = async (
    data: Omit<NewsItem, 'id' | 'slug'>,
    file: File | null
  ): Promise<boolean> => {
    let thumbnail_url = data.thumbnail_url
    if (file) {
      if (isApiConnected && token) {
        // Upload to backend via multipart
        try {
          const formData = new FormData()
          formData.append('title', data.title)
          formData.append('summary', data.summary)
          formData.append('body', data.body)
          formData.append('featured', String(data.featured))
          formData.append('published_at', data.published_at)
          formData.append('thumbnail', file)
          formData.append('slug', data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))

          const headers: Record<string, string> = {}
          if (!token.startsWith('mock')) {
            headers['Authorization'] = `Token ${token}`
          }

          const res = await fetch(`${API_BASE}/news/`, {
            method: 'POST',
            headers,
            body: formData,
          })
          if (res.ok) {
            await loadData()
            return true
          }
        } catch (e) {
          console.error("Failed to upload thumbnail to backend", e)
        }
      } else {
        // Local base64 string
        thumbnail_url = await fileToBase64(file)
      }
    }

    const newItem: NewsItem = {
      id: Date.now(),
      title: data.title,
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary: data.summary,
      body: data.body,
      published_at: data.published_at,
      featured: data.featured,
      thumbnail_url,
    }

    if (isApiConnected && token && !file) {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }
        if (!token.startsWith('mock')) {
          headers['Authorization'] = `Token ${token}`
        }
        const res = await fetch(`${API_BASE}/news/`, {
          method: 'POST',
          headers,
          body: JSON.stringify(newItem)
        })
        if (res.ok) {
          await loadData()
          return true
        }
      } catch (e) {
        console.error("Failed to submit news text data", e)
      }
    }

    // Local storage fallback
    const updatedList = [newItem, ...newsList]
    localStorage.setItem('rit_local_news', JSON.stringify(updatedList))
    setNewsList(updatedList)
    return true
  }

  // Update News Item
  const updateNewsItem = async (
    id: number,
    data: Partial<NewsItem>,
    file: File | null
  ): Promise<boolean> => {
    let thumbnail_url = data.thumbnail_url || ''

    if (file) {
      if (isApiConnected && token) {
        try {
          const formData = new FormData()
          if (data.title) formData.append('title', data.title)
          if (data.summary) formData.append('summary', data.summary)
          if (data.body) formData.append('body', data.body)
          if (data.featured !== undefined) formData.append('featured', String(data.featured))
          if (data.published_at) formData.append('published_at', data.published_at)
          formData.append('thumbnail', file)

          const headers: Record<string, string> = {}
          if (!token.startsWith('mock')) {
            headers['Authorization'] = `Token ${token}`
          }

          const res = await fetch(`${API_BASE}/news/${id}/`, {
            method: 'PATCH',
            headers,
            body: formData,
          })
          if (res.ok) {
            await loadData()
            return true
          }
        } catch (e) {
          console.error("Failed to patch news with file", e)
        }
      } else {
        thumbnail_url = await fileToBase64(file)
      }
    }

    if (isApiConnected && token && !file) {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }
        if (!token.startsWith('mock')) {
          headers['Authorization'] = `Token ${token}`
        }
        const res = await fetch(`${API_BASE}/news/${id}/`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(data)
        })
        if (res.ok) {
          await loadData()
          return true
        }
      } catch (e) {
        console.error("Failed to patch news text", e)
      }
    }

    // Local storage fallback
    const updatedList = newsList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...data,
          ...(file ? { thumbnail_url } : {}),
        }
      }
      return item
    })
    localStorage.setItem('rit_local_news', JSON.stringify(updatedList))
    setNewsList(updatedList)
    return true
  }

  // Delete News Item
  const deleteNewsItem = async (id: number): Promise<boolean> => {
    if (isApiConnected && token) {
      try {
        const headers: Record<string, string> = {}
        if (!token.startsWith('mock')) {
          headers['Authorization'] = `Token ${token}`
        }
        const res = await fetch(`${API_BASE}/news/${id}/`, {
          method: 'DELETE',
          headers,
        })
        if (res.ok) {
          await loadData()
          return true
        }
      } catch (e) {
        console.error("Failed to delete news from API", e)
      }
    }

    // Local storage fallback
    const updatedList = newsList.filter((item) => item.id !== id)
    localStorage.setItem('rit_local_news', JSON.stringify(updatedList))
    setNewsList(updatedList)
    return true
  }

  // Toggle Featured News
  const toggleFeaturedNews = async (id: number, featured: boolean): Promise<boolean> => {
    return updateNewsItem(id, { featured }, null)
  }

  // Fetch Analytics
  const fetchAnalytics = async (): Promise<any> => {
    if (isApiConnected) {
      try {
        const res = await fetch(`${API_BASE}/analytics/`)
        if (res.ok) {
          return await res.json()
        }
      } catch (e) {
        console.error("Failed to fetch analytics from API", e)
      }
    }
    
    // Mock analytics callback
    return {
      visitor_analytics: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        page_views: [12000, 19000, 15000, 25000, 22000, 30000],
        unique_visitors: [4000, 6000, 5500, 9000, 8000, 11000]
      },
      dept_stats: {
        labels: ["CSE", "ECE", "EEE", "Mech", "Civil", "AI&DS", "CSBS", "IT"],
        students: [480, 420, 240, 300, 180, 240, 120, 180],
        faculty: [24, 22, 15, 18, 12, 12, 8, 10]
      },
      placement_stats: {
        labels: ["2020-21", "2021-22", "2022-23", "2023-24", "2024-25"],
        rates: [95, 97, 88, 90, 86]
      },
      event_attendance: {
        labels: ["Symposium", "AI Workshop", "Sports Meet", "Hackathon", "IPR Seminar"],
        attendance: [450, 120, 600, 85, 150]
      },
      downloads_count: {
        labels: ["Brochure", "Curriculum", "Newsletter", "Application Form", "Calendar"],
        counts: [1240, 850, 430, 980, 310]
      },
      gallery_views: {
        labels: ["Campus", "Laboratories", "Sports", "Events", "Hostel"],
        views: [5400, 3200, 1500, 4800, 1200]
      }
    }
  }

  const updatePlacementsList = async (list: PlacementItem[]): Promise<boolean> => {
    localStorage.setItem('rit_local_placements', JSON.stringify(list))
    setPlacementsList(list)

    if (isApiConnected && token) {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }
        if (!token.startsWith('mock')) {
          headers['Authorization'] = `Token ${token}`
        }

        for (const item of list) {
          const payload = {
            year: item.year,
            placement_percentage: item.placement_percentage,
            highest_package_lpa: item.highest_package_lpa,
            average_package_lpa: item.average_package_lpa
          }
          if (item.id) {
            await fetch(`${API_BASE}/placements/${item.id}/`, {
              method: 'PUT',
              headers,
              body: JSON.stringify(payload)
            })
          } else {
            await fetch(`${API_BASE}/placements/`, {
              method: 'POST',
              headers,
              body: JSON.stringify(payload)
            })
          }
        }
      } catch (e) {
        console.error("Failed to sync placements with backend API", e)
      }
    }
    return true
  }

  const updateEventsList = async (list: EventItem[]): Promise<boolean> => {
    localStorage.setItem('rit_local_events', JSON.stringify(list))
    setEventsList(list)
    return true
  }

  const updateFlatPage = async (pageKey: string, title: string, content: any[]): Promise<boolean> => {
    const updated = {
      ...flatPages,
      [pageKey]: {
        ...flatPages[pageKey],
        title,
        content
      }
    }
    localStorage.setItem('rit_local_scraped_pages', JSON.stringify(updated))
    setFlatPages(updated)
    return true
  }

  const updateDeptSubpage = async (deptCode: string, subpageKey: string, content: any[]): Promise<boolean> => {
    const deptData = deptSubpages[deptCode] || {}
    const updatedDept = {
      ...deptData,
      [subpageKey]: {
        ...deptData[subpageKey],
        content
      }
    }
    const updated = {
      ...deptSubpages,
      [deptCode]: updatedDept
    }
    localStorage.setItem('rit_local_dept_subpages', JSON.stringify(updated))
    setDeptSubpages(updated)

    // Save to backend API for persistence
    if (isApiConnected && token) {
      try {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
        if (!token.startsWith('mock')) headers['Authorization'] = `Token ${token}`
        fetch(`${API_BASE}/save-dept-subpages/`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(updated)
        }).catch(console.error)
      } catch (e) {
        console.error("Failed to sync dept subpages to API", e)
      }
    }
    
    return true
  }

  const uploadDeptFile = async (file: File, deptCode: string, subpageKey: string): Promise<string | null> => {
    if (isApiConnected && token) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('deptCode', deptCode)
        formData.append('subpageKey', subpageKey)

        const headers: Record<string, string> = {}
        if (!token.startsWith('mock')) {
          headers['Authorization'] = `Token ${token}`
        }

        const res = await fetch(`${API_BASE}/upload-dept-file/`, {
          method: 'POST',
          headers,
          body: formData,
        })
        if (res.ok) {
          const data = await res.json()
          return data.url
        }
      } catch (e) {
        console.error("Failed to upload dept file", e)
      }
    }
    return null
  }

  const uploadGlobalFile = async (file: File): Promise<string | null> => {
    return uploadDeptFile(file, 'homepage', 'assets')
  }

  const updateGalleryVideos = async (videos: any[]): Promise<boolean> => {
    localStorage.setItem('rit_local_gallery_videos', JSON.stringify(videos))
    setGalleryVideos(videos)
    return true
  }

  const createAnnouncement = async (data: Omit<AnnouncementItem, 'id'>, file: File | null): Promise<boolean> => {
    if (isApiConnected && token) {
      try {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('message', data.message)
        formData.append('active', String(data.active))
        if (file) {
          formData.append('file', file)
        }

        const headers: Record<string, string> = {}
        if (!token.startsWith('mock')) {
          headers['Authorization'] = `Token ${token}`
        }

        const res = await fetch(`${API_BASE}/announcements/`, {
          method: 'POST',
          headers,
          body: formData,
        })
        if (res.ok) {
          await loadData()
          return true
        }
      } catch (e) {
        console.error("Failed to create announcement", e)
      }
    } else {
      const newAnn: AnnouncementItem = {
        ...data,
        id: Date.now(),
        file_url: file ? URL.createObjectURL(file) : undefined
      }
      const updated = [newAnn, ...announcementsList]
      localStorage.setItem('rit_local_announcements', JSON.stringify(updated))
      setAnnouncementsList(updated)
      return true
    }
    return false
  }

  const updateAnnouncement = async (id: number, data: Partial<AnnouncementItem>, file: File | null): Promise<boolean> => {
    if (isApiConnected && token) {
      try {
        const formData = new FormData()
        if (data.title) formData.append('title', data.title)
        if (data.message) formData.append('message', data.message)
        if (data.active !== undefined) formData.append('active', String(data.active))
        if (file) {
          formData.append('file', file)
        }

        const headers: Record<string, string> = {}
        if (!token.startsWith('mock')) {
          headers['Authorization'] = `Token ${token}`
        }

        const res = await fetch(`${API_BASE}/announcements/${id}/`, {
          method: 'PATCH',
          headers,
          body: formData,
        })
        if (res.ok) {
          await loadData()
          return true
        }
      } catch (e) {
        console.error("Failed to update announcement", e)
      }
    } else {
      const updated = announcementsList.map(item => 
        item.id === id ? { ...item, ...data, file_url: file ? URL.createObjectURL(file) : item.file_url } : item
      )
      localStorage.setItem('rit_local_announcements', JSON.stringify(updated))
      setAnnouncementsList(updated)
      return true
    }
    return false
  }

  const deleteAnnouncement = async (id: number): Promise<boolean> => {
    if (isApiConnected && token) {
      try {
        const headers: Record<string, string> = {}
        if (!token.startsWith('mock')) {
          headers['Authorization'] = `Token ${token}`
        }
        const res = await fetch(`${API_BASE}/announcements/${id}/`, {
          method: 'DELETE',
          headers,
        })
        if (res.ok) {
          await loadData()
          return true
        }
      } catch (e) {
        console.error("Failed to delete announcement", e)
      }
    } else {
      setAnnouncementsList(announcementsList.filter(a => a.id !== id))
      return true
    }
    return false
  }

  return (
    <CMSContext.Provider
      value={{
        isAuthenticated,
        token,
        homepageConfig,
        newsList,
        announcementsList,
        placementsList,
        eventsList,
        flatPages,
        deptSubpages,
        galleryVideos,
        isApiConnected,
        isLoading,
        login,
        logout,
        updateHomepageConfig,
        createNewsItem,
        updateNewsItem,
        deleteNewsItem,
        toggleFeaturedNews,
        fetchAnalytics,
        updatePlacementsList,
        updateFlatPage,
        updateDeptSubpage,
        uploadDeptFile,
        uploadGlobalFile,
        updateGalleryVideos,
        createAnnouncement,
        updateAnnouncement,
        deleteAnnouncement
      }}
    >
      {children}
    </CMSContext.Provider>
  )
}

export const useCMS = () => {
  const context = useContext(CMSContext)
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider')
  }
  return context
}
