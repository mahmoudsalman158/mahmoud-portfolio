import fs from 'fs';
import path from 'path';

const targetDir = '.';

function isTextFile(filePath) {
  const textExtensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.json', '.md', '.txt', ''];
  const ext = path.extname(filePath);
  return textExtensions.includes(ext);
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    const replaced = content
      // يعدل الصور في JSX و HTML
      .replace(/src="\/images\//g, 'src="/mahmoud-portfolio/images/')
      .replace(/src='\/images\//g, "src='/mahmoud-portfolio/images/")
      .replace(/src=\{['"]\/images\//g, 'src={"/mahmoud-portfolio/images/')
      // يعدل الصور في ملفات data مثل projects.ts و blogPostsPart1.ts
      .replace(/imageUrl:\s*['"]\/images\//g, 'imageUrl: "/mahmoud-portfolio/images/');

    if (replaced !== original) {
      fs.writeFileSync(filePath, replaced, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    }
  } catch (err) {
    console.warn(`⚠️ Could not process ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else {
      if (isTextFile(fullPath)) {
        processFile(fullPath);
      }
    }
  });
}

walk(targetDir);
