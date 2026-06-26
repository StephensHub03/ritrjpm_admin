const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('C:\\Users\\yashw\\.gemini\\antigravity-ide\\brain\\6a10b0bd-53f2-409e-b1df-b0b101925dfc\\.system_generated\\steps\\184\\content.md', 'utf8');
const $ = cheerio.load(html);

const urls = [];
$('a').each((i, el) => {
  const text = $(el).text().trim().toLowerCase();
  const href = $(el).attr('href');
  if (href && (href.includes('peo') || text.includes('peo'))) {
    urls.push({ text: text, href: href });
  }
});

const unique = [...new Map(urls.map(item => [item.href, item])).values()];
console.log(unique);
