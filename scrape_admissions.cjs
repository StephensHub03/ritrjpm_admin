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
  'civil-engineering',
  'computer-science',
  'electrical-electronics-engg',
  'electronics-communication-engg',
  'mechanical-engineering',
  'ai-and-ml',
  'ai-and-ds',
  'cs-and-bs',
  'information-technology'
];

async function main() {
  for (const dept of depts) {
    const url = `https://www.ritrjpm.ac.in/departments/${dept}/`;
    try {
      const html = await fetchPage(url);
      const $ = cheerio.load(html);
      let admissionUrl = null;
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('admission')) {
          admissionUrl = href.startsWith('http') ? href : `https://www.ritrjpm.ac.in/departments/${dept}/${href}`;
        }
      });
      
      if (admissionUrl) {
        console.log('Found admission URL for', dept, ':', admissionUrl);
        const admHtml = await fetchPage(admissionUrl);
        const $adm = cheerio.load(admHtml);
        $adm('a').each((i, el) => {
          const href = $adm(el).attr('href');
          if (href && href.includes('.pdf')) {
            console.log('  PDF ->', href);
          }
        });
      } else {
        console.log('No admission URL found for', dept);
      }
    } catch (e) {
      console.log('Error for', dept, e.message);
    }
  }
}

main();
