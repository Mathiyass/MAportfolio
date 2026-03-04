/**
 * Easter Eggs Module
 */
import { showNotification, createClickBurst } from '../utils.js';

export function initializeEasterEgg() {
    const sequence = ['m', 'a', 't', 'h', 'i', 'y', 'a'];
    let keySequence = [];

    document.addEventListener('keydown', function (e) {
        if (e.key.length === 1) {
            keySequence.push(e.key.toLowerCase());
            keySequence = keySequence.slice(-sequence.length);

            if (JSON.stringify(keySequence) === JSON.stringify(sequence)) {
                const logo = document.querySelector('.gradient-text a');
                if (logo) {
                    logo.classList.add('logo-easter-egg-animation');
                    setTimeout(() => {
                        logo.classList.remove('logo-easter-egg-animation');
                    }, 1500);
                }
                keySequence = [];
            }
        }
    });
}

export function initializeAdminAccess() {
    const sequence = ['a', 'd', 'm', 'i', 'n'];
    let keySequence = [];

    document.addEventListener('keydown', function (e) {
        if (e.key.length === 1) {
            keySequence.push(e.key.toLowerCase());
            keySequence = keySequence.slice(-sequence.length);

            if (JSON.stringify(keySequence) === JSON.stringify(sequence)) {
                keySequence = [];
                setTimeout(() => {
                    const username = prompt("Enter Username:");
                    if (username !== null) {
                        const password = prompt("Enter Password:");
                        if (username === 'MATHIYA' && password === 'MATHIYA') {
                            showNotification('Access Granted', 'success');
                            window.location.href = 'admin.html';
                        } else {
                            showNotification('Access Denied', 'error');
                        }
                    }
                }, 100);
            }
        }
    });
}

export function initializeKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiCode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateKonamiCode() {
        showNotification('Konami Code Activated!', 'success');
        document.body.style.transform = 'rotate(180deg)';
        document.body.style.transition = 'transform 2s ease';

        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
        }, 5000);

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createClickBurst(x, y);
            }, i * 50);
        }
    }
}
