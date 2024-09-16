import * as THREE from 'three';

export default class Sphere {
    constructor({ name = 'Sphere', radius = 3, segments = 100, color = 0xd0d0d0, wireframe = false } = {}) {
        this.geometry = new THREE.SphereGeometry(radius, segments);
        this.material = new THREE.MeshStandardMaterial({ color: color, wireframe: wireframe });
        this.material.transparent = true;
        this.material.opacity = 0.6;

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData = { instance: this };
        this.mesh.name = name;
        this.mesh.receiveShadow = true;
    }

    setPosition(x = 0, y = 0, z = 0) {
        this.mesh.position.set(x, y, z); // may need to tinker with z-pos when content cards are behind circles
    }

    // Basic animation for testing
    animate() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }

}