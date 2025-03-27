import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as CANNON from 'cannon-es';
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import SphereModal from './sphereModal.jsx';
import { createNoise3D } from 'simplex-noise';

const DEFAULT_SPHERE_RADIUS = 3;
const DEFAULT_SPHERE_SEGMENTS = 32;
const DEFAULT_SPHERE_COLOR = 0xe8e8f0;
const DEFAULT_SPHERE_MASS = 1;
const TEXT_COLOR = 0x97979c;
const TEXT_SIZE = 0.5;
const RADIUS_OFFSET = 0.01;
const TEXT_OFFSET = 0.05;

const DEFAULT_SPHERE_OPACITY = 0.6;
const TEXT_LAYER = 2;

// Create the custom swell ease. 
gsap.registerPlugin(CustomEase);
CustomEase.create(
    "swell", 
    "M0,0 C0,0 0.039,-0.121 0.096,-0.121 0.236,-0.121 0.279,0.504 0.319,0.634 0.333,0.681 0.376,0.8 0.46,0.833 0.671,0.914 0.686,1.1 0.686,1.1 0.686,1.006 1,1 1,1 "
);
Modal.setAppElement('#root');

// Initialize SimplexNoise instance.
const simplex3D = createNoise3D(Math.random);

export default class Sphere {
    // Static members to improve performance. 
    static #font = null;

