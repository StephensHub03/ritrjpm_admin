import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Lock, LayoutDashboard, FileText, Settings, LogOut, Plus, Edit, Trash, ToggleLeft, ToggleRight, Upload, Info
} from 'lucide-react'
import { useCMS } from './CMSContext'
import type { NewsItem } from './CMSContext'
import './AdminPanel.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface AdminPanelProps {
  onClose: () => void
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const {
    isAuthenticated,
    homepageConfig,
    newsList,
    isApiConnected,
    login,
    logout,
    updateHomepageConfig,
    createNewsItem,
    updateNewsItem,
    deleteNewsItem,
    toggleFeaturedNews,
    fetchAnalytics
  } = useCMS()

  // Tab State: 'analytics' | 'homepage' | 'news'
  const [activeTab, setActiveTab] = useState<'analytics' | 'homepage' | 'news'>('analytics')

  // Auth State
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Homepage CMS Forms State
  const [heroTitle, setHeroTitle] = useState(homepageConfig.hero_title)
  const [heroSubtitle, setHeroSubtitle] = useState(homepageConfig.hero_subtitle)
  const [heroImageUrl, setHeroImageUrl] = useState(homepageConfig.hero_image_url)

  const [aboutBadge, setAboutBadge] = useState(homepageConfig.about_badge)
  const [aboutTitle, setAboutTitle] = useState(homepageConfig.about_title)
  const [aboutLead, setAboutLead] = useState(homepageConfig.about_lead)
  const [aboutDescription, setAboutDescription] = useState(homepageConfig.about_description)
  const [aboutImageUrl, setAboutImageUrl] = useState(homepageConfig.about_image_url)
  const [aboutEstd, setAboutEstd] = useState(homepageConfig.about_estd)

  const [visionText, setVisionText] = useState(homepageConfig.vision_text)
  const [missionIntro, setMissionIntro] = useState(homepageConfig.mission_intro)
  const [missionPointsText, setMissionPointsText] = useState(homepageConfig.mission_points.join('\n'))

  const [statsData, setStatsData] = useState(homepageConfig.stats)
  const [ctaButtons, setCtaButtons] = useState(homepageConfig.cta_buttons)

  // News CRUD State
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [newsTitle, setNewsTitle] = useState('')
  const [newsSummary, setNewsSummary] = useState('')
  const [newsBody, setNewsBody] = useState('')
  const [newsFeatured, setNewsFeatured] = useState(false)
  const [newsPublishedAt, setNewsPublishedAt] = useState('')
  const [newsThumbnailUrl, setNewsThumbnailUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [newsSubmitError, setNewsSubmitError] = useState('')

  // Analytics State
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics().then((data) => setAnalytics(data))
    }
  }, [isAuthenticated, fetchAnalytics])

  // Sync homepage configuration values if they reload/update
  useEffect(() => {
    setHeroTitle(homepageConfig.hero_title)
    setHeroSubtitle(homepageConfig.hero_subtitle)
    setHeroImageUrl(homepageConfig.hero_image_url)
    setAboutBadge(homepageConfig.about_badge)
    setAboutTitle(homepageConfig.about_title)
    setAboutLead(homepageConfig.about_lead)
    setAboutDescription(homepageConfig.about_description)
    setAboutImageUrl(homepageConfig.about_image_url)
    setAboutEstd(homepageConfig.about_estd)
    setVisionText(homepageConfig.vision_text)
    setMissionIntro(homepageConfig.mission_intro)
    setMissionPointsText(homepageConfig.mission_points.join('\n'))
    setStatsData(homepageConfig.stats)
    setCtaButtons(homepageConfig.cta_buttons)
  }, [homepageConfig])

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setIsSubmitting(true)
    const success = await login(username, password)
    setIsSubmitting(false)
    if (!success) {
      setAuthError('Invalid credentials. Check backend connection or try admin / admin123.')
    }
  }

  // Handle Homepage Save
  const handleHomepageSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const points = missionPointsText.split('\n').map(p => p.trim()).filter(Boolean)
    const success = await updateHomepageConfig({
      hero_title: heroTitle,
      hero_subtitle: heroSubtitle,
      hero_image_url: heroImageUrl,
      about_badge: aboutBadge,
      about_title: aboutTitle,
      about_lead: aboutLead,
      about_description: aboutDescription,
      about_image_url: aboutImageUrl,
      about_estd: aboutEstd,
      vision_text: visionText,
      mission_intro: missionIntro,
      mission_points: points,
      stats: statsData,
      cta_buttons: ctaButtons
    })
    setIsSubmitting(false)
    if (success) {
      alert('Homepage settings saved successfully!')
    } else {
      alert('Error saving homepage configuration.')
    }
  }

  // Stats input handler
  const handleStatChange = (index: number, field: string, value: string) => {
    const updated = [...statsData]
    updated[index] = { ...updated[index], [field]: value }
    setStatsData(updated)
  }

  // CTA button handler
  const handleCtaChange = (index: number, field: string, value: string) => {
    const updated = [...ctaButtons]
    updated[index] = { ...updated[index], [field]: value }
    setCtaButtons(updated)
  }

  // Open News CRUD modal
  const openNewsModal = (news: NewsItem | null) => {
    setEditingNews(news)
    setNewsSubmitError('')
    setSelectedFile(null)
    if (news) {
      setNewsTitle(news.title)
      setNewsSummary(news.summary)
      setNewsBody(news.body)
      setNewsFeatured(news.featured)
      setNewsPublishedAt(news.published_at.slice(0, 16))
      setNewsThumbnailUrl(news.thumbnail_url)
    } else {
      setNewsTitle('')
      setNewsSummary('')
      setNewsBody('')
      setNewsFeatured(false)
      setNewsPublishedAt(new Date().toISOString().slice(0, 16))
      setNewsThumbnailUrl('')
    }
    setIsNewsModalOpen(true)
  }

  // Submit News CRUD form
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsTitle || !newsSummary || !newsBody) {
      setNewsSubmitError('Please fill out all required text fields.')
      return
    }

    setIsSubmitting(true)
    let success = false
    const itemData = {
      title: newsTitle,
      summary: newsSummary,
      body: newsBody,
      featured: newsFeatured,
      published_at: new Date(newsPublishedAt).toISOString(),
      thumbnail_url: newsThumbnailUrl
    }

    if (editingNews) {
      success = await updateNewsItem(editingNews.id, itemData, selectedFile)
    } else {
      success = await createNewsItem(itemData, selectedFile)
    }
    setIsSubmitting(false)

    if (success) {
      setIsNewsModalOpen(false)
    } else {
      setNewsSubmitError('Failed to save news article.')
    }
  }

  // Delete News Item
  const handleNewsDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      await deleteNewsItem(id)
    }
  }

  // Chart configs
  const getLineChartData = () => {
    if (!analytics?.visitor_analytics) return { labels: [], datasets: [] }
    return {
      labels: analytics.visitor_analytics.labels,
      datasets: [
        {
          label: 'Page Views',
          data: analytics.visitor_analytics.page_views,
          borderColor: '#ec0a78',
          backgroundColor: 'rgba(236, 10, 120, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Unique Visitors',
          data: analytics.visitor_analytics.unique_visitors,
          borderColor: '#7b3ed6',
          backgroundColor: 'rgba(123, 62, 214, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    }
  }

  const getDeptChartData = () => {
    if (!analytics?.dept_stats) return { labels: [], datasets: [] }
    return {
      labels: analytics.dept_stats.labels,
      datasets: [
        {
          label: 'Students',
          data: analytics.dept_stats.students,
          backgroundColor: 'rgba(123, 62, 214, 0.7)',
          borderRadius: 4
        },
        {
          label: 'Faculty',
          data: analytics.dept_stats.faculty,
          backgroundColor: 'rgba(236, 10, 120, 0.7)',
          borderRadius: 4
        }
      ]
    }
  }

  const getPlacementChartData = () => {
    if (!analytics?.placement_stats) return { labels: [], datasets: [] }
    return {
      labels: analytics.placement_stats.labels,
      datasets: [
        {
          label: 'Success Placement Rate (%)',
          data: analytics.placement_stats.rates,
          backgroundColor: 'rgba(45, 212, 191, 0.7)',
          borderColor: '#2dd4bf',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    }
  }

  const getAttendanceChartData = () => {
    if (!analytics?.event_attendance) return { labels: [], datasets: [] }
    return {
      labels: analytics.event_attendance.labels,
      datasets: [
        {
          label: 'Average Attendance',
          data: analytics.event_attendance.attendance,
          backgroundColor: 'rgba(245, 158, 11, 0.7)',
          borderRadius: 4
        }
      ]
    }
  }

  const getDownloadsChartData = () => {
    if (!analytics?.downloads_count) return { labels: [], datasets: [] }
    return {
      labels: analytics.downloads_count.labels,
      datasets: [
        {
          label: 'Total Downloads',
          data: analytics.downloads_count.counts,
          backgroundColor: 'rgba(96, 165, 250, 0.7)',
          borderRadius: 4
        }
      ]
    }
  }

  const getGalleryChartData = () => {
    if (!analytics?.gallery_views) return { labels: [], datasets: [] }
    return {
      labels: analytics.gallery_views.labels,
      datasets: [
        {
          data: analytics.gallery_views.views,
          backgroundColor: [
            '#ec0a78',
            '#7b3ed6',
            '#2dd4bf',
            '#f59e0b',
            '#60a5fa'
          ],
          borderWidth: 0
        }
      ]
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: { family: 'Outfit', size: 11 }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { family: 'Outfit' } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { family: 'Outfit' } }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: { family: 'Outfit', size: 11 }
        }
      }
    }
  }

  return (
    <div className="admin-overlay-backdrop" onClick={onClose}>
      <motion.div
        className="admin-overlay-content"
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 30 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="admin-close-btn" onClick={onClose} aria-label="Close Admin Panel">
          <X size={20} />
        </button>

        {/* Not Logged In - Login Form */}
        {!isAuthenticated ? (
          <div className="admin-login-wrapper">
            <div className="admin-login-card">
              <div className="login-icon-ring">
                <Lock size={32} />
              </div>
              <h2>RIT CMS Portal</h2>
              <p>Sign in to manage homepage sections, news updates, and view campus telemetry analytics.</p>

              <form onSubmit={handleLoginSubmit}>
                {authError && <div className="login-error-msg">{authError}</div>}
                
                <div className="form-group">
                  <label htmlFor="admin-username">Username</label>
                  <input
                    type="text"
                    id="admin-username"
                    placeholder="Enter admin username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="admin-password">Password</label>
                  <input
                    type="password"
                    id="admin-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="login-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>

              <div className="login-note-card">
                <Info size={16} />
                <span>Default credentials: <strong>admin</strong> / <strong>admin123</strong></span>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In - Dashboard Panel */
          <div className="admin-dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
              <div className="sidebar-brand">
                <div className="brand-dot" />
                <div>
                  <h4>RIT Portal</h4>
                  <small>{isApiConnected ? 'Connected to Django' : 'Local Sandbox Mode'}</small>
                </div>
              </div>

              <nav className="sidebar-nav">
                <button
                  className={activeTab === 'analytics' ? 'active' : ''}
                  onClick={() => setActiveTab('analytics')}
                >
                  <LayoutDashboard size={18} />
                  <span>Analytics</span>
                </button>
                <button
                  className={activeTab === 'homepage' ? 'active' : ''}
                  onClick={() => setActiveTab('homepage')}
                >
                  <Settings size={18} />
                  <span>Homepage CMS</span>
                </button>
                <button
                  className={activeTab === 'news' ? 'active' : ''}
                  onClick={() => setActiveTab('news')}
                >
                  <FileText size={18} />
                  <span>News CRUD</span>
                </button>
              </nav>

              <div className="sidebar-footer">
                <button onClick={logout} className="logout-btn">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </aside>

            {/* Dashboard Content Panel */}
            <main className="admin-main-panel">
              {/* HEADER */}
              <header className="admin-main-header">
                <div>
                  <span className="breadcrumbs">CMS / {activeTab.toUpperCase()}</span>
                  <h1>
                    {activeTab === 'analytics' && 'Operational Analytics'}
                    {activeTab === 'homepage' && 'Homepage Management'}
                    {activeTab === 'news' && 'Featured News Manager'}
                  </h1>
                </div>
              </header>

              {/* TAB 1: ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="tab-pane-content">
                  <div className="analytics-overview-cards">
                    <div className="metric-card shadow-pink">
                      <small>Visitor Count</small>
                      <h3>30,000</h3>
                      <span>+12.5% this month</span>
                    </div>
                    <div className="metric-card shadow-purple">
                      <small>Total Enrollment</small>
                      <h3>1,960</h3>
                      <span>All departments</span>
                    </div>
                    <div className="metric-card shadow-teal">
                      <small>Placement Status</small>
                      <h3>86%</h3>
                      <span>2024-25 Batch</span>
                    </div>
                    <div className="metric-card shadow-orange">
                      <small>Recruitment Partners</small>
                      <h3>250+</h3>
                      <span>Active partnerships</span>
                    </div>
                  </div>

                  <div className="charts-grid-dashboard">
                    {/* Visitor Views Line Chart */}
                    <div className="chart-dashboard-panel">
                      <div className="panel-hdr">
                        <h4>VISITOR ANALYTICS</h4>
                        <span>LAST 6 MONTHS</span>
                      </div>
                      <div className="chart-canvas-dashboard">
                        {analytics ? <Line data={getLineChartData()} options={chartOptions} /> : <div className="loader">Loading...</div>}
                      </div>
                    </div>

                    {/* Department Stats Bar Chart */}
                    <div className="chart-dashboard-panel">
                      <div className="panel-hdr">
                        <h4>DEPARTMENT ENROLLMENT</h4>
                        <span>STUDENTS VS FACULTY</span>
                      </div>
                      <div className="chart-canvas-dashboard">
                        {analytics ? <Bar data={getDeptChartData()} options={chartOptions} /> : <div className="loader">Loading...</div>}
                      </div>
                    </div>

                    {/* Placement stats */}
                    <div className="chart-dashboard-panel">
                      <div className="panel-hdr">
                        <h4>HISTORICAL PLACEMENT RATE</h4>
                        <span>5-YEAR PERCENTAGES</span>
                      </div>
                      <div className="chart-canvas-dashboard">
                        {analytics ? <Bar data={getPlacementChartData()} options={chartOptions} /> : <div className="loader">Loading...</div>}
                      </div>
                    </div>

                    {/* Attendance */}
                    <div className="chart-dashboard-panel">
                      <div className="panel-hdr">
                        <h4>EVENT ATTENDANCE</h4>
                        <span>AVERAGE ATTENDEES</span>
                      </div>
                      <div className="chart-canvas-dashboard">
                        {analytics ? <Bar data={getAttendanceChartData()} options={chartOptions} /> : <div className="loader">Loading...</div>}
                      </div>
                    </div>

                    {/* Downloads count */}
                    <div className="chart-dashboard-panel">
                      <div className="panel-hdr">
                        <h4>DOWNLOADS COUNT</h4>
                        <span>OFFICIAL ATTACHMENTS</span>
                      </div>
                      <div className="chart-canvas-dashboard">
                        {analytics ? <Bar data={getDownloadsChartData()} options={{ ...chartOptions, indexAxis: 'y' as const }} /> : <div className="loader">Loading...</div>}
                      </div>
                    </div>

                    {/* GalleryViews */}
                    <div className="chart-dashboard-panel">
                      <div className="panel-hdr">
                        <h4>GALLERY VIEWS</h4>
                        <span>CATEGORY POPULARITY</span>
                      </div>
                      <div className="chart-canvas-dashboard">
                        {analytics ? <Doughnut data={getGalleryChartData()} options={doughnutOptions} /> : <div className="loader">Loading...</div>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HOMEPAGE CMS */}
              {activeTab === 'homepage' && (
                <div className="tab-pane-content">
                  <form onSubmit={handleHomepageSave} className="cms-editor-form">
                    
                    {/* SECTION A: HERO */}
                    <fieldset className="cms-fieldset">
                      <legend>1. Hero Section</legend>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>Hero Title (Use \n for line breaks)</label>
                          <textarea
                            value={heroTitle}
                            onChange={(e) => setHeroTitle(e.target.value)}
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>Hero Subtitle</label>
                          <textarea
                            value={heroSubtitle}
                            onChange={(e) => setHeroSubtitle(e.target.value)}
                            rows={3}
                            required
                          />
                        </div>
                      </div>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>Hero Image URL / Path</label>
                          <input
                            type="text"
                            value={heroImageUrl}
                            onChange={(e) => setHeroImageUrl(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </fieldset>

                    {/* SECTION B: COLLEGE OVERVIEW */}
                    <fieldset className="cms-fieldset">
                      <legend>2. College Overview</legend>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>Badge Text</label>
                          <input
                            type="text"
                            value={aboutBadge}
                            onChange={(e) => setAboutBadge(e.target.value)}
                            required
                          />
                        </div>
                        <div className="editor-col">
                          <label>About Section Title</label>
                          <input
                            type="text"
                            value={aboutTitle}
                            onChange={(e) => setAboutTitle(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>Lead Text (Strong paragraph)</label>
                          <textarea
                            value={aboutLead}
                            onChange={(e) => setAboutLead(e.target.value)}
                            rows={3}
                            required
                          />
                        </div>
                      </div>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>Description Paragraph</label>
                          <textarea
                            value={aboutDescription}
                            onChange={(e) => setAboutDescription(e.target.value)}
                            rows={4}
                            required
                          />
                        </div>
                      </div>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>About Image URL / Path</label>
                          <input
                            type="text"
                            value={aboutImageUrl}
                            onChange={(e) => setAboutImageUrl(e.target.value)}
                            required
                          />
                        </div>
                        <div className="editor-col">
                          <label>ESTD Year</label>
                          <input
                            type="text"
                            value={aboutEstd}
                            onChange={(e) => setAboutEstd(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </fieldset>

                    {/* SECTION C: VISION & MISSION */}
                    <fieldset className="cms-fieldset">
                      <legend>3. Core Philosophy (Vision & Mission)</legend>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>Vision Statement</label>
                          <textarea
                            value={visionText}
                            onChange={(e) => setVisionText(e.target.value)}
                            rows={3}
                            required
                          />
                        </div>
                      </div>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>Mission Intro Text</label>
                          <textarea
                            value={missionIntro}
                            onChange={(e) => setMissionIntro(e.target.value)}
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                      <div className="editor-row">
                        <div className="editor-col">
                          <label>Mission Bullet Points (One per line)</label>
                          <textarea
                            value={missionPointsText}
                            onChange={(e) => setMissionPointsText(e.target.value)}
                            rows={5}
                            required
                          />
                        </div>
                      </div>
                    </fieldset>

                    {/* SECTION D: STATISTICS */}
                    <fieldset className="cms-fieldset">
                      <legend>4. Dashboard Counters</legend>
                      {statsData.map((stat, index) => (
                        <div className="editor-row stat-edit-row" key={index}>
                          <div className="editor-col">
                            <label>Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                              required
                            />
                          </div>
                          <div className="editor-col">
                            <label>Value</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                              required
                            />
                          </div>
                          <div className="editor-col">
                            <label>Color Tone</label>
                            <select
                              value={stat.tone}
                              onChange={(e) => handleStatChange(index, 'tone', e.target.value)}
                            >
                              <option value="pink">Pink</option>
                              <option value="orange">Orange</option>
                              <option value="green">Green</option>
                              <option value="blue">Blue</option>
                              <option value="purple">Purple</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </fieldset>

                    {/* SECTION E: CTA BUTTONS */}
                    <fieldset className="cms-fieldset">
                      <legend>5. CTA Buttons</legend>
                      {ctaButtons.map((btn, index) => (
                        <div className="editor-row btn-edit-row" key={index}>
                          <div className="editor-col">
                            <label>Button Text</label>
                            <input
                              type="text"
                              value={btn.text}
                              onChange={(e) => handleCtaChange(index, 'text', e.target.value)}
                              required
                            />
                          </div>
                          <div className="editor-col">
                            <label>Action Link (e.g. #gallery or URL)</label>
                            <input
                              type="text"
                              value={btn.link}
                              onChange={(e) => handleCtaChange(index, 'link', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </fieldset>

                    <div className="cms-form-footer">
                      <button type="submit" className="save-cms-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving Configuration...' : 'Save Configuration'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: NEWS CRUD */}
              {activeTab === 'news' && (
                <div className="tab-pane-content">
                  <div className="crud-toolbar">
                    <button onClick={() => openNewsModal(null)} className="add-btn">
                      <Plus size={16} />
                      <span>Create News Article</span>
                    </button>
                  </div>

                  <div className="crud-table-wrapper">
                    <table className="crud-table">
                      <thead>
                        <tr>
                          <th>Thumbnail</th>
                          <th>Title</th>
                          <th>Summary</th>
                          <th>Published Date</th>
                          <th>Featured</th>
                          <th className="actions-col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsList.map((news) => (
                          <tr key={news.id}>
                            <td className="thumb-td">
                              {news.thumbnail_url ? (
                                <img src={news.thumbnail_url} alt="Thumbnail preview" className="table-thumb" />
                              ) : (
                                <div className="table-thumb-empty">No Img</div>
                              )}
                            </td>
                            <td>
                              <strong>{news.title}</strong>
                            </td>
                            <td className="summary-td">{news.summary}</td>
                            <td>{new Date(news.published_at).toLocaleDateString()}</td>
                            <td>
                              <button
                                className="featured-toggle-btn"
                                onClick={() => toggleFeaturedNews(news.id, !news.featured)}
                              >
                                {news.featured ? (
                                  <ToggleRight size={26} className="text-teal" />
                                ) : (
                                  <ToggleLeft size={26} className="text-muted" />
                                )}
                              </button>
                            </td>
                            <td className="actions-td">
                              <button onClick={() => openNewsModal(news)} className="action-btn edit-btn" title="Edit">
                                <Edit size={14} />
                              </button>
                              <button onClick={() => handleNewsDelete(news.id)} className="action-btn delete-btn" title="Delete">
                                <Trash size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </motion.div>

      {/* CRUD MODAL FOR ADDING/EDITING NEWS */}
      <AnimatePresence>
        {isNewsModalOpen && (
          <div className="admin-sub-modal-backdrop" onClick={() => setIsNewsModalOpen(false)}>
            <motion.div
              className="admin-sub-modal-content"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{editingNews ? 'Edit News Article' : 'Create News Article'}</h3>
                <button onClick={() => setIsNewsModalOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleNewsSubmit} className="modal-form">
                {newsSubmitError && <div className="modal-error-msg">{newsSubmitError}</div>}

                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Summary *</label>
                  <input
                    type="text"
                    value={newsSummary}
                    onChange={(e) => setNewsSummary(e.target.value)}
                    placeholder="Enter short summary"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Body Content *</label>
                  <textarea
                    value={newsBody}
                    onChange={(e) => setNewsBody(e.target.value)}
                    placeholder="Enter detailed article body text"
                    rows={6}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Publish Date *</label>
                    <input
                      type="datetime-local"
                      value={newsPublishedAt}
                      onChange={(e) => setNewsPublishedAt(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group inline-toggle">
                    <label>Featured News</label>
                    <button
                      type="button"
                      onClick={() => setNewsFeatured(!newsFeatured)}
                      className="modal-toggle-btn"
                    >
                      {newsFeatured ? <ToggleRight size={28} className="text-teal" /> : <ToggleLeft size={28} className="text-muted" />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Upload Thumbnail File (Optional)</label>
                  <div className="file-uploader-box">
                    <Upload size={18} />
                    <span>{selectedFile ? selectedFile.name : 'Select Thumbnail Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Or Alternate Image URL</label>
                  <input
                    type="text"
                    value={newsThumbnailUrl}
                    onChange={(e) => setNewsThumbnailUrl(e.target.value)}
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setIsNewsModalOpen(false)} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="save-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
