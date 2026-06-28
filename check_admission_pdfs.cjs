const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');
const data = JSON.parse(fs.readFileSync('src/data/department_subpages.json', 'utf8'));

async function check() {
  for (const dept in data) {
    for (const tab in data[dept]) {
      if (tab.toLowerCase().includes('admission open')) {
        const url = data[dept][tab].url;
        if (!url) continue;
        console.log('\nChecking', dept, url);
        await new Promise(resolve => {
          https.get(url, res => {
            let html = '';
            res.on('data', chunk => html += chunk);
            res.on('end', () => {
              const $ = cheerio.load(html);
              let found = 0;
              // Look for links that might be brochures
              $('a[href$=".pdf"]').each((i, el) => {
                const text = $(el).text().trim();
                const href = $(el).attr('href');
                if (text || href.toLowerCase().includes('brochure')) {
                   console.log('  PDF:', text || 'Icon', href);
                   found++;
                }
              });
              if(found === 0) console.log('  No PDFs found on this page.');
              resolve();
            });
          });
        });
      }
    }
  }
}
check();
