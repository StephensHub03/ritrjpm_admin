const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const deptUrls = {
  cse: 'https://www.ritrjpm.ac.in/departments/computer-science-engg/computer-science-engg-peo--s--po--pso.php',
  it: 'https://www.ritrjpm.ac.in/departments/rit-information-technology/it-peos-pos-psos.php',
  aids: 'https://www.ritrjpm.ac.in/departments/ai-and-ds/ai-ds-peos-pos-psos.php',
  csbs: 'https://www.ritrjpm.ac.in/departments/computer-science-and-business-systems/csbs-peos--pos--psos.php',
};

async function scrapeDept(deptKey, url) {
  console.log(`\nFetching ${deptKey} from ${url}...`);
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  let container = $('.col-md-8.blog-pull-right .single-service').first();
  if (!container.length) container = $('.col-md-9 .single-service').first();
  if (!container.length) container = $('.col-md-8 .single-service').first();
  if (!container.length) container = $('.col-md-12 .single-service').first();
  if (!container.length) container = $('.col-md-9').first();
  if (!container.length) container = $('.col-md-8').first();

  console.log(`Container found: ${container.length > 0}`);

  // Deep extraction - walk all elements
  container.find('*').each((i, el) => {
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    const $el = $(el);
    if (!tag) return;
    const text = $el.clone().children().remove().end().text().trim().replace(/\s+/g, ' ');
    if (text.length > 5 && text.length < 400 && ['h2','h3','h4','h5','p','li'].includes(tag)) {
      console.log(`  [${tag}] ${text.slice(0,150)}`);
    }
  });
}

(async () => {
  for (const [k, v] of Object.entries(deptUrls)) {
    await scrapeDept(k, v);
  }
})();
