/**
 * BlogSystem.js
 * Handles fetching, rendering, and filtering blog posts.
 */

export class BlogSystem {
    constructor() {
        this.postsContainer = document.getElementById('blog-posts-container');
        this.searchInput = document.getElementById('blog-search');
        this.categoryFilters = document.getElementById('category-filters');

        this.posts = [];
        this.activeCategory = 'All';
        this.searchQuery = '';

        this.init();
    }

    async init() {
        if (!this.postsContainer) return;

        try {
            // In a real app, this would fetch from an API or local JSON file
            // For now, we simulate fetching data
            this.posts = await this.fetchPosts();

            this.renderFilters();
            this.renderPosts();
            this.attachEvents();
        } catch (error) {
            console.error('Failed to load blog posts:', error);
            this.postsContainer.innerHTML = '<p class="text-red-500">Error loading posts.</p>';
        }
    }

    async fetchPosts() {
        // Simulating a fetch request
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        title: "The Future of Web Development: 2024 & Beyond",
                        excerpt: "Exploring WebAssembly, WebGPU, and the rise of AI-driven development workflows.",
                        category: "Tech",
                        date: "Oct 15, 2023",
                        readTime: "5 min read",
                        image: "https://picsum.photos/seed/tech/800/600",
                        tags: ["WebDev", "AI", "Future"]
                    },
                    {
                        id: 2,
                        title: "Mastering CSS Grid and Flexbox",
                        excerpt: "A comprehensive guide to modern layout techniques for responsive web design.",
                        category: "Tutorial",
                        date: "Sep 28, 2023",
                        readTime: "8 min read",
                        image: "https://picsum.photos/seed/code/800/600",
                        tags: ["CSS", "Frontend", "Design"]
                    },
                    {
                        id: 3,
                        title: "Building Scalable Node.js Applications",
                        excerpt: "Best practices for architecture, security, and performance in Node.js backends.",
                        category: "Backend",
                        date: "Sep 10, 2023",
                        readTime: "12 min read",
                        image: "https://picsum.photos/seed/server/800/600",
                        tags: ["NodeJS", "Backend", "Architecture"]
                    },
                    {
                        id: 4,
                        title: "Game Development with JavaScript",
                        excerpt: "How to build high-performance arcade games using HTML5 Canvas and Vanilla JS.",
                        category: "Game Dev",
                        date: "Aug 22, 2023",
                        readTime: "10 min read",
                        image: "https://picsum.photos/seed/gaming/800/600",
                        tags: ["Canvas", "Gamedev", "JavaScript"]
                    },
                    {
                        id: 5,
                        title: "The Art of UI Animation",
                        excerpt: "Creating delightful micro-interactions that enhance user experience without hurting performance.",
                        category: "Design",
                        date: "Aug 05, 2023",
                        readTime: "6 min read",
                        image: "https://picsum.photos/seed/art/800/600",
                        tags: ["UI/UX", "Animation", "Design"]
                    }
                ]);
            }, 500); // Simulate network delay
        });
    }

    renderFilters() {
        if (!this.categoryFilters) return;

        const categories = ['All', ...new Set(this.posts.map(post => post.category))];

        this.categoryFilters.innerHTML = categories.map(cat => `
            <button
                class="filter-btn px-4 py-2 rounded-full border border-gray-700 text-sm hover:border-cyber-cyan hover:text-cyber-cyan transition-all ${this.activeCategory === cat ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan' : 'text-gray-400'}"
                data-category="${cat}">
                ${cat}
            </button>
        `).join('');

        this.categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.activeCategory = e.target.dataset.category;
                this.renderFilters(); // Re-render to update active state styling
                this.renderPosts();
            });
        });
    }

    renderPosts() {
        let filtered = this.posts;

        // Filter by Category
        if (this.activeCategory !== 'All') {
            filtered = filtered.filter(post => post.category === this.activeCategory);
        }

        // Filter by Search
        if (this.searchQuery) {
            const lowerQ = this.searchQuery.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(lowerQ) ||
                post.excerpt.toLowerCase().includes(lowerQ) ||
                post.tags.some(tag => tag.toLowerCase().includes(lowerQ))
            );
        }

        if (filtered.length === 0) {
            this.postsContainer.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <i class="fas fa-search text-4xl text-gray-700 mb-4"></i>
                    <p class="text-gray-500">No posts found matching your criteria.</p>
                </div>
            `;
            return;
        }

        // Animation stagger delay
        let delay = 0;

        this.postsContainer.innerHTML = filtered.map(post => {
            delay += 100;
            return `
                <article class="glass-panel overflow-hidden group hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="${delay}">
                    <!-- Image -->
                    <div class="relative h-48 overflow-hidden">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                        <div class="absolute top-4 left-4">
                            <span class="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-bold text-cyber-cyan border border-cyber-cyan/30">
                                ${post.category}
                            </span>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <div class="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span><i class="far fa-calendar mr-1"></i> ${post.date}</span>
                            <span><i class="far fa-clock mr-1"></i> ${post.readTime}</span>
                        </div>

                        <h3 class="text-xl font-bold font-orbitron mb-3 group-hover:text-cyber-cyan transition-colors">
                            <a href="#" class="block">${post.title}</a>
                        </h3>

                        <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                            ${post.excerpt}
                        </p>

                        <div class="flex flex-wrap gap-2 mb-4">
                            ${post.tags.map(tag => `<span class="text-xs text-gray-600">#${tag}</span>`).join('')}
                        </div>

                        <a href="#" class="inline-flex items-center text-cyber-cyan text-sm font-bold hover:tracking-wide transition-all">
                            READ ARTICLE <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>
                </article>
            `;
        }).join('');
    }

    attachEvents() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.renderPosts();
            });
        }
    }
}
