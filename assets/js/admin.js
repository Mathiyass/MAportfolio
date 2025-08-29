
// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const ADMIN_PASSWORD = 'Aspirinmss@Mathiya@20021225';
    
    // Check if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }
    
    // Login form handler
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;
        
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            showNotification('Login Successful! Redirecting...');
            setTimeout(showDashboard, 1000); // Reduce timeout as notification is less intrusive
        } else {
            showError('Invalid password. Please try again.');
        }
    });
    
    // Logout handler
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        showLogin();
    });
    
    // Navigation handlers
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
            
            // Update active nav
            document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('bg-cyber-cyan', 'text-black'));
            this.classList.add('bg-cyber-cyan', 'text-black');
        });
    });
    
    // Gallery upload handler
    document.querySelectorAll('.content-tab-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.dataset.tab;

            document.querySelectorAll('.content-tab').forEach(content => content.classList.add('hidden'));
            document.getElementById(`tab-${tab}`).classList.remove('hidden');

            document.querySelectorAll('.content-tab-btn').forEach(b => b.classList.remove('active', 'text-cyber-cyan'));
            this.classList.add('active', 'text-cyber-cyan');
        });
    });

    document.getElementById('gallery-upload').addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    addImageToGallery(e.target.result, file.name);
                };
                reader.readAsDataURL(file);
            }
        });
    });
    
    // Add project handler
    document.getElementById('add-project-btn').addEventListener('click', function() {
        showProjectModal();
    });

    // Save content handler
    document.getElementById('save-content-btn').addEventListener('click', function() {
        if(!db.pages) {
            showError("Database not loaded correctly.");
            return;
        }

        // Collect Home Page Data
        const homeContent = db.pages.home;
        homeContent.hero.greeting = document.getElementById('home-hero-greeting').value;
        homeContent.hero.name = document.getElementById('home-hero-name').value;
        homeContent.hero.titles = document.getElementById('home-hero-titles').value.split(',').map(s => s.trim()).filter(Boolean);
        homeContent.hero.bio = document.getElementById('home-hero-bio').value;

        // Collect About Page Data
        const aboutContent = db.pages.about;
        aboutContent.hero.title = document.getElementById('about-hero-title').value;
        aboutContent.hero.subtitle = document.getElementById('about-hero-subtitle').value;

        const journeyParagraphs = document.querySelectorAll('#about-journey-paragraphs textarea');
        aboutContent.myJourney.paragraphs = Array.from(journeyParagraphs).map(t => t.value);

        const timelineEvents = document.querySelectorAll('#about-timeline-events .glass');
        aboutContent.timeline.events = Array.from(timelineEvents).map(el => {
            return {
                title: el.querySelector('input[type="text"]').value,
                date: el.querySelectorAll('input[type="text"]')[1].value,
                text: el.querySelector('textarea').value
            };
        });

        // Collect Skills Page Data
        const skillsContent = db.pages.skills;
        skillsContent.hero.title = document.getElementById('skills-hero-title').value;
        skillsContent.hero.subtitle = document.getElementById('skills-hero-subtitle').value;

        const skillsCategories = document.querySelectorAll('#skills-categories-container > .glass');
        if (skillsCategories.length > 0) {
            skillsContent.categories = Array.from(skillsCategories).map((catDiv, index) => {
                const originalCategory = db.pages.skills.categories[index] || { skills: [] };
                const skillRows = catDiv.querySelectorAll('.grid.grid-cols-3');
                const skillsData = Array.from(skillRows).slice(1).map(skillRow => { // slice(1) to skip header
                    const inputs = skillRow.querySelectorAll('input');
                    return {
                        name: inputs[0].value,
                        level: parseInt(inputs[1].value, 10),
                        icon: inputs[2].value,
                        color: originalCategory.skills.find(s => s.name === inputs[0].value)?.color || 'text-cyber-cyan' // preserve color
                    };
                });
                return {
                    title: catDiv.querySelector('h4').textContent,
                    display: originalCategory.display,
                    skills: skillsData
                };
            });
        }

        showNotification('Content saved to current session!');
    });

    // Download JSON handler
    document.getElementById('download-json-btn').addEventListener('click', function() {
        if(!db.site) {
            showError("Database not loaded. Cannot download.");
            return;
        }
        const dbString = JSON.stringify(db, null, 2);
        const blob = new Blob([dbString], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'database.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('database.json has been downloaded!');
    });
    
    // Initialize with overview section
    showSection('overview');
    
    function showLogin() {
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
    }
    
    function showDashboard() {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        loadDatabase();
    }
    
    function showError(message) {
        const errorEl = document.getElementById('login-error');
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
        
        setTimeout(() => {
            errorEl.classList.add('hidden');
        }, 3000);
    }
    
    function showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show selected section
        document.getElementById(sectionName + '-section').classList.remove('hidden');
        
        // Load section-specific data
        switch(sectionName) {
            case 'projects':
                loadProjects();
                break;
            case 'gallery':
                loadGallery();
                break;
            case 'content':
                loadContent();
                break;
        }
    }
    
    let db = {}; // Use a module-level variable

    async function loadDatabase() {
        try {
            const response = await fetch('../database.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            db = await response.json();
            console.log('Admin panel database loaded:', db);
            loadDashboardData(); // Initial load
        } catch (error) {
            console.error("Could not load database for admin panel:", error);
            alert('Failed to load website data. Check console for errors.');
        }
    }

    function loadDashboardData() {
        if (!db.pages || !db.pages.projects) return;
        const projects = db.pages.projects.items || [];
        const gallery = db.pages.gallery ? db.pages.gallery.images : [];
        
        const projectCountEl = document.querySelector('#overview-section .text-cyber-cyan');
        if(projectCountEl) projectCountEl.textContent = projects.length;

        const galleryCountEl = document.querySelector('#overview-section .text-cyber-red');
        if(galleryCountEl) galleryCountEl.textContent = gallery.length;
    }
    
    function loadProjects() {
        if (!db.pages || !db.pages.projects) return;
        const projects = db.pages.projects.items || [];
        const projectsList = document.getElementById('projects-list');
        
        if (projects.length === 0) {
            projectsList.innerHTML = `<div class="text-center py-8 text-gray-400"><i class="fas fa-project-diagram text-4xl mb-4"></i><p>No projects found in database.json.</p></div>`;
            return;
        }
        
        projectsList.innerHTML = projects.map(project => `
            <div class="glass rounded-lg p-4 flex justify-between items-center">
                <div>
                    <h4 class="font-semibold text-lg">${project.title}</h4>
                    <p class="text-gray-400 text-sm">${project.shortDescription}</p>
                </div>
                <div class="flex space-x-2">
                    <button class="px-3 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition-colors"><i class="fas fa-edit"></i></button>
                    <button class="px-3 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }
    
    function loadGallery() {
        // This will be implemented later based on gallery data structure
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = `<div class="text-center py-8 text-gray-400 col-span-4"><p>Gallery management will be implemented in a future step.</p></div>`;
    }
    
    function loadContent() {
        if (!db.pages || !db.pages.home) return;

        // --- Home Page Tab ---
        const homeContent = db.pages.home;
        if(homeContent && homeContent.hero) {
            document.getElementById('home-hero-greeting').value = homeContent.hero.greeting || '';
            document.getElementById('home-hero-name').value = homeContent.hero.name || '';
            document.getElementById('home-hero-titles').value = (homeContent.hero.titles || []).join(', ');
            document.getElementById('home-hero-bio').value = homeContent.hero.bio || '';
        }

        // Future steps will populate other tabs here.
        loadAboutContent();
        loadSkillsContent();
    }

function loadAboutContent() {
    if (!db.pages || !db.pages.about) return;
    const content = db.pages.about;

    // Hero
    document.getElementById('about-hero-title').value = content.hero.title || '';
    document.getElementById('about-hero-subtitle').value = content.hero.subtitle || '';

    // Journey Paragraphs
    const journeyContainer = document.getElementById('about-journey-paragraphs');
    journeyContainer.innerHTML = ''; // Clear existing
    content.myJourney.paragraphs.forEach((p, index) => {
        const p_label = document.createElement('label');
        p_label.className = 'block text-sm font-medium mb-2';
        p_label.textContent = `Paragraph ${index + 1}`;
        const p_textarea = document.createElement('textarea');
        p_textarea.className = 'w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan transition-colors';
        p_textarea.rows = 3;
        p_textarea.value = p;
        journeyContainer.appendChild(p_label);
        journeyContainer.appendChild(p_textarea);
    });

    // Timeline Events
    const timelineContainer = document.getElementById('about-timeline-events');
    timelineContainer.innerHTML = ''; // Clear existing
    content.timeline.events.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'glass p-4 rounded-lg mb-4';
        eventDiv.innerHTML = `
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Event Title</label>
                    <input type="text" class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-500" value="${event.title}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Date</label>
                    <input type="text" class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-500" value="${event.date}">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium mb-2">Description</label>
                    <textarea rows="2" class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-500">${event.text}</textarea>
                </div>
            </div>
        `;
        timelineContainer.appendChild(eventDiv);
    });
}

function loadSkillsContent() {
    if (!db.pages || !db.pages.skills) return;
    const content = db.pages.skills;

    // Hero
    document.getElementById('skills-hero-title').value = content.hero.title || '';
    document.getElementById('skills-hero-subtitle').value = content.hero.subtitle || '';

    // Skills
    const skillsContainer = document.getElementById('skills-categories-container');
    skillsContainer.innerHTML = ''; // Clear existing
    content.categories.forEach(category => {
        const catDiv = document.createElement('div');
        catDiv.className = 'glass p-4 rounded-lg mb-4';
        let skillsHTML = category.skills.map(skill => `
            <div class="grid grid-cols-3 gap-2 items-center mb-2">
                <input type="text" class="w-full px-2 py-1 rounded bg-gray-700 border border-gray-500" value="${skill.name}">
                <input type="number" class="w-full px-2 py-1 rounded bg-gray-700 border border-gray-500" value="${skill.level}" min="0" max="100">
                <input type="text" class="w-full px-2 py-1 rounded bg-gray-700 border border-gray-500" value="${skill.icon}">
            </div>
        `).join('');

        catDiv.innerHTML = `
            <h4 class="text-lg font-semibold font-orbitron mb-2">${category.title}</h4>
            <div class="grid grid-cols-3 gap-2 items-center mb-2 font-bold text-sm">
                <span>Name</span>
                <span>Level (%)</span>
                <span>FontAwesome Icon</span>
            </div>
            ${skillsHTML}
            <button class="mt-2 px-3 py-1 bg-gray-600 hover:bg-gray-500 text-xs rounded">Add Skill</button>
        `;
        skillsContainer.appendChild(catDiv);
    });
}
    
    function addImageToGallery(url, name) {
        const gallery = JSON.parse(localStorage.getItem('adminGallery') || '[]');
        const newImage = {
            id: Date.now().toString(),
            url: url,
            name: name,
            uploadDate: new Date().toISOString()
        };
        
        gallery.push(newImage);
        localStorage.setItem('adminGallery', JSON.stringify(gallery));
        loadGallery();
        
        showNotification('Image added to gallery successfully!');
    }
    
    function showProjectModal(projectToEdit = null) {
        const isEditing = projectToEdit !== null;
        const modalTitle = isEditing ? 'Edit Project' : 'Add New Project';
        const buttonText = isEditing ? 'Save Changes' : 'Add Project';

        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="glass rounded-xl p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold font-orbitron">${modalTitle}</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="project-form">
                        <input type="hidden" name="id" value="${isEditing ? projectToEdit.id : ''}">
                        <div class="grid md:grid-cols-2 gap-4 mb-4">
                            <input type="text" name="title" placeholder="Project Title" required class="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan" value="${isEditing ? projectToEdit.title : ''}">
                            <select name="category" required class="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan">
                                <option value="">Select Category</option>
                                <option value="web" ${isEditing && projectToEdit.category === 'web' ? 'selected' : ''}>Web Development</option>
                                <option value="game" ${isEditing && projectToEdit.category === 'game' ? 'selected' : ''}>Game Development</option>
                                <option value="ai" ${isEditing && projectToEdit.category === 'ai' ? 'selected' : ''}>AI/ML</option>
                                <option value="ui" ${isEditing && projectToEdit.category === 'ui' ? 'selected' : ''}>UI/UX</option>
                            </select>
                        </div>
                        
                        <textarea name="description" placeholder="Project Description" rows="4" required class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan mb-4">${isEditing ? projectToEdit.description : ''}</textarea>
                        
                        <input type="text" name="tags" placeholder="Tags (comma-separated)" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan mb-4" value="${isEditing ? projectToEdit.tags.join(', ') : ''}">
                        
                        <div class="grid md:grid-cols-2 gap-4 mb-6">
                            <input type="url" name="demo" placeholder="Demo URL (optional)" class="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan" value="${isEditing ? projectToEdit.demo : ''}">
                            <input type="url" name="github" placeholder="GitHub URL (optional)" class="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan" value="${isEditing ? projectToEdit.github : ''}">
                        </div>
                        
                        <button type="submit" class="w-full bg-cyber-cyan text-black py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors">
                            <i class="fas fa-save mr-2"></i>${buttonText}
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('project-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const projectId = formData.get('id');
            const projects = JSON.parse(localStorage.getItem('adminProjects') || '[]');

            if (projectId) {
                // Editing existing project
                const projectIndex = projects.findIndex(p => p.id === projectId);
                if (projectIndex > -1) {
                    projects[projectIndex] = {
                        ...projects[projectIndex],
                        title: formData.get('title'),
                        category: formData.get('category'),
                        description: formData.get('description'),
                        tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
                        demo: formData.get('demo'),
                        github: formData.get('github'),
                    };
                    localStorage.setItem('adminProjects', JSON.stringify(projects));
                    showNotification('Project updated successfully!');
                }
            } else {
                // Adding new project
                const newProject = {
                    id: Date.now().toString(),
                    title: formData.get('title'),
                    category: formData.get('category'),
                    description: formData.get('description'),
                    tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
                    demo: formData.get('demo'),
                    github: formData.get('github'),
                    created: new Date().toISOString()
                };
                projects.push(newProject);
                localStorage.setItem('adminProjects', JSON.stringify(projects));
                showNotification('Project added successfully!');
            }
            
            modal.remove();
            loadProjects();
        });
    }
    
    // Global functions for project management
    window.editProject = function(id) {
        const projects = JSON.parse(localStorage.getItem('adminProjects') || '[]');
        const project = projects.find(p => p.id === id);
        if (project) {
            showProjectModal(project);
        }
    };
    
    window.deleteProject = function(id) {
        if (confirm('Are you sure you want to delete this project?')) {
            const projects = JSON.parse(localStorage.getItem('adminProjects') || '[]');
            const filtered = projects.filter(p => p.id !== id);
            localStorage.setItem('adminProjects', JSON.stringify(filtered));
            loadProjects();
            showNotification('Project deleted successfully!');
        }
    };
    
    window.removeFromGallery = function(id) {
        if (confirm('Are you sure you want to remove this image?')) {
            const gallery = JSON.parse(localStorage.getItem('adminGallery') || '[]');
            const filtered = gallery.filter(img => img.id !== id);
            localStorage.setItem('adminGallery', JSON.stringify(filtered));
            loadGallery();
            showNotification('Image removed successfully!');
        }
    };
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});
