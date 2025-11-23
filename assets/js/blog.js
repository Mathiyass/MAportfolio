document.addEventListener('DOMContentLoaded', () => {
    const blogGrid = document.getElementById('blog-grid');
    const searchInput = document.getElementById('blog-search');
    const categoryButtons = document.querySelectorAll('.filter-btn');

    if (!blogGrid) return;

    const posts = [
        {
            id: 1,
            title: "The Future of AI in Web Development",
            excerpt: "How artificial intelligence is reshaping the way we build and interact with the web. From code generation to personalized user experiences.",
            category: "ai",
            date: "Oct 15, 2023",
            icon: "fa-brain",
            color: "from-purple-900 to-indigo-900",
            accent: "text-cyber-cyan"
        },
        {
            id: 2,
            title: "Creating Immersive 3D Web Experiences",
            excerpt: "A deep dive into Three.js and WebGL. Learn how to bring your website to life with interactive 3D elements and particle systems.",
            category: "web",
            date: "Sep 28, 2023",
            icon: "fa-cube",
            color: "from-gray-900 to-black",
            accent: "text-neon-pink"
        },
        {
            id: 3,
            title: "Web Security Best Practices for 2024",
            excerpt: "Essential security tips for modern web applications. Protecting user data, preventing XSS, and securing APIs.",
            category: "security",
            date: "Aug 10, 2023",
            icon: "fa-shield-alt",
            color: "from-blue-900 to-cyan-900",
            accent: "text-cyber-red"
        },
        {
            id: 4,
            title: "Mastering CSS Grid & Flexbox",
            excerpt: "A comprehensive guide to modern CSS layout techniques. Build responsive and complex layouts with ease.",
            category: "web",
            date: "Jul 22, 2023",
            icon: "fa-th",
            color: "from-pink-900 to-red-900",
            accent: "text-white"
        },
        {
            id: 5,
            title: "The Rise of Serverless Architecture",
            excerpt: "Understanding the benefits and trade-offs of serverless computing. When to use AWS Lambda, Vercel, or Netlify Functions.",
            category: "tech",
            date: "Jun 15, 2023",
            icon: "fa-cloud",
            color: "from-green-900 to-teal-900",
            accent: "text-electric-blue"
        },
        {
            id: 6,
            title: "Optimizing React Performance",
            excerpt: "Advanced techniques to speed up your React applications. Memoization, lazy loading, and virtualization explained.",
            category: "web",
            date: "May 30, 2023",
            icon: "fa-bolt",
            color: "from-yellow-900 to-orange-900",
            accent: "text-yellow-400"
        }
    ];

    let activeCategory = 'all';
    let searchQuery = '';

    function renderPosts() {
        blogGrid.innerHTML = '';

        const filteredPosts = posts.filter(post => {
            const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredPosts.length === 0) {
            blogGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-6xl text-gray-700 mb-4"></i>
                    <h3 class="text-2xl font-orbitron text-gray-400">No articles found</h3>
                    <p class="text-gray-500">Try adjusting your search or filter.</p>
                </div>
            `;
            return;
        }

        filteredPosts.forEach((post, index) => {
            const article = document.createElement('article');
            article.className = 'glass rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 opacity-0 translate-y-4';
            article.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;

            article.innerHTML = `
                <div class="h-48 bg-gradient-to-br ${post.color} flex items-center justify-center group relative overflow-hidden">
                    <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <i class="fas ${post.icon} text-5xl ${post.accent} transform group-hover:scale-110 transition-transform duration-500"></i>
                </div>
                <div class="p-6">
                    <div class="flex items-center text-sm text-gray-400 mb-2">
                        <span class="mr-3"><i class="far fa-calendar-alt mr-1"></i> ${post.date}</span>
                        <span class="uppercase tracking-wider text-xs border border-gray-700 px-2 py-0.5 rounded"><i class="fas fa-tag mr-1"></i> ${post.category}</span>
                    </div>
                    <h2 class="text-xl font-bold font-orbitron mb-3 hover:text-cyber-cyan transition-colors">
                        <a href="#">${post.title}</a>
                    </h2>
                    <p class="text-gray-300 mb-4 line-clamp-3">
                        ${post.excerpt}
                    </p>
                    <a href="#" class="text-neon-pink hover:text-cyber-cyan font-bold transition-colors flex items-center gap-2 group-link">
                        Read More <i class="fas fa-arrow-right transform group-link-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>
            `;
            blogGrid.appendChild(article);
        });
    }

    // Event Listeners
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderPosts();
        });
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active', 'text-cyber-cyan', 'border-cyber-cyan'));
            categoryButtons.forEach(b => b.classList.add('text-gray-300', 'border-gray-600'));

            btn.classList.remove('text-gray-300', 'border-gray-600');
            btn.classList.add('active', 'text-cyber-cyan', 'border-cyber-cyan');

            activeCategory = btn.dataset.filter;
            renderPosts();
        });
    });

    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Initial Render
    renderPosts();
});
