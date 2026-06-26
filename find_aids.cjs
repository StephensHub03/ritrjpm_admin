const cheerio = require('cheerio');
const fetchAndLog = async (url) => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const links = [];
    $('a').each((i, el) => {
      const text = $(el).text().trim().toLowerCase();
      const href = $(el).attr('href');
      if (text.includes('research') || (href && href.includes('research'))) {
         links.push({text, href});
      }
    });
    console.log(`URL: ${url}`);
    console.log([...new Map(links.map(item => [item.href, item])).values()]);
  } catch (e) { console.log(e); }
};

fetchAndLog('https://www.ritrjpm.ac.in/departments/ai-and-ds/ai-ds-about-the-department.php').then(() => {
    fetchAndLog('https://www.ritrjpm.ac.in/departments/computer-science-engg-aiml/aiml-about-the-department.php');
});
