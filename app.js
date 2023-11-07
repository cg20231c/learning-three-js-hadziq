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
const albedoTexture = textureLoader.load('texture1/albedo.jpg');
const displacementTexture = textureLoader.load('texture1/displacement.jpg');
const normalsTexture = textureLoader.load('texture1/normals.jpg');
const roughnessTexture = textureLoader.load('texture1/roughness.jpg');

// Create cube material with texture
const cubeMaterial = new THREE.MeshPhongMaterial({
    //map: cubeTexture
    color: 0x00ff00
});

// // Create the cube geometry
// const geometry = new THREE.BoxGeometry(2, 2, 2);

// // Create the cube mesh
// const cube = new THREE.Mesh(geometry, cubeMaterial);
// cube.position.x = 0;
// cube.position.y = 2;
// cube.position.z = -2;
// scene.add(cube);

// // Create a doughnut
// const doughnutGeometry = new THREE.TorusGeometry( 1, 0.5, 4, 10 ); 
// const doughnutMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00 } ); 
// const doughnut = new THREE.Mesh( doughnutGeometry, doughnutMaterial ); scene.add( doughnut );
// doughnut.position.x = 0;
// doughnut.position.y = 2;
// doughnut.position.z = -2;

var gltfLoader = new THREE.GLTFLoader();

gltfLoader.load('rektor.glb', function (gltf) {
    var model = gltf.scene;

    // // Create a basic material
    // var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // Green color
    
    // // Traverse the model and apply the material to all Mesh objects
    // model.traverse(function (child) {
    //     if (child instanceof THREE.Mesh) {
    //         child.material = material;
    //     }
    // });

    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});

// Create the floor geometry
const floorGeometry = new THREE.PlaneGeometry(5, 5);

// Create the floor material
const floorMaterial = new THREE.MeshPhongMaterial({
    // color: 0xffff00
    map: albedoTexture,
    displacementMap: displacementTexture,
    normalMap: normalsTexture,
    bumpMap: roughnessTexture
});

// Combine the geometry and mats to create a mesh
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.x = 0;
floor.position.y += 0;
floor.position.z -= 2;
floor.rotation.x = -1.5;
scene.add(floor);

// Set up an ambient light
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// Set up the point light
const pointLight = new THREE.PointLight(0xFFFFFF, 1); // Color and intensity
pointLight.position.set(0, 1.0, 2.0); // Position
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
    // doughnut.rotation.x += 0.01;
    // doughnut.rotation.y += 0.01;
    // doughnut.rotation.z += 0.01;
    
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();