/**
 * ========================================================
 * MATHIYA PORTFOLIO - V2 ADMIN DATA MANAGER
 * admin-data.js
 * ========================================================
 */

class AdminDataManager {
    constructor() {
        this.DB_KEY = 'MATHIYA_DB_V2';
        this.initDB();
    }

    initDB() {
        if (!localStorage.getItem(this.DB_KEY)) {
            const initialData = {
                metadata: {
                    lastLogin: Date.now(),
                    views: 125430,
                    uptime: '99.999%',
                    systemStatus: 'OPTIMAL'
                },
                projects: [
                    {
                        id: 'p1',
                        title: 'Quantum Entanglement OS',
                        status: 'Active',
                        description: 'A revolutionary operating system built for quantum computing environments.',
                        tech: ['Rust', 'WebAssembly', 'WebGL'],
                        date: '2049-10-12',
                        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb'
                    },
                    {
                        id: 'p2',
                        title: 'Neural Link Interface API',
                        status: 'Completed',
                        description: 'Direct brain-to-machine communication protocol.',
                        tech: ['C++', 'Python', 'TensorFlow'],
                        date: '2048-05-22',
                        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'
                    }
                ],
                blogs: [
                    {
                        id: 'b1',
                        title: 'Architecting for the ExaFLOP Era',
                        date: '2050-01-15',
                        excerpt: 'How to scale web architectures to handle exaflop computational loads seamlessly.',
                        content: '# The Era of ExaFLOP\\n\\nWe are entering a new paradigm...'
                    }
                ],
                messages: [
                    {
                        id: 'm1',
                        name: 'Aria Vance',
                        email: 'aria@cyberdyne.corp',
                        date: '2050-02-12',
                        subject: 'Contract Proposal',
                        body: 'We are interested in your quantum architecture skills for our new orbital station.',
                        read: false
                    }
                ],
                settings: {
                    siteName: 'MATHIYA OS',
                    accentColor: '#00ffdd',
                    maintenanceMode: false
                }
            };
            localStorage.setItem(this.DB_KEY, JSON.stringify(initialData));
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem(this.DB_KEY));
    }

    saveData(data) {
        localStorage.setItem(this.DB_KEY, JSON.stringify(data));
        // Dispatch custom event so UI can update
        window.dispatchEvent(new Event('mathiyaDBUpdated'));
    }

    // Specific Getters and Setters
    getStats() {
        return this.getData().metadata;
    }

    getProjects() {
        return this.getData().projects;
    }

    addProject(project) {
        const data = this.getData();
        data.projects.push(project);
        this.saveData(data);
    }

    updateProject(id, updatedFields) {
        const data = this.getData();
        const idx = data.projects.findIndex(p => p.id === id);
        if (idx !== -1) {
            data.projects[idx] = { ...data.projects[idx], ...updatedFields };
            this.saveData(data);
        }
    }

    deleteProject(id) {
        const data = this.getData();
        data.projects = data.projects.filter(p => p.id !== id);
        this.saveData(data);
    }

    // Dynamic UI Binders
    bindUI(selector, value) {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.value = value;
            } else {
                el.innerText = value;
            }
        });
    }
}

window.AppDB = new AdminDataManager();
