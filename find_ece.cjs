const cheerio = require('cheerio');
fetch('https://www.ritrjpm.ac.in/departments/electronics-communication-engg/electronics-communication-engg-about-the-department.php')
  .then(res => res.text())
  .then(html => {
    const $ = cheerio.load(html);
    const links = [];
    $('a').each((i, el) => {
      const text = $(el).text().trim().toLowerCase();
      const href = $(el).attr('href');
      if (text.includes('research') || (href && href.includes('research'))) {
         links.push({text, href});
      }
    });
    console.log([...new Map(links.map(item => [item.href, item])).values()]);
  });
