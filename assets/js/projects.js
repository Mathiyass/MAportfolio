document.addEventListener('DOMContentLoaded', function() {
    // Note: AOS init is handled globally in main.js

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // --- Project Filtering Logic ---
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;

                // Update active state on buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('border-cyber-cyan', 'text-cyber-cyan');
                    btn.classList.add('border-gray-600', 'text-gray-300');
                });
                this.classList.add('active');
                this.classList.remove('border-gray-600', 'text-gray-300');
                this.classList.add('border-cyber-cyan', 'text-cyber-cyan');


                // Show/hide project cards based on filter
                projectCards.forEach(card => {
                    const category = card.dataset.category;

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        // Trigger AOS animation
                        card.classList.remove('aos-animate');
                        setTimeout(() => card.classList.add('aos-animate'), 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Project Modal Logic ---
    projectCards.forEach(card => {
        // Find the "Live Demo" or equivalent button to attach the main click listener
        // But also make the card image clickable
        const cardImage = card.querySelector('.relative.overflow-hidden');
        if (cardImage) {
            cardImage.style.cursor = 'pointer';
            cardImage.addEventListener('click', () => {
                openProjectModal(card);
            });
        }

        // Add hover effect that hints at clickability
        cardImage.title = "Click for details";
    });

    function openProjectModal(card) {
        const title = card.querySelector('h3').innerText;
        const description = card.querySelector('p').innerText;
        // Clone tags to preserve original styles
        const tagsContainer = card.querySelector('.flex.flex-wrap.gap-2');
        const tags = tagsContainer ? tagsContainer.innerHTML : '';

        // Get icon/image content
        const imageDiv = card.querySelector('.relative.overflow-hidden');
        const iconElement = imageDiv.querySelector('i');
        const iconClass = iconElement ? iconElement.className : 'fas fa-code';

        const modalContentHtml = `
            <div class="grid md:grid-cols-2 gap-8">
                <div>
                    <div class="w-full h-64 bg-gradient-to-br from-cyber-cyan to-cyber-red rounded-lg mb-6 flex items-center justify-center overflow-hidden relative group">
                        <i class="${iconClass} text-8xl text-black drop-shadow-lg transform transition-transform duration-700 group-hover:scale-110"></i>
                        <div class="absolute inset-0 bg-black/20"></div>
                    </div>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4 text-cyber-cyan font-orbitron">Overview</h3>
                    <p class="text-gray-300 mb-6 leading-relaxed text-lg">${description}</p>

                    <div class="mb-6 p-4 glass rounded-lg border border-white/5">
                        <h4 class="text-sm font-bold mb-3 text-neon-pink font-orbitron uppercase tracking-wider">Project Details</h4>
                        <p class="text-gray-400 text-sm">
                            This project showcases advanced implementation of modern web technologies.
                            It demonstrates proficiency in full-stack development, UI/UX design principles,
                            and performance optimization techniques.
                        </p>
                    </div>

                    <h3 class="text-xl font-bold mb-3 text-cyber-cyan font-orbitron">Stack</h3>
                    <div class="flex flex-wrap gap-2 mb-8">${tags}</div>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="#" class="neon-btn text-black py-3 px-6 rounded-lg font-bold hover:bg-opacity-80 transition-all text-center flex items-center justify-center">
                            <i class="fas fa-external-link-alt mr-2"></i> Visit Live
                        </a>
                        <a href="#" class="border-2 border-cyber-cyan text-cyber-cyan py-3 px-6 rounded-lg font-bold hover:bg-cyber-cyan hover:text-black transition-all text-center flex items-center justify-center">
                            <i class="fab fa-github mr-2"></i> View Code
                        </a>
                    </div>
                </div>
            </div>
        `;

        if (typeof showModal === 'function') {
            showModal(title, modalContentHtml);
        } else {
            console.error('showModal function not found. Make sure main.js is loaded.');
        }
    }
});
