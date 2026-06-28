const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/department_subpages.json', 'utf8'));
const civilKeys = Object.keys(data.civil || {});
const peoKey = civilKeys.find(k => k.toLowerCase().includes('peo') || k.toLowerCase().includes('po'));
console.log('Civil PEO key:', peoKey);
console.log(JSON.stringify(data.civil[peoKey]?.content, null, 2));
