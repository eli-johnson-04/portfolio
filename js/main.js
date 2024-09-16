import * as THREE from 'three';
import { gsap } from 'gsap';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Circle from './circle.js';
import Sphere from './sphere.js';

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xe8e8e8, 0);
document.body.appendChild(renderer.domElement);

// Axes helper
/* X is red
   Y is green
   Z is blue */
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(axesHelper); 

// Sample circle
/* const activityCircle = new Circle();
activityCircle.setPosition(0, 0, 0);
scene.add(activityCircle.mesh);
 */

// Sample sphere
const sampleSphere = new Sphere({ wireframe: true });
sampleSphere.setPosition(0, 0, 0);
scene.add(sampleSphere.mesh);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.25; // Damping factor
controls.enablePan = false;

// Camera positioning
camera.position.z = 20;

function animate() {
    requestAnimationFrame(animate);

    // Animate the circles
    //sampleSphere.animate();

    renderer.render(scene, camera);
}

animate();