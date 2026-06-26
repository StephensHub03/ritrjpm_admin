const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'departments');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Dept.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Disable the gallery rendering by adding false &&
  content = content.replace(
    /{!showGalleryEmptyState && galleryImages\.length > 0 && !isFacultyProfilePage && \(/g,
    '{false && !showGalleryEmptyState && galleryImages.length > 0 && !isFacultyProfilePage && ('
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated', file);
}
