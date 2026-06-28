const https = require('https');
const cheerio = require('cheerio');
https.get('https://www.ritrjpm.ac.in/departments/ai-and-ds/curriculum-and-syllabus.php', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const $ = cheerio.load(html);
    const title = $('title').text();
    console.log('Title:', title);
    
    // Find all PDFs anywhere on the page
    const links = [];
    $('a').each((i, el) => {
       const href = $(el).attr('href');
       if (href && href.toLowerCase().endsWith('.pdf')) {
          links.push(href);
       }
    });
    console.log('All PDF Links:', links);
  });
});
