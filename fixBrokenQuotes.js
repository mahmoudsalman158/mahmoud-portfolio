import fs from 'fs';
import path from 'path';

const targetDir = '.';

function isTargetFile(filePath) {
  const validExts = ['.ts', '.tsx', '.js', '.jsx'];
  const ext = path.extname(filePath);
  return validExts.includes(ext);
}

function fixQuotesInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let changed = false;

  const fixedLines = lines.map(line => {
    const trimmed = line.trim();

    // يتشيك على imageUrl: "....' أو العكس
    if (
      trimmed.startsWith('imageUrl:') &&
      ((trimmed.includes('"') && trimmed.includes("'")) ||
        (trimmed.endsWith("'") && trimmed.includes('"')) ||
        (trimmed.endsWith('"') && trimmed.includes("'")))
    ) {
      const match = trimmed.match(/imageUrl:\s*["'](.+?)["']/);
      if (match) {
        const fixed = `imageUrl: '${match[1]}'`;
        changed = true;
        return line.replace(/imageUrl:\s*["'](.+?)["']/, fixed);
      }
    }

    return line;
  });

  if (changed) {
    fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
    console.log(`✅ Fixed quotes in: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (isTargetFile(fullPath)) {
      fixQuotesInFile(fullPath);
    }
  });
}

walk(targetDir);
