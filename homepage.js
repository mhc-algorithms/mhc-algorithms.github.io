// Setting up the scene, camera, and renderer with transparent background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enabling alpha for transparency
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Setting clear color to black but fully transparent
document.body.appendChild(renderer.domElement);

// Adding a torus knot with Phong material for shiny surface
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshPhongMaterial({ color: 0x3498db, specular: 0xffffff, shininess: 100 });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Setting the camera position
camera.position.z = 50;

// Adding lights
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Enabling shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
torusKnot.castShadow = true;
torusKnot.receiveShadow = true;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
