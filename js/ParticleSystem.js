import * as THREE from 'three';

export default class ParticleSystem {
    constructor(scene) {
        this.scene = scene;

        // Particle system setup
        this.particles = [];
        this.particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.08,
            sizeAttenuation: true,
        });
        this.particleGeometry = new THREE.BufferGeometry();
        this.particleMesh = new THREE.Points(this.particleGeometry, this.particleMaterial);
        this.scene.add(this.particleMesh);
    }

    initializeFromMarkdown(sphereData, spheres) {
        const particleData = [];
        sphereData.forEach((data, index) => {
            const sphere = spheres[index];
            const markdownEntries = data;

            if (markdownEntries && markdownEntries.length > 0) {
                markdownEntries.forEach(() => {
                    const randomPosition = new THREE.Vector3(
                        (Math.random() - 0.5) * 50,
                        (Math.random() - 0.5) * 50,
                        (Math.random() - 0.5) * 50
                    );
                    particleData.push({ position: randomPosition, sphere });
                });
            }
        });

        this.initialize(particleData);
    }

    initialize(particleData) {
        if (!particleData || particleData.length === 0) return;

        const positions = [];
        particleData.forEach(({ position, sphere }) => {
            const scaledPosition = position.clone().multiplyScalar(3);
            positions.push(position.x, position.y, position.z);
            this.particles.push({ position, sphere, originalPosition: scaledPosition });
        });

        this.particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    }

    update() {
        if (!this.particleGeometry.attributes.position) return;

        const positions = this.particleGeometry.attributes.position.array;
        this.particles.forEach((particle, i) => {
            const lerpSpeed = 0.13;

            const target = particle.sphere._mouseHovered || particle.sphere._isModalOpen
                ? particle.sphere._position
                : particle.originalPosition;
            particle.position.lerp(target, lerpSpeed);
            positions[i * 3] = particle.position.x;
            positions[i * 3 + 1] = particle.position.y;
            positions[i * 3 + 2] = particle.position.z;
        });
        this.particleGeometry.attributes.position.needsUpdate = true;
    }
}
