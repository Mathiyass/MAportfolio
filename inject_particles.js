const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\MTHISHA\\Documents\\GitHub\\MAportfolio';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const fullPath = path.join(dir, file);
        let content = fs.readFileSync(fullPath, 'utf8');

        if (!content.includes('tsparticles')) {
            const scripts = `
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js"></script>
    <script src="assets/js/particles.js"></script>`;
            content = content.replace(/(<script src="assets\/js\/core\.js"><\/script>)/, `${scripts}\n    $1`);
            fs.writeFileSync(fullPath, content);
            console.log(`Injected particles into ${file}`);
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

            if (!content.includes('tsparticles')) {
                const scripts = `
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js"></script>
    <script src="../assets/js/particles.js"></script>`;
                content = content.replace(/(<script src="\.\.\/assets\/js\/core\.js"><\/script>)/, `${scripts}\n    $1`);
                fs.writeFileSync(fullPath, content);
                console.log(`Injected particles into admin/${file}`);
            }
        }
    });
}
