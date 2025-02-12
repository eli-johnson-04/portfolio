import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import Sphere from './sphere.jsx';
import ContentFeed from './contentFeed.jsx';
import React from 'react';
import { gsap } from 'gsap';
import { showPopup, hidePopup } from './popup.js';
import ProfileContent from './profileContent.jsx';
//import { GUI } from 'dat.gui';

const ACTIVITY_PATH = 'activity';
const PORTFOLIO_PATH = 'pf';

// Set up Cannon world. 
const world = new CANNON.World();
world.gravity.set(0, 0, 0); // TODO: update gravity and add some functions to sphere for gravity/hover/physics

// Set up scene and camera.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xefefef, 1);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// OrbitControls setup. 
const controls = new OrbitControls(camera, renderer.domElement);
//controls.enabled = false;
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.keyPanSpeed = 15;
controls.listenToKeyEvents(window);
controls.enableZoom = false;


// Lock orbital controls to not go past XY plane.
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;

// Set up lighting. 
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

// dat GUI
// const gui = new GUI();
// const sphereFolder = gui.addFolder('Sphere');
// sphereFolder.add(sampleSphere.mesh.material, 'opacity', 0, 1);
// sphereFolder.open();
// const cameraFolder = gui.addFolder('Camera');
// cameraFolder.add(camera.position, 'z', 0, 10);
// cameraFolder.open();

// Set up raycaster, mouse location, intersected objects, and reference to hovered object.
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects = [];

// Initial Mouse Position
mouse.x = -1000;
mouse.y = -1000;


let ready = false;
async function waitForApproval() {
    while (!ready) {}
}

// Import all markdown content.
const allContent = import.meta.glob('/*/*.md', { query: '?raw', import: 'default' });
console.log("Finished importing markdown files.")

// Helper function that gets a specific set of markdown content. 
async function makeFeed(folder) {
    // Filter out the specified content. 
    const entries = Object.entries(allContent)
        .filter(([path]) => path.includes(`/${folder}/`))
        .map(([path, entry]) => {
            const id = path.split(`/${folder}/`)[1].replace('.md', '');
            return { path, id }; 
        });

    // Resolve the content of all markdown files. 
    const contentPromises = entries.map(async (entry) => {
        const md = await allContent[entry.path](); // Resolves the markdown content
        return { ...entry, md }; // Merge the content with the other data
    });
    
    // Wait for all the content to be loaded. 
    const resolvedContent = await Promise.all(contentPromises);
    return <ContentFeed data={resolvedContent}/>;
}

// Get the loading screen and make it visible, then change the fade-out time. 
async function showLoadingScreen() {
    const screen = document.getElementById('loading-screen');

    // Start fade-in transition. 
    screen.classList.remove('opacity-0');
    screen.classList.add('opacity-100');
    
    // Wait for fade-in to complete. 
    await new Promise(r => setTimeout(r, 500));

    // Extend fade-out transition length. 
    screen.classList.remove('duration-500');
    screen.classList.add('duration-[1500ms]');
}

// Get the loading screen and hide it, but make it clickable through it. Then remove the screen. 
async function hideLoadingScreen() {
    const screen = document.getElementById('loading-screen');

    // Allow user to click behind loading screen before animation finishes. 
    screen.classList.remove('pointer-events-auto');
    screen.classList.add('pointer-events-none');

    // Start fade-out transition. 
    screen.classList.remove('opacity-100');
    screen.classList.add('opacity-0');

    // Wait for fade-out to complete and delete the screen. 
    await new Promise(r => setTimeout(r, 1500));
    screen.parentNode.removeChild(screen);
}

// Created spheres are stored in an array. 
var spheres = [];

