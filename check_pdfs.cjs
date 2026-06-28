const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false)).end();
  });
}

const depts = [
  'civil-engineering', 'civil', 'civil-engg',
  'computer-science', 'cse',
  'mechanical-engineering', 'mech',
  'electronics-communication-engg', 'ece',
  'electrical-electronics-engg', 'eee',
  'information-technology', 'it',
  'ai-and-ml', 'aiml',
  'cs-and-bs', 'csbs'
];

const patterns = [
  "images/{dept}/2026-2027/{dept}_Admission_Brochure_2026-2027.pdf",
  "images/{dept}/2026-2027/{dept}_Admission_Brochure_2026.pdf",
  "images/{dept}/2025-2026/{dept}_Admission_Brochure_2025-2026.pdf",
  "images/{dept}/2024-2025/{dept}_Admission_Brochure_2024-2025.pdf",
  "images/{dept}/2022-2023/RIT_{dept}_Brochure_2023.pdf"
];

async function main() {
  for (const dept of depts) {
    let found = false;
    for (const pat of patterns) {
      const u1 = pat.replace(/{dept}/g, dept);
      const u2 = pat.replace(/{dept}/g, dept.toUpperCase());
      const u3 = pat.replace(/{dept}/g, dept.split('-').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join('_'));
      
      for (const uri of [u1, u2, u3]) {
        if (await checkUrl('https://www.ritrjpm.ac.in/' + uri)) {
           console.log(`Found: https://www.ritrjpm.ac.in/${uri}`);
           found = true;
        }
      }
    }
  }
}
main();
