const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\MATHIYA\\Documents\\GitHub\\MAportfolio';
const adminFiles = [
    'admin.html',
    'admin/blog-editor.html',
    'admin/inbox.html',
    'admin/login.html',
    'admin/projects.html',
    'admin/settings.html'
];

adminFiles.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');

        const prefix = file.includes('admin/') ? '../' : '';
        const scriptTag = `<script src="${prefix}assets/js/admin-auth.js"></script>\n</head>`;

        if (!content.includes('admin-auth.js')) {
            content = content.replace('</head>', scriptTag);
            fs.writeFileSync(fullPath, content);
            console.log(`Injected auth into ${file}`);
        }
    }
});
