const https = require('https');
const cheerio = require('cheerio');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

const depts = [
  'civil-engg',
  'computer-science-engg',
  'electrical-electronics-engg',
  'electronics-communication-engg',
  'mechanical-engg',
  'computer-science-engg-aiml',
  'ai-and-ds',
  'computer-science-and-business-systems',
  'rit-information-technology'
];

async function main() {
  const map = {};
  for (const dept of depts) {
    map[dept] = [];
    const url = `https://www.ritrjpm.ac.in/departments/${dept}/`;
    try {
      const html = await fetchPage(url);
      const $ = cheerio.load(html);
      
      // Look for ANY link containing 'brochure' in text or href
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().toLowerCase();
        if (href && (href.toLowerCase().includes('brochure') || text.includes('brochure'))) {
           console.log(`Found brochure link for ${dept}: ${href}`);
           const fullUrl = href.startsWith('http') ? href : `https://www.ritrjpm.ac.in/departments/${dept}/${href}`;
           map[dept].push(fullUrl);
        }
      });
    } catch (e) {
      console.log('Error for', dept, e.message);
    }
  }

  // Also try common admission open page slugs
  const commonSlugs = [
    'admission-open.php',
    'admission-open-brochure.php',
    'ad-admission-open.php',
    'cs-admission-open.php',
    'ce-admission-open.php',
    'ee-admission-open.php',
    'ec-admission-open.php',
    'me-admission-open.php',
    'it-admission-open.php'
  ];

  for (const dept of depts) {
    if (map[dept].length === 0) {
      console.log(`Trying common slugs for ${dept}...`);
      for (const slug of commonSlugs) {
        const url = `https://www.ritrjpm.ac.in/departments/${dept}/${slug}`;
        try {
          const html = await fetchPage(url);
          if (html && !html.includes('404 Not Found') && html.includes('Brochure')) {
             console.log(`Found possible admission page for ${dept} at ${url}`);
             const $ = cheerio.load(html);
             $('a').each((i, el) => {
               const href = $(el).attr('href');
               if (href && href.includes('.pdf')) {
                 console.log(`  PDF: ${href}`);
               }
             });
          }
        } catch(e) {}
      }
    }
  }
}

main();
