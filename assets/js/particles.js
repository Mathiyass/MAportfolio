/**
 * ========================================================
 * MTHISHA PORTFOLIO - V2 3D PARTICLES
 * particles.js
 * Advanced Cybernetic Particle Field via tsParticles
 * ========================================================
 */

class MthishaParticles {
    constructor() {
        this.containerId = 'tsparticles';
        this.initContainer();
        this.loadParticles();
    }

    initContainer() {
        if (!document.getElementById(this.containerId)) {
            const div = document.createElement('div');
            div.id = this.containerId;
            // Placed just above the lowest z-index but below background interactions
            div.style.position = 'fixed';
            div.style.top = '0';
            div.style.left = '0';
            div.style.width = '100vw';
            div.style.height = '100vh';
            div.style.zIndex = '-1';
            div.style.pointerEvents = 'none';
            document.body.insertBefore(div, document.body.firstChild);
        }
    }

    async loadParticles() {
        // Only load if tsParticles is available
        if (typeof tsParticles === 'undefined') {
            console.error('tsParticles library not loaded');
            return;
        }

        await tsParticles.load(this.containerId, {
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: ["#00FFDE", "#DC143C", "#ffffff"],
                },
                links: {
                    color: "#00FFDE",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                    triangles: {
                        enable: true,
                        color: "#00FFDE",
                        opacity: 0.05
                    }
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: 0.8,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 1200,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                shape: {
                    type: ["circle", "triangle"],
                },
                size: {
                    value: { min: 1, max: 3 },
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 0.5,
                        sync: false
                    }
                },
            },
            detectRetina: true,
        });

        console.log("Particle System Engine Activated");
    }
}

// Auto Init
window.addEventListener('load', () => {
    // Ensuring tsParticles is loaded first
    const checkEngine = setInterval(() => {
        if (typeof tsParticles !== 'undefined') {
            clearInterval(checkEngine);
            window.AppParticles = new MthishaParticles();
        }
    }, 100);
});
