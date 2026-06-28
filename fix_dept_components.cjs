const fs = require('fs');
const path = require('path');

const dirs = [
  'd:/Ritrjpm-website/src/components/departments',
  'd:/ritrjpm_admin/src/components/departments'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'DeptSubSections.tsx');
  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace 1: const isNewsletterTab = /news letter|newsletter|magazine/i.test(activeSubpage)
    content = content.replace(
      /const isNewsletterTab = \/news letter\|newsletter\|magazine\/i\.test\(activeSubpage\)/g,
      "const isPdfTab = /news letter|newsletter|magazine|admission/i.test(activeSubpage)"
    );

    // Replace 2: if (isNewsletterTab && item.type === 'document') return false
    content = content.replace(
      /if \(isNewsletterTab && item\.type === 'document'\)/g,
      "if (isPdfTab && item.type === 'document')"
    );

    // Replace 3: const isNewsletterTab = /news letter|newsletter|magazine/i.test(activeSubpage)\s+if \(!isNewsletterTab\) return \[\]/g
    // (We replaced the definition above, so we just replace the if statement)
    content = content.replace(
      /if \(!isNewsletterTab\) return \[\]/g,
      "if (!isPdfTab) return []"
    );

    // Replace 4: kind: isMagazine ? 'Magazine' : 'Newsletter',
    content = content.replace(
      /kind: isMagazine \? 'Magazine' : 'Newsletter'/g,
      "kind: activeSubpage.toLowerCase().includes('admission') ? 'Brochure' : isMagazine ? 'Magazine' : 'Newsletter'"
    );

    // Replace 5: kind: index % 2 === 0 ? 'Magazine' : 'Newsletter',
    content = content.replace(
      /kind: index % 2 === 0 \? 'Magazine' : 'Newsletter'/g,
      "kind: activeSubpage.toLowerCase().includes('admission') ? 'Brochure' : index % 2 === 0 ? 'Magazine' : 'Newsletter'"
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file} in ${dir}`);
  });
});
