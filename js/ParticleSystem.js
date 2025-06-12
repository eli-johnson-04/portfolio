import * as THREE from 'three';

export default class ParticleSystem {
    constructor(scene) {
        this.scene = scene;

        // Particle system setup.
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

    // Generate a particle for each markdown file, corresponding to the sphere it should fly into on hover. 
    initializeFromMarkdown(folderLengths, spheres) {
        const particleData = [];
        folderLengths.forEach((folderLength, index) => {
            const sphere = spheres[index];

            if (folderLength && folderLength > 0) {
                for (let i = 0; i < folderLength; i++) {
                    const randomPosition = new THREE.Vector3(
                        (Math.random() - 0.5) * 50,
                        (Math.random() - 0.5) * 50,
                        (Math.random() - 0.5) * 50
                    );
                    particleData.push({ position: randomPosition, sphere });
                }
            }
        });

        this.initialize(particleData);
    }

    // set all sphere positions and track them. 
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

    // If the sphere is hovered, the particle should move towards the sphere.
    // If the sphere is not hovered, the particle should move back to its original position.
    update() {
        if (!this.particleGeometry.attributes.position) return;

        const positions = this.particleGeometry.attributes.position.array;
        this.particles.forEach((particle, i) => {
            const lerpSpeed = 0.13;

            const target = particle.sphere.isHovered() || particle.sphere.isModalOpen()
                ? particle.sphere.getSpherePosition()
                : particle.originalPosition;
            particle.position.lerp(target, lerpSpeed);
            positions[i * 3] = particle.position.x;
            positions[i * 3 + 1] = particle.position.y;
            positions[i * 3 + 2] = particle.position.z;
        });
        this.particleGeometry.attributes.position.needsUpdate = true;
    }
}
