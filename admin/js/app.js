/**
 * ADMIN APP.JS - Routing and View Rendering for the CMS
 */

document.addEventListener('DOMContentLoaded', () => {
    const data = window.portfolioData;
    if (!data) return;

    // View Routing
    function handleRoute() {
        const hash = window.location.hash || '#dashboard';
        const viewContainer = document.getElementById('view-container');
        const viewTitle = document.getElementById('view-title');
        const navLinks = document.querySelectorAll('.nav-link');

        // Update Nav State
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('bg-primary/20', 'text-primary', 'border', 'border-primary/30');
            } else {
                link.classList.remove('bg-primary/20', 'text-primary', 'border', 'border-primary/30');
            }
        });

        // Set Title
        viewTitle.innerText = hash.replace('#', '');

        // Render View
        switch (hash) {
            case '#dashboard': renderDashboard(viewContainer, data); break;
            case '#projects': renderProjects(viewContainer, data); break;
            case '#blog': renderBlog(viewContainer, data); break;
            case '#messages': renderMessages(viewContainer); break;
            case '#settings': renderSettings(viewContainer, data); break;
            default: renderDashboard(viewContainer, data);
        }
    }

    // Listen to hash changes
    window.addEventListener('hashchange', handleRoute);

    // Initial load
    handleRoute();
});

// --- View Renderers ---

function renderDashboard(container, data) {
    const profile = data.getProfile();
    const projects = data.getProjects();

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div class="glass-effect p-6 rounded-2xl border border-white/10">
                <div class="flex justify-between items-start mb-4">
                    <span class="text-slate-400 font-medium">Profile Views</span>
                    <span class="material-symbols-outlined text-primary">visibility</span>
                </div>
                <h3 class="text-4xl font-display font-bold text-white mb-2">12,482</h3>
                <span class="text-green-400 text-sm font-bold flex items-center"><span class="material-symbols-outlined text-[16px]">trending_up</span> +14% this month</span>
            </div>
            <div class="glass-effect p-6 rounded-2xl border border-white/10">
                <div class="flex justify-between items-start mb-4">
                    <span class="text-slate-400 font-medium">Projects</span>
                    <span class="material-symbols-outlined text-accent-violet">folder</span>
                </div>
                <h3 class="text-4xl font-display font-bold text-white mb-2">${projects.length}</h3>
                <span class="text-slate-500 text-sm font-bold flex items-center">Active in Portfolio</span>
            </div>
            <div class="glass-effect p-6 rounded-2xl border border-white/10">
                <div class="flex justify-between items-start mb-4">
                    <span class="text-slate-400 font-medium">Messages</span>
                    <span class="material-symbols-outlined text-blue-400">mail</span>
                </div>
                <h3 class="text-4xl font-display font-bold text-white mb-2">3</h3>
                <span class="text-slate-500 text-sm font-bold flex items-center">Unread messages</span>
            </div>
            <div class="glass-effect p-6 rounded-2xl border border-white/10">
                <div class="flex justify-between items-start mb-4">
                    <span class="text-slate-400 font-medium">GitHub Repos</span>
                    <span class="material-symbols-outlined text-orange-400">code</span>
                </div>
                <h3 class="text-4xl font-display font-bold text-white mb-2">${profile.stats.repos}</h3>
                <span class="text-slate-500 text-sm font-bold flex items-center">Public repos</span>
            </div>
        </div>

        <h3 class="text-xl font-display font-bold text-white mb-6">Quick Actions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="glass-effect p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors" onclick="window.location.hash='#blog'">
                <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
                    <span class="material-symbols-outlined text-3xl">edit_document</span>
                </div>
                <h4 class="text-lg font-bold text-white mb-2">Write a Post</h4>
                <p class="text-slate-400 text-sm">Draft a new blog article or tutorial.</p>
            </div>
            <div class="glass-effect p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors" onclick="window.location.hash='#projects'">
                <div class="w-16 h-16 rounded-full bg-accent-violet/20 flex items-center justify-center mb-4 text-accent-violet">
                    <span class="material-symbols-outlined text-3xl">add_photo_alternate</span>
                </div>
                <h4 class="text-lg font-bold text-white mb-2">Add Project</h4>
                <p class="text-slate-400 text-sm">Upload a new case study to the portfolio.</p>
            </div>
        </div>
    `;
}

function renderProjects(container, data) {
    const projects = data.getProjects();
    let rows = projects.map(p => `
        <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
            <td class="p-4">
                <div class="flex items-center gap-4">
                    <img src="${p.image}" class="w-12 h-12 rounded object-cover" />
                    <div>
                        <div class="font-bold text-white">${p.title}</div>
                        <div class="text-xs text-slate-500">${p.tech.join(', ')}</div>
                    </div>
                </div>
            </td>
            <td class="p-4 text-slate-400">${p.featured ? '<span class="text-primary bg-primary/10 px-2 py-1 rounded text-xs font-bold">Featured</span>' : ''}</td>
            <td class="p-4">
                <button class="text-slate-400 hover:text-white mr-2"><span class="material-symbols-outlined text-[20px]">edit</span></button>
                <button class="text-red-400 hover:text-red-300" onclick="deleteProject('${p.id}')"><span class="material-symbols-outlined text-[20px]">delete</span></button>
            </td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <p class="text-slate-400">Manage your portfolio case studies and featured work.</p>
            <button class="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px]">add</span> New Project
            </button>
        </div>
        
        <div class="glass-effect rounded-2xl border border-white/10 overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-white/5 border-b border-white/10">
                    <tr>
                        <th class="p-4 text-sm font-medium text-slate-400">Project</th>
                        <th class="p-4 text-sm font-medium text-slate-400">Status</th>
                        <th class="p-4 text-sm font-medium text-slate-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;

    // Expose delete to global for inline onclick
    window.deleteProject = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            data.deleteProject(id);
            renderProjects(container, data); // re-render
        }
    };
}

