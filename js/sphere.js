import * as THREE from 'three';

export default class Sphere {
    constructor({ radius = 3, segments = 32, color = 0xd9d9d9, wireframe = false } = {}) {
        this.geometry = new THREE.SphereGeometry(radius, segments);
        this.material = new THREE.MeshPhysicalMaterial({ color:color, wireframe: wireframe });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
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