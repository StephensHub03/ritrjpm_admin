import React, { useState } from 'react'
import { Plus, Trash, FileUp, Image as ImageIcon } from 'lucide-react'
import { useCMS } from './CMSContext'

interface ContentBlockEditorProps {
  blocks: any[]
  onChange: (blocks: any[]) => void
}

const ContentBlockEditor: React.FC<ContentBlockEditorProps> = ({ blocks, onChange }) => {
  const { uploadGlobalFile } = useCMS()
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null)

  const handleUpdate = (idx: number, updates: any) => {
    const next = [...blocks]
    next[idx] = { ...next[idx], ...updates }
    onChange(next)
  }

  const handleRemove = (idx: number) => {
    onChange(blocks.filter((_, i) => i !== idx))
  }

  const handleAdd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value
    if (!type) return
    const next = [...blocks]
    if (type === 'heading') next.push({ type: 'heading', level: 'h3', text: 'New Heading' })
    if (type === 'paragraph') next.push({ type: 'paragraph', text: 'New paragraph text...' })
    if (type === 'list') next.push({ type: 'list', items: ['List item 1'] })
    if (type === 'document') next.push({ type: 'document', text: 'Document Title', href: '' })
    if (type === 'image') next.push({ type: 'image', src: '', alt: 'Image description' })
    onChange(next)
    e.target.value = '' // reset select
  }

  const handleFileUpload = async (idx: number, file: File, type: 'document' | 'image') => {
    setUploadingIdx(idx)
    const url = await uploadGlobalFile(file)
    if (url) {
      if (type === 'document') handleUpdate(idx, { href: url })
      if (type === 'image') handleUpdate(idx, { src: url })
    }
    setUploadingIdx(null)
  }

  const handleListChange = (idx: number, text: string) => {
    handleUpdate(idx, { items: text.split('\n') })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Page Content Blocks</label>
        <select 
          onChange={handleAdd}
          defaultValue=""
          style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}
        >
          <option value="" disabled>+ Add Block</option>
          <option value="heading">Heading</option>
          <option value="paragraph">Paragraph</option>
          <option value="list">Bullet List</option>
          <option value="document">PDF Document</option>
          <option value="image">Image</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {blocks.map((block, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px', position: 'relative' }}>
            <button type="button" onClick={() => handleRemove(idx)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer' }}><Trash size={14}/></button>
            <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 700, color: '#ec0a78', textTransform: 'uppercase' }}>
              {block.type} Block
            </div>
            
            {block.type === 'heading' && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <select value={block.level} onChange={(e) => handleUpdate(idx, { level: e.target.value })} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '12px' }}>
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                </select>
                <input type="text" value={block.text} onChange={(e) => handleUpdate(idx, { text: e.target.value })} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '12px' }} />
              </div>
            )}

            {block.type === 'paragraph' && (
              <textarea value={block.text} onChange={(e) => handleUpdate(idx, { text: e.target.value })} rows={4} style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '12px', lineHeight: 1.5 }} />
            )}

            {block.type === 'list' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>Enter one list item per line.</span>
                <textarea value={(block.items || []).join('\n')} onChange={(e) => handleListChange(idx, e.target.value)} rows={5} style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '12px', lineHeight: 1.5 }} />
              </div>
            )}

            {block.type === 'document' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input type="text" value={block.text} onChange={(e) => handleUpdate(idx, { text: e.target.value })} placeholder="Document Title" style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '12px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="file" accept=".pdf" onChange={(e) => e.target.files && handleFileUpload(idx, e.target.files[0], 'document')} style={{ flex: 1, padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '11px' }} />
                  {uploadingIdx === idx && <span style={{ fontSize: '11px', color: '#2dd4bf' }}>Uploading...</span>}
                </div>
                {block.href && <span style={{ fontSize: '10px', color: '#94a3b8' }}>Current file: {block.href.split('/').pop()}</span>}
              </div>
            )}

            {block.type === 'image' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input type="text" value={block.alt || ''} onChange={(e) => handleUpdate(idx, { alt: e.target.value })} placeholder="Image Description (Alt Text)" style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '12px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="file" accept="image/*" onChange={(e) => e.target.files && handleFileUpload(idx, e.target.files[0], 'image')} style={{ flex: 1, padding: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '11px' }} />
                  {uploadingIdx === idx && <span style={{ fontSize: '11px', color: '#2dd4bf' }}>Uploading...</span>}
                </div>
                {block.src && <span style={{ fontSize: '10px', color: '#94a3b8' }}>Current file: {block.src.split('/').pop()}</span>}
              </div>
            )}

          </div>
        ))}
        {blocks.length === 0 && <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>No content blocks yet. Add one above.</p>}
      </div>
    </div>
  )
}

export default ContentBlockEditor
