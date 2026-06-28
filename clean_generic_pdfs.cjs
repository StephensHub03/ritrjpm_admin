const fs = require('fs');

const genericPdfs = [
  'Faculty_Recruitment_26-27.pdf',
  'End_Semester_Exam_TT.pdf',
  'EC - RIT 05.07.2013.pdf',
  'RIT_EC-Compliance Report.pdf',
  'Anti_Raggging_Committee_2024-25.pdf',
  '2024-2025-Complaints-Grievance-Redressal-Committee.pdf'
];

const ecePdf = {
  type: 'document',
  href: 'https://www.ritrjpm.ac.in/gallery/8/905_ECE_Brouchure_final.pdf',
  text: 'ECE Brochure Final'
};

const files = [
  'd:/Ritrjpm-website/src/data/department_subpages.json',
  'd:/ritrjpm_admin/src/data/department_subpages.json'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));

    for (const dept in data) {
      for (const key in data[dept]) {
        if (key.toLowerCase().includes('admission')) {
          if (data[dept][key].content) {
            // filter out all generic pdfs
            const filteredContent = data[dept][key].content.filter(item => {
              if (item.type === 'document' && item.href) {
                return !genericPdfs.some(g => item.href.includes(g));
              }
              return true; // keep non-documents
            });
            data[dept][key].content = filteredContent;

            // if it's ece, add the ece brochure if not there
            if (dept === 'ece') {
                if (!filteredContent.some(c => c.href === ecePdf.href)) {
                    data[dept][key].content.push(ecePdf);
                }
            }
          }
        }
      }
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Cleaned generic PDFs from ${file}`);
  }
});
