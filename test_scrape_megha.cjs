const https = require('https');
const cheerio = require('cheerio');

https.get('https://www.ritrjpm.ac.in/departments/computer-science-engg/computer-science-engg-curriculum-syllabus.php', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const $ = cheerio.load(html);
    
    // Find the wrapper containing main content
    let mainHtml = $('.main-content').html() || '';
    if (!mainHtml) {
       mainHtml = $('#main').html() || '';
    }
    
    // The main content area in RIT website is often directly under .col-md-9 or .col-md-8
    $('.col-md-9, .col-md-8, .col-sm-12, .col-lg-9, .blog-pull-right').each((i, el) => {
       console.log('Container class:', $(el).attr('class'), 'length:', $(el).html().length);
       if ($(el).html().includes('table') || $(el).html().includes('href')) {
          console.log('   -> Contains table or links!');
       }
       if ($(el).text().includes('Megha')) {
          console.log('   -> Contains Team of Megha in live site?!');
       }
    });

  });
});
