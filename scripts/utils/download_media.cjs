const fs = require('fs');
const path = require('path');
const axios = require('axios');
const https = require('https');

const DEPT_JSON = 'src/data/department_subpages.json';
const GENERIC_JSON = 'src/data/scraped_content.json';
const MEDIA_DIR = 'public/media';

https.globalAgent.maxSockets = 50; // allow more concurrent sockets

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function sanitizeName(name) {
  return (name || 'unknown').toString().replace(/[^a-zA-Z0-9_\-\.]/g, '_').substring(0, 100);
}

// Semaphore to limit concurrency
class Semaphore {
  constructor(max) {
    this.max = max;
    this.active = 0;
    this.waiting = [];
  }
  async acquire() {
    if (this.active < this.max) {
      this.active++;
      return;
    }
    return new Promise(resolve => this.waiting.push(resolve));
  }
  release() {
    if (this.waiting.length > 0) {
      const next = this.waiting.shift();
      next();
    } else {
      this.active--;
    }
  }
}

const semaphore = new Semaphore(20); // 20 concurrent downloads

async function downloadFile(url, dest) {
  if (fs.existsSync(dest)) {
    return true;
  }
  
  await semaphore.acquire();
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
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) resolve(true);
      });
    });
  } catch (err) {
    // console.error(`Error downloading ${url}`);
    return false;
  } finally {
    semaphore.release();
  }
}

async function processJson(filePath, isGeneric) {
  if (!fs.existsSync(filePath)) return;
  
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  
  let downloadCount = 0;
  const tasks = [];

  for (const page in data) {
    if (isGeneric) {
       if (data[page] && data[page].content) {
         data[page].content.forEach(item => {
           if ((item.type === 'image' || item.type === 'document') && item.src && item.src.includes('ritrjpm.ac.in')) {
             tasks.push({ item, urlField: 'src', page: 'generic', component: page });
           }
           if ((item.type === 'image' || item.type === 'document') && item.href && item.href.includes('ritrjpm.ac.in')) {
             tasks.push({ item, urlField: 'href', page: 'generic', component: page });
           }
         });
       }
    } else {
       for (const comp in data[page]) {
         if (data[page][comp] && data[page][comp].content) {
           data[page][comp].content.forEach(item => {
             if ((item.type === 'image' || item.type === 'document') && item.src && item.src.includes('ritrjpm.ac.in')) {
               tasks.push({ item, urlField: 'src', page, component: comp });
             }
             if ((item.type === 'image' || item.type === 'document') && item.href && item.href.includes('ritrjpm.ac.in')) {
               tasks.push({ item, urlField: 'href', page, component: comp });
             }
           });
         }
       }
    }
  }

  console.log(`Found ${tasks.length} media URLs to migrate in ${filePath}`);
  
  const downloadPromises = tasks.map(async (task, index) => {
    const { item, urlField, page, component } = task;
    const url = item[urlField];
    
    if (url.startsWith('/media/')) return; // Already local

    const originalFilename = path.basename(new URL(url).pathname);
    const safePage = sanitizeName(page);
    const safeComponent = sanitizeName(component);
    const safeFilename = sanitizeName(decodeURIComponent(originalFilename));
    
    const folderPath = path.join(MEDIA_DIR, safePage, safeComponent);
    ensureDir(folderPath);
    
    const localDest = path.join(folderPath, safeFilename);
    const publicHref = `/media/${safePage}/${safeComponent}/${safeFilename}`;
    
    const success = await downloadFile(url, localDest);
    
    if (success) {
      item[urlField] = publicHref;
      downloadCount++;
    }
    
    if (index % 100 === 0) {
      console.log(`Progress: ${index}/${tasks.length}`);
    }
  });
  
  await Promise.all(downloadPromises);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${filePath} with ${downloadCount} local paths.`);
}

async function run() {
  ensureDir(MEDIA_DIR);
  await processJson(DEPT_JSON, false);
  await processJson(GENERIC_JSON, true);
  console.log("All media downloads complete!");
}

run();
