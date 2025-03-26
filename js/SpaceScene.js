import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SkyDome from './SkyDome.js';

export default class SpaceScene {
    static SCENE_LAYER = 0;
    static SKYDOME_LAYER = 1;

    constructor(container) {
        this.container = container;

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.layers.set(SpaceScene.SCENE_LAYER);

        // World setup
        this.world = new CANNON.World();
        this.world.gravity.set(0, 0, 0);

        // Spheres container
        this.spheres = [];

        // SkyDome setup
        this.skyDome = SkyDome.getInstance();
        this.skyDome.skyDomeMesh.layers.set(SpaceScene.SKYDOME_LAYER);
        this.scene.add(this.skyDome.skyDomeMesh);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.layers.enable(SpaceScene.SKYDOME_LAYER);
        this.camera.position.z = 15;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        // Controls setup
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.keyPanSpeed = 15;
        this.controls.listenToKeyEvents(window);
        this.controls.enableZoom = false;
        this.controls.minAzimuthAngle = -Math.PI / 2;
        this.controls.maxAzimuthAngle = Math.PI / 2;

        // Raycaster setup
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(-1000, -1000);

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-6, 3.5, 8);
        this.scene.add(directionalLight);

        // Event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('click', this.onClick.bind(this));
    }

    addSphere(sphere) {
        this.spheres.push(sphere);
        sphere.addToView(this.scene, this.world);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onClick(event) {
        // Detect if a sphere or a child of a sphere was clicked. If so, call handleClick on the sphere.
        this.onMouseMove(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            let obj = intersects[0].object;
            while (obj.parent && !(obj.parent instanceof THREE.Scene)) obj = obj.parent;

            if (obj.userData.instance) {
                const sphere = obj.userData.instance;
                const cameraPos = new THREE.Vector3();

                this.camera.getWorldPosition(cameraPos);
                const spherePos = new THREE.Vector3();
                sphere._mesh.getWorldPosition(spherePos);

                const cameraDist = cameraPos.distanceTo(spherePos);
                sphere.handleClick(cameraDist);
            }
        }
    }

    checkHover() {
        // Check if the mouse is hovering over a sphere. If so, call handleMouseHover.
        this.raycaster.layers.set(SpaceScene.SCENE_LAYER);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const obj = intersects[0].object;
            if (obj.userData.instance) {
                const sphere = obj.userData.instance;
                this.spheres.forEach(s => s.handleMouseHover(s === sphere));
            }

        } else
            this.spheres.forEach(s => s.handleMouseHover(false));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
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

        this.checkHover();
        this.controls.update();
        SkyDome.updateClock();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}