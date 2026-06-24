const scrapedImageModules = import.meta.glob(
  '../assets/scraped_images/**/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}',
  {
    eager: true,
    import: 'default',
  },
) as Record<string, string>

const publicFallbacks: Record<string, string> = {
  'manager1.jpg': '/manager1.jpg',
  'manager2.jpg': '/manager2.jpg',
  'ritlogo.png': '/ritlogo.png',
  'rit-logo-reference.png': '/rit-logo-reference.png',
}

interface ScrapedImageEntry {
  url: string
  fileName: string
  stem: string
  tokens: Set<string>
}

const scrapedImageEntries: ScrapedImageEntry[] = Object.entries(scrapedImageModules).map(([filePath, url]) => {
  const fileName = filePath.split('/').pop()?.toLowerCase() || ''
  const stem = fileName.replace(/\.[^.]+$/, '')
  const cleanStem = stem.replace(/^[a-f0-9]{6,16}_/, '')
  const tokens = new Set(tokenize(cleanStem))

  return { url, fileName, stem: cleanStem, tokens }
})

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

function getFileName(src: string) {
  try {
    const url = new URL(src, 'https://www.ritrjpm.ac.in')
    return decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || '').toLowerCase()
  } catch {
    return decodeURIComponent(src.split('/').pop() || '').toLowerCase()
  }
}

export function resolveLocalScrapedImage(src?: string | null): string | null {
  if (!src) return null
  if (src.startsWith('/')) return src

  const fileName = getFileName(src)
  if (!fileName) return null

  if (publicFallbacks[fileName]) {
    return publicFallbacks[fileName]
  }

  const stem = fileName.replace(/\.[^.]+$/, '')
  const sourceTokens = new Set([...tokenize(src), ...tokenize(fileName), ...tokenize(stem)])

  let bestMatch: ScrapedImageEntry | null = null
  let bestScore = 0

  for (const entry of scrapedImageEntries) {
    let score = 0

    if (entry.fileName === fileName) score += 100
    if (entry.stem === stem) score += 80
    if (entry.fileName.endsWith(`_${fileName}`) || entry.fileName.includes(stem)) score += 20
    if (entry.stem.includes(stem) || stem.includes(entry.stem)) score += 12

    for (const token of sourceTokens) {
      if (entry.tokens.has(token)) score += 4
    }

    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  return bestMatch && bestScore >= 12 ? bestMatch.url : null
}
