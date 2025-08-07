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
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // --- Project Filtering Logic ---
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active state on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show/hide project cards based on filter
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Project Modal Logic ---
    projectCards.forEach(card => {
        // Find the "Live Demo" or equivalent button to attach the main click listener
        const previewButton = card.querySelector('a:first-of-type'); // Assuming the first link is the preview

        if (previewButton) {
            previewButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent the link from navigating
                
                // Extract data from the card
                const title = card.querySelector('h3').innerText;
                const description = card.querySelector('p').innerText;
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.outerHTML).join('');
                
                // Create the content for the modal
                const modalContentHtml = `
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <div class="w-full h-64 bg-gradient-to-br from-cyber-cyan to-cyber-red rounded-lg mb-6 flex items-center justify-center">
                                ${card.querySelector('.relative.overflow-hidden').innerHTML}
                            </div>
                        </div>
                        <div>
                            <p class="text-gray-300 mb-6 leading-relaxed">${description}</p>
                            <h3 class="text-xl font-bold mb-3 text-cyber-cyan font-orbitron">Technologies Used</h3>
                            <div class="flex flex-wrap gap-2">${tags}</div>
                        </div>
                    </div>
                `;

                // Use the global showModal function from main.js
                if (typeof showModal === 'function') {
                    showModal(title, modalContentHtml);
                } else {
                    // Fallback if main.js modal is not available for some reason
                    console.error('showModal function not found. Make sure main.js is loaded.');
                }
            });
        }
    });

    // This implementation uses the generic modal from main.js, so no need for separate close listeners here.
});
