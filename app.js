// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

// Create a WebGLRenderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the texture
const textureLoader = new THREE.TextureLoader();
const cubeTexture = textureLoader.load('texture1/albedo.jpg');

// Create cube material with texture
const cubeMaterial = new THREE.MeshPhongMaterial({
    //map: cubeTexture
    color: 0x00ff00
});

// Create the cube geometry
const geometry = new THREE.BoxGeometry(2, 2, 2);

// Create the cube mesh
const cube = new THREE.Mesh(geometry, cubeMaterial);
cube.position.x = 0;
cube.position.y = 2;
cube.position.z = -2;
scene.add(cube);

// Create the floor geometry
const floorGeometry = new THREE.PlaneGeometry(20, 20);

// Create the floor material
const floorMaterial = new THREE.MeshLambertMaterial({
    color: 0xffff00
});

//yellow mats
const yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

//plane geometry
const planeGeometry = new THREE.PlaneGeometry(5, 5);

// Combine the geometry and mats to create a mesh
const plane = new THREE.Mesh(planeGeometry, yellowMaterial);
plane.position.x = 0;
plane.position.y += 0;
plane.position.z -= 2;
plane.rotation.x = -1.5;
scene.add(plane);

// Set up the point light
const pointLight = new THREE.PointLight(0xFFFFFF, 1); // Color and intensity
pointLight.position.set(0, 2.5, 2.5); // Position
scene.add(pointLight);

// Handle resize events
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Render loop
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();