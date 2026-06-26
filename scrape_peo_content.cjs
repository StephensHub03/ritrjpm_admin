const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const deptUrls = {
  civil: 'https://www.ritrjpm.ac.in/departments/civil-engg/civil-engg-peo-po--pso.php',
  cse: 'https://www.ritrjpm.ac.in/departments/computer-science-engg/computer-science-engg-peo--s--po--pso.php',
  ece: 'https://www.ritrjpm.ac.in/departments/electronics-communication-engg/electronics-communication-engg-peo--s--pso.php',
  eee: 'https://www.ritrjpm.ac.in/departments/electrical-electronics-engg/electrical-electronics-engg-peo-spo-pso.php',
  mech: 'https://www.ritrjpm.ac.in/departments/mechanical-engg/mechanical-engg-peo--s--po--pso.php',
  it: 'https://www.ritrjpm.ac.in/departments/rit-information-technology/it-peos-pos-psos.php',
  aids: 'https://www.ritrjpm.ac.in/departments/ai-and-ds/ai-ds-peos-pos-psos.php',
  aiml: 'https://www.ritrjpm.ac.in/departments/computer-science-engg-aiml/cse-aiml-peos-pos-psos.php',
  csbs: 'https://www.ritrjpm.ac.in/departments/computer-science-and-business-systems/csbs-peos--pos--psos.php'
};

const jsonPath = path.join(__dirname, 'src', 'data', 'department_subpages.json');
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

async function scrapeDept(deptKey, url) {
  try {
    console.log(`Fetching ${deptKey} ...`);
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`Failed to fetch ${url} - Status ${res.status}`);
      return;
    }
    const html = await res.text();
    const $ = cheerio.load(html);

    let container = $('.col-md-8.blog-pull-right .single-service').first();
    if (!container.length) container = $('.col-md-9 .single-service').first();
    if (!container.length) container = $('.col-md-8 .single-service').first();
    if (!container.length) container = $('.col-md-12 .single-service').first();
    if (!container.length) container = $('.col-md-9').first();
    if (!container.length) container = $('.col-md-8').first();

    if (!container.length) {
      console.log(`No main content found for ${deptKey}`);
      return;
    }

    const contentArray = [];
    const children = container.children().toArray();
    for (const el of children) {
      const tag = el.tagName.toLowerCase();
      const $el = $(el);

      if ($el.hasClass('cls_testimonials') || $el.css('display') === 'none') continue;
      if ($el.find('.cls_testimonials').length > 0) continue;

      if (tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h2') {
        const text = $el.text().trim().replace(/\s+/g, ' ');
        if (text && !text.includes('DEPARTMENT OF') && !text.includes('PEO, PO')) {
          contentArray.push({ type: 'heading', level: 'h3', text: text });
        }
      } else if (tag === 'p' || tag === 'div') {
        const text = $el.text().trim().replace(/\s+/g, ' ');
        if (text && text.length > 5 && tag === 'p') {
          contentArray.push({ type: 'paragraph', text: text });
        }
      } else if (tag === 'ul' || tag === 'ol') {
         const items = [];
         $el.find('li').each((i, li) => {
             const text = $(li).text().trim().replace(/\s+/g, ' ');
             if (text) items.push(text);
         });
         if (items.length > 0) {
             contentArray.push({ type: 'list', items: items });
         }
      }
    }

    if (contentArray.length > 0) {
      console.log(`Found ${contentArray.length} blocks for ${deptKey}.`);
      if (data[deptKey]) {
        // find the key that matches PEO
        let peoKey = Object.keys(data[deptKey]).find(k => k.toLowerCase().includes('peo') || k.toLowerCase().includes('po'));
        if (!peoKey) peoKey = 'PEO, PO & PSO';
        
        if (!data[deptKey][peoKey]) {
            data[deptKey][peoKey] = { label: "PEO, PO & PSO", url: url, content: contentArray };
        } else {
            data[deptKey][peoKey].content = contentArray;
        }
      }
    } else {
      console.log(`Found 0 blocks for ${deptKey}.`);
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
