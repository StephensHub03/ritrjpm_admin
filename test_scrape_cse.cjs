const https = require('https');
const cheerio = require('cheerio');
https.get('https://www.ritrjpm.ac.in/departments/computer-science-engg/computer-science-engg-curriculum-syllabus.php', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const $ = cheerio.load(html);
    const container = $('.col-md-8.blog-pull-right');
    const links = [];
    container.find('a').each((i, el) => {
       links.push($(el).attr('href'));
    });
    console.log('CSE Curriculum Links:', links);
  });
});
