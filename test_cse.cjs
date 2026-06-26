const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('C:\\Users\\yashw\\.gemini\\antigravity-ide\\brain\\6a10b0bd-53f2-409e-b1df-b0b101925dfc\\.system_generated\\steps\\166\\content.md', 'utf8');
const $ = cheerio.load(html);
console.log('h3 count:', $('h3').length, 'table count:', $('table').length, 'Has single-service:', $('.single-service').length);
console.log('Title:', $('h2.title').text() || $('h2.text-white').text());
console.log('Main content html sample:', $('.single-service').html()?.substring(0, 200));
