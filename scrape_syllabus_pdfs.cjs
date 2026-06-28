const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');

const jsonPath = 'd:/ritrjpm_admin/src/data/department_subpages.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const ignoredPdfs = [
    'End_Semester_Exam_TT.pdf',
    'Faculty_Recruitment_26-27.pdf',
    'RIT_EC-Compliance Report.pdf',
    'Anti_Raggging_Committee',
    'Complaints-Grievance-Redressal-Committee'
];

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
    }).on('error', err => reject(err));
  });
}

function resolveUrl(href) {
   if (!href) return null;
   if (href.startsWith('http')) return href;
   if (href.startsWith('/')) return 'https://www.ritrjpm.ac.in' + href;
   return 'https://www.ritrjpm.ac.in/' + href;
}

function getFileName(url) {
   return url.split('/').pop().replace('.pdf', '');
}

async function scrapePdfs() {
  let updatedCount = 0;
  for (const dept in data) {
    for (const tab in data[dept]) {
      const tabLower = tab.toLowerCase();
      if (tabLower.includes('syllabus') || tabLower.includes('curriculum')) {
        const tabData = data[dept][tab];
        if (tabData.url) {
          console.log(`Fetching PDFs for ${dept} -> ${tab}`);
          try {
             const html = await fetchHtml(tabData.url);
             const $ = cheerio.load(html);
             
             const newDocs = [];
             
             // Look for PDFs inside the main wrapper
             // We'll just look anywhere in col-md-9 or col-md-8
             let container = $('.col-md-9, .col-md-8, .col-lg-9').first();
             if (!container.length) container = $('body');
             
             // Use a set to avoid duplicates
             const seen = new Set();
             
             container.find('a').each((i, el) => {
                const href = $(el).attr('href');
                if (href && href.toLowerCase().endsWith('.pdf')) {
                   const isIgnored = ignoredPdfs.some(ignored => href.includes(ignored));
                   if (!isIgnored) {
                      const absoluteUrl = resolveUrl(href);
                      if (!seen.has(absoluteUrl)) {
                         seen.add(absoluteUrl);
                         let text = $(el).text().trim() || getFileName(absoluteUrl);
                         newDocs.push({
                            type: 'document',
                            href: absoluteUrl,
                            text: text
                         });
                      }
                   }
                }
             });
             
             if (newDocs.length > 0) {
                // Prepend or replace documents in the content array
                if (!tabData.content) tabData.content = [];
                // Remove existing documents to prevent duplicates/garbage
                tabData.content = tabData.content.filter(item => item.type !== 'document');
                tabData.content.unshift(...newDocs);
                updatedCount++;
                console.log(`  -> Added ${newDocs.length} PDFs`);
             }
          } catch(e) {
             console.error(`Failed to fetch ${tabData.url}`, e.message);
          }
        }
      }
    }
  }
  
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`Successfully updated PDFs for ${updatedCount} syllabus tabs.`);
}

scrapePdfs();