function renderBlog(container, data) {
    const posts = data.getBlogPosts();
    let rows = posts.map(p => `
        <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
            <td class="p-4">
                <div class="font-bold text-white">${p.title}</div>
                <div class="text-xs text-slate-500">${p.date} • ${p.category}</div>
            </td>
            <td class="p-4 text-slate-400"><span class="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs font-bold">Published</span></td>
            <td class="p-4">
                <button class="text-slate-400 hover:text-white mr-2" onclick="openBlogEditor('${p.id}')"><span class="material-symbols-outlined text-[20px]">edit</span></button>
                <button class="text-red-400 hover:text-red-300"><span class="material-symbols-outlined text-[20px]">delete</span></button>
            </td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <p class="text-slate-400">Write and manage your blog articles.</p>
            <button onclick="openBlogEditor('new')" class="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px]">add</span> New Post
            </button>
        </div>
        
        <div class="glass-effect rounded-2xl border border-white/10 overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-white/5 border-b border-white/10">
                    <tr>
                        <th class="p-4 text-sm font-medium text-slate-400">Article</th>
                        <th class="p-4 text-sm font-medium text-slate-400">Status</th>
                        <th class="p-4 text-sm font-medium text-slate-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;

    window.openBlogEditor = (id) => {
        const modal = document.getElementById('modal-container');
        let post = { title: '', category: '', content: '' };
        if (id !== 'new') {
            post = posts.find(p => p.id === id) || post;
        }

        modal.innerHTML = `
            <div class="bg-background-dark w-full max-w-5xl h-[90vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
                <div class="p-4 border-b border-white/10 flex justify-between items-center glass-effect">
                    <h3 class="font-display font-bold text-xl text-white">${id === 'new' ? 'Create Post' : 'Edit Post'}</h3>
                    <button class="text-slate-400 hover:text-white" onclick="document.getElementById('modal-container').classList.add('hidden')">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div class="p-6 flex-1 overflow-y-auto">
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-sm text-slate-400 mb-2">Title</label>
                            <input type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary" value="${post.title}">
                        </div>
                        <div>
                            <label class="block text-sm text-slate-400 mb-2">Category</label>
                            <input type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary" value="${post.category}">
                        </div>
                    </div>
                    <label class="block text-sm text-slate-400 mb-2">Markdown Content</label>
                    <textarea id="mde-editor"></textarea>
                </div>
                <div class="p-4 border-t border-white/10 glass-effect flex justify-end gap-4">
                    <button class="px-6 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5" onclick="document.getElementById('modal-container').classList.add('hidden')">Cancel</button>
                    <button class="px-6 py-2 rounded-xl bg-primary text-background-dark font-bold hover:bg-primary/90" onclick="document.getElementById('modal-container').classList.add('hidden')">Save Post</button>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
        new SimpleMDE({ element: document.getElementById("mde-editor"), initialValue: post.content });
    };
}

