const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\MTHISHA\\Documents\\GitHub\\MAportfolio';
const adminFiles = [
    'admin.html',
    'admin/blog-editor.html',
    'admin/inbox.html',
    'admin/projects.html',
    'admin/settings.html'
];
// Note: exclude admin/login.html from getting admin-data.js as it doesn't need to load the DB.

adminFiles.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        const prefix = file.includes('admin/') ? '../' : '';
        const scriptTag = `<script src="${prefix}assets/js/admin-data.js"></script>`;

        if (!content.includes('admin-data.js')) {
            content = content.replace(/(<script src="[^"]*admin-auth\.js"><\/script>)/, `$1\n<script src="${prefix}assets/js/admin-data.js"></script>`);
            fs.writeFileSync(fullPath, content);
            console.log(`Injected data manager into ${file}`);
        }
    }
});
