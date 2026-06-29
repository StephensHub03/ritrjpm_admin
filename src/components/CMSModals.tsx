import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, Save, Plus, Trash } from 'lucide-react'
import { useCMS } from './CMSContext'
import type { NewsItem, PlacementItem, StatItem } from './CMSContext'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import './AdminPanel.css'
import ContentBlockEditor from './ContentBlockEditor'

interface ModalWrapperProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  maxWidth?: string
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ title, onClose, children, maxWidth = '650px' }) => {
  const modalContent = (
    <div className="admin-overlay-backdrop" onClick={onClose}>
      <motion.div
        className="admin-login-card"
        style={{ width: '100%', maxWidth, textAlign: 'left', background: '#090e1b', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#ffffff' }}>{title}</h2>
          <button className="admin-close-btn" style={{ position: 'static', width: '30px', height: '30px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '4px' }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
  return createPortal(modalContent, document.body)
}

// 1. LOGIN MODAL
export const LoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { login } = useCMS()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    const success = await login(username, password)
    setIsSubmitting(false)
    if (success) {
      onClose()
    } else {
      setError('Invalid username or password. (Hint: admin / admin123)')
    }
  }

  return (
    <ModalWrapper title="Admin Authentication" onClose={onClose} maxWidth="420px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="editor-col" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
          />
        </div>
        <div className="editor-col" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
          />
        </div>
        {error && <div style={{ color: '#f43f5e', fontSize: '12px', fontWeight: 600 }}>{error}</div>}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ width: '100%', padding: '12px', background: 'linear-gradient(90deg, #ec0a78, #7b3ed6)', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', marginTop: '8px' }}
        >
          {isSubmitting ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </ModalWrapper>
  )
}

// 2. EDIT HERO MODAL
export const EditHeroModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { homepageConfig, updateHomepageConfig, uploadGlobalFile } = useCMS()
  const [title, setTitle] = useState(homepageConfig.hero_title)
  const [subtitle, setSubtitle] = useState(homepageConfig.hero_subtitle)
  const [imageUrl, setImageUrl] = useState(homepageConfig.hero_image_url)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [ctaButtons, setCtaButtons] = useState<any[]>(homepageConfig.cta_buttons || [])
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      let finalImageUrl = imageUrl
      if (imageFile) {
        const uploadedUrl = await uploadGlobalFile(imageFile)
        if (uploadedUrl) finalImageUrl = uploadedUrl
      }

      await updateHomepageConfig({
        hero_title: title,
        hero_subtitle: subtitle,
        hero_image_url: finalImageUrl,
        cta_buttons: ctaButtons,
      })
      onClose()
    } catch (err) {
      alert('Failed to save hero section')
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddCta = () => setCtaButtons([...ctaButtons, { text: 'New Button', link: '#' }])
  const handleRemoveCta = (idx: number) => setCtaButtons(ctaButtons.filter((_, i) => i !== idx))
  const handleCtaChange = (idx: number, key: string, val: string) => {
    const updated = [...ctaButtons]
    updated[idx] = { ...updated[idx], [key]: val }
    setCtaButtons(updated)
  }

  return (
    <ModalWrapper title="Edit Hero Section" onClose={onClose}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Hero Title (Use \n for line breaks)</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={2}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontFamily: 'Outfit, sans-serif' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Hero Subtitle</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={3}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', lineHeight: 1.4 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Hero Banner Image</label>
          {imageUrl && !imageFile && <span style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Current: {imageUrl.split('/').pop()}</span>}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Call to Action (CTA) Buttons</label>
            <button type="button" onClick={handleAddCta} style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={12}/> Add Button</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ctaButtons.map((btn, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <input type="text" value={btn.text} onChange={(e) => handleCtaChange(idx, 'text', e.target.value)} placeholder="Button Text" required style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '12px' }} />
                <input type="text" value={btn.link} onChange={(e) => handleCtaChange(idx, 'link', e.target.value)} placeholder="Link / URL" required style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '12px' }} />
                <button type="button" onClick={() => handleRemoveCta(idx)} style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }} title="Remove Button"><Trash size={14} /></button>
              </div>
            ))}
            {ctaButtons.length === 0 && <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>No CTA buttons configured.</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Cancel (Undo)
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={16} />
            {isSaving ? 'Saving Changes...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

// 3. EDIT ABOUT MODAL
export const EditAboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { homepageConfig, updateHomepageConfig } = useCMS()
  const [badge, setBadge] = useState(homepageConfig.about_badge)
  const [title, setTitle] = useState(homepageConfig.about_title)
  const [lead, setLead] = useState(homepageConfig.about_lead)
  const [description, setDescription] = useState(homepageConfig.about_description)
  const [imageUrl, setImageUrl] = useState(homepageConfig.about_image_url)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [estd, setEstd] = useState(homepageConfig.about_estd)
  const [isSaving, setIsSaving] = useState(false)
  const { uploadGlobalFile } = useCMS()

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    let finalImageUrl = imageUrl
    if (imageFile) {
      const uploadedUrl = await uploadGlobalFile(imageFile)
      if (uploadedUrl) finalImageUrl = uploadedUrl
    }
    await updateHomepageConfig({
      about_badge: badge,
      about_title: title,
      about_lead: lead,
      about_description: description,
      about_image_url: finalImageUrl,
      about_estd: estd,
    })
    setIsSaving(false)
    onClose()
  }

  return (
    <ModalWrapper title="Edit College Overview" onClose={onClose}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Badge Text</label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>ESTD Year</label>
            <input
              type="text"
              value={estd}
              onChange={(e) => setEstd(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>About Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Lead Text (Strong Summary Paragraph)</label>
          <textarea
            value={lead}
            onChange={(e) => setLead(e.target.value)}
            rows={3}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', lineHeight: 1.4 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Detailed Description Paragraph</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', lineHeight: 1.4 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Overview Image</label>
          {imageUrl && !imageFile && <span style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>Current: {imageUrl.split('/').pop()}</span>}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Cancel (Undo)
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={16} />
            {isSaving ? 'Saving Changes...' : 'Save Overview'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

// 4. EDIT VISION & MISSION MODAL
export const EditVisionMissionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { homepageConfig, updateHomepageConfig } = useCMS()
  const [vision, setVision] = useState(homepageConfig.vision_text)
  const [intro, setIntro] = useState(homepageConfig.mission_intro)
  const [pointsText, setPointsText] = useState(homepageConfig.mission_points.join('\n'))
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const points = pointsText.split('\n').map(p => p.trim()).filter(Boolean)
    await updateHomepageConfig({
      vision_text: vision,
      mission_intro: intro,
      mission_points: points,
    })
    setIsSaving(false)
    onClose()
  }

  return (
    <ModalWrapper title="Edit Core Philosophy" onClose={onClose}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Vision Statement</label>
          <textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            rows={3}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', lineHeight: 1.4 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Mission Intro Paragraph</label>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            rows={2}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', lineHeight: 1.4 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Mission Points (one bullet per line)</label>
          <textarea
            value={pointsText}
            onChange={(e) => setPointsText(e.target.value)}
            rows={5}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', lineHeight: 1.4 }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Cancel (Undo)
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={16} />
            {isSaving ? 'Saving Changes...' : 'Save Vision & Mission'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

// 5. EDIT STATS MODAL
export const EditStatsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { homepageConfig, updateHomepageConfig } = useCMS()
  const [stats, setStats] = useState<StatItem[]>([...homepageConfig.stats])
  const [isSaving, setIsSaving] = useState(false)

  const handleStatChange = (idx: number, key: keyof StatItem, val: string) => {
    const updated = [...stats]
    updated[idx] = { ...updated[idx], [key]: val }
    setStats(updated)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await updateHomepageConfig({ stats })
    setIsSaving(false)
    onClose()
  }

  return (
    <ModalWrapper title="Edit College Statistics Ribbon" onClose={onClose} maxWidth="720px">
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '0 0 10px 0' }}>
          Update the statistics shown on the top ribbon of the Homepage Dashboard.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr', gap: '12px', alignItems: 'center', padding: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                  required
                  style={{ padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '13px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                  required
                  style={{ padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '13px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Lucide Icon</label>
                <input
                  type="text"
                  value={stat.icon}
                  onChange={(e) => handleStatChange(idx, 'icon', e.target.value)}
                  required
                  style={{ padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Tone</label>
                <select
                  value={stat.tone}
                  onChange={(e) => handleStatChange(idx, 'tone', e.target.value)}
                  style={{ padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '13px', height: '32px' }}
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
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Cancel (Undo)
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={16} />
            {isSaving ? 'Saving Changes...' : 'Save Statistics'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

// 6. EDIT PLACEMENTS MODAL
export const EditPlacementsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { placementsList, updatePlacementsList } = useCMS()
  const [placements, setPlacements] = useState<PlacementItem[]>([...placementsList])
  const [isSaving, setIsSaving] = useState(false)

  const handleFieldChange = (idx: number, key: keyof PlacementItem, val: string | number) => {
    const updated = [...placements]
    updated[idx] = { ...updated[idx], [key]: val }
    setPlacements(updated)
  }

  const handleAddYear = () => {
    const nextYear = placements.length > 0 ? Math.max(...placements.map(p => p.year)) + 1 : 2026
    setPlacements([
      ...placements,
      { year: nextYear, placement_percentage: 90, highest_package_lpa: 10, average_package_lpa: 4.5 }
    ])
  }

  const handleRemoveYear = (idx: number) => {
    setPlacements(placements.filter((_, i) => i !== idx))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await updatePlacementsList(placements)
    setIsSaving(false)
    onClose()
  }

  return (
    <ModalWrapper title="Edit Placement Records" onClose={onClose} maxWidth="780px">
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '0' }}>
          Manage placement records. Data changes will update the placement statistics charts immediately.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '350px', overflowY: 'auto' }}>
          {placements.map((p, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 2fr 2fr 1fr', gap: '10px', padding: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', alignItems: 'center' }}>
              <div>
                <input
                  type="number"
                  value={p.year}
                  placeholder="Year"
                  onChange={(e) => handleFieldChange(idx, 'year', parseInt(e.target.value) || 2026)}
                  required
                  style={{ width: '100%', padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '13px' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="number"
                  step="0.1"
                  value={p.placement_percentage}
                  placeholder="Rate %"
                  onChange={(e) => handleFieldChange(idx, 'placement_percentage', parseFloat(e.target.value) || 0)}
                  required
                  style={{ width: '100%', padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '13px' }}
                />
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="number"
                  step="0.1"
                  value={p.highest_package_lpa}
                  placeholder="Max LPA"
                  onChange={(e) => handleFieldChange(idx, 'highest_package_lpa', parseFloat(e.target.value) || 0)}
                  required
                  style={{ width: '100%', padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '13px' }}
                />
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>LPA</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="number"
                  step="0.1"
                  value={p.average_package_lpa}
                  placeholder="Avg LPA"
                  onChange={(e) => handleFieldChange(idx, 'average_package_lpa', parseFloat(e.target.value) || 0)}
                  required
                  style={{ width: '100%', padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '13px' }}
                />
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>LPA</span>
              </div>
              <button
                type="button"
                className="admin-close-btn"
                style={{ position: 'static', width: '30px', height: '30px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', color: '#f43f5e' }}
                onClick={() => handleRemoveYear(idx)}
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button
            type="button"
            onClick={handleAddYear}
            style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}
          >
            <Plus size={14} /> Add Placement Year
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{ padding: '10px 24px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Records'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

// 7. EDIT FLAT PAGE CONTENT MODAL
export const EditFlatPageModal: React.FC<{ pageKey: string; onClose: () => void }> = ({ pageKey, onClose }) => {
  const { flatPages, updateFlatPage } = useCMS()
  const pageData = flatPages[pageKey]
  const [title, setTitle] = useState(pageData?.title || '')
  const [contentBlocks, setContentBlocks] = useState<any[]>(pageData?.content || [])
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await updateFlatPage(pageKey, title, contentBlocks)
      onClose()
    } catch (err) {
      alert('Failed to save flat page.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <ModalWrapper title={`Edit Page Content: ${pageKey}`} onClose={onClose} maxWidth="820px">
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
          />
        </div>
          <ContentBlockEditor blocks={contentBlocks} onChange={setContentBlocks} />
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Cancel (Undo)
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={16} />
            {isSaving ? 'Saving Changes...' : 'Save Page Content'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

// 8. ADD/EDIT NEWS ITEM MODAL
export const AddEditNewsModal: React.FC<{
  newsItem: NewsItem | null
  onClose: () => void
}> = ({ newsItem, onClose }) => {
  const { createNewsItem, updateNewsItem } = useCMS()
  const [title, setTitle] = useState(newsItem?.title || '')
  const [summary, setSummary] = useState(newsItem?.summary || '')
  const [body, setBody] = useState(newsItem?.body || '')
  const [featured, setFeatured] = useState(newsItem?.featured || false)
  const [thumbnailUrl, setThumbnailUrl] = useState(newsItem?.thumbnail_url || '')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const payload = {
      title,
      summary,
      body,
      featured,
      thumbnail_url: thumbnailUrl || '/rit.JPG',
      published_at: newsItem?.published_at || new Date().toISOString()
    }

    let success = false
    if (newsItem) {
      success = await updateNewsItem(newsItem.id, payload, selectedFile)
    } else {
      success = await createNewsItem(payload, selectedFile)
    }
    setIsSaving(false)
    if (success) {
      onClose()
    }
  }

  return (
    <ModalWrapper title={newsItem ? 'Edit News Item' : 'Add News Item'} onClose={onClose}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Summary (short snippet)</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', lineHeight: 1.4 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Body Details</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            required
            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', lineHeight: 1.4 }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <label htmlFor="featured" style={{ fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Featured News (Highlight in updates)</label>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Thumbnail Image Path / URL</label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="/rit.JPG"
              style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Upload Thumbnail File</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ width: '100%', padding: '6px 0', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          style={{ padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}
        >
          <Save size={16} />
          {isSaving ? 'Submitting...' : newsItem ? 'Update News' : 'Add News Item'}
        </button>
      </form>
    </ModalWrapper>
  )
}

// 9. ANALYTICS MODAL (Chart.js dashboard popup)
export const AnalyticsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { fetchAnalytics } = useCMS()
  const [analytics, setAnalytics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics().then((data) => {
      setAnalytics(data)
      setIsLoading(false)
    })
  }, [fetchAnalytics])

  const getVisitorChartData = () => {
    if (!analytics) return { labels: [], datasets: [] }
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
          borderColor: '#246bfe',
          backgroundColor: 'rgba(36, 107, 254, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    }
  }

  const getDeptChartData = () => {
    if (!analytics) return { labels: [], datasets: [] }
    return {
      labels: analytics.dept_stats.labels,
      datasets: [
        {
          label: 'Students Enrolled',
          data: analytics.dept_stats.students,
          backgroundColor: 'rgba(123, 62, 214, 0.7)',
          borderColor: 'rgba(123, 62, 214, 1)',
          borderWidth: 1
        }
      ]
    }
  }

  const getPlacementChartData = () => {
    if (!analytics) return { labels: [], datasets: [] }
    return {
      labels: analytics.placement_stats.labels,
      datasets: [
        {
          label: 'Placement Percentage',
          data: analytics.placement_stats.rates,
          backgroundColor: '#059669',
          borderColor: '#10b981',
          borderWidth: 1
        }
      ]
    }
  }

  const getDownloadsChartData = () => {
    if (!analytics) return { labels: [], datasets: [] }
    return {
      labels: analytics.downloads_count.labels,
      datasets: [
        {
          label: 'Downloads',
          data: analytics.downloads_count.counts,
          backgroundColor: '#f59e0b',
        }
      ]
    }
  }

  const getGalleryChartData = () => {
    if (!analytics) return { labels: [], datasets: [] }
    return {
      labels: analytics.gallery_views.labels,
      datasets: [
        {
          data: analytics.gallery_views.views,
          backgroundColor: ['#ec0a78', '#246bfe', '#10b981', '#f59e0b', '#7b3ed6'],
          borderWidth: 0
        }
      ]
    }
  }

  const getEventChartData = () => {
    if (!analytics) return { labels: [], datasets: [] }
    return {
      labels: analytics.event_attendance.labels,
      datasets: [
        {
          label: 'Attendance',
          data: analytics.event_attendance.attendance,
          backgroundColor: 'rgba(36, 107, 254, 0.8)',
        }
      ]
    }
  }

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#e2e8f0', font: { family: 'Outfit', size: 10 } }
      }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255, 255, 255, 0.06)' } }
    }
  }

  return (
    <ModalWrapper title="CMS Visual Analytics Dashboard" onClose={onClose} maxWidth="1080px">
      {isLoading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>
          Calculating metrics and compiling visual widgets...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px', paddingBottom: '20px' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>VISITOR ANALYTICS (MONTHLY VIEW)</h4>
            <div style={{ height: '220px' }}>
              <Line data={getVisitorChartData()} options={chartOptions} />
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>DEPARTMENT STATISTICS (STUDENT STRENGTH)</h4>
            <div style={{ height: '220px' }}>
              <Bar data={getDeptChartData()} options={chartOptions} />
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>PLACEMENT TREND (ANNUAL %)</h4>
            <div style={{ height: '220px' }}>
              <Bar data={getPlacementChartData()} options={chartOptions} />
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>EVENT ATTENDANCE AVERAGE</h4>
            <div style={{ height: '220px' }}>
              <Bar data={getEventChartData()} options={chartOptions} />
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>BROCHURE & CALENDAR DOWNLOADS</h4>
            <div style={{ height: '220px' }}>
              <Bar data={getDownloadsChartData()} options={{ ...chartOptions, indexAxis: 'y' }} />
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>GALLERY VIEWS DISTRIBUTION</h4>
            <div style={{ height: '200px', flex: 1, position: 'relative' }}>
              <Doughnut data={getGalleryChartData()} options={{ ...chartOptions, cutout: '70%' }} />
            </div>
          </div>

        </div>
      )}
    </ModalWrapper>
  )
}

// 10. EDIT CAMPUS VIDEO GALLERY
export const EditCampusGalleryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { galleryVideos, updateGalleryVideos, uploadGlobalFile } = useCMS()
  const [videos, setVideos] = useState<any[]>([...galleryVideos])
  const [videoFiles, setVideoFiles] = useState<Record<number, File>>({})
  const [isSaving, setIsSaving] = useState(false)

  const handleFileChange = (idx: number, file: File | null) => {
    setVideoFiles(prev => {
      const updated = { ...prev }
      if (file) {
        updated[idx] = file
      } else {
        delete updated[idx]
      }
      return updated
    })
  }

  const handleFieldChange = (idx: number, key: string, val: string) => {
    const updated = [...videos]
    updated[idx] = { ...updated[idx], [key]: val }
    setVideos(updated)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const finalVideos = [...videos]
    for (let i = 0; i < finalVideos.length; i++) {
      const file = videoFiles[i]
      if (file) {
        const url = await uploadGlobalFile(file)
        if (url) {
            finalVideos[i].id = url
        }
      }
    }
    await updateGalleryVideos(finalVideos)
    setIsSaving(false)
    onClose()
  }

  return (
    <ModalWrapper title="Edit Campus Video Gallery" onClose={onClose}>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '0' }}>
          Update the YouTube video IDs and descriptions shown in the "Experience RIT in Motion" gallery.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {videos.map((vid, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Media Upload (or YouTube ID)</label>
                  {vid.id && !videoFiles[idx] && <span style={{ fontSize: '10px', color: '#94a3b8' }}>Current: {vid.id.split('/').pop()}</span>}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileChange(idx, e.target.files ? e.target.files[0] : null)}
                    style={{ padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '11px' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Video Title</label>
                  <input
                    type="text"
                    value={vid.title}
                    onChange={(e) => handleFieldChange(idx, 'title', e.target.value)}
                    required
                    style={{ padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '13px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Description</label>
                <input
                  type="text"
                  value={vid.description}
                  onChange={(e) => handleFieldChange(idx, 'description', e.target.value)}
                  required
                  style={{ padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#fff', fontSize: '13px' }}
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Cancel (Undo)
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={16} />
            {isSaving ? 'Saving Changes...' : 'Save Gallery Configuration'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

// 11. EDIT DEPT SUBPAGE CONTENT MODAL
export const EditDeptSubpageModal: React.FC<{ deptCode: string; subpageKey: string; onClose: () => void }> = ({ deptCode, subpageKey, onClose }) => {
  const { deptSubpages, updateDeptSubpage } = useCMS()
  const deptData = deptSubpages[deptCode] || {}
  const subpageData = deptData[subpageKey]
  const [contentBlocks, setContentBlocks] = useState<any[]>(subpageData?.content || [])
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await updateDeptSubpage(deptCode, subpageKey, contentBlocks)
      onClose()
    } catch (err) {
      alert('Failed to save department content.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <ModalWrapper title={`Edit Dept Page: ${deptCode.toUpperCase()} - ${subpageKey}`} onClose={onClose} maxWidth="820px">
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ContentBlockEditor blocks={contentBlocks} onChange={setContentBlocks} />
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Cancel (Undo)
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{ flex: 1, padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Save size={16} />
            {isSaving ? 'Saving Changes...' : 'Save Department Content'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

// 10. EDIT EVENTS MODAL
export const EditEventsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { eventsList, updateEventsList, uploadGlobalFile } = useCMS()
  const [events, setEvents] = useState<any[]>([...eventsList])
  const [eventFiles, setEventFiles] = useState<Record<number, { image?: File, link?: File }>>({})
  const [isSaving, setIsSaving] = useState(false)

  const handleFileChange = (idx: number, type: 'image' | 'link', file: File | null) => {
    setEventFiles(prev => {
      const current = prev[idx] || {}
      if (file) {
        return { ...prev, [idx]: { ...current, [type]: file } }
      } else {
        const updated = { ...current }
        delete updated[type]
        return { ...prev, [idx]: updated }
      }
    })
  }

  const handleFieldChange = (idx: number, key: string, val: string | number) => {
    const updated = [...events]
    updated[idx] = { ...updated[idx], [key]: val }
    setEvents(updated)
  }

  const handleAddEvent = () => {
    setEvents([
      { id: Date.now(), title: 'New Event', date: '2025-2026', category: 'General', icon: 'Calendar', description: '', image: '', link: '' },
      ...events
    ])
  }

  const handleRemoveEvent = (idx: number) => {
    if (window.confirm('Are you sure you want to remove this event?')) {
      setEvents(events.filter((_, i) => i !== idx))
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const finalEvents = [...events]
    for (let i = 0; i < finalEvents.length; i++) {
      const files = eventFiles[i]
      if (files?.image) {
        const url = await uploadGlobalFile(files.image)
        if (url) finalEvents[i].image = url
      }
      if (files?.link) {
        const url = await uploadGlobalFile(files.link)
        if (url) finalEvents[i].link = url
      }
    }
    await updateEventsList(finalEvents)
    setIsSaving(false)
    onClose()
  }

  return (
    <ModalWrapper title="Manage Latest Events" onClose={onClose} maxWidth="800px">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={handleAddEvent}
          style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={14} /> Add Event
        </button>
      </div>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
        {events.map((evt, idx) => (
          <div key={evt.id || idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '16px', position: 'relative' }}>
            <button
              type="button"
              onClick={() => handleRemoveEvent(idx)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer' }}
              title="Remove Event"
            >
              <Trash size={16} />
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>Title</label>
                <input type="text" value={evt.title} onChange={(e) => handleFieldChange(idx, 'title', e.target.value)} required style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '13px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>Academic Year / Date</label>
                <input type="text" value={evt.date} onChange={(e) => handleFieldChange(idx, 'date', e.target.value)} required style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '13px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>Description</label>
                <textarea value={evt.description} onChange={(e) => handleFieldChange(idx, 'description', e.target.value)} rows={2} required style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '13px', lineHeight: 1.4 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>Event Image</label>
                {evt.image && !eventFiles[idx]?.image && <span style={{ fontSize: '10px', color: '#94a3b8' }}>Current: {evt.image.split('/').pop()}</span>}
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(idx, 'image', e.target.files ? e.target.files[0] : null)} style={{ padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '11px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>Event PDF Document</label>
                {evt.link && !eventFiles[idx]?.link && <span style={{ fontSize: '10px', color: '#94a3b8' }}>Current: {evt.link.split('/').pop()}</span>}
                <input type="file" accept=".pdf" onChange={(e) => handleFileChange(idx, 'link', e.target.files ? e.target.files[0] : null)} style={{ padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '11px' }} />
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button type="button" onClick={onClose} disabled={isSaving} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.1)', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Cancel (Undo)</button>
          <button type="submit" disabled={isSaving} style={{ flex: 1, padding: '12px', background: '#ec0a78', border: 0, borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Save size={16} /> {isSaving ? 'Saving...' : 'Save Events'}</button>
        </div>
      </form>
    </ModalWrapper>
  )
}