function renderSettings(container, data) {
    const profile = data.getProfile();
    container.innerHTML = `
        <div class="max-w-3xl glass-effect p-8 rounded-2xl border border-white/10">
            <h3 class="text-xl font-display font-bold text-white mb-6 border-b border-white/10 pb-4">Profile Information</h3>
            
            <div class="space-y-6">
                <div>
                    <label class="block text-sm text-slate-400 mb-2">Display Name</label>
                    <input type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" value="${profile.name}">
                </div>
                <div>
                    <label class="block text-sm text-slate-400 mb-2">Headline Role</label>
                    <input type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" value="${profile.role}">
                </div>
                <div>
                    <label class="block text-sm text-slate-400 mb-2">Bio Strategy</label>
                    <textarea class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary h-32">${profile.bio}</textarea>
                </div>
                
                <h3 class="text-xl font-display font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Social Links</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm text-slate-400 mb-2">GitHub URL</label>
                        <input type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" value="${profile.social.github}">
                    </div>
                    <div>
                        <label class="block text-sm text-slate-400 mb-2">LinkedIn URL</label>
                        <input type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" value="${profile.social.linkedin}">
                    </div>
                </div>

                <div class="mt-8 pt-6 border-t border-white/10 flex justify-end">
                    <button class="bg-primary hover:bg-primary/90 text-background-dark px-8 py-3 rounded-xl text-md font-bold transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderMessages(container) {
    container.innerHTML = `
        <div class="flex h-[600px] glass-effect rounded-2xl border border-white/10 overflow-hidden">
            <div class="w-1/3 border-r border-white/10 flex flex-col">
                <div class="p-4 border-b border-white/10">
                    <input type="text" placeholder="Search messages..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-primary text-sm">
                </div>
                <div class="flex-1 overflow-y-auto">
                    <div class="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer bg-primary/5 border-l-2 border-l-primary">
                        <div class="flex justify-between items-center mb-1">
                            <h4 class="font-bold text-white text-sm">Sarah Jenkins</h4>
                            <span class="text-xs text-primary">12:30 PM</span>
                        </div>
                        <p class="text-slate-400 text-xs truncate">Hey Mathiya, I saw your portfolio and...</p>
                    </div>
                    <div class="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
                        <div class="flex justify-between items-center mb-1">
                            <h4 class="font-bold text-white text-sm">David Chen</h4>
                            <span class="text-xs text-slate-500">Yesterday</span>
                        </div>
                        <p class="text-slate-400 text-xs truncate">Are you available for freelance work?</p>
                    </div>
                </div>
            </div>
            <div class="w-2/3 flex flex-col">
                <div class="p-6 border-b border-white/10 flex justify-between items-center glass-effect">
                    <div>
                        <h3 class="font-bold text-white">Sarah Jenkins</h3>
                        <p class="text-xs text-slate-400">sarah@example.com</p>
                    </div>
                    <button class="text-slate-400 hover:text-white"><span class="material-symbols-outlined">delete</span></button>
                </div>
                <div class="flex-1 p-6 overflow-y-auto">
                    <div class="bg-white/5 p-4 rounded-xl rounded-tl-none border border-white/10 max-w-[80%] text-slate-300">
                        Hey Mathiya,<br/><br/>I saw your portfolio on GitHub and absolutely loved the design. We are looking for a frontend developer to help build a new web3 dashboard. Are you currently taking on any freelance projects?<br/><br/>Best,<br/>Sarah
                    </div>
                </div>
                <div class="p-4 border-t border-white/10 glass-effect">
                    <div class="flex gap-2">
                        <textarea rows="1" placeholder="Type a reply... (This is a demo)" class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white resize-none"></textarea>
                        <button class="bg-primary hover:bg-primary/90 text-background-dark px-4 py-2 rounded-xl flex items-center justify-center"><span class="material-symbols-outlined">send</span></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
