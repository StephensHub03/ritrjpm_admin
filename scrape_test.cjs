const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('C:\\Users\\yashw\\.gemini\\antigravity-ide\\brain\\6a10b0bd-53f2-409e-b1df-b0b101925dfc\\.system_generated\\steps\\93\\content.md', 'utf8');
const $ = cheerio.load(content);

// In RIT website, main content is usually inside a specific div like #wrapper, .main-content, or just finding the title
const mainTitle = $('h2.title').text() || $('h1').text() || $('h3').text();
console.log('Title:', mainTitle);

const paragraphs = [];
$('.section-content p, .main-content p, p').each((i, el) => {
  const text = $(el).text().trim();
  if (text.length > 50) paragraphs.push(text);
});

console.log('Paragraphs found:', paragraphs.length);
if (paragraphs.length > 0) {
  console.log('First 2 paragraphs:', paragraphs.slice(0, 2));
}

// Check for tables
const tables = $('table').length;
console.log('Tables found:', tables);
