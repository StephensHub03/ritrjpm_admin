const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\yashw\\.gemini\\antigravity-ide\\brain\\31da0fd1-4642-41a3-aed4-83cd00def737\\.system_generated\\steps\\78\\content.md', 'utf8');

// find all pdf links
const pdfs = content.match(/href="([^"]+\.pdf)"/gi);
console.log(pdfs);

const iframePdfs = content.match(/src="([^"]+\.pdf)"/gi);
console.log(iframePdfs);

const allPdfs = content.match(/[a-zA-Z0-9_\-\/\.]+\.pdf/gi);
console.log(Array.from(new Set(allPdfs)));
