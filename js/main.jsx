import ReactDOM from 'react-dom/client';
import Sphere from './sphere.jsx';
import ProfileContent from './profileContent.jsx';
import markdownLoader from './markdownLoader.jsx';
import SpaceScene from './SpaceScene.js';
import Popup from './Popup.jsx';

const ACTIVITY_PATH = 'activity';
const PORTFOLIO_PATH = 'pf';

//const rootEl = document.getElementById('root');
const rootEl = document.createElement('div');

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
sceneContainer.style.touchAction = 'none';

// Initialize the SpaceScene.
const spaceWorld = new SpaceScene(sceneContainer);
document.body.appendChild(rootEl);


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

    // Create spheres with the loaded content.
    const spheres = [
        new Sphere({
            label: 'Activity',
            hoverText: 'Latest: ' + mdLoader.getLastPostDate(ACTIVITY_PATH),
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
            hoverText: 'Learn About Me',
            content: <ProfileContent markdown={await mdLoader.getSkillsMarkdown()}/>,
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

    spaceWorld.initializeParticlesFromMarkdown(
        [
            mdLoader.countFilesInFolder(ACTIVITY_PATH),
            mdLoader.countFilesInFolder(PORTFOLIO_PATH)
        ], 
        spheres
    );

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


let lastEvent = null;
let isTouchEvent = false;
const firstEvents = [];

// Set a short timer to wait for the last first event to occur, since touchstarts often (always?????) seem to be preceded by pointerdowns.
// I know it's bad, you know it's bad. its horrible but it works and we can throw a party when its gone.
async function waitForFirstEvent(event) {
    firstEvents.push(event.type);
    if (firstEvents.length <= 1) await new Promise(r => setTimeout(r, 10));
    else isTouchEvent = true;
    return;
}

async function handleInteraction(event) {
    // Properly handle the first event to set a precedent.
    if (!lastEvent) {
        await waitForFirstEvent(event);
        if (isTouchEvent && event.type != "touchstart") return;
        lastEvent = event;
    }
    if (lastEvent.type != event.type) {
        //console.log("Interaction modality changed from " + lastEvent.type + " to " + event.type + ". Interactions in new modality may cause unexpected behavior. To use " + event.type + " interactions, please refresh the page.");
        return;
    }
    if (event.target.localName == "canvas") event.preventDefault();
    switch (event.type) {
        case "pointerdown":
            spaceWorld.onInteractorMove(event);
            spaceWorld.handleInteraction();
            break;
        case "touchstart":
            spaceWorld.handleTouchInteraction(event);
            break;
    }
    return;
}

// Use pointer events for desktop and touch events for mobile
sceneContainer.addEventListener('pointerdown', handleInteraction, { passive: false });
sceneContainer.addEventListener('touchstart', handleInteraction, { passive: false });

// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function startTextHideTimer(event) {
//     sceneContainer.showTextSpheres();
//     await delay(10000);
//     sceneContainer.hideTextSpheres();
// }

// Start rendering the scene immediately.
spaceWorld.render();

// Show the loading screen and start setting up the scene.
setupScene(spaceWorld);

// Render the Popup component after the scene is set up.
ReactDOM.createRoot(rootEl).render(<Popup />);