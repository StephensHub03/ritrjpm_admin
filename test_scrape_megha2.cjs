const https = require('https');
const cheerio = require('cheerio');

https.get('https://www.ritrjpm.ac.in/departments/ai-and-ds/ai-and-ds-curriculum-and-syllabus.php', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const $ = cheerio.load(html);
    const container = $('.col-md-8.blog-pull-right');
    const text = container.text();
    const idx = text.indexOf('Megha');
    if (idx !== -1) {
       console.log('Context of Megha:', text.substring(Math.max(0, idx - 100), idx + 100));
    }
  });
});
