const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');

const jsonPath = 'd:/ritrjpm_admin/src/data/department_subpages.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
    }).on('error', err => reject(err));
  });
}

function resolveUrl(href) {
   if (!href) return null;
   if (href.startsWith('http')) return href;
   if (href.startsWith('/')) return 'https://www.ritrjpm.ac.in' + href;
   return 'https://www.ritrjpm.ac.in/' + href;
}

async function fixTables() {
  let updatedTabs = 0;
  
  for (const dept in data) {
    for (const tab in data[dept]) {
      const tabData = data[dept][tab];
      if (!tabData.content || !tabData.url) continue;
      
      const jsonTables = tabData.content.filter(item => item.type === 'table');
      if (jsonTables.length === 0) continue;
      
      console.log(`Processing tables for ${dept} -> ${tab}`);
      try {
        const html = await fetchHtml(tabData.url);
        const $ = cheerio.load(html);
        
        let container = $('.col-md-9, .col-md-8, .col-lg-9').first();
        if (!container.length) container = $('body');
        
        const domTables = [];
        container.find('table').each((i, table) => {
          const rows = [];
          $(table).find('tr').each((rIdx, tr) => {
            const cells = [];
            $(tr).find('td, th').each((cIdx, td) => {
              let text = $(td).text().trim().replace(/\s+/g, ' ');
              const a = $(td).find('a');
              if (a.length > 0) {
                const href = a.attr('href');
                if (href) {
                  const absoluteUrl = resolveUrl(href);
                  // Ignore fake links like # or javascript:void
                  if (absoluteUrl && absoluteUrl.length > 5 && !absoluteUrl.includes('javascript:')) {
                     text = text || 'View Document';
                     cells.push({ text, href: absoluteUrl });
                  } else {
                     cells.push(text);
                  }
                } else {
                  cells.push(text);
                }
              } else {
                cells.push(text);
              }
            });
            if (cells.length > 0) rows.push(cells);
          });
          if (rows.length > 0) domTables.push({ type: 'table', rows });
        });
        
        // Try to replace 1:1
        let domIndex = 0;
        let replacedCount = 0;
        for (let i = 0; i < tabData.content.length; i++) {
          if (tabData.content[i].type === 'table') {
            if (domTables[domIndex]) {
               tabData.content[i] = domTables[domIndex];
               replacedCount++;
            }
            domIndex++;
          }
        }
        
        if (replacedCount > 0) {
           updatedTabs++;
           console.log(`  -> Successfully updated ${replacedCount} tables.`);
        } else {
           console.log(`  -> No tables replaced (DOM tables count: ${domTables.length}, JSON tables count: ${jsonTables.length})`);
        }
        
      } catch(e) {
         console.error(`Failed to fetch ${tabData.url}`, e.message);
      }
    }
  }
  
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`\nSuccessfully updated tables in ${updatedTabs} tabs across all departments.`);
}

fixTables();
