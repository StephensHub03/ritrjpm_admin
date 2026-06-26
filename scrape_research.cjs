const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const deptUrls = {
  civil: 'https://www.ritrjpm.ac.in/departments/civil-engg/civil-engg-research-and-development.php',
  cse: 'https://www.ritrjpm.ac.in/departments/computer-science-engg/computer-science-engg-research-and-development.php',
  ece: 'https://www.ritrjpm.ac.in/departments/electronics-communication-engg/electronics-communication-engg--research-and-development.php',
  eee: 'https://www.ritrjpm.ac.in/departments/electrical-electronics-engg/electrical-electronics-engg-research-and-development.php',
  mech: 'https://www.ritrjpm.ac.in/departments/mechanical-engg/mechanical-engg-research-and-development.php',
  it: 'https://www.ritrjpm.ac.in/departments/rit-information-technology/it-research-and-development.php',
  aids: 'https://www.ritrjpm.ac.in/departments/ai-and-ds/ai-and-ds-research-and-development.php',
  csbs: 'https://www.ritrjpm.ac.in/departments/computer-science-and-business-systems/csbs-research-and-development.php'
};

const jsonPath = path.join(__dirname, 'src', 'data', 'department_subpages.json');
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

async function downloadPdf(url, destFolder, filename) {
  try {
    const destPath = path.join(destFolder, filename);
    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder, { recursive: true });
    }
    // If it already exists, skip
    if (fs.existsSync(destPath)) return `/pdfs/${path.basename(destFolder)}/${filename}`;

    const res = await fetch(url);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return `/pdfs/${path.basename(destFolder)}/${filename}`;
  } catch (e) {
    console.log("Error downloading PDF:", url, e.message);
    return null;
  }
}

function resolveUrl(href) {
  if (!href) return '';
  if (href.startsWith('http')) return href;
  if (href.startsWith('//')) return 'https:' + href;
  if (href.startsWith('/')) return 'https://www.ritrjpm.ac.in' + href;
  return 'https://www.ritrjpm.ac.in/' + href;
}

async function scrapeDept(deptKey, url) {
  try {
    console.log(`Fetching ${deptKey} ...`);
    const res = await fetch(url);
    if (!res.ok) return;
    const html = await res.text();
    const $ = cheerio.load(html);

    let container = $('.col-md-8.blog-pull-right .single-service').first();
    if (!container.length) container = $('.col-md-9 .single-service').first();
    if (!container.length) container = $('.col-md-8 .single-service').first();
    if (!container.length) container = $('.col-md-12 .single-service').first();
    if (!container.length) container = $('.col-md-9').first();
    if (!container.length) container = $('.col-md-8').first();

    if (!container.length) return;

    const contentArray = [];
    const destFolder = path.join(__dirname, 'public', 'pdfs', deptKey);

    const children = container.children().toArray();
    for (const el of children) {
      const tag = el.tagName.toLowerCase();
      const $el = $(el);

      if ($el.hasClass('cls_testimonials') || $el.css('display') === 'none') continue;
      if ($el.find('.cls_testimonials').length > 0) continue;

      if (tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h2') {
        const text = $el.text().trim().replace(/\s+/g, ' ');
        if (text && !text.includes('DEPARTMENT OF') && text !== 'Research and Development') {
          contentArray.push({ type: 'paragraph', text: text });
        }
      } else if (tag === 'p' || tag === 'div') {
        const text = $el.text().trim().replace(/\s+/g, ' ');
        if (text && text.length > 5 && tag === 'p') {
          contentArray.push({ type: 'paragraph', text: text });
        }
      } else if (tag === 'table') {
        const rows = [];
        const trs = $el.find('tr').toArray();
        for (let i = 0; i < trs.length; i++) {
          const cells = [];
          const tds = $(trs[i]).find('th, td').toArray();
          for (let j = 0; j < tds.length; j++) {
            let cellText = $(tds[j]).text().trim().replace(/\s+/g, ' ');
            const href = $(tds[j]).find('a').attr('href');
            
            if (href && href.endsWith('.pdf')) {
              const absoluteUrl = resolveUrl(href);
              const filename = path.basename(href);
              const localHref = await downloadPdf(absoluteUrl, destFolder, filename);
              
              if (localHref) {
                 cells.push({ text: cellText || 'View Document', href: localHref });
              } else {
                 cells.push(cellText || 'View Document');
              }
            } else {
               cells.push(cellText);
            }
          }
          if (cells.length > 0 && cells.some(c => c !== '')) rows.push(cells);
        }
        if (rows.length > 0) contentArray.push({ type: 'table', rows: rows });
      }
    }

    if (contentArray.length > 0) {
      console.log(`Found ${contentArray.length} blocks for ${deptKey}.`);
      if (data[deptKey]) {
        let rndKey = Object.keys(data[deptKey]).find(k => k.toLowerCase().includes('research'));
        if (!rndKey) rndKey = 'Research and Development';
        
        if (!data[deptKey][rndKey]) {
            data[deptKey][rndKey] = { label: "Research and Development", url: url, content: contentArray };
        } else {
            data[deptKey][rndKey].content = contentArray;
        }
      }
    }
  } catch (e) {
    console.error(`Error scraping ${deptKey}:`, e);
  }
}

async function run() {
  for (const [dept, url] of Object.entries(deptUrls)) {
    await scrapeDept(dept, url);
  }
  
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Finished updating JSON.');
}

run();
