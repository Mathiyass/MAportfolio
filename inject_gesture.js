const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\MTHISHA\\Documents\\GitHub\\MAportfolio';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const fullPath = path.join(dir, file);
        let content = fs.readFileSync(fullPath, 'utf8');

        if (!content.includes('gesture.js')) {
            content = content.replace(/(<script src="assets\/js\/main\.js"><\/script>)/, `$1\n    <script src="assets/js/gesture.js"></script>`);
            fs.writeFileSync(fullPath, content);
            console.log(`Injected gesture nav into ${file}`);
        }
    }
});

// Also handle admin subfolder
const adminDir = path.join(dir, 'admin');
if (fs.existsSync(adminDir)) {
    const adminFiles = fs.readdirSync(adminDir);
    adminFiles.forEach(file => {
        if (file.endsWith('.html')) {
            const fullPath = path.join(adminDir, file);
            let content = fs.readFileSync(fullPath, 'utf8');

            if (!content.includes('gesture.js')) {
                content = content.replace(/(<script src="\.\.\/assets\/js\/main\.js"><\/script>)/, `$1\n    <script src="../assets/js/gesture.js"></script>`);
                fs.writeFileSync(fullPath, content);
                console.log(`Injected gesture nav into admin/${file}`);
            }
        }
    });
}
