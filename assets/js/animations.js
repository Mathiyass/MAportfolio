document.addEventListener('DOMContentLoaded', function () {
    // Three.js 3D Background - Enhanced to Geometric Shapes / Neural Network vibe
    if (typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        const container = document.getElementById('three-js-container');
        if (container) {
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Create a group for the objects
            const group = new THREE.Group();
            scene.add(group);

            // Create multiple icosahedrons
            const geometry = new THREE.IcosahedronGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00FFDE,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });

            // Add scattered geometric shapes
            for (let i = 0; i < 20; i++) {
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = (Math.random() - 0.5) * 20;
                mesh.position.y = (Math.random() - 0.5) * 20;
                mesh.position.z = (Math.random() - 0.5) * 10;
                mesh.rotation.x = Math.random() * Math.PI;
                mesh.rotation.y = Math.random() * Math.PI;
                const scale = Math.random();
                mesh.scale.set(scale, scale, scale);
                group.add(mesh);
            }

            // Add a central larger shape
            const mainGeometry = new THREE.IcosahedronGeometry(2, 2);
            const mainMaterial = new THREE.MeshBasicMaterial({
                color: 0xFF3366,
                wireframe: true,
                transparent: true,
                opacity: 0.15
            });
            const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
            group.add(mainMesh);

            camera.position.z = 10;

            // Mouse interaction
            let mouseX = 0;
            let mouseY = 0;
            let targetX = 0;
            let targetY = 0;

            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;

            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX - windowHalfX);
                mouseY = (event.clientY - windowHalfY);
            });

            function animate() {
                requestAnimationFrame(animate);

                targetX = mouseX * 0.001;
                targetY = mouseY * 0.001;

                group.rotation.y += 0.05 * (targetX - group.rotation.y);
                group.rotation.x += 0.05 * (targetY - group.rotation.x);

                // Continuous slow rotation
                group.rotation.z += 0.001;

                // Pulse effect for individual meshes
                group.children.forEach((child, i) => {
                    child.rotation.x += 0.005 * (i % 2 === 0 ? 1 : -1);
                    child.rotation.y += 0.005;
                });

                renderer.render(scene, camera);
            }
            animate();

            window.addEventListener('resize', () => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            });
        }
    }

    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#00FFDE", "#FF3366", "#FF10F0"]
                },
                "shape": {
                    "type": ["circle", "triangle"],
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00FFDE",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Typed.js Animation
    if (typeof Typed !== 'undefined' && document.getElementById('typing-text')) {
        const options = {
            strings: [
                "Software Engineering Student.",
                "Full Stack Developer.",
                "Tech Enthusiast.",
                "Problem Solver.",
                "Innovation Seeker.",
                "Creative Coder."
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        };
        const typed = new Typed('#typing-text', options);
    }

    // Glitch Effect Trigger
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        setInterval(() => {
            glitchElement.classList.toggle('glitch-active');
        }, Math.random() * 3000 + 2000);
    }

    // Parallax Scrolling - Refined
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        requestAnimationFrame(() => {
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax'));
                const yPos = -(scrolled * speed);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    });

    // Reveal on Scroll (Custom, in addition to AOS)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});
