import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import SphereModal from './sphereModal.jsx';
import { createNoise3D } from 'simplex-noise';

// Create the custom swell ease. 
gsap.registerPlugin(CustomEase);
CustomEase.create(
    "swell", 
    "M0,0 C0,0 0.039,-0.121 0.096,-0.121 0.236,-0.121 0.279,0.504 0.319,0.634 0.333,0.681 0.376,0.8 0.46,0.833 0.671,0.914 0.686,1.1 0.686,1.1 0.686,1.006 1,1 1,1 "
);
Modal.setAppElement('#root');

// Initialize SimplexNoise instance.
const simplex3D = createNoise3D(Math.random);

class SphereState {
    static #IDLE = 0;
    static #SHRINK = 1;
    static #HOVERED = 2;
    static #SWOLLEN = 3;
    static #CLICKED = 4;
    static #EXPLODED = 5;
    
    static get IDLE() { return this.#IDLE; }
    static get SHRINK() { return this.#SHRINK; }
    static get HOVERED() { return this.#HOVERED; }
    static get SWOLLEN() { return this.#SWOLLEN; }
    static get CLICKED() { return this.#CLICKED; }
    static get EXPLODED() { return this.#EXPLODED; }
}

export default class Sphere {
    static #FONT = null;
    static #DEFAULT_RADIUS = 1.5;
    static #DEFAULT_SEGMENTS = 32;
    static #DEFAULT_SPHERE_COLOR = 0xe8e8f0;
    //static #TEXT_COLOR = 0x97979c;
    static #TEXT_COLOR = 0xffffff;
    static #TEXT_SIZE = 0.3;
    static #TEXT_LAYER = 2;
    static #RADIUS_OFFSET = 0.01;
    static #RADIAL_TEXT_OFFSET = 0.05;
    static #DEFAULT_MESH_OPACITY = 0.6;

    // Pure basics of a sphere.
    #_content;
    #_label;
    #_hoverText;
    #_state = SphereState.IDLE;

    // THREE.JS attributes
    #_geometry;
    #_material;
    #_mesh;
    #_spherePosition; // The functional position of the sphere, as opposed to visual
    #_labelSphere; // An invisible sphere holding the label text, turns to face the user
    #_hoverTextSphere; // An invisible sphere holding the hover text, turns to face the user

    // Sphere idle movement effects
    #_noiseOffsets;
    #_noiseScale;
    #_noiseSpeed;

    constructor({
            label = 'Default Sphere',
            hoverText = 'Default Hover Text', 
            radius = Sphere.#DEFAULT_RADIUS, 
            segments = Sphere.#DEFAULT_SEGMENTS, 
            color = Sphere.#DEFAULT_SPHERE_COLOR, 
            wireframe = false ,
            content = null,
            layer = null,
            texturePath = null,
            } = {}) {

        this.#_content = content;
        this.#_label = label;
        this.#_hoverText = hoverText;
        
        // ---------------------THREE.JS OBJECT SETUP---------------------
        this.#_geometry = new THREE.SphereGeometry(radius, segments);
        const loader = new THREE.TextureLoader();
        this.#_material = new THREE.MeshPhysicalMaterial({ 
            color: color, 
            wireframe: wireframe, 
            transparent: false,
            opacity: Sphere.#DEFAULT_MESH_OPACITY,
            roughness: 0.35, 
            metalness: 0.1,
            clearcoat: 0.3,
            clearcoatRoughness: 0.8,
            map: (texturePath) ? loader.load(texturePath) : null,
            //normalMap: (texturePath) ? loader.load(texturePath) : null,
        });
        this.#_mesh = new THREE.Mesh(this.#_geometry, this.#_material);
        this.#_mesh.userData = { instance: this };
        this.#_mesh.receiveShadow = true; // Enable shadow receiving

        this.setPosition();  
        this.#setupTextMeshes();
        this.#setupRandomMovement();
        this.#setupModal();
    }

    // Check for Sphere-hood
    static isSphere(object) { 
        return object?.userData?.instance instanceof Sphere 
            || object?.getMesh?.().userData?.instance instanceof Sphere; 
    }
    
    // ----------Setters----------
    setShrink() { if (this.#_state != SphereState.IDLE) this.#_state = SphereState.SHRINK; }
    setHover() { 
        if (this.#_state == SphereState.SWOLLEN || this.#_state == SphereState.EXPLODED) return;
        this.#_state = SphereState.HOVERED; 
    }
    setClick() { this.#_state = SphereState.CLICKED; }
    
    // ----------Getters----------
    getMesh() { return this.#_mesh; }
    isHovered() { return this.#_state == SphereState.HOVERED || this.#_state == SphereState.SWOLLEN; }
    isModalOpen() { return this.#_state >= SphereState.CLICKED; }
    getInstance() { return this.#_mesh.userData.instance; }
    getSpherePosition() { return this.#_spherePosition; }
    #isInitialized() { return this.#_labelSphere && this.#_hoverTextSphere && this.#_mesh; }

    // ----------Sphere Setup Helpers----------
    #setupTextMeshes() {
        // Only load the font if it has not been loaded yet. 
        if (!Sphere.#FONT) {
            const loader = new FontLoader();
            loader.load('./fonts/gentilis_regular.typeface.json', (font) => {
                Sphere.#FONT = font;
                this.#onFontLoaded(font);
            });
        }
        else this.#onFontLoaded(Sphere.#FONT);
    }

    #setupRandomMovement() {
        // Random offsets for noise generation. This will be used in the sphere's hovering effect.
        this.#_noiseOffsets = {
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            z: Math.random() * 1000
        };
        this.#_noiseScale = 0.002; // Controls the intensity of sphere movement
        this.#_noiseSpeed = 0.2; // Controls the speed of sphere movement
    }

    #setupModal() {
        // I hate JavaScript. 
        this._modal = () => (
            <SphereModal
                isOpen={this.#_state == SphereState.EXPLODED}
                onRequestClose={() => this.#closeModal()}
                label={this.#_label}
                content={this.#_content}
            />
        );

        // Create a div for the modal.
        this._modalRoot = document.createElement('div');
        this._modalRoot.id = `modal-root-${this.id}`;
        document.body.appendChild(this._modalRoot);

        // Create the root for this sphere's modal.
        this._root = createRoot(this._modalRoot);
        
        // Only render the modal once.
        this.#renderModal();
    }

    #onFontLoaded(font) {
        // Create geometries for sphere texts.
        const labelTextGeometry = this.#createTextGeometryFromLines([this.#_label], font);
        const hoverText = this.#truncateText(this.#_hoverText, font, 4);
        const hoverTextGeometry = this.#createTextGeometryFromLines(hoverText, font);

        // Center and wrap the text geometry. 
        this.#centerAndWrapToSphere(hoverTextGeometry);
        this.#centerAndWrapToSphere(labelTextGeometry);
        
        // Construct the new text to be drawn onto the sphere.
        const labelTextMaterial = new THREE.MeshStandardMaterial({ 
            color: Sphere.#TEXT_COLOR, 
            transparent: true, 
            opacity: 1 
        });
        const hoverTextMaterial = new THREE.MeshStandardMaterial({ 
            color: Sphere.#TEXT_COLOR, 
            transparent: true, 
            opacity: 0 
        });

        // Construct the text to be drawn onto the sphere.
        const labelTextMesh = new THREE.Mesh(labelTextGeometry, labelTextMaterial);
        const hoverTextMesh = new THREE.Mesh(hoverTextGeometry, hoverTextMaterial);

        // Enable shadow casting for text meshes.
        labelTextMesh.castShadow = true;

        // Set position to prevent clipping.
        labelTextMesh.position.set(0, 0, this.#_geometry.parameters.radius + (2 * Sphere.#RADIUS_OFFSET) + Sphere.#RADIAL_TEXT_OFFSET); // 2x to prevent clipping between title and text
        hoverTextMesh.position.set(0, 0, this.#_geometry.parameters.radius + Sphere.#RADIUS_OFFSET + Sphere.#RADIAL_TEXT_OFFSET);

        // Make a new, completely invisible sphere to enable effective rotation of the text. 
        this.#_labelSphere = new THREE.Mesh(
            new THREE.SphereGeometry(this.#_geometry.parameters.radius, 4),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                depthTest: false,
                
            })
        );
        this.#_hoverTextSphere = new THREE.Mesh(
            new THREE.SphereGeometry(this.#_geometry.parameters.radius, 4),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                depthTest: false
            })
        );

        // Add the label and hovertext meshes to this sphere. 
        this.#_labelSphere.add(labelTextMesh);
        this.#_hoverTextSphere.add(hoverTextMesh);

        this.#_labelSphere.layers.set(Sphere.#TEXT_LAYER);
        this.#_hoverTextSphere.layers.set(Sphere.#TEXT_LAYER);

        this.#_labelSphere.name = "labelMeshContainerMesh";
        this.#_hoverTextSphere.name = "hoverTextMeshContainerMesh";

        this.#_mesh.add(this.#_labelSphere);
        this.#_mesh.add(this.#_hoverTextSphere);
    }
    
    // Helper function to split the text into lines based on the max width.
    #truncateText(text, font, maxWidth) {
        const words = text.split(' ');
        let truncatedTitle = '';
        let currentWidth = 0;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const wordGeometry = new TextGeometry(word + ' ', {
                font: font,
                curveSegments: 6,
                size: Sphere.#TEXT_SIZE,
                depth: 0.01,
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
        
        const lines = truncatedTitle.split('\n');
        for (let i = 0; i < lines.length; i++)
            lines[i] = lines[i].trim(); // Remove leading/trailing whitespace
        return lines;
    }
    
    #createTextGeometryFromLines(lines, font) {
        const textGeometries = [];
        let maxLineWidth = 0;

        // Create a geometry for each line and calculate the maximum line width.
        for (const line of lines) {
            const lineGeometry = new TextGeometry(line, {
                font: font,
                curveSegments: 6,
                size: Sphere.#TEXT_SIZE,
                depth: 0.01,
            });

            lineGeometry.computeBoundingBox();
            const lineWidth = lineGeometry.boundingBox.max.x - lineGeometry.boundingBox.min.x;
            maxLineWidth = Math.max(maxLineWidth, lineWidth);

            textGeometries.push({ geometry: lineGeometry, width: lineWidth });
        }

        // Combine all line geometries into one and center-align them.
        const geometries = [];
        let yOffset = 0;

        for (const { geometry, width } of textGeometries) {
            // Center-align the line by translating it horizontally.
            const xOffset = (maxLineWidth - width) / 2;
            geometry.translate(xOffset, yOffset, 0);

            // Merge the line geometry into the combined geometry.
            geometries.push(geometry);

            // Calculate the height of the current line.
            geometry.computeBoundingBox();
            const lineHeight = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

            // Move the next line down by the height of the text plus some spacing.
            yOffset -= lineHeight * 1.2; // Adjust spacing multiplier as needed
        }

        // Merge all geometries into one.
        const combinedGeometry = BufferGeometryUtils.mergeGeometries(geometries, false);
        return combinedGeometry;
    }
    
    // Helper function for centering then spherically wrapping text geometry.
    #centerAndWrapToSphere(text) {
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
        if (height > 0.8) { text.translate(0, height * 0.4, 0); } // i hate these values i had to test for them manually smh

        // Bend the text geometry to wrap around the sphere
        const radiusOffset = this.#_geometry.parameters.radius + Sphere.#RADIUS_OFFSET;
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

    // ----------Sphere Manipulation----------
    // Set the position of the sphere and modify its "center" or "actual" position.
    setPosition(x = 0, y = 0, z = 0) {
        this.#_mesh.position.set(x, y, z); // may need to tinker with z-pos when content cards are behind circles
        this.#_spherePosition = this.#_mesh.position;
    }

    // TODO: doesn't actually visualize everywhere the sphere could be - noise movement is not bounded
    createBoundaryVisualization() {
        // For this simplex noise implementation, maximum amplitude is ~0.8.
        const actualMaxNoiseValue = 0.8;
        
        // Calculate maximum displacement in any direction.
        const maxDisplacementPerAxis = this.#_noiseScale * actualMaxNoiseValue;
        
        // Calculate the maximum 3D displacement.
        const maxTotalDisplacement = maxDisplacementPerAxis * Math.sqrt(3);

        const boundaryRadius = (2 * this.#_geometry.parameters.radius) + maxTotalDisplacement; // account for the size of the sphere AND the geometry
        
        const boundaryGeometry = new THREE.SphereGeometry(boundaryRadius, 16, 16);
        const boundaryMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            wireframe: true, 
            opacity: 1, 
            transparent: true,
        });
        
        const boundaryMesh = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
        boundaryMesh.position.copy(this.#_spherePosition);
        
        return boundaryMesh;
    }

    // ----------Frame Updates----------
    #updateHover(time) {
        // Use Perlin noise to calculate the new position directly.
        const newX = simplex3D(this.#_noiseOffsets.x + this.#_noiseSpeed * time, 0, 0) * this.#_noiseScale;
        const newY = simplex3D(0, this.#_noiseOffsets.y + this.#_noiseSpeed * time, 0) * this.#_noiseScale;
        const newZ = simplex3D(0, 0, this.#_noiseOffsets.z + this.#_noiseSpeed * time) * this.#_noiseScale;

        // Calculate the new position relative to the initial position.
        const targetPosition = new THREE.Vector3(
            this.#_spherePosition.x + newX,
            this.#_spherePosition.y + newY,
            this.#_spherePosition.z + newZ
        );

        // Calculate the distance from the initial position.
        const distanceFromCenter = targetPosition.distanceTo(this.#_spherePosition);

        // Clamp the position to the boundary sphere's radius.
        const boundaryRadius = this.#_geometry.parameters.radius;
        if (distanceFromCenter > boundaryRadius)
            // Scale the position back to the boundary sphere's surface.
            targetPosition.sub(this.#_spherePosition).setLength(boundaryRadius).add(this.#_spherePosition);

        // Apply the clamped position to the sphere.
        this.#_mesh.position.copy(targetPosition);
    }
    
    #faceTextSpheresTo(position) {
        this.#_labelSphere?.lookAt(position);
        this.#_hoverTextSphere?.lookAt(position);
    }

    #_prevState = SphereState.IDLE;
    update(cameraPos) {
        this.#updateHover(performance.now() / 1000);
        this.#faceTextSpheresTo(cameraPos);
        switch (this.#_state) {
            case SphereState.IDLE:
                break;
            case SphereState.SHRINK:
                if (this.#_prevState != SphereState.SHRINK && this.#_state != SphereState.IDLE)
                    this.#shrink();
                break;
            case SphereState.HOVERED:
                if (this.#_prevState != SphereState.HOVERED) 
                    this.#hover();
                break;
            case SphereState.SWOLLEN:
                break;
            case SphereState.CLICKED:
                if (this.#_prevState != SphereState.CLICKED)
                    this.#explodeToDistance(this.#_mesh.position.distanceTo(cameraPos));
                break;
            case SphereState.EXPLODED:
                break;
            default:
                break;
        }
        this.#_prevState = this.#_state;
    }

    // Swell animation for size and opacity.
    #animateSwell() {
        // Make sphere bigger on swell.
        gsap.to(this.#_mesh.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
            duration: 0.3,
            ease: "swell",
            overwrite: "auto"
        });

        // Make sphere more opaque on swell.
        gsap.to(this.#_mesh.material, {
            opacity: 0.87,
            duration: 0.35,
            ease: "swell",
            overwrite: "auto"
        });

        // Hide title on swell.
        const timeToHideLabelText = 0.19;
        gsap.to(this.#_labelSphere.children[0].material, {
            opacity: 0,
            duration: 0.19,
            ease: "swell",
            overwrite: "auto",
            onStart: () => {
                setTimeout(timeToHideLabelText / 2);
                this.#_labelSphere.children[0].castShadow = false;
            }
        });

        // Show text on swell.
        const timeToShowHoverText = 0.35;
        gsap.to(this.#_hoverTextSphere.children[0].material, {
            opacity: 1,
            duration: timeToShowHoverText,
            ease: "swell",
            overwrite: "auto",
            onStart: () => {
                setTimeout(timeToShowHoverText * (5 / 6));
                this.#_hoverTextSphere.children[0].castShadow = true; // Enable shadow during fade-in
            }
        });
    }
    
    // Size and opacity reset animation.
    #animateShrink() {
        // Shrink sphere to normal size.
        gsap.to(this.#_mesh.scale, {
            x: 1, 
            y: 1, 
            z: 1, 
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Make sphere less opaque on shrink.
        gsap.to(this.#_mesh.material, {
            opacity: Sphere.#DEFAULT_MESH_OPACITY,
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Show title on shrink.
        const timeToShowLabelText = 0.3;
        gsap.to(this.#_labelSphere.children[0].material, {
            opacity: 1,
            duration: timeToShowLabelText,
            ease: "bounce.out",
            overwrite: "auto",
            onStart: () => {
                setTimeout(timeToShowLabelText * (5 / 6));
                this.#_labelSphere.children[0].castShadow = true; // Enable shadow during fade-in
            }
        });

        // Hide text on shrink
        const timeToHideHoverText = 0.12;
        gsap.to(this.#_hoverTextSphere.children[0].material, {
            opacity: 0,
            duration: 0.12,
            ease: "bounce.out",
            overwrite: "auto",
            onStart: () => {
                setTimeout(timeToHideHoverText / 2);
                this.#_hoverTextSphere.children[0].castShadow = false;  
            }
        });
    }

    // Animation for opening modal.
    #animateExplode(cameraDistance) {
        // Explode the sphere up to the distance between the sphere and the camera. 
        gsap.to(this.#_mesh.scale, {
            x: cameraDistance + 1, 
            y: cameraDistance + 1, 
            z: cameraDistance + 1, 
            duration: 0.4,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Make the sphere invisible.
        gsap.to(this.#_mesh.material, {
            opacity: 0,
            duration: 0.2,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Hide the hover text.
        gsap.to(this.#_hoverTextSphere.children[0].material, {
            opacity: 0,
            duration: 0.1,
            ease: "bounce.out",
            overwrite: "auto"
        });
    }

    // ----------User Interaction Consequences----------
    #hover() {
        if (!this.#isInitialized() || this.#_state == SphereState.SWOLLEN) return;
        this.#animateSwell();
        this.#_state = SphereState.SWOLLEN;
    }

    #shrink() {
        if (!this.#isInitialized() || this.#_state == SphereState.IDLE) return;
        this.#animateShrink();
        this.#_state = SphereState.IDLE;
    }
    
    #explodeToDistance(cameraDistance) {
        if (!this.#isInitialized() || this.#_state == SphereState.EXPLODED) return;
        this.#animateExplode(cameraDistance);
        this.#renderModal(); 
        this.#_state = SphereState.EXPLODED;
    }

    #closeModal() {
        this.#renderModal();
        this.#shrink();
    }

    #_isTextVisible = true;
    hideText() {
        if (!this.#_isTextVisible || this.#_state != SphereState.IDLE) return;
        this.#_isTextVisible = false;
        // Hide label.
        const timeToHideLabelText = 0.3;
        gsap.to(this.#_labelSphere.children[0].material, {
            opacity: 0,
            duration: timeToHideLabelText,
            ease: "swell",
            overwrite: "auto",
            onStart: () => {
                setTimeout(timeToHideLabelText * (9 / 10));
                this.#_labelSphere.children[0].castShadow = false;
            }
        });
        // Hide text.
        gsap.to(this.#_hoverTextSphere.children[0].material, {
            opacity: 0,
            duration: 0.3,
            ease: "swell",
            overwrite: "auto",
            onComplete: () => {
                this.#_hoverTextSphere.children[0].castShadow = false; // Disable shadow after fade-out
            }
        });
    }

    showText() {
        if (this.#_isTextVisible || this.#_state != SphereState.IDLE) return;
        this.#_isTextVisible = true;
        // Show label.
        const timeToShowLabelText = 0.3;
        gsap.to(this.#_labelSphere.children[0].material, {
            opacity: 1,
            duration: timeToShowLabelText,
            ease: "swell",
            overwrite: "auto",
            onStart: () => {
                setTimeout(timeToShowLabelText * (5 / 6));
                this.#_labelSphere.children[0].castShadow = true;
            },
        });
    }

    // Render the modal onto the screen. this is grody thank u react :3
    #renderModal() {
        this._root.render(<this._modal />);
    }

    // Clean up method to remove the modal root when the sphere is destroyed.
    destroy() {
        this._root.unmount();
        document.body.removeChild(this._modalRoot);
    }
}