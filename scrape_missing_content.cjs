const fs = require('fs');
const jsonPath = 'd:/ritrjpm_admin/src/data/department_subpages.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let removedCount = 0;

for (const dept in data) {
  for (const tab in data[dept]) {
    const tabData = data[dept][tab];
    if (tabData.content) {
       const initialLength = tabData.content.length;
       tabData.content = tabData.content.filter(item => {
           if (item.type === 'paragraph' && item.text && item.text.includes('Team of Megha')) {
               return false;
           }
           if (item.type === 'heading' && item.text && item.text.includes('Team of Megha')) {
               return false;
           }
           return true;
       });
       if (tabData.content.length !== initialLength) {
           console.log(`Removed dummy text from ${dept} -> ${tab}`);
           removedCount++;
       }
    }
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log(`Cleaned up 'Team of Megha' from ${removedCount} tabs.`);
