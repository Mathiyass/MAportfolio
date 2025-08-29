function initializeRenderer() {
    console.log('Renderer script preparing to load content.');
    loadContent();
}

document.addEventListener('DOMContentLoaded', initializeRenderer);
document.addEventListener('page:load', initializeRenderer);

async function loadContent() {
    try {
        const response = await fetch('database.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const db = await response.json();
        console.log('Database loaded successfully.');

        // Always render common elements like nav and footer
        renderCommonElements(db);

        const page = document.body.getAttribute('data-page');
        if (page === 'home') {
            renderHomePage(db);
        } else if (page === 'about') {
            renderAboutPage(db);
        } else if (page === 'projects') {
            renderProjectsPage(db);
        } else if (page === 'skills') {
            renderSkillsPage(db);
        }

        document.dispatchEvent(new CustomEvent('contentRendered'));

    } catch (error) {
        console.error("Could not load database or render content:", error);
    }
}

function renderCommonElements(db) {
    document.querySelector('nav .gradient-text a').textContent = db.site.logoText;
    const navContainer = document.querySelector('nav .hidden.md\\:flex.space-x-8');
    if(navContainer) {
        navContainer.innerHTML = db.navigation.map(item => `
            <a href="${item.href}" class="nav-link hover:text-cyber-cyan transition-colors relative group">
                ${item.name}
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-cyan transition-all duration-300 group-hover:w-full"></span>
            </a>`).join('');
    }
    const mobileNavContainer = document.querySelector('#mobile-menu .space-y-6');
    if(mobileNavContainer) {
        mobileNavContainer.innerHTML = db.navigation.map(item => `
            <a href="${item.href}" class="block text-xl font-orbitron hover:text-cyber-cyan transition-all duration-300 mobile-nav-link transform hover:translate-x-2">${item.name}</a>`
        ).join('');
    }
    const footerLogo = document.querySelector('footer .gradient-text');
    if(footerLogo) footerLogo.textContent = db.site.logoText;
    const footerText = document.querySelector('footer #footer-text');
    if(footerText) footerText.textContent = db.site.footerText.replace('©', `© ${new Date().getFullYear()}`);
}

function renderHomePage(db) {
    const pageData = db.pages.home;
    if (!pageData) {
        console.error('Home page data not found in database.');
        return;
    }

    console.log('Rendering Home Page...');

    // --- Global Elements ---
    document.title = db.site.title;
    document.querySelector('meta[name="description"]').setAttribute('content', db.site.description);
    document.querySelector('meta[name="keywords"]').setAttribute('content', db.site.keywords);
    document.querySelector('nav .gradient-text a').textContent = db.site.logoText;

    // --- Navigation ---
    const navContainer = document.querySelector('nav .hidden.md\\:flex.space-x-8');
    if(navContainer) {
        navContainer.innerHTML = db.navigation.map(item => `
            <a href="${item.href}" class="nav-link hover:text-cyber-cyan transition-colors relative group">
                ${item.name}
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-cyan transition-all duration-300 group-hover:w-full"></span>
            </a>`).join('');
    }
    const mobileNavContainer = document.querySelector('#mobile-menu .space-y-6');
    if(mobileNavContainer) {
        mobileNavContainer.innerHTML = db.navigation.map(item => `
            <a href="${item.href}" class="block text-xl font-orbitron hover:text-cyber-cyan transition-all duration-300 mobile-nav-link transform hover:translate-x-2">${item.name}</a>`
        ).join('');
    }

    // --- Hero Section ---
    const hero = pageData.hero;
    document.querySelector('#hero-greeting').textContent = hero.greeting;
    document.querySelector('#hero-name').textContent = hero.name;
    const typingElement = document.getElementById('typing-text');
    if(typingElement) {
        typingElement.setAttribute('data-titles', JSON.stringify(hero.titles));
    }
    document.querySelector('#hero-bio').textContent = hero.bio;
    const heroButtonsContainer = document.querySelector('#hero-buttons');
    if(heroButtonsContainer){
        heroButtonsContainer.innerHTML = hero.buttons.map(btn => `
            <a href="${btn.href}" class="${btn.href.includes('contact') ? 'border-2 border-cyber-cyan text-cyber-cyan' : 'neon-btn text-black'} font-semibold py-3 px-8 rounded-lg transition-all duration-300 font-orbitron">
                <i class="${btn.icon} mr-2"></i>${btn.text}
            </a>`).join('');
    }

    // --- Social Links ---
    const socialContainer = document.querySelector('#social-links-container');
    if(socialContainer) {
        socialContainer.innerHTML = db.socialLinks.map(link => `
            <a href="${link.url}" target="_blank" class="social-card glass p-4 rounded-lg flex flex-col items-center justify-center gap-2" title="${link.title || link.name}">
                <i class="${link.icon} text-3xl text-gray-300"></i>
                <span class="social-name text-xs text-cyber-cyan font-orbitron">${link.name}</span>
            </a>`).join('');
    }

    // --- About Preview ---
    const aboutPreview = pageData.aboutPreview;
    document.querySelector('#about-preview h2').textContent = aboutPreview.title;
    const aboutCardsContainer = document.querySelector('#about-preview-cards');
    if(aboutCardsContainer){
        aboutCardsContainer.innerHTML = aboutPreview.cards.map((card, index) => `
            <div class="enhanced-card glass p-8 rounded-2xl text-center" data-aos="fade-up" data-aos-delay="${100 * (index + 1)}">
                <div class="text-5xl mb-6 text-cyber-cyan"><i class="${card.icon}"></i></div>
                <h3 class="text-xl font-bold mb-4 font-orbitron">${card.title}</h3>
                <p class="text-gray-300">${card.text}</p>
            </div>`).join('');
    }
    const aboutButton = document.querySelector('#about-preview-button');
    if(aboutButton){
        aboutButton.href = aboutPreview.button.href;
        aboutButton.innerHTML = `<i class="${aboutPreview.button.icon} mr-2"></i>${aboutPreview.button.text}`;
    }

    // --- Featured Projects ---
    const featuredProjects = pageData.featuredProjects;
    document.querySelector('#featured-projects-title').textContent = featuredProjects.title;
    const projectContainer = document.querySelector('#featured-projects-container');
    if(projectContainer){
        projectContainer.innerHTML = featuredProjects.projects.map((project, index) => `
            <div class="enhanced-card glass rounded-2xl overflow-hidden" data-aos="fade-up" data-aos-delay="${100 * (index + 1)}">
                <div class="relative group">
                    <div class="w-full h-48 bg-gradient-to-br from-cyber-cyan to-electric-blue flex items-center justify-center">
                        <i class="${project.icon} text-4xl text-black"></i>
                    </div>
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div class="text-center">
                             <a href="${project.liveUrl}" class="bg-white text-black px-4 py-2 rounded-lg mr-2 hover:bg-gray-200 transition-colors"><i class="fas fa-eye"></i></a>
                             <a href="${project.githubUrl}" class="bg-cyber-cyan text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-3 font-orbitron">${project.title}</h3>
                    <p class="text-gray-300 mb-4">${project.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${project.tags.map(tag => `<span class="px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-sm">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>`).join('');
    }
    const projectsButton = document.querySelector('#featured-projects-button');
    if(projectsButton){
        projectsButton.href = featuredProjects.button.href;
        projectsButton.innerHTML = `<i class="${featuredProjects.button.icon} mr-2"></i>${featuredProjects.button.text}`;
    }

    // --- Skills Overview ---
    const skillsOverview = pageData.skillsOverview;
    document.querySelector('#skills-overview-title').textContent = skillsOverview.title;
    const skillsContainer = document.querySelector('#skills-overview-container');
    if(skillsContainer){
        skillsContainer.innerHTML = skillsOverview.skills.map((skill, index) => `
            <div class="enhanced-card glass p-6 rounded-2xl text-center" data-aos="fade-up" data-aos-delay="${100 * (index + 1)}">
                <div class="text-4xl mb-4 text-orange-500"><i class="${skill.icon}"></i></div>
                <h3 class="font-bold font-orbitron">${skill.category}</h3>
                <p class="text-sm text-gray-400 mt-2">${skill.list}</p>
            </div>`).join('');
    }
    const skillsButton = document.querySelector('#skills-overview-button');
    if(skillsButton){
        skillsButton.href = skillsOverview.button.href;
        skillsButton.innerHTML = `<i class="${skillsOverview.button.icon} mr-2"></i>${skillsOverview.button.text}`;
    }

    // --- Contact CTA ---
    const contactCTA = pageData.contactCTA;
    document.querySelector('#contact-cta-title').textContent = contactCTA.title;
    document.querySelector('#contact-cta-text').textContent = contactCTA.text;
    const ctaButtonsContainer = document.querySelector('#contact-cta-buttons');
    if(ctaButtonsContainer){
        ctaButtonsContainer.innerHTML = contactCTA.buttons.map(btn => `
             <a href="${btn.href}" class="${btn.href.includes('resume') ? 'border-2 border-cyber-cyan text-cyber-cyan' : 'neon-btn text-black'} font-semibold py-4 px-8 rounded-lg transition-all duration-300 font-orbitron">
                <i class="${btn.icon} mr-2"></i>${btn.text}
            </a>`).join('');
    }

    // --- Footer ---
    document.querySelector('footer .gradient-text').textContent = db.site.logoText;
    document.querySelector('footer #footer-text').textContent = db.site.footerText;
    document.getElementById('current-year').textContent = new Date().getFullYear();

    console.log('Home Page rendering complete.');
}

function renderAboutPage(db) {
    const pageData = db.pages.about;
    if (!pageData) {
        console.error('About page data not found in database.');
        return;
    }

    console.log('Rendering About Page...');

    document.title = `About | ${db.site.logoText}`;

    // --- Hero Section ---
    const hero = pageData.hero;
    const heroSection = document.querySelector('#about-hero');
    if(heroSection) {
        heroSection.querySelector('h1').textContent = hero.title;
        heroSection.querySelector('p').textContent = hero.subtitle;
    }

    // --- My Journey Section ---
    const journey = pageData.myJourney;
    const journeySection = document.querySelector('#my-journey');
    if(journeySection) {
        journeySection.querySelector('h2').textContent = journey.title;
        const journeyParagraphs = journeySection.querySelector('#journey-paragraphs');
        if(journeyParagraphs) {
            journeyParagraphs.innerHTML = journey.paragraphs.map(p => `<p class="text-lg text-gray-300 mb-6 leading-relaxed">${p}</p>`).join('');
        }
        const swiperWrapper = journeySection.querySelector('.swiper-wrapper');
        if(swiperWrapper) {
            swiperWrapper.innerHTML = journey.images.map(img => `<div class="swiper-slide"><img src="${img}" alt="Mathiya" class="w-full h-full object-cover"></div>`).join('');
        }
    }


    // --- Timeline Section ---
    const timeline = pageData.timeline;
    const timelineSection = document.querySelector('#timeline-section');
    if(timelineSection) {
        timelineSection.querySelector('h2').textContent = timeline.title;
        const timelineContainer = timelineSection.querySelector('#timeline-container');
        if(timelineContainer) {
            timelineContainer.innerHTML = timeline.events.map((event, index) => `
                <div class="timeline-item mb-8" data-aos="fade-up" data-aos-delay="${100 * (index + 1)}">
                    <div class="glass p-6 rounded-lg">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h3 class="text-xl font-bold text-cyber-cyan font-orbitron">${event.title}</h3>
                            <span class="text-sm text-gray-400">${event.date}</span>
                        </div>
                        <p class="text-gray-300">${event.text}</p>
                    </div>
                </div>`).join('');
        }
    }

    // --- Education & Certifications ---
    const eduCert = pageData.educationAndCertifications;
    const eduCertSection = document.querySelector('#education-certs-section');
    if(eduCertSection){
        eduCertSection.querySelector('#education-title').textContent = eduCert.education.title;
        eduCertSection.querySelector('#education-degree').textContent = eduCert.education.degree;
        eduCertSection.querySelector('#education-university').textContent = eduCert.education.university;
        eduCertSection.querySelector('#education-description').textContent = eduCert.education.description;

        eduCertSection.querySelector('#certs-title').textContent = eduCert.certifications.title;
        const certsContainer = eduCertSection.querySelector('#certs-container');
        if(certsContainer){
            certsContainer.innerHTML = eduCert.certifications.items.map(cert => `
                <div class="glass p-4 rounded-lg">
                    <h4 class="font-bold text-cyber-cyan font-orbitron">${cert.title}</h4>
                    <p class="text-sm text-gray-400">${cert.issuer}</p>
                </div>`).join('');
        }
    }

    // --- Goals Section ---
    const goals = pageData.goals;
    const goalsSection = document.querySelector('#goals-section');
    if(goalsSection) {
        goalsSection.querySelector('h2').textContent = goals.title;
        const goalsContainer = goalsSection.querySelector('#goals-container');
        if(goalsContainer){
            goalsContainer.innerHTML = goals.items.map(goal => `
                <div class="glass p-6 rounded-lg">
                    <div class="text-4xl mb-4 text-cyber-cyan"><i class="${goal.icon}"></i></div>
                    <h3 class="text-xl font-bold mb-4 font-orbitron">${goal.title}</h3>
                    <p class="text-gray-300">${goal.text}</p>
                </div>`).join('');
        }
        const resumeButton = goalsSection.querySelector('#resume-button');
        if(resumeButton){
            resumeButton.href = goals.resumeButton.href;
            resumeButton.innerHTML = `<i class="fas fa-download mr-2"></i> ${goals.resumeButton.text}`;
        }
    }

    console.log('About Page rendering complete.');
}

function renderProjectsPage(db) {
    const pageData = db.pages.projects;
    if (!pageData) {
        console.error('Projects page data not found in database.');
        return;
    }

    console.log('Rendering Projects Page...');

    document.title = `Projects | ${db.site.logoText}`;

    // --- Hero Section ---
    const hero = pageData.hero;
    const heroSection = document.querySelector('#projects-hero');
    if(heroSection) {
        heroSection.querySelector('h1').textContent = hero.title;
        heroSection.querySelector('p').textContent = hero.subtitle;
    }

    // --- Filter Buttons ---
    const filterContainer = document.querySelector('#filter-buttons');
    if(filterContainer) {
        filterContainer.innerHTML = pageData.filterCategories.map((cat, index) => `
            <button class="filter-btn px-6 py-3 rounded-full border-2 ${index === 0 ? 'border-cyber-cyan text-cyber-cyan active' : 'border-gray-600 text-gray-300'} font-orbitron" data-filter="${cat.key}">
                ${cat.name}
            </button>
        `).join('');
    }

    // --- Projects Grid ---
    const gridContainer = document.querySelector('#projects-grid');
    if(gridContainer) {
        gridContainer.innerHTML = pageData.items.map((project, index) => `
            <div class="project-card glass rounded-2xl overflow-hidden cursor-pointer flex flex-col" data-category="${project.category}" data-aos="fade-up" data-aos-delay="${100 * (index % 3)}" data-project-id="${project.id}">
                <div class="relative overflow-hidden">
                    <div class="w-full h-48 bg-gradient-to-br from-cyber-cyan to-cyber-red flex items-center justify-center">
                        <i class="${project.icon} text-4xl text-black"></i>
                    </div>
                    <div class="absolute top-4 right-4 bg-cyber-cyan text-black px-3 py-1 rounded-full text-sm font-semibold font-orbitron">
                        ${pageData.filterCategories.find(c => c.key === project.category).name}
                    </div>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold mb-3 gradient-text font-orbitron">${project.title}</h3>
                    <p class="text-gray-400 mb-4 flex-grow">${project.shortDescription}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.tags.map(tag => `<span class="tag px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-sm">${tag}</span>`).join('')}
                    </div>
                    <div class="flex gap-3 mt-auto">
                        <span class="w-full bg-gray-700 text-white py-2 px-4 rounded-lg text-center font-semibold transition-all hover:bg-gray-600">
                            <i class="fas fa-info-circle mr-2"></i>Details
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    window.projectsData = pageData.items;

    console.log('Projects Page rendering complete.');
}

function renderSkillsPage(db) {
    const pageData = db.pages.skills;
    if (!pageData) {
        console.error('Skills page data not found in database.');
        return;
    }

    console.log('Rendering Skills Page...');

    document.title = `Skills | ${db.site.logoText}`;

    // --- Hero Section ---
    const hero = pageData.hero;
    const heroSection = document.querySelector('#skills-hero');
    if(heroSection) {
        heroSection.querySelector('h1').textContent = hero.title;
        heroSection.querySelector('p').textContent = hero.subtitle;
    }

    // --- Skills Matrix ---
    const matrixContainer = document.querySelector('#skills-matrix');
    if(matrixContainer){
        let matrixHTML = '';
        pageData.categories.forEach(category => {
            matrixHTML += `
                <div class="mb-16" data-aos="fade-up">
                    <h2 class="text-3xl md:text-4xl font-bold font-orbitron mb-8 gradient-text text-center">
                        ${category.title}
                    </h2>
                    <div class="grid ${category.display === 'icons' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8">
                        ${category.skills.map(skill => {
                            if(category.display === 'icons') {
                                return `
                                <div class="skill-card glass p-6 rounded-2xl text-center">
                                    <div class="skill-icon text-5xl ${skill.color} mb-4"><i class="${skill.icon}"></i></div>
                                    <h3 class="font-bold font-orbitron mb-2">${skill.name}</h3>
                                    <div class="skill-bar mb-2"><div class="skill-progress" data-width="${skill.level}"></div></div>
                                    <span class="${skill.color} font-bold">${skill.level}%</span>
                                </div>`;
                            } else {
                                return `
                                <div class="skill-card glass p-6 rounded-2xl">
                                    <div class="flex items-center mb-4">
                                        <div class="skill-icon text-4xl ${skill.color} mr-4"><i class="${skill.icon}"></i></div>
                                        <div class="flex-1">
                                            <div class="flex justify-between items-center mb-2">
                                                <span class="font-semibold font-orbitron">${skill.name}</span>
                                                <span class="${skill.color} font-bold">${skill.level}%</span>
                                            </div>
                                            <div class="skill-bar"><div class="skill-progress" data-width="${skill.level}"></div></div>
                                        </div>
                                    </div>
                                </div>`;
                            }
                        }).join('')}
                    </div>
                </div>
            `;
        });
        matrixContainer.innerHTML = matrixHTML;
    }

    // --- Summary Section ---
    const summary = pageData.summary;
    const summarySection = document.querySelector('#skill-summary');
    if(summarySection) {
        summarySection.querySelector('h2').textContent = summary.title;
        const summaryCardsContainer = summarySection.querySelector('#summary-cards');
        if(summaryCardsContainer){
            summaryCardsContainer.innerHTML = summary.cards.map(card => `
                <div class="glass p-8 rounded-2xl">
                    <div class="text-5xl mb-4 text-cyber-cyan"><i class="${card.icon}"></i></div>
                    <h3 class="text-2xl font-bold mb-4 font-orbitron">${card.title}</h3>
                    <p class="text-gray-300">${card.text}</p>
                </div>
            `).join('');
        }
        const learningSection = summarySection.querySelector('#learning-section');
        if(learningSection){
            learningSection.querySelector('h3').textContent = summary.learning.title;
            learningSection.querySelector('p').textContent = summary.learning.text;
        }
    }

    // The skills.js script will handle the animation based on the data-width attribute.
    console.log('Skills Page rendering complete.');
}
