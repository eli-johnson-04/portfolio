import * as THREE from 'three';
import { gsap } from 'gsap';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Circle from './circle.js';

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create circle
const activityCircle = new Circle();
activityCircle.setPosition(0, 0, 0);
scene.add(activityCircle.mesh);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.25; // Damping factor

// Camera positioning
camera.position.z = 20;

function animate() {
    requestAnimationFrame(animate);

    // Animate the circles
    activityCircle.animate();

    renderer.render(scene, camera);
}

animate();