document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS for animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // --- Project Filtering Logic ---
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;

                // Update active state on buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Show/hide project cards based on filter
                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    // Reset animation
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = null;

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        // Add fade in effect
                        card.classList.add('aos-animate');
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
        // In the new structure, usually the buttons are inside .p-6
        const demoBtn = card.querySelector('a:first-child');

        // We only want to trigger modal if it's intended.
        // For now, let's make the card title clickable or add a specific 'details' button if needed.
        // Or keep the behavior that "Live Demo" opens modal? Actually "Live Demo" should go to link.
        // The previous code intercepted "Live Demo". Let's change it so the CARD IMAGE triggers modal?

        const cardImage = card.querySelector('.relative.overflow-hidden');
        if (cardImage) {
            cardImage.style.cursor = 'pointer';
            cardImage.addEventListener('click', () => {
                openProjectModal(card);
            });
        }
    });

    function openProjectModal(card) {
        const title = card.querySelector('h3').innerText;
        const description = card.querySelector('p').innerText;
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.outerHTML).join('');
        const imageContent = card.querySelector('.relative.overflow-hidden').innerHTML;

        const modalContentHtml = `
            <div class="grid md:grid-cols-2 gap-8">
                <div>
                    <div class="w-full h-64 bg-gradient-to-br from-cyber-cyan to-cyber-red rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                        ${imageContent}
                    </div>
                </div>
                <div>
                    <p class="text-gray-300 mb-6 leading-relaxed">${description}</p>
                    <p class="text-gray-400 mb-6">
                        This is a detailed view of the project. Here you would typically see more in-depth information about the challenges faced, solutions implemented, and the impact of the project.
                    </p>
                    <h3 class="text-xl font-bold mb-3 text-cyber-cyan font-orbitron">Technologies Used</h3>
                    <div class="flex flex-wrap gap-2 mb-6">${tags}</div>

                    <div class="flex gap-4">
                        <a href="#" class="bg-cyber-cyan text-black py-2 px-6 rounded-lg font-bold hover:bg-opacity-80 transition-colors">
                            <i class="fas fa-external-link-alt mr-2"></i> Visit Live
                        </a>
                        <a href="#" class="border-2 border-cyber-cyan text-cyber-cyan py-2 px-6 rounded-lg font-bold hover:bg-cyber-cyan hover:text-black transition-colors">
                            <i class="fab fa-github mr-2"></i> Source Code
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
