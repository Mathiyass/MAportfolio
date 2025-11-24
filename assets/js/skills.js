// Skills page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Note: Global features like Cursor, Navbar, Scroll Progress are handled by main.js and navbar.js

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');

    // Using IntersectionObserver for skill bar animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');

                // Add delay for a stepped effect
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                    skillBar.style.boxShadow = `0 0 10px rgba(0, 255, 222, 0.5)`;

                    // Animate the percentage text if it exists
                    const percentageEl = skillBar.parentElement.previousElementSibling?.querySelector('.text-cyber-cyan');
                    if (percentageEl) {
                       // animateNumber(percentageEl, 0, parseInt(width), 1000); // animateNumber is in main.js
                    }
                }, 200);

                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Skill icon hover effects
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.textShadow = '0 0 20px currentColor';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.textShadow = 'none';
        });
    });

    // Add interactive tooltips/hover effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 255, 222, 0.1)';
            
            // Add glow effect to skill icon
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.textShadow = '0 0 20px currentColor';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
            
            // Remove glow effect
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.textShadow = 'none';
            }
        });
    });

    // Create floating skill particles background
    function createSkillParticles() {
        const container = document.body;
        // Don't create if too many particles already exist
        if (document.querySelectorAll('.skill-particle').length > 10) return;

        const skillNames = ['HTML', 'CSS', 'JS', 'React', 'Node', 'Python', 'Unity', 'Git', 'SQL', 'AWS'];
        
        const particleInterval = setInterval(() => {
            // Stop if we left the page (cleanup handled by browser mostly, but good practice)
            if (!document.body.contains(container)) {
                clearInterval(particleInterval);
                return;
            }

            const particle = document.createElement('div');
            particle.className = 'skill-particle';
            particle.textContent = skillNames[Math.floor(Math.random() * skillNames.length)];
            particle.style.cssText = `
                position: fixed;
                bottom: -50px;
                left: ${Math.random() * 100}%;
                color: rgba(0, 255, 222, 0.15);
                font-size: ${10 + Math.random() * 10}px;
                font-family: 'Orbitron', monospace;
                pointer-events: none;
                z-index: -1;
                animation: floatUp ${10 + Math.random() * 10}s linear forwards;
            `;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 20000);
        }, 3000);
    }

    // Add CSS for floating animation if not present
    if (!document.getElementById('skill-particle-style')) {
        const style = document.createElement('style');
        style.id = 'skill-particle-style';
        style.textContent = `
            @keyframes floatUp {
                to {
                    transform: translateY(-110vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Start particle animation
    createSkillParticles();
});
