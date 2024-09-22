import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import Sphere from './sphere.js';

// Cannon world
const world = new CANNON.World();
world.gravity.set(0, 0, 0); // TODO: update gravity and add some functions to sphere for gravity/hover/physics

// Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xefefef, 1);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enablePan = false;
controls.enableZoom = false;

// Lock orbital controls to not go past XY plane
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-6, 3.5, 8);
scene.add(directionalLight);

// Axes helper
/* X is red
   Y is green
   Z is blue */
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add(axesHelper); 

// Sample spheres
const sampleSphere = new Sphere({ sphereText: 'squid'});
sampleSphere.setPosition(0, 0, 0);
sampleSphere.addToView(scene, world);

// Set up raycaster, mouse location, intersected objects, and reference to hovered obj
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects = [];

// Initial Mouse Position
mouse.x = -1000;
mouse.y = -1000;

// Detect mouse movement, change mouse position
function mouseMove(event) {
    mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight) * 2 + 1;
}

// Handle hover behavior
function checkHover() {
    // Update the raycaster with camera and cursor positions
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);

    // If an object is detected to be hovered over
    if (intersects.length > 0) {
        let obj = intersects[0].object;

        // Check if hovered object is a sphere, then tell it to handle hover
        if (obj.userData.instance instanceof Sphere) {
            obj.userData.instance.handleMouseHover(true);
        }
    } else {
        // If not hovered, tell the sphere
        // TODO: currently only works for one sphere. I hate this. I don't want to do it for each sphere, 
        // I would prefer to store all spheres in an array and iterate through them maybe?????
        sampleSphere.handleMouseHover(false);
    }
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.target.set(0, 0, 0); // Ensure the target is always at the center
    controls.update();
}

// Handle click event
function onClick(event) {
    mouseMove(event);

    // Update the ray with camera and cursor positions
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);

    // Check if the sphere was clicked
    if (intersects.length > 0 && intersects[0].object.userData.instance instanceof Sphere) {
        intersects[0].object.userData.instance.handleClick();
    }

}

function render() {
    requestAnimationFrame(render);

    checkHover();

    controls.update();
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', mouseMove);
window.addEventListener('click', onClick, false);

render();