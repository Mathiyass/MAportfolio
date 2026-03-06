/**
 * Shared utility functions for Mthisha Portfolio
 */

/**
 * Creates a ripple effect on the specified element
 * @param {HTMLElement} element 
 */
export function createRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

/**
 * Creates a burst of particles at the specified coordinates
 * @param {number} x 
 * @param {number} y 
 */
export function createClickBurst(x, y) {
    const colors = ['#00FFDE', '#FF3366', '#FF10F0', '#0080FF'];
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10003;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        
        const destinationX = (Math.random() - 0.5) * 200;
        const destinationY = (Math.random() - 0.5) * 200;
        
        const animation = particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    }
}

/**
 * Animates a number from start to end over a duration
 * @param {HTMLElement} element 
 * @param {number} start 
 * @param {number} end 
 * @param {number} duration 
 */
export function animateNumber(element, start, end, duration) {
    if (!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Shows a custom notification
 * @param {string} message 
 * @param {string} type - 'success', 'error', 'info'
 */
export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} mr-2"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

/**
 * Shows a custom modal
 * @param {string} title 
 * @param {string} content - HTML string
 */
export function showModal(title, content) {
    const modalHtml = `
        <div id="custom-modal" class="fixed inset-0 z-[10005] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm modal-close"></div>
            <div class="glass p-8 rounded-2xl max-w-lg w-full relative z-10 scale-90 opacity-0 transition-all duration-300" id="modal-content">
                <button class="absolute top-4 right-4 text-gray-400 hover:text-white modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <h2 class="text-2xl font-bold font-orbitron mb-4 gradient-text">${title}</h2>
                <div class="text-gray-300 leading-relaxed">${content}</div>
                <div class="mt-8 text-center">
                    <button class="neon-btn text-black py-2 px-8 rounded-lg font-orbitron modal-close">CLOSE</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const modal = document.getElementById('custom-modal');
    const contentEl = document.getElementById('modal-content');
    
    setTimeout(() => {
        contentEl.classList.remove('scale-90', 'opacity-0');
        contentEl.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    const closeButtons = modal.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            contentEl.classList.remove('scale-100', 'opacity-100');
            contentEl.classList.add('scale-90', 'opacity-0');
            setTimeout(() => modal.remove(), 300);
        });
    });
}
