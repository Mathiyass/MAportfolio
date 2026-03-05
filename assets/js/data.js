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
                    id: "ma-optimizer",
                    title: "MA-Optimizer",
                    description: "🌌 The ultimate Windows performance suite. MA Optimizer fuses deep-level OS tuning, telemetry lockdown, and input latency reduction into a buttery-smooth React & Electron interface. Unleash maximum FPS and privacy.",
                    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800",
                    tech: ["TypeScript", "React", "Electron", "OS Tuning"],
                    link: "https://github.com/Mathiyass/MA-Optimizer",
                    github: "https://github.com/Mathiyass/MA-Optimizer",
                    featured: true
                },
                {
                    id: "velora-pos",
                    title: "VELORA Paint Factory POS",
                    description: "VELORA Paint Factory & Shop POS Management System.",
                    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
                    tech: ["JavaScript", "HTML", "CSS"],
                    link: "https://github.com/Mathiyass/-VELORA-Paint-Factory-POS",
                    github: "https://github.com/Mathiyass/-VELORA-Paint-Factory-POS",
                    featured: true
                },
                {
                    id: "educentral",
                    title: "EduCentral",
                    description: "Java ant management software for educational institutions.",
                    image: "https://images.unsplash.com/photo-1546410531-ee4cb88b8e0b?auto=format&fit=crop&q=80&w=800",
                    tech: ["Java", "JavaScript", "Ant"],
                    link: "https://github.com/Mathiyass/EduCentral",
                    github: "https://github.com/Mathiyass/EduCentral",
                    featured: true
                },
                {
                    id: "gamers-edge-pos",
                    title: "Gamers Edge POS",
                    description: "Point of Sale system built specifically for game shops and computer hardware retailers.",
                    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
                    tech: ["JavaScript", "HTML", "CSS"],
                    link: "https://github.com/Mathiyass/gamers-edge-pos",
                    github: "https://github.com/Mathiyass/gamers-edge-pos",
                    featured: false
                },
                {
                    id: "gamersedge",
                    title: "Gamersedge Website",
                    description: "Computer hardware e-commerce and showcase website.",
                    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800",
                    tech: ["HTML", "CSS", "JavaScript"],
                    link: "https://github.com/Mathiyass/Gamersedge",
                    github: "https://github.com/Mathiyass/Gamersedge",
                    featured: false
                },
                {
                    id: "maportfolio",
                    title: "MAportfolio",
                    description: "My personal developer portfolio featuring futuristic design, GSAP animations, and a custom Markdown CMS.",
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
                    tech: ["JavaScript", "GSAP", "Three.js", "Tailwind CSS"],
                    link: "https://mathiyass.github.io/MAportfolio/",
                    github: "https://github.com/Mathiyass/MAportfolio",
                    featured: false
                },
                {
                    id: "ma-chat",
                    title: "MA_Chat",
                    description: "Real-time chat application demonstrating WebSocket communication.",
                    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
                    tech: ["JavaScript", "Sockets"],
                    link: "https://github.com/Mathiyass/MA_Chat",
                    github: "https://github.com/Mathiyass/MA_Chat",
                    featured: false
                },
                {
                    id: "niro-notes",
                    title: "NIRO-NOTES",
                    description: "Note taking application built with TypeScript and modern web practices.",
                    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
                    tech: ["TypeScript", "Web"],
                    link: "https://github.com/Mathiyass/NIRO-NOTES",
                    github: "https://github.com/Mathiyass/NIRO-NOTES",
                    featured: false
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
