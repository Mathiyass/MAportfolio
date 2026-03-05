/**
 * MAIN.JS - Portfolio Frontend Logic
 * Responsible for rendering dynamic content from data.js into the DOM.
 */

document.addEventListener('DOMContentLoaded', () => {
    const data = window.portfolioData;
    if (!data) return;

    renderHero(data.getProfile());
    renderAbout(data.getProfile());
    renderSkills(data.getSkills());
    renderProjects(data.getProjects());
});

function renderHero(profile) {
    const container = document.getElementById('hero-content');
    if (!container) return;

    container.innerHTML = `
        <div class="mb-6 animate-fade-up parallax" data-speed="0.2" style="animation-delay: 0.1s">
            <span class="inline-block py-1 px-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 pulse-glow">
                Available for freelance projects
            </span>
            <h1 class="font-display text-7xl md:text-9xl font-bold tracking-tighter glow-text mb-6 css-glitch" data-text="${profile.name.split(' ')[0].toUpperCase()}">
                ${profile.name.split(' ')[0].toUpperCase()}
            </h1>
            <div class="h-8 mb-4">
                <p class="text-primary font-display text-xl md:text-2xl font-medium">
                    ${profile.role}
                </p>
            </div>
        </div>
        
        <p class="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed mb-10 animate-fade-up" style="animation-delay: 0.2s">
            ${profile.bio}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up" style="animation-delay: 0.3s">
            <a href="#projects" class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-accent-violet text-background-dark font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                View My Work
            </a>
            <a href="#contact" class="w-full sm:w-auto px-8 py-4 glass-effect border-glass-border hover:bg-white/10 text-white font-bold rounded-xl text-lg transition-all group">
                Let's Talk
                <span class="material-symbols-outlined align-middle ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
        </div>

        <div class="flex items-center justify-center gap-6 mb-16 animate-fade-up" style="animation-delay: 0.4s">
            <a href="${profile.social.github}" target="_blank" class="w-12 h-12 flex items-center justify-center rounded-full glass-effect hover:border-primary/50 transition-colors group">
                <svg class="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
            </a>
            <a href="${profile.social.linkedin}" target="_blank" class="w-12 h-12 flex items-center justify-center rounded-full glass-effect hover:border-primary/50 transition-colors group">
                <svg class="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
                </svg>
            </a>
            <a href="mailto:${profile.social.email}" class="w-12 h-12 flex items-center justify-center rounded-full glass-effect hover:border-primary/50 transition-colors group">
                <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">alternate_email</span>
            </a>
        </div>

        <div class="w-full max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 mx-auto animate-fade-up delay-500">
            <div class="glass-effect p-8 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors border-t border-l border-white/10 glass-hover-glow">
                <span class="text-primary text-4xl font-display font-bold mb-1 count-up">${profile.stats.repos}</span>
                <span class="text-slate-500 text-sm font-medium uppercase tracking-widest">Repositories</span>
            </div>
            <div class="glass-effect p-8 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors border-t border-l border-white/10 glass-hover-glow">
                <span class="text-primary text-4xl font-display font-bold mb-1 count-up">${profile.stats.followers}</span>
                <span class="text-slate-500 text-sm font-medium uppercase tracking-widest">Followers</span>
            </div>
            <div class="glass-effect p-8 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors border-t border-l border-white/10 glass-hover-glow">
                <span class="text-primary text-4xl font-display font-bold mb-1 count-up">${profile.stats.projects}</span>
                <span class="text-slate-500 text-sm font-medium uppercase tracking-widest">Projects</span>
            </div>
            <div class="glass-effect p-8 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors border-t border-l border-white/10 glass-hover-glow">
                <span class="text-primary text-4xl font-display font-bold mb-1 count-up">${profile.stats.techStack}</span>
                <span class="text-slate-500 text-sm font-medium uppercase tracking-widest">Technologies</span>
            </div>
        </div>
    `;
}

function renderAbout(profile) {
    const container = document.getElementById('about-content');
    if (!container) return;

    container.innerHTML = `
        <h2 class="text-4xl md:text-5xl font-display font-bold mb-6 glow-text">Beyond the Code</h2>
        <div class="h-1 w-20 bg-gradient-to-r from-primary to-accent-violet mb-8 rounded-full"></div>
        <p class="text-slate-400 text-lg leading-relaxed mb-6">
            ${profile.bio}
        </p>
        <p class="text-slate-400 text-lg leading-relaxed mb-8">
            My journey into software engineering started with a fascination for how things work under the hood. 
            Today, I specialize in building scalable web applications that not only perform flawlessly but also 
            provide an intuitive and premium user experience. I thrive in environments where creativity meets complex problem-solving.
        </p>
        <div class="flex items-center gap-4">
            <img src="${profile.avatar}" alt="${profile.name}" class="w-16 h-16 rounded-full border-2 border-primary/50" />
            <div>
                <h4 class="text-white font-bold text-lg">${profile.name}</h4>
                <p class="text-primary text-sm">${profile.role}</p>
            </div>
        </div>
    `;
}

function renderSkills(skills) {
    const container = document.getElementById('skills-grid');
    if (!container) return;

    let html = '';
    skills.forEach((skillGroup, index) => {
        html += `
            <div class="glass-effect p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors animate-fade-up tilt-card" style="animation-delay: ${0.1 * index}s">
                <h3 class="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-primary glow-box-primary"></span>
                    ${skillGroup.category}
                </h3>
                <div class="flex flex-wrap gap-3">
                    ${skillGroup.items.map(skill => `
                        <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-primary/20 hover:text-primary transition-colors cursor-default">
                            ${skill}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

    let html = '';
    featuredProjects.forEach((project, index) => {
        html += `
            <div class="group rounded-2xl glass-effect border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300 animate-fade-up tilt-card" style="animation-delay: ${0.1 * index}s">
                <div class="relative h-64 overflow-hidden">
                    <div class="absolute inset-0 bg-background-dark/50 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div class="absolute top-4 right-4 z-20 flex gap-2">
                        <a href="${project.github}" class="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-primary transition-colors border border-white/10">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                        </a>
                        <a href="${project.link}" class="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-primary transition-colors border border-white/10">
                            <span class="material-symbols-outlined text-[20px]">open_in_new</span>
                        </a>
                    </div>
                </div>
                <div class="p-8">
                    <h3 class="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">${project.title}</h3>
                    <p class="text-slate-400 mb-6 line-clamp-2">${project.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${project.tech.map(t => `<span class="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}
