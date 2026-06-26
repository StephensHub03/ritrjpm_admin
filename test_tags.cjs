const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('C:\\Users\\yashw\\.gemini\\antigravity-ide\\brain\\6a10b0bd-53f2-409e-b1df-b0b101925dfc\\.system_generated\\steps\\386\\content.md', 'utf8');
const $ = cheerio.load(html);
const c = $('.col-md-8.blog-pull-right .single-service').first();
console.log('Tags inside .single-service:', c.children().map((i,el)=>el.tagName.toLowerCase()).get().join(', '));
const ul = c.find('ul');
if (ul.length > 0) {
    console.log('Found UL!');
    console.log('UL HTML:', ul.first().html());
}
const ol = c.find('ol');
if (ol.length > 0) {
    console.log('Found OL!');
    console.log('OL HTML:', ol.first().html());
}
