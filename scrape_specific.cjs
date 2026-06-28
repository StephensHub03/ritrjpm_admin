const https = require('https');
const cheerio = require('cheerio');

https.get('https://www.ritrjpm.ac.in/departments/ai-and-ds/ad-admission-open.php', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const $ = cheerio.load(data);
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('.pdf')) {
        console.log('PDF ->', href);
      }
    });
  });
});
