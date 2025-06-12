import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Sphere from './sphere.jsx';
import SkyDome from './SkyDome.js';
import ParticleSystem from './ParticleSystem.js';

// Contains the main scene and the camera. 
export default class SpaceScene {
    static SCENE_LAYER = 0;
    static SKYDOME_LAYER = 1;

    constructor(container) {
        this.container = container;

        // Scene setup.
        this.scene = new THREE.Scene();
        this.scene.layers.set(SpaceScene.SCENE_LAYER);

        // Camera setup.
        this.camera = new THREE.PerspectiveCamera(
            75, 
            container.clientWidth / container.clientHeight, 
            0.1, 
            1000
        );
        this.camera.layers.enable(SpaceScene.SKYDOME_LAYER);
        this.camera.position.set(0, 0, 10);

        // Renderer setup.
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setClearColor(0x000000);
        this.renderer.shadowMap.enabled = true; 
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows
        this.container.appendChild(this.renderer.domElement);

        // Spheres container.
        this.spheres = [];

        // SkyDome setup.
        this.skyDome = SkyDome.getInstance();
        this.skyDome.skyDomeMesh.layers.set(SpaceScene.SKYDOME_LAYER);
        this.scene.add(this.skyDome.skyDomeMesh);

        // Controls setup.
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.keyPanSpeed = 15;
        //this.controls.listenToKeyEvents(window);
        this.controls.enableZoom = false;
        this.controls.minAzimuthAngle = -Math.PI / 2;
        this.controls.maxAzimuthAngle = Math.PI / 2;

        // Raycaster setup.
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(-1000, -1000);

        // Lighting setup.
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-6, 3.5, 8);
        directionalLight.castShadow = true; // Enable shadow casting
        directionalLight.shadow.mapSize.width = 1024; // Optional: Adjust shadow quality
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        this.scene.add(directionalLight);

        // Initialize the particle system.
        this.particleSystem = new ParticleSystem(this.scene);

        // Track the last hovered sphere.
        this.hoveredMesh = null;

        // Event listeners.
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.container.addEventListener('mousemove', this.onInteractorMove.bind(this));
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        this.controls.update();
    }

    addSphere(sphere) {
        this.spheres.push(sphere);
        this.scene.add(sphere.getMesh());
        //this.addBoundary(sphere);
    }

    addBoundary(sphere) {
        const boundary = sphere.createBoundaryVisualization();
        boundary.layers.set(SpaceScene.SKYDOME_LAYER);
        this.scene.add(boundary);
    }

    initializeParticlesFromMarkdown(folderLengths, spheres) {
        this.particleSystem.initializeFromMarkdown(folderLengths, spheres);
    }

    updateParticles() {
        this.particleSystem.update();
    }

    onInteractorMove(event) {
        const cX = event.touches ? event.touches[0].clientX : event.clientX;
        const cY = event.touches ? event.touches[0].clientY : event.clientY;
        this.mouse.x = (cX / this.container.clientWidth) * 2 - 1;
        this.mouse.y = -(cY / this.container.clientHeight) * 2 + 1;
        this.checkHover();
    }

    checkHover() {
        if (this.spheres.length === 0) return;
        // Check if the mouse is hovering over a sphere.
        this.raycaster.layers.set(SpaceScene.SCENE_LAYER)
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        // If an object is detected to be hovered over
        if (intersects.length > 0) {
            const obj = intersects[0].object;

            if (Sphere.isSphere(obj)) {
                // If there is a modal open, no spheres should be hoverable.
                let modalOpen = false;
                this.spheres.forEach(s => {
                    if (s.isModalOpen()) {
                        modalOpen = true;
                        return;
                    }
                });
                // Only enable hovering if no modal is open. 
                console.log("modalOpen: ", modalOpen);
                if (!modalOpen) 
                {
                    this.spheres.forEach(s => {
                        if (s.getInstance() === obj.userData?.instance) {
                                this.hoveredMesh = s.getMesh();
                                s.setHover();
                        } else {
                            s.setShrink();
                        }
                    });
                }

                // if (!modalOpen) { 
                //     this.hoveredMesh = obj;
                //     obj.userData.instance.setHover(); 
                // }

                // // Cancel the hover of any other hovered spheres.
                // this.spheres.forEach(s => {
                //     if (s.getInstance() !== obj.userData.instance)
                //         s.setShrink();
                // });
            }
        } else {
            // If not hovered, tell the spheres.
            this.hoveredMesh = null;
            this.spheres.forEach(s => { if (!s.isModalOpen()) s.setShrink(); } );
        }
    }

    // Handle the case that a sphere was clicked or tapped.
    handleInteraction() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        // If the mouse is intersecting with something
        if (intersects.length > 0) {
            let obj = intersects[0].object;

            // Check if the clicked object is a child of a sphere and get a reference to the parent sphere.
            // This is necessary because spheres have separate spheres for the label, hover text, and the sphere itself.
            while (obj.parent && !(obj.parent instanceof THREE.Scene)) obj = obj.parent;

            // Check if a sphere was clicked and handle the click.
            if (Sphere.isSphere(obj)) obj.userData.instance.setClick();
        }
    }

    // Handle the case that a sphere was tapped, not clicked with a mouse. The behavior is basically the same but who cares.
    handleTouchInteraction(event) {
        // Set the mouse position and handle the hover check. 
        const lastHovered = this.hoveredMesh ? this.hoveredMesh : null;
        this.onInteractorMove(event);

        // If the same sphere is tapped twice, consider it clicked. 
        if (this.hoveredMesh && this.hoveredMesh === lastHovered)
            this.handleInteraction();
    }

    render() {
        // Make the label and hover text meshes look at the camera. 
        const cameraPos = this.camera.getWorldPosition(new THREE.Vector3());
        this.spheres.forEach(s => s.update(cameraPos));

        this.updateParticles();
        this.controls.update();
        SkyDome.updateClock();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}