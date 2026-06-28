const https = require('https');
const cheerio = require('cheerio');

function scrape(url) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const $ = cheerio.load(data);
      console.log('--- ' + url + ' ---');
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('.pdf')) {
          console.log(href);
        }
      });
    });
  });
}

scrape('https://www.ritrjpm.ac.in/');
scrape('https://www.ritrjpm.ac.in/onlineapplication/');
