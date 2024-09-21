import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as CANNON from 'cannon-es';
import { gsap } from 'gsap';

const DEFAULT_SPHERE_RADIUS = 3
const DEFAULT_SPHERE_COLOR = 0xffffff
const DEFAULT_SPHERE_MASS = 1
const TEXT_SIZE = 0.5
const RADIUS_OFFSET = 0.01

export default class Sphere {
    constructor({
            label = 'Default Sphere',
            hoverText = 'Default Hover Text', 
            sphereTextSize = TEXT_SIZE, 
            radius = DEFAULT_SPHERE_RADIUS, 
            segments = 128, 
            color = DEFAULT_SPHERE_COLOR, 
            wireframe = false 
            } = {}) {
        
        // THREE.JS OBJECT SETUP
        this.geometry = new THREE.SphereGeometry(radius, segments);
        this.material = new THREE.MeshPhysicalMaterial({ 
            color: color, 
            wireframe: wireframe, 
            transparent: true,
            opacity: 0.6,
            roughness: 0.2, 
            metalness: 0.1,
            clearcoat: 0.3,
            clearcoatRoughness: 0.8
            });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData = { instance: this };
        this.mesh.receiveShadow = true;

        // Track hover state
        this.mouseHovered = false;

        /* I could add a more pronounced up-down hover effect with slight left-right rotation (gamecube analogy)
        for a pretty visual effect :D 
        
        I will definitely need to implement left-right boundaries on the text to make it stay in view */
        
        // Define max width of text
        const maxWidth = 4;

        // Helper function to split the text into lines based on the max width
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
                
                // Calculate the width of the next word
                wordGeometry.computeBoundingBox();
                const wordWidth = wordGeometry.boundingBox.max.x - wordGeometry.boundingBox.min.x;

                // If the current width + the next word is too big, add a newline
                if (currentWidth + wordWidth > maxWidth) { 
                    truncatedTitle += '\n';
                    currentWidth = 0;
                }

                truncatedTitle += word + ' ';
                currentWidth += wordWidth;
            }

            return truncatedTitle.trim();
        }

        // Helper function for centering then spherically wrapping text geometry
        function centerAndWrap(text) {
            // Find the bounding box of the text geometry to center the geometry on the sphere. 
            text.computeBoundingBox();
            let boundingBox = text.boundingBox;

            // Calculate the center of the bounding box
            const centerX = (boundingBox.max.x - boundingBox.min.x) / 2;
            const centerY = (boundingBox.max.y - boundingBox.min.y) / 2;
            const centerZ = (boundingBox.max.z - boundingBox.min.z) / 2;

            // Center the text geometry
            text.translate(-centerX, -centerY, -centerZ);

            // Adjust the vertical position of the text
            /* This works for now, I probably won't have huge amounts of text on the spheres, so 
            this should work for a few words, but if I want bigger text or more text, I will need to
            make changes. 
            The title-esque centering with only one word doesn't look TOO bad... */ 
            text.translate(0, (boundingBox.max.y - boundingBox.min.y) / 2, 0);

            // Bend the text geometry to wrap around the sphere
            const radiusOffset = radius + RADIUS_OFFSET;
            const positionAttribute = text.attributes.position;
            const vertex = new THREE.Vector3();
            for (let i = 0; i < positionAttribute.count; i++) {
                vertex.fromBufferAttribute(positionAttribute, i);

                // Calculate the angle based on the x position
                const angle = vertex.x / radiusOffset;

                // Calculate the new position
                const newX = radiusOffset * Math.sin(angle);
                const newZ = radiusOffset * Math.cos(angle) - radiusOffset;

                // Update vertex position
                vertex.set(newX, vertex.y, newZ);
                positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
            }

            // Update position attribute
            positionAttribute.needsUpdate = true;
        }

        // Based on font loading example from Three.JS docs
        const loader = new FontLoader();

        loader.load('fonts/gentilis_regular.typeface.json', (font) => {
            // Create geometries for sphere texts
            const labelText = new TextGeometry(label, {
                font: font,
                curveSegments: 12,
                size: sphereTextSize,
                depth: 0.1
            });

            const cutText = truncateText(hoverText, font, maxWidth);
            const hoverTextGeometry = new TextGeometry( cutText , {
                font: font,
                curveSegments: 12,
                size: sphereTextSize,
                depth: 0.01
            });

            // Center and wrap the text geometry
            centerAndWrap(hoverTextGeometry);
            centerAndWrap(labelText);

            // Construct the text to be drawn onto the sphere
            const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 1 });
            const labelMesh = new THREE.Mesh(labelText, labelMaterial);
            
            const hoverTextMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
            const hoverTextMesh = new THREE.Mesh(hoverTextGeometry, hoverTextMaterial);

            // Store access to the text meshes
            this.labelMesh = labelMesh;
            this.hoverTextMesh = hoverTextMesh;

            // Set title position and add to sphere mesh
            labelMesh.position.set(0, 0, radius + RADIUS_OFFSET);
            hoverTextMesh.position.set(0, 0, radius + (2 * RADIUS_OFFSET)); // 2x to prevent clipping between title and text
            
            this.mesh.add(labelMesh);
            this.mesh.add(hoverTextMesh);
        });

        // CANNON.JS OBJECT SETUP
        this.cannonSphere = new CANNON.Sphere(radius);
        this.cannonBody = new CANNON.Body({ mass: DEFAULT_SPHERE_MASS, shape: this.cannonSphere });
    }

    setPosition(x = 0, y = 0, z = 0) {
        this.mesh.position.set(x, y, z); // may need to tinker with z-pos when content cards are behind circles
    }

    // Add the sphere to the Three scene and the Cannon world
    addToView(scene, world) {
        scene.add(this.mesh);
        world.addBody(this.cannonBody);
    }

    // Swell animation for size and opacity
    swell() {
        // Make sphere bigger on swell
        gsap.to(this.mesh.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
            duration: 0.35,
            ease: "back.inOut",
            overwrite: "auto"
        });

        // Make sphere more opaque on swell
        gsap.to(this.mesh.material,{
            opacity: 0.87,
            duration: 0.35,
            ease: "back.inOut",
            overwrite: "auto"
        });

        // Hide title on swell
        gsap.to(this.labelMesh.material, {
            opacity: 0,
            duration: 0.35,
            ease: "back.inOut",
            overwrite: "auto",
        });

        // Show text on swell
        gsap.to(this.hoverTextMesh.material, {
            opacity: 1,
            duration: 0.35,
            ease: "back.inOut",
            overwrite: "auto",
        });
    }
    
    // Size and opacity reset animation
    shrink() {
        // Shrink sphere to normal size
        gsap.to(this.mesh.scale, {
            x: 1, 
            y: 1, 
            z: 1, 
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Make sphere less opaque on shrink
        gsap.to(this.mesh.material,{
            opacity: 0.6,
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto"
        });

        // Show title on shrink
        gsap.to(this.labelMesh.material, {
            opacity: 1,
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto",
        });

        // Hide text on shrink
        gsap.to(this.hoverTextMesh.material, {
            opacity: 0,
            duration: 0.2,
            ease: "bounce.out",
            overwrite: "auto",
        });
    }

    // Hover behavior
    handleMouseHover(mouseHover) {
        if (mouseHover && !this.mouseHovered) {
            this.swell();
            this.mouseHovered = true;
        } else if (!mouseHover && this.mouseHovered) {
            this.mouseHovered = false;
            this.shrink();
        }
    }

}