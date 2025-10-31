document.addEventListener('DOMContentLoaded', function () {
    // Three.js 3D Background
    if (typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('three-js-container').appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffde, wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });
    }

    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 250,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00FFDE"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.8,
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
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 2,
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
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 100,
                        "size": 5,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });

        const pJS = window.pJSDom[0].pJS;
        document.body.addEventListener('mousemove', function (e) {
            pJS.interactivity.mouse.pos_x = e.clientX;
            pJS.interactivity.mouse.pos_y = e.clientY;
        });
    }

    // Typed.js Animation
    if (typeof Typed !== 'undefined') {
        const options = {
            strings: [
                "Software Engineering Student.",
                "Full Stack Developer.",
                "Tech Enthusiast.",
                "Problem Solver.",
                "Innovation Seeker."
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
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
        }, Math.random() * 4000 + 1000);
    }

    // Parallax Scrolling
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax'));
            const yPos = -(window.pageYOffset * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
});
