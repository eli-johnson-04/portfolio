import * as THREE from 'three';
import { gsap } from 'gsap';

export default class Sphere {
    constructor({ name = 'Sphere', radius = 3, segments = 256, color = 0xffffff, wireframe = false } = {}) {
        this.geometry = new THREE.SphereGeometry(radius, segments);
        this.material = new THREE.MeshStandardMaterial({ color: color, wireframe: wireframe });
        this.material.transparent = true;
        this.material.opacity = 0.6;
        this.material.roughness = 0.25;

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData = { instance: this };
        this.mesh.name = name;
        this.mesh.receiveShadow = true;

        // Track hover state
        this.mouseHovered = false;

        /* Make the radius of the curvature of the text ever so slightly bigger than the sphere (to prevent clipping)
        but this way, the text will appear to wrap around the sphere nicely
        I may need to play around with the position of the text though.
        I could also add a more pronounced up-down hover effect with slight left-right rotation (gamecube analogy)
        for a pretty visual effect :D 
        
        I will definitely need to implement left-right boundaries on the text to make it stay in view */
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
        })
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
        })
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