// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const ADMIN_PASSWORD = 'Aspirinmss@Mathiya@20021225';
    
    // Elements
    const loginScreen = document.getElementById('login-screen');
    const adminDashboard = document.getElementById('admin-dashboard');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('admin-password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const loginMessage = document.getElementById('login-message');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Tab elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Check if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }
    
    // Login form handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = passwordInput.value;
        
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            showMessage(loginMessage, 'Login successful!', 'success');
            setTimeout(showDashboard, 1000);
        } else {
            showMessage(loginMessage, 'Invalid password. Please try again.', 'error');
            passwordInput.classList.add('animate-error-shake');
            setTimeout(() => passwordInput.classList.remove('animate-error-shake'), 500);
        }
    });
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
    
    // Logout handler
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        showLogin();
    });
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Show dashboard
    function showDashboard() {
        loginScreen.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        initializeDashboard();
    }
    
    // Show login
    function showLogin() {
        loginScreen.classList.remove('hidden');
        adminDashboard.classList.add('hidden');
        passwordInput.value = '';
    }
    
    // Switch tabs
    function switchTab(tabName) {
        // Update tab buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            }
        });
        
        // Update tab content
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(tabName + '-tab').classList.remove('hidden');
        
        // Load tab-specific content
        loadTabContent(tabName);
    }
    
    // Initialize dashboard
    function initializeDashboard() {
        loadTabContent('gallery');
        setupFileUpload();
        setupForms();
    }
    
    // Load tab content
    function loadTabContent(tabName) {
        switch(tabName) {
            case 'gallery':
                loadGallery();
                break;
            case 'about':
                loadAboutContent();
                break;
            case 'projects':
                loadProjects();
                break;
            case 'socials':
                loadSocials();
                break;
            case 'blog':
                loadBlogPosts();
                break;
        }
    }
    
    // Gallery Management
    function setupFileUpload() {
        const fileUpload = document.getElementById('file-upload');
        const fileInput = document.getElementById('file-input');
        
        fileUpload.addEventListener('click', () => fileInput.click());
        
        fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUpload.classList.add('dragover');
        });
        
        fileUpload.addEventListener('dragleave', () => {
            fileUpload.classList.remove('dragover');
        });
        
        fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUpload.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });
        
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }
    
    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    addImageToGallery(e.target.result, file.name);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    function addImageToGallery(src, name) {
        const gallery = getGalleryData();
        const newImage = {
            id: Date.now(),
            src: src,
            name: name,
            category: 'personal',
            description: ''
        };
        
        gallery.push(newImage);
        saveGalleryData(gallery);
        loadGallery();
        showGlobalMessage('Image uploaded successfully!', 'success');
    }
    
    function loadGallery() {
        const gallery = getGalleryData();
        const galleryGrid = document.getElementById('gallery-grid');
        
        galleryGrid.innerHTML = gallery.map(image => `
            <div class="glass p-4 rounded-lg">
                <img src="${image.src}" alt="${image.name}" class="w-full h-32 object-cover rounded mb-3">
                <input type="text" value="${image.name}" class="form-input w-full px-2 py-1 text-sm rounded mb-2" 
                       onchange="updateImageName(${image.id}, this.value)">
                <select class="form-input w-full px-2 py-1 text-sm rounded mb-2" 
                        onchange="updateImageCategory(${image.id}, this.value)">
                    <option value="personal" ${image.category === 'personal' ? 'selected' : ''}>Personal</option>
                    <option value="gaming" ${image.category === 'gaming' ? 'selected' : ''}>Gaming</option>
                    <option value="design" ${image.category === 'design' ? 'selected' : ''}>Design</option>
                    <option value="tech" ${image.category === 'tech' ? 'selected' : ''}>Tech</option>
                </select>
                <button onclick="deleteImage(${image.id})" class="w-full px-2 py-1 bg-cyber-red text-white rounded text-sm hover:bg-opacity-80">
                    <i class="fas fa-trash mr-1"></i>Delete
                </button>
            </div>
        `).join('');
    }
    
    // Gallery data management
    function getGalleryData() {
        return JSON.parse(localStorage.getItem('portfolioGallery') || '[]');
    }
    
    function saveGalleryData(data) {
        localStorage.setItem('portfolioGallery', JSON.stringify(data));
    }
    
    // Global functions for gallery management
    window.updateImageName = function(id, name) {
        const gallery = getGalleryData();
        const image = gallery.find(img => img.id === id);
        if (image) {
            image.name = name;
            saveGalleryData(gallery);
        }
    };
    
    window.updateImageCategory = function(id, category) {
        const gallery = getGalleryData();
        const image = gallery.find(img => img.id === id);
        if (image) {
            image.category = category;
            saveGalleryData(gallery);
        }
    };
    
    window.deleteImage = function(id) {
        if (confirm('Are you sure you want to delete this image?')) {
            const gallery = getGalleryData().filter(img => img.id !== id);
            saveGalleryData(gallery);
            loadGallery();
            showGlobalMessage('Image deleted successfully!', 'success');
        }
    };
    
    // About content management
    function loadAboutContent() {
        const aboutData = getAboutData();
        document.getElementById('about-name').value = aboutData.name || 'Mathiya Angirasa';
        document.getElementById('about-title').value = aboutData.title || 'Software Engineering Student';
        document.getElementById('about-bio').value = aboutData.bio || '';
    }
    
    function getAboutData() {
        return JSON.parse(localStorage.getItem('portfolioAbout') || '{}');
    }
    
    function saveAboutData(data) {
        localStorage.setItem('portfolioAbout', JSON.stringify(data));
    }
    
    // Projects management
    function loadProjects() {
        const projects = getProjectsData();
        const projectsList = document.getElementById('projects-list');
        
        projectsList.innerHTML = projects.map(project => `
            <div class="glass p-4 rounded-lg">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-bold">${project.title}</h3>
                    <button onclick="deleteProject(${project.id})" class="text-cyber-red hover:text-red-400">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p class="text-gray-400 mb-3">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-3">
                    ${project.tags.map(tag => `<span class="px-2 py-1 bg-cyber-cyan bg-opacity-20 text-cyber-cyan rounded text-sm">${tag}</span>`).join('')}
                </div>
                <div class="flex gap-2">
                    <button onclick="editProject(${project.id})" class="px-3 py-1 bg-cyber-cyan text-black rounded text-sm">
                        <i class="fas fa-edit mr-1"></i>Edit
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    function getProjectsData() {
        return JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    }
    
    function saveProjectsData(data) {
        localStorage.setItem('portfolioProjects', JSON.stringify(data));
    }
    
    // Socials management
    function loadSocials() {
        const socials = getSocialsData();
        Object.keys(socials).forEach(key => {
            const input = document.getElementById(`social-${key}`);
            if (input) {
                input.value = socials[key] || '';
            }
        });
    }
    
    function getSocialsData() {
        return JSON.parse(localStorage.getItem('portfolioSocials') || '{}');
    }
    
    function saveSocialsData(data) {
        localStorage.setItem('portfolioSocials', JSON.stringify(data));
    }
    
    // Blog management
    function loadBlogPosts() {
        const posts = getBlogData();
        const blogList = document.getElementById('blog-posts-list');
        
        blogList.innerHTML = posts.map(post => `
            <div class="glass p-4 rounded-lg">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-bold">${post.title}</h3>
                    <button onclick="deleteBlogPost(${post.id})" class="text-cyber-red hover:text-red-400">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p class="text-gray-400 mb-3">${post.excerpt}</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">${new Date(post.date).toLocaleDateString()}</span>
                    <button onclick="editBlogPost(${post.id})" class="px-3 py-1 bg-cyber-cyan text-black rounded text-sm">
                        <i class="fas fa-edit mr-1"></i>Edit
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    function getBlogData() {
        return JSON.parse(localStorage.getItem('portfolioBlog') || '[]');
    }
    
    function saveBlogData(data) {
        localStorage.setItem('portfolioBlog', JSON.stringify(data));
    }
    
    // Form setup
    function setupForms() {
        // About form
        document.getElementById('about-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const aboutData = {
                name: document.getElementById('about-name').value,
                title: document.getElementById('about-title').value,
                bio: document.getElementById('about-bio').value
            };
            saveAboutData(aboutData);
            showGlobalMessage('About content saved successfully!', 'success');
        });
        
        // Socials form
        document.getElementById('socials-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const socialsData = {
                github: document.getElementById('social-github').value,
                linkedin: document.getElementById('social-linkedin').value,
                twitter: document.getElementById('social-twitter').value,
                discord: document.getElementById('social-discord').value,
                whatsapp: document.getElementById('social-whatsapp').value,
                ea: document.getElementById('social-ea').value
            };
            saveSocialsData(socialsData);
            showGlobalMessage('Social links saved successfully!', 'success');
        });
    }
    
    // Utility functions
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `message ${type}`;
        element.style.display = 'block';
        
        if (type === 'success') {
            element.classList.add('animate-success-bounce');
        }
        
        setTimeout(() => {
            element.style.display = 'none';
            element.classList.remove('animate-success-bounce');
        }, 3000);
    }
    
    function showGlobalMessage(message, type) {
        const globalMessage = document.getElementById('global-message');
        const messageText = document.getElementById('message-text');
        
        messageText.textContent = message;
        globalMessage.classList.remove('hidden');
        
        setTimeout(() => {
            globalMessage.classList.add('hidden');
        }, 3000);
    }
    
    // Global functions for project and blog management
    window.deleteProject = function(id) {
        if (confirm('Are you sure you want to delete this project?')) {
            const projects = getProjectsData().filter(p => p.id !== id);
            saveProjectsData(projects);
            loadProjects();
            showGlobalMessage('Project deleted successfully!', 'success');
        }
    };
    
    window.deleteBlogPost = function(id) {
        if (confirm('Are you sure you want to delete this blog post?')) {
            const posts = getBlogData().filter(p => p.id !== id);
            saveBlogData(posts);
            loadBlogPosts();
            showGlobalMessage('Blog post deleted successfully!', 'success');
        }
    };
    
    window.editProject = function(id) {
        // Implement project editing modal
        showGlobalMessage('Project editing feature coming soon!', 'info');
    };
    
    window.editBlogPost = function(id) {
        // Implement blog post editing modal
        showGlobalMessage('Blog post editing feature coming soon!', 'info');
    };
});