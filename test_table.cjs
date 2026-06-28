const fs = require('fs');
const cheerio = require('cheerio');
const content = fs.readFileSync('C:/Users/yashw/.gemini/antigravity-ide/brain/31da0fd1-4642-41a3-aed4-83cd00def737/.system_generated/steps/242/content.md', 'utf8');
const $ = cheerio.load(content);
const table = $('table').first();
const rows = [];
table.find('tr').each((i, row) => {
   const rowData = [];
   $(row).find('th, td').each((j, cell) => {
      rowData.push($(cell).text().trim().replace(/\s+/g, ' '));
   });
   rows.push(rowData);
});
console.log(rows);
