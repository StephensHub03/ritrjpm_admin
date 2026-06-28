const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');

const urls = [
  { dept: 'civil', url: 'https://www.ritrjpm.ac.in/departments/civil-engg/civil-course-outcome.php' },
  { dept: 'cse', url: 'https://www.ritrjpm.ac.in/departments/computer-science-engg/cse-course-outcome.php' },
  { dept: 'eee', url: 'https://www.ritrjpm.ac.in/departments/electrical-electronics-engg/course-outcome.php' },
  { dept: 'ece', url: 'https://www.ritrjpm.ac.in/departments/electronics-communication-engg/ece-course-outcome.php' },
  { dept: 'mech', url: 'https://www.ritrjpm.ac.in/departments/mechanical-engg/mech-course-outcome.php' },
  { dept: 'mech_archive', url: 'https://www.ritrjpm.ac.in/departments/mechanical-engg/mech-archives-cos.php' },
  { dept: 'aids', url: 'https://www.ritrjpm.ac.in/departments/ai-and-ds/ad-course-outcome.php' },
  { dept: 'csbs', url: 'https://www.ritrjpm.ac.in/departments/computer-science-and-business-systems/csbs-course-outcome.php' },
  { dept: 'it', url: 'https://www.ritrjpm.ac.in/departments/rit-information-technology/it-course-outcome.php' }
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}

const excludeTerms = ['grievance', 'academic', 'faculty', 'raggging', 'calendar', 'wanted', 'newsletter', 'msm', 'brochure', 'end_semester', 'report', 'nirf', 'compliance'];

async function run() {
  const results = {};
  for (const item of urls) {
    try {
      const html = await fetchUrl(item.url);
      const $ = cheerio.load(html);
      let pdfLink = null;
      
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.toLowerCase().endsWith('.pdf')) {
            const lowerHref = href.toLowerCase();
            const isExcluded = excludeTerms.some(term => lowerHref.includes(term));
            
            if (!isExcluded) {
                if (!pdfLink) {
                    pdfLink = href; // Take the first valid one
                } else if (lowerHref.includes('course') || lowerHref.includes('outcome')) {
                    pdfLink = href; // Prefer ones that mention course/outcome
                }
            }
        }
      });
      
      if (!pdfLink) {
         $('iframe').each((i, el) => {
            const src = $(el).attr('src');
            if (src && src.toLowerCase().endsWith('.pdf')) {
               pdfLink = src;
            }
         });
      }

      if (pdfLink) {
         if (!pdfLink.startsWith('http')) {
             if (pdfLink.startsWith('/')) {
                 pdfLink = 'https://www.ritrjpm.ac.in' + pdfLink;
             } else {
                 pdfLink = 'https://www.ritrjpm.ac.in/' + pdfLink;
             }
         }
      }
      console.log(item.dept, '=>', pdfLink);
      results[item.dept] = pdfLink;
    } catch (e) {
      console.error(item.dept, e.message);
    }
  }
  fs.writeFileSync('d:/ritrjpm_admin/pdf_links.json', JSON.stringify(results, null, 2));
}
run();
