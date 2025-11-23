/**
 * CommandPalette.js
 * Implements a Cmd+K interface for quick navigation and actions.
 */

export class CommandPalette {
    constructor() {
        this.isOpen = false;
        this.overlay = null;
        this.container = null;
        this.input = null;
        this.results = null;

        this.commands = [
            { id: 'home', title: 'Go Home', icon: 'fa-home', action: () => window.location.href = 'index.html', keywords: ['home', 'start'] },
            { id: 'games', title: 'Arcade Center', icon: 'fa-gamepad', action: () => window.location.href = 'games.html', keywords: ['game', 'play', 'arcade'] },
            { id: 'blog', title: 'Read Blog', icon: 'fa-newspaper', action: () => window.location.href = 'blog.html', keywords: ['blog', 'news', 'posts'] },
            { id: 'projects', title: 'View Projects', icon: 'fa-code', action: () => window.location.href = 'projects.html', keywords: ['work', 'portfolio', 'projects'] },
            { id: 'contact', title: 'Contact Me', icon: 'fa-envelope', action: () => window.location.href = 'contact.html', keywords: ['email', 'message', 'hire'] },
            { id: 'snake', title: 'Play Snake', icon: 'fa-dragon', action: () => { window.location.href = 'games.html'; setTimeout(() => window.launchGame('snake'), 500); }, keywords: ['snake', 'game'] },
            { id: 'theme', title: 'Toggle Theme', icon: 'fa-adjust', action: () => document.getElementById('theme-toggle')?.click(), keywords: ['dark', 'light', 'mode'] },
            { id: 'music', title: 'Toggle Music', icon: 'fa-music', action: () => document.getElementById('music-toggle')?.click(), keywords: ['sound', 'audio'] },
        ];

        this.init();
    }

    init() {
        this.createDOM();
        this.bindEvents();
    }

    createDOM() {
        // Create the modal structure hidden by default
        this.overlay = document.createElement('div');
        this.overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] hidden flex items-start justify-center pt-[20vh] transition-opacity duration-200';
        this.overlay.id = 'command-palette-overlay';

        this.container = document.createElement('div');
        this.container.className = 'w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden transform scale-95 opacity-0 transition-all duration-200';

        this.container.innerHTML = `
            <div class="p-4 border-b border-gray-800 flex items-center gap-3">
                <i class="fas fa-search text-gray-500"></i>
                <input type="text" placeholder="Type a command or search..." class="w-full bg-transparent text-white focus:outline-none font-mono text-lg" id="cmd-input">
                <div class="text-xs text-gray-500 border border-gray-700 rounded px-2 py-1">ESC</div>
            </div>
            <div class="max-h-[60vh] overflow-y-auto p-2" id="cmd-results">
                <!-- Results go here -->
            </div>
            <div class="p-2 bg-gray-900 border-t border-gray-800 text-[10px] text-gray-500 flex justify-between px-4">
                <span>Select with arrows & enter</span>
                <span>Mathiya OS v1.0</span>
            </div>
        `;

        this.overlay.appendChild(this.container);
        document.body.appendChild(this.overlay);

        this.input = this.container.querySelector('#cmd-input');
        this.results = this.container.querySelector('#cmd-results');
    }

    bindEvents() {
        // Global Keyboard Shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close on click outside
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Input handling
        this.input.addEventListener('input', () => this.filterCommands());
    }

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    }

    open() {
        this.isOpen = true;
        this.overlay.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        requestAnimationFrame(() => {
            this.container.classList.remove('scale-95', 'opacity-0');
            this.container.classList.add('scale-100', 'opacity-100');
            this.input.value = '';
            this.input.focus();
            this.filterCommands();
        });
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.container.classList.remove('scale-100', 'opacity-100');
        this.container.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            this.overlay.classList.add('hidden');
        }, 200);
        document.body.style.overflow = '';
    }

    filterCommands() {
        const query = this.input.value.toLowerCase();

        const filtered = this.commands.filter(cmd =>
            cmd.title.toLowerCase().includes(query) ||
            cmd.keywords.some(k => k.includes(query))
        );

        this.renderResults(filtered);
    }

    renderResults(items) {
        if (items.length === 0) {
            this.results.innerHTML = `<div class="p-4 text-center text-gray-500">No matching commands found.</div>`;
            return;
        }

        this.results.innerHTML = items.map((item, index) => `
            <button class="cmd-item w-full text-left p-3 rounded-lg flex items-center gap-4 hover:bg-cyber-cyan/10 hover:text-cyber-cyan transition-colors group ${index === 0 ? 'bg-white/5' : ''}" data-index="${index}">
                <div class="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-cyber-cyan group-hover:bg-gray-800/80">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="flex-1">
                    <div class="font-medium text-white group-hover:text-cyber-cyan">${item.title}</div>
                    <div class="text-xs text-gray-500">Action</div>
                </div>
                <i class="fas fa-arrow-right opacity-0 group-hover:opacity-100 text-gray-500 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
            </button>
        `).join('');

        // Add click listeners
        this.results.querySelectorAll('.cmd-item').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.close();
                items[index].action();
            });
        });
    }
}
