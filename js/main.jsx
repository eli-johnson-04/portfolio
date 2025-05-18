import React from 'react';
import ReactDOM from 'react-dom/client';
import Sphere from './sphere.jsx';
import ProfileContent from './profileContent.jsx';
import markdownLoader from './markdownLoader.jsx';
import SpaceScene from './SpaceScene.js';
import Popup from './Popup.jsx';

const ACTIVITY_PATH = 'activity';
const PORTFOLIO_PATH = 'pf';

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

// Initialize the SpaceScene and start rendering.
const container = document.body;
const spaceWorld = new SpaceScene(container);

// Add touch event listeners for touch interaction.
container.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    const rect = container.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

    spaceWorld.handleInteraction(x, y);
});

container.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    const rect = container.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

    spaceWorld.handleHover(x, y);
});

// container.addEventListener('touchend', () => {
//     spaceWorld.handleInteractionEnd();
// });

// Start rendering the scene immediately.
spaceWorld.render();

// Show the loading screen and start setting up the scene.
setupScene(spaceWorld);

// Render the Popup component.
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<Popup />);