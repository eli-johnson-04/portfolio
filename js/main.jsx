import React from 'react';
import ReactDOM from 'react-dom/client';
import Sphere from './sphere.jsx';
import ProfileContent from './profileContent.jsx';
import markdownLoader from './markdownLoader.jsx';
import SpaceScene from './SpaceScene.js';
import Popup from './Popup.jsx';

const ACTIVITY_PATH = 'activity';
const PORTFOLIO_PATH = 'pf';

const rootEl = document.getElementById('root');

// Create a container DIV for three.js to render into
//const sceneContainer = document.createElement('div');
const sceneContainer = document.body;
sceneContainer.style.width = '100vw';
sceneContainer.style.height = '100vh';
sceneContainer.style.position = 'fixed';
sceneContainer.style.left = '0';
sceneContainer.style.top = '0';
sceneContainer.style.zIndex = '0';
sceneContainer.style.overflow = 'hidden';
sceneContainer.style.touchAction = 'none'; // Important for consistent touch
//rootEl.appendChild(sceneContainer);

// Initialize the SpaceScene.
const spaceWorld = new SpaceScene(sceneContainer);

async function setupScene(spaceWorld) {
    console.log("Setting up the scene...");
    
    await showLoadingScreen();
    
    // Pre-load all sphere content.
    const mdLoader = new markdownLoader();
    mdLoader.importAllMarkdown();
    const convertedMarkdown = await Promise.all([
        mdLoader.getSphereMarkdown(ACTIVITY_PATH),
        mdLoader.getSphereMarkdown(PORTFOLIO_PATH)
    ]);
    const folderLengths = [
        mdLoader.countFilesInFolder(ACTIVITY_PATH),
        mdLoader.countFilesInFolder(PORTFOLIO_PATH)
    ];

    // Create spheres with the loaded content.
    const spheres = [
        new Sphere({
            label: 'Activity',
            hoverText: 'Recent Work and Projects',
            content: convertedMarkdown[0],
            layer: SpaceScene.SCENE_LAYER,
            texturePath: 'textures/Pluto.webp',
        }),
        new Sphere({
            label: 'Portfolio',
            hoverText: 'View Completed Projects',
            content: convertedMarkdown[1],
            layer: SpaceScene.SCENE_LAYER,
            texturePath: 'textures/Callisto-0.webp',
        }),
        new Sphere({
            label: 'Profile',
            hoverText: 'About Me',
            content: <ProfileContent />,
            layer: SpaceScene.SCENE_LAYER,
            texturePath: 'textures/Eris.webp',
        })
    ];

    // Set sphere positions and add them to the scene.
    const scale = 0.87;
    spheres[0].setPosition(-5 * scale, -2 * scale, 0);
    spheres[1].setPosition(5 * scale, -2 * scale, 0);
    spheres[2].setPosition(0, 3 * scale, 2 * scale);

    spheres.forEach(sphere => spaceWorld.addSphere(sphere));

    spaceWorld.initializeParticlesFromMarkdown(folderLengths, spheres);

    await hideLoadingScreen();
}

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

async function hideLoadingScreen() {
    const screen = document.getElementById('loading-screen');
    if (!screen) return;

    // Allow user to click behind loading screen before animation finishes.
    screen.classList.remove('pointer-events-auto');
    screen.classList.add('pointer-events-none');

    // Start fade-out transition.
    screen.classList.remove('opacity-100');
    screen.classList.add('opacity-0');

    // Wait for fade-out to complete and delete the screen.
    await new Promise(r => setTimeout(r, 1500));
    if (screen.parentNode) {
        screen.parentNode.removeChild(screen);
    }
}

// Input normalization between pointer and touch events for mobile compatibility.
function getInteractionCoords(event, container) {
    let clientX, clientY;
    if (event.touches && event.touches.length) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }
    const rect = container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;
    return { x, y };
}

function handleTouchStart(event) {
    event.preventDefault();
    const { x, y } = getInteractionCoords(event, sceneContainer);
    spaceWorld.handleTouchInteraction(x, y, event);
}

class eventTypeAndCoords {
    constructor(event) {
        this.type = event.type;
        const { x, y } = getInteractionCoords(event, sceneContainer);
        this.x = x;
        this.y = y;
    }

    areSameCoords(x, y) { return this.x === x && this.y === y; }
}

let lastEvent = null;

function handleInteraction(event) {
    if (lastEvent && lastEvent.type != event.type && lastEvent.areSameCoords(getInteractionCoords(event, sceneContainer))) {
        // TODO: figure out some way to trigger only a touch event if a touch event is preceded by a pointer event, like when testing on desktop!
    }
    if (event.type == "pointerdown") {
        spaceWorld.handlePointerInteraction(event);
    } else if (event.type == "touchstart") {
        event.preventDefault();
        const { x, y } = getInteractionCoords(event, sceneContainer);
        spaceWorld.handleTouchInteraction(x, y, event);
    }
    lastEvent = eventTypeAndCoords(event);
}

// Use pointer events for desktop and touch events for mobile
sceneContainer.addEventListener('pointerdown', (event) => spaceWorld.handlePointerInteraction(event), { passive: false });
sceneContainer.addEventListener('touchstart', (event) => handleTouchStart(event), { passive: false });

// Start rendering the scene immediately.
spaceWorld.render();

// Show the loading screen and start setting up the scene.
setupScene(spaceWorld);

// Render the Popup component after the scene is set up.
ReactDOM.createRoot(rootEl).render(<Popup />);