const cheerio = require('cheerio');
const fetchAndLog = async (dept, url) => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    let peoHref = null;
    $('a').each((i, el) => {
      const text = $(el).text().trim().toLowerCase();
      const href = $(el).attr('href');
      if (text.includes('peo') || (href && href.includes('peo'))) {
         peoHref = href;
      }
    });
    console.log(`DEPT: ${dept} -> PEO URL: ${peoHref}`);
  } catch (e) { console.log(e.message); }
};

const depts = {
  civil: 'https://www.ritrjpm.ac.in/departments/civil-engg/civil-engg-about-the-department.php',
  cse: 'https://www.ritrjpm.ac.in/departments/computer-science-engg/computer-science-engg-about-the-department.php',
  ece: 'https://www.ritrjpm.ac.in/departments/electronics-communication-engg/electronics-communication-engg-about-the-department.php',
  eee: 'https://www.ritrjpm.ac.in/departments/electrical-electronics-engg/electrical-electronics-engg-about-the-department.php',
  mech: 'https://www.ritrjpm.ac.in/departments/mechanical-engg/mechanical-engg-about-the-department.php',
  it: 'https://www.ritrjpm.ac.in/departments/rit-information-technology/it-about-the-department.php',
  aids: 'https://www.ritrjpm.ac.in/departments/ai-and-ds/ai-ds-about-the-department.php',
  aiml: 'https://www.ritrjpm.ac.in/departments/computer-science-engg-aiml/aiml-about-the-department.php',
  csbs: 'https://www.ritrjpm.ac.in/departments/computer-science-and-business-systems/csbs-about-the-department.php'
};

async function run() {
    for (const [dept, url] of Object.entries(depts)) {
        await fetchAndLog(dept, url);
    }
}
run();