// Import data and set up all visible objects. 
async function setupScene(scene, world, sphereList) {    
    console.log("Setting up the scene...")

    await showLoadingScreen();
    
    // Pre-load all sphere content. 
    const sphereData = await Promise.all([
        makeFeed(ACTIVITY_PATH),
        makeFeed(PORTFOLIO_PATH)
    ]);

    // Create spheres with the loaded content. 
    sphereList.push(new Sphere({
        label: 'Activity',
        hoverText: 'Recent Work and Projects',
        content: sphereData[0]
    }));
    sphereList.push(new Sphere({
        label: 'Portfolio',
        hoverText: 'View Completed Projects',
        content: sphereData[1]
    }));
    sphereList.push(new Sphere({
        label: 'Profile',
        hoverText: 'About Me',
        content: <ProfileContent/>
    }))

    // Set sphere positions and add them to the scene. 
    sphereList[0].setPosition(-5, -2, 0);
    sphereList[1].setPosition(5, -2, 0);
    sphereList[2].setPosition(0, 3, 2);

    sphereList.forEach((sphere) => sphere.addToView(scene, world));
    await new Promise(r => setTimeout(r, 1000));

    console.log("Scene setup complete.");

    await hideLoadingScreen();
    await new Promise(r => setTimeout(r, 150));
    showPopup();
}




// Detect mouse movement, change mouse position.
function mouseMove(event) {
    mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight) * 2 + 1;
}

// Handle hover behavior.
function checkHover() {
    // Update the raycaster with camera and cursor positions.
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);

    // If an object is detected to be hovered over.
    if (intersects.length > 0) {
        let obj = intersects[0].object;

        // Check if hovered object is a sphere, then tell it to handle the hover.
        if (obj.userData.instance instanceof Sphere) {
            // If there is a modal open, no spheres should be hoverable. 
            let modalOpen = false;
            spheres.forEach((sphere) => {
                if (sphere._isModalOpen) {
                    modalOpen = true;
                    return;
                }
            });

            // Only enable hovering if no modal is open. 
            if (!modalOpen) {obj.userData.instance.handleMouseHover(true); }

            // Cancel the hover of any other hovered spheres. 
            spheres.forEach((sphere) => {
                if (!(sphere === obj.userData.instance)) {
                    sphere.handleMouseHover(false);
                }
            })
        }
    } else {
        // If not hovered, tell the spheres.
        spheres.forEach((sphere) => {sphere.handleMouseHover(false)});
    }
}

// Handle window resize.
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.target.set(0, 0, 0); // Ensure the target is always at the center
    controls.update();
}

// Handle click events.
function onClick(event) {
    mouseMove(event);

    // Upodate the ray with camera and cursor positions.
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);

    // If something is clicked
    if (intersects.length > 0) {
        let obj = intersects[0].object;

        // Check if a sphere was clicked, and handle the click
        if (obj.userData.instance instanceof Sphere) {
            // The sphere's scale will be set to the distance between the camera and the sphere. 
            const cameraPos = new THREE.Vector3();
            camera.getWorldPosition(cameraPos);

            const spherePos = new THREE.Vector3();
            obj.userData.instance._mesh.getWorldPosition(spherePos);

            const cameraDist = cameraPos.distanceTo(spherePos);
            obj.userData.instance.handleClick(cameraDist); 
        }
    }
}

// Core rendering loop. 
function render() {
    // Make all the spheres face the camera!
    const cameraPos = camera.getWorldPosition(new THREE.Vector3());
    spheres.forEach((sphere) => {
        // Calculate the direction to the camera.
        // TODO: make the text stay horizontal, certain plane always faces user???
        const spherePos = sphere._mesh.getWorldPosition(new THREE.Vector3());

        // Define a fixed "up" vector to keep the text horizontal.
        const up = new THREE.Vector3(0, 1, 0);

        // Create a matrix to orient the sphere toward the camera while maintaining "up".
        const lookAtMatrix = new THREE.Matrix4();
        lookAtMatrix.lookAt(cameraPos, spherePos, up);

        // Extract the quaternion from the matrix.
        const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);

        // Use GSAP to smoothly interpolate the sphere's quaternion rotation to the target rotation.
        gsap.to(sphere._mesh.quaternion, {
            x: targetQuaternion.x,
            y: targetQuaternion.y,
            z: targetQuaternion.z,
            w: targetQuaternion.w,
            duration: 0.08, // Smoothness
            ease: "expo-in", 
            overwrite: "auto" 
        });
    });

    requestAnimationFrame(render);

    checkHover();
    controls.update();
    renderer.render(scene, camera);
}

setupScene(scene, world, spheres);

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', mouseMove);
window.addEventListener('click', onClick, false);

render();