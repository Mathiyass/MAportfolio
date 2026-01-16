/**
 * Advanced Navigation System
 * Implements Mega Dropdown, Mobile Menu, and Dynamic Rendering
 */

class AdvancedNavbar {
    constructor() {
        this.navContainer = document.getElementById('navbar-container');
        this.currentPath = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    init() {
        if (!this.navContainer) return;
        this.render();
        this.attachEvents();
        this.highlightCurrentPage();
    }

    render() {
        this.navContainer.innerHTML = `
            <nav class="fixed top-0 w-full z-50 glass transition-all duration-300" id="navbar">
                <div class="container mx-auto px-6 py-4">
                    <div class="flex justify-between items-center">
                        <!-- Logo -->
                        <div class="text-2xl font-bold font-orbitron gradient-text relative group z-50">
                            <a href="index.html" class="block hover:scale-110 transition-transform duration-300">MATHIYA</a>
                            <div class="absolute -bottom-2 left-0 w-full h-0.5 bg-cyber-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        </div>

                        <!-- Desktop Navigation -->
                        <div class="hidden xl:flex items-center space-x-1">
                            ${this.renderNavItems()}
                        </div>

                        <!-- Right Actions -->
                        <div class="hidden xl:flex items-center space-x-4">
                            <button id="music-toggle" class="p-2 rounded-lg glass hover:scale-110 transition-transform group" aria-label="Toggle Music">
                                <i class="fas fa-volume-mute text-cyber-cyan group-hover:text-neon-pink transition-colors"></i>
                            </button>
                            <button id="theme-toggle" class="p-2 rounded-lg glass hover:scale-110 transition-transform group" aria-label="Toggle Theme">
                                <i class="fas fa-moon text-cyber-cyan group-hover:text-neon-pink transition-colors"></i>
                            </button>
                            <a href="contact.html" class="ml-4 px-6 py-2 rounded-full border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all duration-300 font-orbitron text-sm font-bold tracking-wider relative overflow-hidden group">
                                <span class="relative z-10">HIRE ME</span>
                                <div class="absolute inset-0 bg-cyber-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </a>
                        </div>

                        <!-- Mobile Menu Button -->
                        <button id="mobile-menu-btn" class="xl:hidden p-2 rounded-lg glass z-50 relative group" aria-label="Menu">
                            <div class="w-6 h-0.5 bg-cyber-cyan mb-1.5 transition-all duration-300 group-hover:bg-neon-pink"></div>
                            <div class="w-6 h-0.5 bg-cyber-cyan mb-1.5 transition-all duration-300 group-hover:bg-neon-pink"></div>
                            <div class="w-6 h-0.5 bg-cyber-cyan transition-all duration-300 group-hover:bg-neon-pink"></div>
                        </button>
                    </div>
                </div>

                <!-- Mega Menus Container -->
                <div class="mega-menu-container absolute top-full left-0 w-full bg-dark-bg/95 backdrop-blur-xl border-t border-white/10 transform origin-top scale-y-0 transition-transform duration-300" id="mega-menu-wrapper">
                    <!-- Mega Menu Content will be injected here on hover -->
                </div>

                <!-- Mobile Menu Overlay -->
                <div class="fixed inset-0 bg-dark-bg/95 backdrop-blur-xl z-40 transform translate-x-full transition-transform duration-500 xl:hidden flex flex-col justify-center items-center space-y-6 overflow-y-auto py-10" id="mobile-menu">
                    ${this.renderMobileItems()}
                </div>
            </nav>
        `;
    }

    getNavItemsList() {
        return [
            { name: 'Home', link: 'index.html', icon: 'fa-home' },
            { name: 'About', link: 'about.html', icon: 'fa-user' },
            { name: 'Resume', link: 'resume.html', icon: 'fa-file-alt' },
            {
                name: 'Arcade',
                link: 'games.html',
                icon: 'fa-gamepad',
                hasMega: true,
                megaContent: `
                    <div class="container mx-auto py-8 grid grid-cols-4 gap-8">
                        <div class="col-span-1">
                            <h3 class="font-orbitron text-cyber-cyan text-lg mb-4">Game Center</h3>
                            <p class="text-sm text-gray-400 mb-4">Play games directly in the browser and compete for the high score!</p>
                            <a href="games.html" class="text-neon-pink hover:text-white transition-colors text-sm font-bold">VIEW ALL GAMES <i class="fas fa-arrow-right ml-1"></i></a>
                        </div>
                        <div class="col-span-3 grid grid-cols-4 gap-4">
                             ${this.getGameCard('Snake', 'Classic Snake', 'fas fa-dragon', 'games.html#snake')}
                             ${this.getGameCard('Tetris', 'Block Puzzle', 'fas fa-cubes', 'games.html#tetris')}
                             ${this.getGameCard('Breakout', 'Arcade Classic', 'fas fa-table-tennis', 'games.html#breakout')}
                             ${this.getGameCard('2048', 'Logic Puzzle', 'fas fa-th', 'games.html#2048')}
                             ${this.getGameCard('Cyber AR', 'Gesture Control', 'fas fa-hand-sparkles', 'ar.html')}
                        </div>
                    </div>
                `
            },
            { name: 'Cyber AR', link: 'ar.html', icon: 'fa-hand-sparkles' },
            {
                name: 'Projects',
                link: 'projects.html',
                icon: 'fa-code',
                hasMega: true,
                megaContent: `
                    <div class="container mx-auto py-8 grid grid-cols-4 gap-8">
                        <div class="col-span-1">
                            <h3 class="font-orbitron text-cyber-cyan text-lg mb-4">Categories</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li><a href="projects.html?cat=web" class="hover:text-neon-pink transition-colors"><i class="fas fa-globe mr-2"></i>Web Development</a></li>
                                <li><a href="projects.html?cat=app" class="hover:text-neon-pink transition-colors"><i class="fas fa-mobile-alt mr-2"></i>Mobile Apps</a></li>
                                <li><a href="projects.html?cat=game" class="hover:text-neon-pink transition-colors"><i class="fas fa-gamepad mr-2"></i>Game Dev</a></li>
                                <li><a href="projects.html?cat=ai" class="hover:text-neon-pink transition-colors"><i class="fas fa-brain mr-2"></i>AI & ML</a></li>
                            </ul>
                        </div>
                        <div class="col-span-3">
                            <h3 class="font-orbitron text-cyber-cyan text-lg mb-4">Featured</h3>
                            <div class="grid grid-cols-3 gap-4">
                                ${this.getFeaturedProjectCard('E-Commerce Core', 'React + Node', 'fas fa-shopping-cart')}
                                ${this.getFeaturedProjectCard('Space Shooter', 'Unity + C#', 'fas fa-rocket')}
                                ${this.getFeaturedProjectCard('Portfolio V3', 'HTML + JS', 'fas fa-laptop-code')}
                            </div>
                        </div>
                    </div>
                `
            },
            { name: 'Blog', link: 'blog.html', icon: 'fa-newspaper' },
            { name: 'Skills', link: 'skills.html', icon: 'fa-tools' },
            { name: 'Gallery', link: 'gallery.html', icon: 'fa-images' },
            { name: 'Socials', link: 'socials.html', icon: 'fa-share-alt' },
            { name: 'Contact', link: 'contact.html', icon: 'fa-envelope' }
        ];
    }

    renderNavItems() {
        const items = this.getNavItemsList();

        return items.map(item => `
            <div class="relative group nav-item" ${item.hasMega ? 'data-mega="true"' : ''}>
                <a href="${item.link}" class="px-3 py-2 text-gray-300 hover:text-white transition-colors flex items-center gap-2 font-inter text-sm tracking-wide">
                    <i class="fas ${item.icon} text-xs opacity-50 group-hover:opacity-100 group-hover:text-cyber-cyan transition-all"></i>
                    ${item.name}
                    ${item.hasMega ? '<i class="fas fa-chevron-down text-[10px] opacity-50 group-hover:rotate-180 transition-transform duration-300"></i>' : ''}
                </a>
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyber-cyan to-neon-pink transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                ${item.hasMega ? `<div class="hidden mega-content-source">${item.megaContent}</div>` : ''}
            </div>
        `).join('');
    }

    renderMobileItems() {
        const items = this.getNavItemsList();

        return items.map(item => `
            <a href="${item.link}"
               class="text-xl font-orbitron text-white hover:text-cyber-cyan transition-colors transform hover:translate-x-2 duration-300 flex items-center gap-4 w-64">
               <span class="w-8 h-0.5 bg-cyber-cyan"></span>
               <i class="fas ${item.icon} w-6 text-center"></i>
               ${item.name}
            </a>
        `).join('');
    }

    getFeaturedProjectCard(title, subtitle, icon) {
        return `
            <div class="group/card relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan/50 transition-all duration-300 cursor-pointer p-4">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-blue-500/20 flex items-center justify-center text-cyber-cyan group-hover/card:scale-110 transition-transform">
                        <i class="${icon} text-xl"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-white group-hover/card:text-cyber-cyan transition-colors">${title}</h4>
                        <p class="text-xs text-gray-400">${subtitle}</p>
                    </div>
                </div>
            </div>
        `;
    }

    getGameCard(title, subtitle, icon, link = 'games.html') {
        return `
            <a href="${link}" class="block h-full">
                <div class="group/game text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-neon-pink/50 h-full">
                    <div class="text-3xl mb-2 text-neon-pink group-hover/game:scale-110 transition-transform duration-300">
                        <i class="${icon}"></i>
                    </div>
                    <h4 class="font-bold text-sm text-white">${title}</h4>
                    <p class="text-[10px] text-gray-400">${subtitle}</p>
                </div>
            </a>
        `;
    }

    attachEvents() {
        // Mega Menu Logic
        const navItems = document.querySelectorAll('.nav-item[data-mega="true"]');
        const megaMenuWrapper = document.getElementById('mega-menu-wrapper');
        let activeTimeout;

        navItems.forEach(item => {
            const content = item.querySelector('.mega-content-source').innerHTML;

            item.addEventListener('mouseenter', () => {
                clearTimeout(activeTimeout);
                megaMenuWrapper.innerHTML = content;
                megaMenuWrapper.style.transform = 'scaleY(1)';
            });

            item.addEventListener('mouseleave', () => {
                activeTimeout = setTimeout(() => {
                    if (!megaMenuWrapper.matches(':hover')) {
                        megaMenuWrapper.style.transform = 'scaleY(0)';
                    }
                }, 100);
            });
        });

        megaMenuWrapper.addEventListener('mouseenter', () => {
            clearTimeout(activeTimeout);
        });

        megaMenuWrapper.addEventListener('mouseleave', () => {
            megaMenuWrapper.style.transform = 'scaleY(0)';
        });

        // Mobile Menu
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('translate-x-full');
                const isOpen = !menu.classList.contains('translate-x-full');
                document.body.style.overflow = isOpen ? 'hidden' : '';

                // Animate hamburger to X
                const lines = btn.querySelectorAll('div');
                if (isOpen) {
                    lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    lines[1].style.opacity = '0';
                    lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    lines[0].style.transform = 'none';
                    lines[1].style.opacity = '1';
                    lines[2].style.transform = 'none';
                }
            });
        }
    }

    highlightCurrentPage() {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === this.currentPath) {
                link.classList.add('text-cyber-cyan');
                // Add glow
                link.style.textShadow = '0 0 10px rgba(0, 255, 222, 0.5)';
            }
        });
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedNavbar();
});
