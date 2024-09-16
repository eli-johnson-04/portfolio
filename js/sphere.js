import * as THREE from 'three';
import { gsap } from 'gsap';

export default class Sphere {
    constructor({ name = 'Sphere', radius = 3, segments = 100, color = 0xffffff, wireframe = false } = {}) {
        this.geometry = new THREE.SphereGeometry(radius, segments);
        this.material = new THREE.MeshStandardMaterial({ color: color, wireframe: wireframe });
        this.material.transparent = true;
        this.material.opacity = 0.6;

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData = { instance: this };
        this.mesh.name = name;
        this.mesh.receiveShadow = true;

        // Track hover state
        this.isHovered = false;
    }

    setPosition(x = 0, y = 0, z = 0) {
        this.mesh.position.set(x, y, z); // may need to tinker with z-pos when content cards are behind circles
    }

    // Swell animation
    swell() {
        gsap.to(this.mesh.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
            duration: 0.3,
            ease: "back.inOut"
        });
    }
    
    // Size reset animation
    reset() {
        gsap.to(this.mesh.scale, {
            x: 1, 
            y: 1, 
            z: 1, 
            duration: 0.18,
            ease: "power1.inOut"
        });
    }

    // Hover behavior
    handleHover(isHovered) {
        if (isHovered && !this.isHovered) {
            this.swell();
            this.isHovered = true;
        } else if (!isHovered && this.isHovered) {
            this.isHovered = false;
            this.reset();
        }
    }

}