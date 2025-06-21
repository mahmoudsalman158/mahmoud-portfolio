import fs from 'fs';
import path from 'path';

// المسار الجذر للمشروع
const targetDir = '.';

// الامتدادات التي تحتوي على أكواد HTML/JS/TS
const validExts = ['.js', '.jsx', '.ts', '.tsx', '.html'];

// الأنماط المطلوب تعديلها
const replacements = [
  { from: /src="\/images\//g, to: 'src="/mahmoud-portfolio/images/' },
  { from: /src='\/images\//g, to: "src='/mahmoud-portfolio/images/" },
  { from: /avatarSrc="\/images\//g, to: 'avatarSrc="/mahmoud-portfolio/images/' },
  { from: /avatarSrc='\/images\//g, to: "avatarSrc='/mahmoud-portfolio/images/" },
];

// دالة التعديل داخل كل ملف
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const rule of replacements) {
    content = content.replace(rule.from, rule.to);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

// المرور على جميع الملفات داخل المجلدات
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

// تنفيذ التعديلات
walk(targetDir);
