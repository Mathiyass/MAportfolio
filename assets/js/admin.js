
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
            showDashboard();
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
    
    // Initialize with overview section
    showSection('overview');
    
    function showLogin() {
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
    }
    
    function showDashboard() {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        loadDashboardData();
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
    
    function loadDashboardData() {
        // Load dashboard statistics
        const projects = JSON.parse(localStorage.getItem('adminProjects') || '[]');
        const gallery = JSON.parse(localStorage.getItem('adminGallery') || '[]');
        
        // Update dashboard stats (would be dynamic in real app)
        console.log('Dashboard loaded with', projects.length, 'projects and', gallery.length, 'images');
    }
    
    function loadProjects() {
        const projects = JSON.parse(localStorage.getItem('adminProjects') || '[]');
        const projectsList = document.getElementById('projects-list');
        
        if (projects.length === 0) {
            projectsList.innerHTML = `
                <div class="text-center py-8 text-gray-400">
                    <i class="fas fa-project-diagram text-4xl mb-4"></i>
                    <p>No projects yet. Add your first project!</p>
                </div>
            `;
            return;
        }
        
        projectsList.innerHTML = projects.map(project => `
            <div class="glass rounded-lg p-4 flex justify-between items-center">
                <div>
                    <h4 class="font-semibold text-lg">${project.title}</h4>
                    <p class="text-gray-400 text-sm">${project.description.substring(0, 100)}...</p>
                    <div class="flex space-x-2 mt-2">
                        ${project.tags.map(tag => `<span class="px-2 py-1 bg-cyber-cyan text-black text-xs rounded">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editProject('${project.id}')" class="px-3 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition-colors">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteProject('${project.id}')" class="px-3 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    function loadGallery() {
        const gallery = JSON.parse(localStorage.getItem('adminGallery') || '[]');
        const galleryGrid = document.getElementById('gallery-grid');
        
        galleryGrid.innerHTML = gallery.map(image => `
            <div class="relative group">
                <img src="${image.url}" alt="${image.name}" class="w-full h-24 object-cover rounded-lg">
                <button onclick="removeFromGallery('${image.id}')" class="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fas fa-times text-xs"></i>
                </button>
            </div>
        `).join('');
    }
    
    function loadContent() {
        // Load existing content for editing
        const content = JSON.parse(localStorage.getItem('adminContent') || '{}');
        
        if (content.heroTitle) document.getElementById('hero-title').value = content.heroTitle;
        if (content.heroSubtitle) document.getElementById('hero-subtitle').value = content.heroSubtitle;
        if (content.aboutDescription) document.getElementById('about-description').value = content.aboutDescription;
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
    
    function showProjectModal() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="glass rounded-xl p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold font-orbitron">Add New Project</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="project-form">
                        <div class="grid md:grid-cols-2 gap-4 mb-4">
                            <input type="text" name="title" placeholder="Project Title" required class="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan">
                            <select name="category" required class="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan">
                                <option value="">Select Category</option>
                                <option value="web">Web Development</option>
                                <option value="game">Game Development</option>
                                <option value="ai">AI/ML</option>
                                <option value="ui">UI/UX</option>
                            </select>
                        </div>
                        
                        <textarea name="description" placeholder="Project Description" rows="4" required class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan mb-4"></textarea>
                        
                        <input type="text" name="tags" placeholder="Tags (comma-separated)" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan mb-4">
                        
                        <div class="grid md:grid-cols-2 gap-4 mb-6">
                            <input type="url" name="demo" placeholder="Demo URL (optional)" class="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan">
                            <input type="url" name="github" placeholder="GitHub URL (optional)" class="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-cyber-cyan">
                        </div>
                        
                        <button type="submit" class="w-full bg-cyber-cyan text-black py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors">
                            <i class="fas fa-plus mr-2"></i>Add Project
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('project-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            const project = {
                id: Date.now().toString(),
                title: formData.get('title'),
                category: formData.get('category'),
                description: formData.get('description'),
                tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
                demo: formData.get('demo'),
                github: formData.get('github'),
                created: new Date().toISOString()
            };
            
            const projects = JSON.parse(localStorage.getItem('adminProjects') || '[]');
            projects.push(project);
            localStorage.setItem('adminProjects', JSON.stringify(projects));
            
            modal.remove();
            loadProjects();
            showNotification('Project added successfully!');
        });
    }
    
    // Global functions for project management
    window.editProject = function(id) {
        console.log('Edit project:', id);
        // Implement edit functionality
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
