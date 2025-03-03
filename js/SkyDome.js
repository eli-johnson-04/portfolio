import * as THREE from 'three';
import StarrySkyShader from './StarrySkyShader.js';

// Set up twinkly skydome! 
const SkyDome = (() => {
    let instance;

    function createInstance() {
        // (From StackBlitz user cywarr - https://stackblitz.com/edit/starry-skydome-t1j7od)
        const skyDomeRadius = 500.01;
        const clock = new THREE.Clock();
        const sphereMaterial = new THREE.ShaderMaterial({
            uniforms: {
                skyRadius: { value: skyDomeRadius },
                env_c1: { value: new THREE.Color("#0d1a2f") },
                env_c2: { value: new THREE.Color("#0f8682") },
                noiseOffset: { value: new THREE.Vector3(100.01, 100.01, 100.01) },
                starSize: { value: 0.01 },
                starDensity: { value: 0.09 },
                clusterStrength: { value: 0.2 },
                clusterSize: { value: 0.2 },
                time: { value: 0 }
            },
            vertexShader: StarrySkyShader.vertexShader,
            fragmentShader: StarrySkyShader.fragmentShader,
            side: THREE.DoubleSide,
        });
        const sphereGeometry = new THREE.SphereGeometry(skyDomeRadius, 20, 20);
        const skyDomeMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        
        return {
            skyDomeMesh,
            clock,
            sphereMaterial
        };
    }

    return {
        getInstance: () => {
            if (!instance)
                instance = createInstance();

            return instance;
        },
        updateClock: () => {
            if (instance)
                instance.sphereMaterial.uniforms.time.value = instance.clock.getElapsedTime();
        }
    };
})();

export default SkyDome;