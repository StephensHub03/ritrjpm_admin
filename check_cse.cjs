const https = require('https');
const cheerio = require('cheerio');
https.get('https://www.ritrjpm.ac.in/departments/computer-science-engg/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const $ = cheerio.load(data);
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text();
      if (href && (href.toLowerCase().includes('brochure') || text.toLowerCase().includes('brochure') || href.toLowerCase().includes('admission') || text.toLowerCase().includes('admission'))) {
        console.log('CSE link:', href, text);
      }
    });
  });
});
