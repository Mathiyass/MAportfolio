if (typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true // allows for transparent background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent background

    // Ensure the canvas is inserted at the very beginning of the body
    if (document.body.firstChild) {
        document.body.insertBefore(renderer.domElement, document.body.firstChild);
    } else {
        document.body.appendChild(renderer.domElement);
    }

    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';


    const starCount = 5000;
    const vertices = [];
    for (let i = 0; i < starCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000); // spread stars across a 2000x2000 area
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x888888,
        size: 0.7,
        transparent: true,
        opacity: 0.8
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    camera.position.z = 1; // Start closer to the scene

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });


    function animate() {
        requestAnimationFrame(animate);

        // Star rotation
        stars.rotation.x += 0.0001;
        stars.rotation.y += 0.0001;

        // Camera parallax effect based on mouse position
        camera.position.x += ((mouseX - window.innerWidth / 2) * 0.0001 - camera.position.x) * 0.02;
        camera.position.y += ((-(mouseY - window.innerHeight / 2) * 0.0001) - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

} else {
    console.warn("Three.js is not loaded. Skipping WebGL background.");
}
