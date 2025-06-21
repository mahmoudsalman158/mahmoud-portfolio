import fs from 'fs';
import path from 'path';

const targetDir = '.'; // المشروع الحالي

const validExts = ['.js', '.jsx', '.ts', '.tsx', '.html'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  content = content.replace(/src="\/images\//g, 'src="/mahmoud-portfolio/images/');
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (validExts.includes(path.extname(fullPath))) {
      processFile(fullPath);
    }
  });
}

walk(targetDir);
