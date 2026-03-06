const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\MATHIYA\\Documents\\GitHub\\MAportfolio';

const walkSync = function (dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'assets') {
                filelist = walkSync(path.join(dir, file), filelist);
            }
        }
        else {
            if (file.endsWith('.html') && file !== 'index.html') { // Skip index.html as it's already done
                filelist.push(path.join(dir, file));
            }
        }
    });
    return filelist;
};

const htmlFiles = walkSync(dir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Check if it's in a subdirectory
    const relativePath = path.relative(dir, file);
    const depth = relativePath.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../' : '';

    // Inject CSS
    if (!content.includes('assets/css/index.css') && !content.includes('../assets/css/index.css')) {
        content = content.replace('</head>', `<link rel="stylesheet" href="${prefix}assets/css/index.css">\n</head>`);
    }

    // Inject JS
    if (!content.includes('assets/js/core.js') && !content.includes('../assets/js/core.js')) {
        const scripts = `
<script src="https://unpkg.com/@studio-freight/lenis@1.0.34/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="${prefix}assets/js/core.js"></script>
<script src="${prefix}assets/js/main.js"></script>
</body>`;
        content = content.replace('</body>', scripts);
    }

    fs.writeFileSync(file, content);
    console.log(`Injected into ${file}`);
});
