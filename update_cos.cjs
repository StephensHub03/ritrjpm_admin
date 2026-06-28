const fs = require('fs');

const subpagesFile = 'd:/Ritrjpm-website/src/data/department_subpages.json';
const linksFile = 'd:/ritrjpm_admin/pdf_links.json';

const data = JSON.parse(fs.readFileSync(subpagesFile, 'utf8'));
const pdfLinks = JSON.parse(fs.readFileSync(linksFile, 'utf8'));

// Map department keys in JSON to the keys in pdf_links
const deptMap = {
  'civil': 'civil',
  'cse': 'cse',
  'eee': 'eee',
  'ece': 'ece',
  'mech': 'mech',
  'mech_archive': 'mech_archive', // Not a root dept, handled specially
  'aids': 'aids',
  'csbs': 'csbs',
  'it': 'it'
};

for (const dept in data) {
  if (deptMap[dept]) {
      const linkKey = deptMap[dept];
      const pdfUrl = pdfLinks[linkKey];
      
      if (data[dept]['Course Outcome'] && pdfUrl) {
          data[dept]['Course Outcome'].content = [
              {
                  "type": "document",
                  "href": pdfUrl,
                  "text": "View Document"
              }
          ];
      }
      
      if (dept === 'mech' && data[dept]['Course Outcomes-Archives']) {
          const archiveUrl = pdfLinks['mech_archive'];
          if (archiveUrl) {
             data[dept]['Course Outcomes-Archives'].content = [
                {
                    "type": "document",
                    "href": archiveUrl,
                    "text": "View Document"
                }
             ];
          }
      }
  }
}

fs.writeFileSync(subpagesFile, JSON.stringify(data, null, 2));
console.log('Updated department_subpages.json successfully.');
