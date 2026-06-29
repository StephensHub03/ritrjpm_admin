const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/department_subpages.json', 'utf8'));
const keys = Object.keys(data.aids || {});
const peoKey = keys.find(k => k.toLowerCase().includes('peo') || k.toLowerCase().includes('po'));
console.log('PEO key:', peoKey);
console.log(JSON.stringify(data.aids[peoKey], null, 2));
