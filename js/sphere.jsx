import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as CANNON from 'cannon-es';
import { gsap } from 'gsap';
import CustomEase from 'gsap/customEase';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import SphereModal from './sphereModal.jsx';
import { createNoise3D } from 'simplex-noise';

const DEFAULT_SPHERE_RADIUS = 3
const DEFAULT_SPHERE_COLOR = 0xe8e8f0
const DEFAULT_SPHERE_MASS = 1
const TEXT_SIZE = 0.5
const RADIUS_OFFSET = 0.01

const DEFAULT_SPHERE_OPACITY = 0.6

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
    constructor({
            label = 'Default Sphere',
            hoverText = 'Default Hover Text', 
            sphereTextSize = TEXT_SIZE, 
            radius = DEFAULT_SPHERE_RADIUS, 
            segments = 128, 
            color = DEFAULT_SPHERE_COLOR, 
            wireframe = false ,
            content = null
            } = {}) {

        this._content = content;
        this._label = label;
        
        // ---------------------THREE.JS OBJECT SETUP---------------------
        this._geometry = new THREE.SphereGeometry(radius, segments);
        this._material = new THREE.MeshPhysicalMaterial({ 
            color: color, 
            wireframe: wireframe, 
            transparent: false,
            opacity: DEFAULT_SPHERE_OPACITY,
            roughness: 0.35, 
            metalness: 0.1,
            clearcoat: 0.3,
            clearcoatRoughness: 0.8
            });
        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this._mesh.userData = { instance: this };
        this._mesh.receiveShadow = true;

        // Store the current position of the sphere. 
        this._mesh.position.set(0, 0, 0);
        this._position = this._mesh.position;

        /* I could add a more pronounced up-down hover effect with slight left-right rotation (gamecube analogy)
        for a pretty visual effect :D 
        
        I will definitely need to implement left-right boundaries on the text to make it stay in view */
        
        // Define max width of text.
        const maxWidth = 4;

        // Helper function to split the text into lines based on the max width.
        function truncateText(title, font, maxWidth) {
            const words = title.split(' ');
            let truncatedTitle = '';
            let currentWidth = 0;

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const wordGeometry = new TextGeometry(word + ' ', {
                    font: font,
                    size: sphereTextSize,
                    depth: 0.1,
                    curveSegments: 12
                });
                
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
        // TODO: need to center JUSTIFY the text!!!!!
        // TODO: less spacing between lines
        function centerAndWrapToSphere(text) {
            // Find the bounding box of the text geometry to center the geometry on the sphere. 
            text.computeBoundingBox();
            let boundingBox = text.boundingBox;

            // Calculate the height of the bounding box. 
            var height = boundingBox.max.y - boundingBox.min.y;

            // Calculate the center of the bounding box.
            const centerX = (boundingBox.max.x - boundingBox.min.x) / 2;
            const centerY = (boundingBox.max.y - boundingBox.min.y) / 2;
            const centerZ = (boundingBox.max.z - boundingBox.min.z) / 2;

            // Center the text geometry.
            text.translate(-centerX, -centerY, -centerZ);

            // Adjust the vertical position of the text. This solution sucks but currently it looks kinda okay?
            if (height > 1) {height = height * 1.5; }
            text.translate(0, height / 2, 0);

            // Bend the text geometry to wrap around the sphere
            const radiusOffset = radius + RADIUS_OFFSET;
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

        // Based on font loading example from Three.JS docs.
        const loader = new FontLoader();

        loader.load('fonts/gentilis_regular.typeface.json', (font) => {
            // Create geometries for sphere texts.
            const labelText = new TextGeometry(label, {
                font: font,
                curveSegments: 12,
                size: sphereTextSize,
                depth: 0.01
            });

            const cutText = truncateText(hoverText, font, maxWidth);
            const hoverTextGeometry = new TextGeometry(cutText , {
                font: font,
                curveSegments: 12,
                size: sphereTextSize,
                depth: 0.01
            });

            // Center and wrap the text geometry.
            centerAndWrapToSphere(hoverTextGeometry);
            centerAndWrapToSphere(labelText);

            // Construct the text to be drawn onto the sphere.
            const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x292929, transparent: true, opacity: 1 });
            const labelMesh = new THREE.Mesh(labelText, labelMaterial);
            
            const hoverTextMaterial = new THREE.MeshBasicMaterial({ color: 0x292929, transparent: true, opacity: 0 });
            const hoverTextMesh = new THREE.Mesh(hoverTextGeometry, hoverTextMaterial);

            // Add the meshes as properties of the object. 
            this._labelMesh = labelMesh;
            this._hoverTextMesh = hoverTextMesh;

            // Set title position and add to sphere mesh.
            labelMesh.position.set(0, 0, radius + (2 * RADIUS_OFFSET)); // 2x to prevent clipping between title and text
            hoverTextMesh.position.set(0, 0, radius + RADIUS_OFFSET);
            
            this._mesh.add(labelMesh);
            this._mesh.add(hoverTextMesh);
        });

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

        this._noiseScale = 0.003; // Controls the intensity of sphere movement
        this._noiseSpeed = 0.5; // Controls the speed of sphere movement

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
        gsap.to(this._labelMesh.material, {
            opacity: 0,
            duration: 0.19,
            //ease: "back.inOut",
            ease: "swell",
            overwrite: "auto",
        });

        // Show text on swell
        gsap.to(this._hoverTextMesh.material, {
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
        gsap.to(this._labelMesh.material, {
            opacity: 1,
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto",
        });

        // Hide text on shrink
        gsap.to(this._hoverTextMesh.material, {
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