    constructor({
            label = 'Default Sphere',
            hoverText = 'Default Hover Text', 
            radius = DEFAULT_SPHERE_RADIUS, 
            segments = DEFAULT_SPHERE_SEGMENTS, 
            color = DEFAULT_SPHERE_COLOR, 
            wireframe = false ,
            content = null,
            layer = null,
            texturePath = null,
            } = {}) {

        this._content = content;
        this._label = label;
        this._hoverText = hoverText;
        
        // ---------------------THREE.JS OBJECT SETUP---------------------
        this._geometry = new THREE.SphereGeometry(radius, segments);
        const loader = new THREE.TextureLoader();
        this._material = new THREE.MeshPhysicalMaterial({ 
            color: color, 
            wireframe: wireframe, 
            transparent: false,
            opacity: DEFAULT_SPHERE_OPACITY,
            roughness: 0.35, 
            metalness: 0.1,
            clearcoat: 0.3,
            clearcoatRoughness: 0.8,
            map: (texturePath) ? loader.load(texturePath) : null,
            //normalMap: (texturePath) ? loader.load(texturePath) : null,
            });
        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this._mesh.userData = { instance: this };
        this._mesh.receiveShadow = true;
        if (layer) this._mesh.layers.set(layer);

        // Store the current position of the sphere. 
        this._mesh.position.set(0, 0, 0);
        this._position = this._mesh.position;      

        // ----------------------FONT LOADING----------------------------
        // Only load the font if it has not been loaded yet. 
        if (!Sphere.#font) {
            const loader = new FontLoader();
            loader.load('./fonts/gentilis_regular.typeface.json', (font) => {
                Sphere.#font = font;
                this.onFontLoaded(font);
            });
        }
        else this.onFontLoaded(Sphere.#font);

        // ---------------------CANNON.JS OBJECT SETUP---------------------
        this._cannonSphere = new CANNON.Sphere(radius);
        this._cannonBody = new CANNON.Body({ mass: DEFAULT_SPHERE_MASS, shape: this._cannonSphere });
        this._cannonBody.type = CANNON.Body.KINEMATIC;

        // Random offsets for noise generation. This will be used in the sphere's hovering effect.
        this._noiseOffsets = {
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            z: Math.random() * 1000
        };

        this._noiseScale = 0.002; // Controls the intensity of sphere movement
        this._noiseSpeed = 0.3; // Controls the speed of sphere movement

        // Track hover state.
        this._mouseHovered = false;

        // ---------------------MODAL SETUP---------------------
        // I hate JavaScript. 
        this._modal = () => (
            <SphereModal
                isOpen={this._isModalOpen}
                onRequestClose={() => this.closeModal()}
                label={this._label}
                content={this._content}
            />
        );

        // Create a div for the modal.
        this._modalRoot = document.createElement('div');
        this._modalRoot.id = `modal-root-${this.id}`;
        document.body.appendChild(this._modalRoot);

        // Initialize modal's state to false.
        this._isModalOpen = false;

        // Bind the openModal method to the sphere.
        this._mesh.userData.openModal = this.openModal.bind(this);

        // Create the root for this sphere's modal.
        this._root = createRoot(this._modalRoot);
        
        // Only render the modal once.
        this.renderModal();
    }

    onFontLoaded(font) {
         // Create geometries for sphere texts.
        const labelTextGeometry = this.createTextGeometry(this._label, font);
        const hoverTextGeometry = this.createTextGeometry(this.truncateText(this._hoverText, font, 4), font);

        // Center and wrap the text geometry. 
        this.centerAndWrapToSphere(hoverTextGeometry);
        this.centerAndWrapToSphere(labelTextGeometry);
        
        // Construct the new text to be drawn onto the sphere.
        const labelTextMaterial = new THREE.MeshBasicMaterial({ color: TEXT_COLOR, transparent: true, opacity: 1 });
        const hoverTextMaterial = new THREE.MeshBasicMaterial({ color: TEXT_COLOR, transparent: true, opacity: 0 });

        // Construct the text to be drawn onto the sphere.
        const labelTextMesh = new THREE.Mesh(labelTextGeometry, labelTextMaterial);
        const hoverTextMesh = new THREE.Mesh(hoverTextGeometry, hoverTextMaterial);

        // Set position to prevent clipping
        labelTextMesh.position.set(0, 0, this._geometry.parameters.radius + (2 * RADIUS_OFFSET) + TEXT_OFFSET); // 2x to prevent clipping between title and text
        hoverTextMesh.position.set(0, 0, this._geometry.parameters.radius + RADIUS_OFFSET + TEXT_OFFSET);

        // Make a new, completely invisible sphere to enable effective rotation of the text. 
        this._labelMesh = new THREE.Mesh(
            new THREE.SphereGeometry(this._geometry.parameters.radius, 4),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                depthTest: false
            })
        );
        this._hoverTextMesh = new THREE.Mesh(
            new THREE.SphereGeometry(this._geometry.parameters.radius, 4),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                depthTest: false
            })
        );

        // Add the label and hovertext meshes to this sphere. 
        this._labelMesh.add(labelTextMesh);
        this._hoverTextMesh.add(hoverTextMesh);

        this._labelMesh.layers.set(TEXT_LAYER);
        this._hoverTextMesh.layers.set(TEXT_LAYER);

        this._labelMesh.name = "labelMeshContainerMesh";
        this._hoverTextMesh.name = "hoverTextMeshContainerMesh";

        this._mesh.add(this._labelMesh);
        this._mesh.add(this._hoverTextMesh);
    }

    createTextGeometry(text, font) {
        return new TextGeometry(text, {
            font: font,
            curveSegments: 6,
            size: TEXT_SIZE,
            depth: 0.01
        });
    }

    // Helper function to split the text into lines based on the max width.
    truncateText(text, font, maxWidth) {
        const words = text.split(' ');
        let truncatedTitle = '';
        let currentWidth = 0;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const wordGeometry = this.createTextGeometry(word + ' ', font);

            // Calculate the width of the next word.
            wordGeometry.computeBoundingBox();
            const wordWidth = wordGeometry.boundingBox.max.x - wordGeometry.boundingBox.min.x;

            // If the current width + the next word is too big, add a newline.
            if (currentWidth + wordWidth > maxWidth) { 
                truncatedTitle += '\n';
                currentWidth = 0;
            }

            truncatedTitle += word + ' ';
            currentWidth += wordWidth;
        }

        return truncatedTitle.trim();
    }

    // Helper function for centering then spherically wrapping text geometry.
    /* 
    I will definitely need to implement left-right boundaries on the text to make it stay in view
    * TODO: need to center JUSTIFY the text!!!!!
    * TODO: less spacing between lines
    */
    centerAndWrapToSphere(text) {
        // Find the bounding box of the text geometry to center the geometry on the sphere. 
        text.computeBoundingBox();
        let boundingBox = text.boundingBox;

        // Calculate the height of the bounding box. 
        const height = boundingBox.max.y - boundingBox.min.y;

        // Calculate the center of the bounding box.
        const centerX = (boundingBox.max.x - boundingBox.min.x) / 2;
        const centerY = (boundingBox.max.y - boundingBox.min.y) / 2;
        const centerZ = (boundingBox.max.z - boundingBox.min.z) / 2;

        // Center the text geometry.
        text.translate(-centerX, -centerY, -centerZ);

        // Adjust the vertical position of the text. This solution sucks but currently it looks kinda okay?
        if (height > 1) { text.translate(0, height * 0.75, 0); }

        // Bend the text geometry to wrap around the sphere
        const radiusOffset = this._geometry.parameters.radius + RADIUS_OFFSET;
        const positionAttribute = text.attributes.position;
        const vertex = new THREE.Vector3();
        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i);

            // Calculate the angle based on the x position.
            const angle = vertex.x / radiusOffset;

            // Calculate the new position.
            const newX = radiusOffset * Math.sin(angle);
            const newZ = radiusOffset * Math.cos(angle) - radiusOffset;

            // Update vertex position.
            vertex.set(newX, vertex.y, newZ);
            positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }

        // Update position attribute.
        positionAttribute.needsUpdate = true;
    }

    setPosition(x = 0, y = 0, z = 0) {
        this._mesh.position.set(x, y, z); // may need to tinker with z-pos when content cards are behind circles
        this._position = this._mesh.position;
    }

    updateHover(time) {
        // Use Perlin noise for smooth oscillations.
        const xOffset = simplex3D(this._noiseOffsets.x + this._noiseSpeed * time, 0, 0) * this._noiseScale;
        const yOffset = simplex3D(0, this._noiseOffsets.y + this._noiseSpeed * time, 0) * this._noiseScale;
        const zOffset = simplex3D(0, 0, this._noiseOffsets.z + this._noiseSpeed * time) * this._noiseScale;

        // Apply the new position while keeping the sphere near its initial position.
        this._mesh.position.set(
            this._position.x + xOffset,
            this._position.y + yOffset,
            this._position.z + zOffset
        );
    }

    // Add the sphere to the Three scene and the Cannon world.
    addToView(scene, world) {
        scene.add(this._mesh);
        world.addBody(this._cannonBody);
    }

    // Swell animation for size and opacity.
    swell() {
        // Make sphere bigger on swell
        gsap.to(this._mesh.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
            duration: 0.3,
            //ease: "back.inOut",
            ease: "swell",
            overwrite: "auto"
        });

        // Make sphere more opaque on swell
        gsap.to(this._mesh.material,{
            opacity: 0.87,
            duration: 0.35,
            //ease: "back.inOut",
            ease: "swell",
            overwrite: "auto"
        });

        // Hide title on swell
        gsap.to(this._labelMesh.children[0].material, {
            opacity: 0,
            duration: 0.19,
            //ease: "back.inOut",
            ease: "swell",
            overwrite: "auto",
        });

        // Show text on swell
        gsap.to(this._hoverTextMesh.children[0].material, {
            opacity: 1,
            duration: 0.35,
            //ease: "back.inOut",
            ease: "swell",
            overwrite: "auto",
        });
    }
    
    // Size and opacity reset animation.
    shrink() {
        // Shrink sphere to normal size
        gsap.to(this._mesh.scale, {
            x: 1, 
            y: 1, 
            z: 1, 
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Make sphere less opaque on shrink
        gsap.to(this._mesh.material,{
            opacity: DEFAULT_SPHERE_OPACITY,
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Show title on shrink
        gsap.to(this._labelMesh.children[0].material, {
            opacity: 1,
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto",
        });

        // Hide text on shrink
        gsap.to(this._hoverTextMesh.children[0].material, {
            opacity: 0,
            duration: 0.12,
            ease: "bounce.out",
            overwrite: "auto",
        });
    }

    // Animation for opening modal.
    explode(cameraDistance) {
        // Explode the sphere up to the distance between the sphere and the camera. 
        gsap.to(this._mesh.scale, {
            x: cameraDistance, 
            y: cameraDistance, 
            z: cameraDistance, 
            duration: 0.4,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Make the sphere invisible.
        gsap.to(this._mesh.material, {
            opacity: 0,
            duration: 0.2,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Hide the hover text.
        gsap.to(this._hoverTextMesh.material, {
            opacity: 0,
            duration: 0.1,
            ease: "bounce.out",
            overwrite: "auto"
        });
    }

    // Handle hover behavior. 
    handleMouseHover(mouseHover) {
        // Only proceed if the modal is closed.
        if (!this._isModalOpen) {

            // If mouse is hovering and sphere is not hovered, hover sphere and swell.
            if (mouseHover && !this._mouseHovered) {
                this.swell();
                this._mouseHovered = true;

            // If mouse is not hovering and sphere is hovered, sphere is no longer hovered and should shrink. 
            } else if (!mouseHover && this._mouseHovered) {
                this._mouseHovered = false;
                this.shrink();
            }
        }
    }

    // Handle click behavior.
    handleClick(cameraDistance) {
        if (!this._isModalOpen && this._mouseHovered) { 
            this.explode(cameraDistance);
            this.openModal(); 
        }
    }

    // Handle modal opens and closes. 
    openModal() {
        // The mouse can no longer be considered as hovering over the sphere. 
        this._mouseHovered = false;

        // Show the modal
        this._isModalOpen = true;
        this.renderModal();
    }

    closeModal() {
        this._isModalOpen = false;
        this.renderModal();
        this.shrink();
    }

    // Render the modal onto the screen. This is horrifying and I hate that it just works. JavaScript???????
    renderModal() {
        this._root.render(<this._modal />);
    }

    // Clean up method to remove the modal root when the sphere is destroyed.
    destroy() {
        this._root.unmount();
        document.body.removeChild(this._modalRoot);
    }
}