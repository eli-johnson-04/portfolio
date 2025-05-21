import * as THREE from 'three';
import * as CANNON from 'cannon-es';
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

        // World setup.
        this.world = new CANNON.World();
        this.world.gravity.set(0, 0, 0);

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
        this.hoveredSphere = null;

        // Event listeners.
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
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
        sphere.addToView(this.scene, this.world);
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

    checkHover() {
        
    }

    handlePointerMove(x, y, event) {
        if (arguments.length)
        // Raycast for hover
        this.mouse.set(x, y);
        this.raycaster.setFromCamera(this.spheres);
        if (intersects.length) {
            const sphere = intersects[0].object.userData.instance;

            // If hovering on a different sphere, reset the previous one and hover the new one.
            if (sphere !== this.hoveredSphere) {
                if (this.hoveredSphere) {
                    this.hoveredSphere.handlePointerHover(false);
                }
                this.hoveredSphere = sphere;
                this.hoveredSphere.handlePointerHover(true);
            }
            this.container.style.cursor = 'pointer';
        } else {
            if (this.hoveredSphere) {
                this.hoveredSphere.handlePointerHover(false);
                this.hoveredSphere = null;
            }
            this.container.style.cursor = '';
        }
    }

    handlePointerUp(x, y, event) {
        // Raycast to see if a sphere was "clicked/tapped"
        this.mouse.set(x, y);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.spheres);
        if (intersects.length) {
            const sphere = intersects[0].object.userData.instance;
            alert('you clicked sphere buddy');
        }
    }

    // Called from main.jsx for both pointer and touch
    handlePointerOrTouch(x, y) {
        this.mouse.set(x, y);
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.spheres, false);
        if (intersects.length > 0) {

        }
    }

    handleTouchInteraction(x, y) {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.spheres.map(s => s._mesh));
        if (intersects.length > 0) {
            const sphere = intersects[0].object.userData.instance;
            if (sphere.handleTouchHover) return obj.userData.instance;
        }
        return null;
    }

    render() {
        // Make the label and hover text meshes look at the camera. 
        const cameraPos = this.camera.getWorldPosition(new THREE.Vector3());
        this.spheres.forEach(sphere => {
            sphere.updateHover(performance.now() / 1000);

            if (sphere._labelMesh && sphere._hoverTextMesh) {
                sphere._labelMesh.lookAt(cameraPos);
                sphere._hoverTextMesh.lookAt(cameraPos);
            }
        });

        this.handlePointerMove();
        this.updateParticles();
        this.controls.update();
        SkyDome.updateClock();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}