const fs = require('fs');
const path = require('path');
const axios = require('axios');
const https = require('https');

const FACULTY_TS = 'src/components/facultyData.ts';
const MEDIA_DIR = 'public/media/faculty';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function sanitizeName(name) {
  return (name || 'unknown').toString().replace(/[^a-zA-Z0-9_\-\.]/g, '_').substring(0, 100);
}

async function downloadFile(url, dest) {
  if (fs.existsSync(dest)) return true;
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
      timeout: 15000,
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(dest);
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => { error = err; writer.close(); reject(err); });
      writer.on('close', () => { if (!error) resolve(true); });
    });
  } catch (err) {
    console.error(`Error downloading ${url}: ${err.message}`);
    return false;
  }
}

async function run() {
  ensureDir(MEDIA_DIR);
  let content = fs.readFileSync(FACULTY_TS, 'utf8');

  // Extract all images
  const imgRegex = /resolveLocalScrapedImage\(['"`](https:\/\/www\.ritrjpm\.ac\.in[^'"`]+)['"`]\)/g;
  let match;
  let updates = [];

  while ((match = imgRegex.exec(content)) !== null) {
    const url = match[1];
    const originalFilename = decodeURIComponent(url.split('/').pop());
    const safeFilename = sanitizeName(originalFilename);
    const dest = path.join(MEDIA_DIR, safeFilename);
    const publicUrl = `/media/faculty/${safeFilename}`;
    updates.push({ type: 'image', old: match[0], new: `'${publicUrl}'`, url, dest });
  }

  // Extract all pdfs
  const pdfRegex = /pdfUrl:\s*['"`](https:\/\/www\.ritrjpm\.ac\.in[^'"`]+)['"`]/g;
  while ((match = pdfRegex.exec(content)) !== null) {
    const url = match[1];
    const originalFilename = decodeURIComponent(url.split('/').pop());
    const safeFilename = sanitizeName(originalFilename);
    const dest = path.join(MEDIA_DIR, safeFilename);
    const publicUrl = `/media/faculty/${safeFilename}`;
    updates.push({ type: 'pdf', old: match[0], new: `pdfUrl: '${publicUrl}'`, url, dest });
  }

  console.log(`Found ${updates.length} URLs to process.`);

  for (let i = 0; i < updates.length; i++) {
    const u = updates[i];
    await downloadFile(u.url, u.dest);
    content = content.replace(u.old, u.new);
    if (i % 5 === 0) console.log(`Processed ${i + 1}/${updates.length}`);
  }

  // Also remove the import for resolveLocalScrapedImage if it's unused
  if (!content.includes('resolveLocalScrapedImage')) {
    content = content.replace(/import { resolveLocalScrapedImage } from '\.\.\/utils\/localScrapedImages'\n*/, '');
  }

  fs.writeFileSync(FACULTY_TS, content);
  console.log('facultyData.ts has been updated successfully!');
}

run();
