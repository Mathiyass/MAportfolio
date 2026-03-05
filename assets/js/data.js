/**
 * DATA.JS - Global Data Source
 * Contains all static and dynamic data (from LocalStorage) for the portfolio.
 */

class PortfolioData {
    constructor() {
        this.initDefaults();
        this.syncWithLocalStorage();
    }

    initDefaults() {
        this.data = {
            profile: {
                name: "Mathiya Angirasa",
                role: "Software Engineering Student & Full Stack Developer",
                bio: "Software Engineering student dedicated to crafting premium digital experiences. I bridge the gap between complex logic and stunning visual aesthetics with precision and modern engineering.",
                avatar: "https://avatars.githubusercontent.com/u/120613292?v=4",
                stats: {
                    repos: 42,
                    followers: "1.2k",
                    projects: 15,
                    techStack: 12
                },
                social: {
                    github: "https://github.com/Mathiyass",
                    linkedin: "#",
                    email: "mathiya@example.com"
                }
            },
            skills: [
                { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "React"] },
                { category: "Backend", items: ["Node.js", "Express", "Python", "SQL"] },
                { category: "Tools & Design", items: ["Git", "Figma", "GSAP", "Three.js"] }
            ],
            projects: [
                {
                    id: "p1",
                    title: "Neon Nexus",
                    description: "A cyberpunk-themed social networking platform built with real-time web sockets and a scalable microservices architecture.",
                    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
                    tech: ["Node.js", "Socket.io", "React", "MongoDB"],
                    link: "#",
                    github: "#",
                    featured: true
                },
                {
                    id: "p2",
                    title: "Quantum Ledger",
                    description: "Decentralized finance dashboard tracking cross-chain crypto assets with sub-second latency.",
                    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
                    tech: ["Web3.js", "Vue 3", "Tailwind", "Python"],
                    link: "#",
                    github: "#",
                    featured: true
                },
                {
                    id: "p3",
                    title: "Aether Engine",
                    description: "Browser-based 3D rendering engine utilizing WebGL and mathematical optimizations for smooth interactive experiences.",
                    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
                    tech: ["WebGL", "Three.js", "TypeScript", "GLSL"],
                    link: "#",
                    github: "#",
                    featured: true
                }
            ],
            blog: [
                {
                    id: "b1",
                    title: "The Architecture of Tomorrow",
                    excerpt: "Exploring the shift towards edge computing and serverless micro-frontends in modern web applications.",
                    date: "Oct 12, 2025",
                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
                    content: "# The Architecture of Tomorrow\\n\\nModern web applications are evolving...\\n\\n## Serverless Edge\\nThe shift to edge computing reduces latency...",
                    readTime: "5 min",
                    category: "Engineering"
                },
                {
                    id: "b2",
                    title: "Mastering Glassmorphism in 2025",
                    excerpt: "A deep dive into creating performant, stunning glass UI components using pure CSS and backdrop filters.",
                    date: "Sep 28, 2025",
                    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
                    content: "Glassmorphism remains a staple of premium design...",
                    readTime: "4 min",
                    category: "Design"
                }
            ]
        };
    }

    syncWithLocalStorage() {
        const adminData = localStorage.getItem('portfolioAdminData');
        if (adminData) {
            try {
                const parsed = JSON.parse(adminData);
                // Merge local storage data over defaults
                this.data = { ...this.data, ...parsed };
            } catch (e) {
                console.error("Failed to parse admin data from localStorage", e);
            }
        } else {
            // First time load, save defaults to local storage
            this.saveToLocalStorage();
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('portfolioAdminData', JSON.stringify(this.data));
    }

    // --- Data Accessors ---
    getProfile() { return this.data.profile; }
    getSkills() { return this.data.skills; }
    getProjects() { return this.data.projects; }
    getBlogPosts() { return this.data.blog; }

    // --- Data Modifiers (For Admin) ---
    updateProfile(newProfile) {
        this.data.profile = { ...this.data.profile, ...newProfile };
        this.saveToLocalStorage();
    }

    addProject(project) {
        this.data.projects.push(project);
        this.saveToLocalStorage();
    }

    updateProject(id, updatedProject) {
        const index = this.data.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.data.projects[index] = { ...this.data.projects[index], ...updatedProject };
            this.saveToLocalStorage();
        }
    }

    deleteProject(id) {
        this.data.projects = this.data.projects.filter(p => p.id !== id);
        this.saveToLocalStorage();
    }
}

// Global instance
window.portfolioData = new PortfolioData();
