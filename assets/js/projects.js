// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .filter-btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
    
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('border-gray-600', 'text-gray-300');
                btn.classList.remove('border-cyber-cyan', 'text-cyber-cyan');
            });
            
            this.classList.add('active');
            this.classList.remove('border-gray-600', 'text-gray-300');
            this.classList.add('border-cyber-cyan', 'text-cyber-cyan');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project Modal
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTags = document.getElementById('modal-tags');
    const modalFeatures = document.getElementById('modal-features');
    const modalDemo = document.getElementById('modal-demo');
    const modalGithub = document.getElementById('modal-github');
    const closeModal = document.getElementById('close-modal');

    // Sample project data
    const projectData = {
        'ecommerce': {
            title: 'E-Commerce Platform',
            image: '<i class="fas fa-shopping-cart text-6xl text-black"></i>',
            description: 'A comprehensive full-stack e-commerce solution built with modern technologies. Features include user authentication, product management, shopping cart functionality, secure payment processing, and an admin dashboard for managing orders and inventory.',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'JWT'],
            features: [
                'User registration and authentication',
                'Product catalog with search and filtering',
                'Shopping cart and wishlist functionality',
                'Secure payment processing with Stripe',
                'Order tracking and history',
                'Admin dashboard for inventory management',
                'Responsive design for all devices',
                'Email notifications for orders'
            ],
            demo: '#',
            github: '#'
        },
        'space-shooter': {
            title: 'Space Shooter Game',
            image: '<i class="fas fa-rocket text-6xl text-black"></i>',
            description: 'An immersive 3D space shooter game built with Unreal Engine. Players navigate through space, battle enemies, collect power-ups, and progress through increasingly challenging levels with stunning visual effects.',
            tags: ['Unreal Engine', 'C++', 'Blueprint', '3D Graphics'],
            features: [
                'Immersive 3D space environment',
                'Multiple enemy types with AI',
                'Power-up system for weapons and shields',
                'Progressive difficulty levels',
                'Particle effects and explosions',
                'Dynamic soundtrack and sound effects',
                'Leaderboard system',
                'Customizable controls'
            ],
            demo: '#',
            github: '#'
        }
    };

    // Open modal for project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            if (projectData[projectId]) {
                const project = projectData[projectId];
                
                modalTitle.textContent = project.title;
                modalImage.innerHTML = project.image;
                modalDescription.textContent = project.description;
                
                modalTags.innerHTML = project.tags.map(tag => 
                    `<span class="px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-sm">${tag}</span>`
                ).join('');
                
                modalFeatures.innerHTML = project.features.map(feature => 
                    `<li>${feature}</li>`
                ).join('');
                
                modalDemo.href = project.demo;
                modalGithub.href = project.github;
                
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const scrollProgress = document.getElementById('scroll-progress');
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Add project IDs to existing cards
    const projectCardElements = document.querySelectorAll('.project-card');
    if (projectCardElements.length >= 2) {
        projectCardElements[0].setAttribute('data-project', 'ecommerce');
        projectCardElements[1].setAttribute('data-project', 'space-shooter');
    }
});
// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-cyber-cyan', 'text-black');
                btn.classList.add('border-gray-600', 'text-gray-300');
            });

            this.classList.add('active');
            this.classList.remove('border-gray-600', 'text-gray-300');
            this.classList.add('bg-cyber-cyan', 'text-black');

            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Enhanced project card interactions
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 255, 222, 0.2)';
            
            // Add glow to tags
            const tags = this.querySelectorAll('.tag');
            tags.forEach(tag => {
                tag.style.boxShadow = '0 0 10px currentColor';
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            this.style.boxShadow = 'none';
            
            // Remove glow from tags
            const tags = this.querySelectorAll('.tag');
            tags.forEach(tag => {
                tag.style.boxShadow = 'none';
            });
        });

        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-15px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // Interactive tags
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 15px currentColor';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const scrollProgress = document.getElementById('scroll-progress');
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Project modal functionality (if modal exists)
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('close-modal');
    
    if (modal && modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Add stagger animation to project cards
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
