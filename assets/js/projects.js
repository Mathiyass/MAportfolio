function initializeProjectsPage() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // --- Project Filtering Logic ---
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('text-cyber-cyan');
                    btn.classList.add('text-gray-300');
                });
                this.classList.add('active');
                this.classList.add('text-cyber-cyan');

                projectCards.forEach(card => {
                    card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'flex' : 'none';
                });
            });
        });
    }


    // --- Project Modal Logic ---
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = card.dataset.projectId;
            if (!window.projectsData) {
                console.error("projectsData is not available on the window object.");
                return;
            }
            const projectData = window.projectsData.find(p => p.id === projectId);

            if (!projectData) {
                console.error(`Project data for ID ${projectId} not found.`);
                return;
            }

            const modal = document.getElementById('project-modal');
            if(modal) {
                modal.querySelector('#modal-title').textContent = projectData.title;
                modal.querySelector('#modal-description').textContent = projectData.longDescription;
                modal.querySelector('#modal-image i').className = `${projectData.icon} text-6xl text-black`;
                modal.querySelector('#modal-demo').href = projectData.liveUrl;
                modal.querySelector('#modal-github').href = projectData.githubUrl;
                
                const tagsContainer = modal.querySelector('#modal-tags');
                tagsContainer.innerHTML = projectData.tags.map(tag => `<span class="tag px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-sm">${tag}</span>`).join('');

                const featuresContainer = modal.querySelector('#modal-features');
                featuresContainer.innerHTML = projectData.features.map(feature => `<li>${feature}</li>`).join('');

                modal.classList.remove('hidden');
            }
        });
    });

    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('project-modal');
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeProjectsPage);
document.addEventListener('page:load', initializeProjectsPage);
