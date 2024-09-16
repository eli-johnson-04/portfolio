import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Sphere from './sphere.js';

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xefefef, 1);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.075);
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

// Set up raycaster, mouse location, intersected objects, and reference to hovered obj
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects = [];

// Detect mouse movement, change mouse position
function mouseMove(event) {
    mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight) * 2 + 1;
}

// Initial Mouse Position
mouse.x = -1000;
mouse.y = -1000;

// Sample sphere
const sampleSphere = new Sphere();
sampleSphere.setPosition(0, 0, 0);
scene.add(sampleSphere.mesh);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enablePan = false;
controls.enableZoom = false;

// Lock orbital controls to not go past XY plane
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;

// Camera position
camera.position.z = 20;

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.target.set(0, 0, 0); // Ensure the target is always at the center
    controls.update();
}

window.addEventListener('resize', onWindowResize, false);

function render() {
    requestAnimationFrame(render);

    // Update the picking ray with the camera and cursor position
    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects(scene.children);

    // If an object is detected to be hovered over
    if (intersects.length > 0) {
        let obj = intersects[0].object;

        // Check if hovered object is a sphere, then tell it to handle hover
        if (obj.userData.instance instanceof Sphere) {
            obj.userData.instance.handleHover(true);
        }
    } else {
        // If not hovered, tell the sphere
        sampleSphere.handleHover(false);
    }

    // Update orbitcontrols
    controls.update();

    renderer.render(scene, camera);
}

window.addEventListener('mousemove', mouseMove);
render();