const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\MTHISHA\\Documents\\GitHub\\MAportfolio';

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // IMPORTANT: Do NOT replace GitHub usernames (Mathiyass stays the same)
    // Replace display names only

    // Replace exact display-name patterns (case-sensitive, ordered carefully)
    content = content.replace(/MTHISHA PORTFOLIO/g, 'MTHISHA PORTFOLIO');
    content = content.replace(/MTHISHA SYSTEMS/g, 'MTHISHA SYSTEMS');
    content = content.replace(/MTHISHA Terminal/g, 'MTHISHA Terminal');
    content = content.replace(/MTHISHA Global/g, 'MTHISHA Global');
    content = content.replace(/MTHISHA Admin/g, 'MTHISHA Admin');
    content = content.replace(/ABOUT MTHISHA/g, 'ABOUT MTHISHA');
    content = content.replace(/Host: MTHISHA/g, 'Host: MTHISHA');

    // Replace the brand name in headers/headings (standalone MTHISHA as a display name)
    // Be careful not to replace class names or variable names
    content = content.replace(/>MTHISHA</g, '>MTHISHA<');
    content = content.replace(/"MTHISHA"/g, '"MTHISHA"');
    content = content.replace(/'MTHISHA'/g, "'MTHISHA'");
    content = content.replace(/\bMATHIYA\b(?![@_])/g, (match, offset) => {
        // Don't replace inside URLs, class names, or file paths
        const before = content.substring(Math.max(0, offset - 30), offset);
        if (before.includes('github.com') || before.includes('class=') || before.includes('id=') || before.includes('.js')) {
            return match;
        }
        return 'MTHISHA';
    });

    // Replace "Mthisha Angirasa" with "Mthisha Angirasa"
    content = content.replace(/Mthisha Angirasa/g, 'Mthisha Angirasa');

    // Replace standalone display "Mthisha" (NOT in URLs, NOT Mathiyass)
    content = content.replace(/(?<![\w\/])Mthisha(?!ss|[@_])/g, (match, offset) => {
        const before = content.substring(Math.max(0, offset - 30), offset);
        if (before.includes('github.com') || before.includes('x.com') || before.includes('href=')) {
            return match;
        }
        return 'Mthisha';
    });

    // Replace lowercase "mthisha" used as display (terminal prompts, etc)
    // Do NOT replace in URLs
    content = content.replace(/mthisha@portfolio/g, 'mthisha@portfolio');
    content = content.replace(/mthisha@example/g, 'mthisha@example');
    content = content.replace(/(?<![\/\.])mthisha(?!ss|[@_\.\/])/g, (match, offset) => {
        const before = content.substring(Math.max(0, offset - 40), offset);
        if (before.includes('github.com') || before.includes('http') || before.includes('href') || before.includes('src=')) {
            return match;
        }
        return 'mthisha';
    });

    // Also fix the MthishaParticles, MthishaGestureSystem class names
    content = content.replace(/MthishaParticles/g, 'MthishaParticles');
    content = content.replace(/MthishaGestureSystem/g, 'MthishaGestureSystem');
    content = content.replace(/MthishaAPI/g, 'MthishaAPI');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated: ${path.relative(dir, filePath)}`);
    }
}

function walkDir(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'node_modules' || entry.name === '.git') continue;
            walkDir(fullPath);
        } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js') || entry.name.endsWith('.css')) {
            processFile(fullPath);
        }
    }
}

walkDir(dir);
console.log('\\nName replacement complete!');
