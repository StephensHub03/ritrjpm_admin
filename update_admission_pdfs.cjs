const fs = require('fs');
const path = require('path');

const aidsPdfs = [
  { type: 'document', href: 'https://www.ritrjpm.ac.in/images/ai-and-ds/2021-2022/Dert_AD_Admission_Brochure.pdf', text: 'AI_DS Admission Brochure 2021-2022' },
  { type: 'document', href: 'https://www.ritrjpm.ac.in/images/ai-and-ds/2022-2023/AI_DS-Final-Brochure_2023.pdf', text: 'AI_DS Admission Brochure 2022-2023' },
  { type: 'document', href: 'https://www.ritrjpm.ac.in/images/ai-and-ds/2024-2025/AI_DS_Admission_Brochure_2024-2025.pdf', text: 'AI_DS Admission Brochure 2024-2025' },
  { type: 'document', href: 'https://www.ritrjpm.ac.in/images/ai-and-ds/2025-2026/AI_DS_Admission_Brochure_2025-2026.pdf', text: 'AI_DS Admission Brochure 2025-2026' },
  { type: 'document', href: 'https://www.ritrjpm.ac.in/images/ai-and-ds/2026-2027/AI_DS_Admission_Brochure_2026-2027.pdf', text: 'AI_DS Admission Brochure 2026-2027' }
];

const eeePdfs = [
  { type: 'document', href: 'https://www.ritrjpm.ac.in/images/electrical-department/2022-2023/RIT_EEE_Brochure_2023.pdf', text: 'RIT EEE Brochure 2022-2023' }
];

const files = [
  'd:/Ritrjpm-website/src/data/department_subpages.json',
  'd:/ritrjpm_admin/src/data/department_subpages.json'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Update AI&DS
    if (data['aids']) {
      const keys = Object.keys(data['aids']);
      const adKey = keys.find(k => k.toLowerCase().includes('admission'));
      if (adKey) {
        // add pdfs if not already present
        const content = data['aids'][adKey].content || [];
        aidsPdfs.forEach(pdf => {
          if (!content.some(c => c.href === pdf.href)) {
            content.push(pdf);
          }
        });
        data['aids'][adKey].content = content;
      }
    }

    // Update EEE
    if (data['eee']) {
      const keys = Object.keys(data['eee']);
      const adKey = keys.find(k => k.toLowerCase().includes('admission'));
      if (adKey) {
        // add pdfs if not already present
        const content = data['eee'][adKey].content || [];
        eeePdfs.forEach(pdf => {
          if (!content.some(c => c.href === pdf.href)) {
            content.push(pdf);
          }
        });
        data['eee'][adKey].content = content;
      }
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${file}`);
  }
});
