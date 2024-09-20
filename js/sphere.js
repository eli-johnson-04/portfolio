import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { gsap } from 'gsap';

const DEFAULT_SPHERE_RADIUS = 3
const DEFAULT_SPHERE_COLOR = 0xffffff
const TEXT_SIZE = 0.5

export default class Sphere {
    constructor({ 
            sphereText = 'Sphere', 
            sphereTextSize = TEXT_SIZE, 
            radius = DEFAULT_SPHERE_RADIUS, 
            segments = 128, 
            color = DEFAULT_SPHERE_COLOR, 
            wireframe = false 
            } = {}) {
                
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
        function truncateTitle(title, font, maxWidth) {
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

        // Based on font loading example from Three.JS docs
        const loader = new FontLoader();

        loader.load('fonts/gentilis_regular.typeface.json', (font) => {
            const truncatedTitle = truncateTitle(sphereText, font, maxWidth);
            const titleGeometry = new TextGeometry( truncatedTitle , {
                font: font,
                curveSegments: 12,
                size: sphereTextSize,
                depth: 0.01
            });

            // Find the bounding box of the text geometry to center this geometry on the sphere. 
            titleGeometry.computeBoundingBox();
            let boundingBox = titleGeometry.boundingBox;
            
            // Calculate the center of the bounding box
            const centerX = (boundingBox.max.x - boundingBox.min.x) / 2;
            const centerY = (boundingBox.max.y - boundingBox.min.y) / 2;
            const centerZ = (boundingBox.max.z - boundingBox.min.z) / 2;
            
            // Center the text geometry
            titleGeometry.translate(-centerX, -centerY, -centerZ);
            
            // Adjust vertical position of text
            /* This works for now, I probably won't have huge amounts of text on the spheres, so 
            this should work for a few words, but if I want bigger text or more text, I will need to
            make changes. 
            The title-esque centering with only one word doesn't look TOO bad... */ 
            titleGeometry.translate(0, (boundingBox.max.y - boundingBox.min.y) / 2, 0);

            // Bend the text geometry to wrap around the sphere
            const radiusOffset = radius + 0.01;
            const positionAttribute = titleGeometry.attributes.position;
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

            // Construct the text to be drawn onto the sphere
            const titleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
            const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);

            // Store access to the titleMesh
            this.title = titleMesh;

            // Set title position and add to sphere mesh
            titleMesh.position.set(0, 0, radiusOffset); // Adjusted for radius of the sphere
            this.mesh.add(titleMesh);
        });
    }

    setPosition(x = 0, y = 0, z = 0) {
        this.mesh.position.set(x, y, z); // may need to tinker with z-pos when content cards are behind circles
    }

    // Swell animation for size and opacity
    swell() {
        gsap.to(this.mesh.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
            duration: 0.35,
            ease: "back.inOut",
            overwrite: "auto"
        });
        gsap.to(this.mesh.material,{
            opacity: 0.87,
            duration: 0.35,
            ease: "back.inOut",
            overwrite: "auto"
        });
        gsap.to(this.title.material, {
            opacity: 1,
            duration: 0.35,
            ease: "back.inOut",
            overwrite: "auto",
        });
    }
    
    // Size and opacity reset animation
    reset() {
        gsap.to(this.mesh.scale, {
            x: 1, 
            y: 1, 
            z: 1, 
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto"
        });
        gsap.to(this.mesh.material,{
            opacity: 0.6,
            duration: 0.3,
            ease: "bounce.out",
            overwrite: "auto"
        });
        gsap.to(this.title.material, {
            opacity: 0,
            duration: 0.3,
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
            this.reset();
        }
    }

}