import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BackgroundProps {
  type?: string;
}

const Background = ({ type = 'grid-cubes' }: BackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || type === 'none') return;

    // Parse types
    const types = type.split('&&').map(t => t.trim());
    
    // Legacy support for 'grid-cubes'
    if (types.includes('grid-cubes')) {
      types.push('grid', 'cubes');
    }

    let requestID: number;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Objects references for animation
    const cubes: THREE.Mesh[] = [];
    const stars: THREE.Points[] = [];
    let waves: THREE.Points | null = null;
    let torus: THREE.Mesh | null = null;
    let sphere: THREE.Mesh | null = null;
    let dots: THREE.Points | null = null;
    let tunnel: THREE.Group | null = null;
    const rain: THREE.Points[] = [];

    // Colors
    const colorPrimary = 0xbb9af7;
    const colorSecondary = 0x7aa2f7;
    const colorTertiary = 0x73daca;

    if (types.includes('grid')) {
      const gridHelper = new THREE.GridHelper(30, 60, colorPrimary, 0x414868);
      gridHelper.position.y = -3;
      group.add(gridHelper);
    }

    if (types.includes('cubes')) {
      const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      for (let i = 0; i < 60; i++) {
        const material = new THREE.MeshPhongMaterial({
          color: i % 3 === 0 ? colorPrimary : i % 3 === 1 ? colorSecondary : colorTertiary,
          transparent: true,
          opacity: 0.6,
          shininess: 100
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        group.add(cube);
        cubes.push(cube);
      }
    }

    if (types.includes('stars')) {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
      const starVertices = [];
      for (let i = 0; i < 5000; i++) {
        starVertices.push((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const starPoints = new THREE.Points(starGeometry, starMaterial);
      scene.add(starPoints);
      stars.push(starPoints);
    }

    if (types.includes('torus')) {
      const geometry = new THREE.TorusKnotGeometry(2, 0.6, 128, 32);
      const material = new THREE.MeshPhongMaterial({ color: colorPrimary, wireframe: true, transparent: true, opacity: 0.4 });
      torus = new THREE.Mesh(geometry, material);
      group.add(torus);
    }

    if (types.includes('waves')) {
      const geometry = new THREE.BufferGeometry();
      const count = 50;
      const positions = new Float32Array(count * count * 3);
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          positions[(i * count + j) * 3 + 0] = i - count / 2;
          positions[(i * count + j) * 3 + 1] = 0;
          positions[(i * count + j) * 3 + 2] = j - count / 2;
        }
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: colorSecondary, size: 0.1 });
      waves = new THREE.Points(geometry, material);
      waves.position.y = -2;
      group.add(waves);
    }

    if (types.includes('sphere')) {
      const geometry = new THREE.SphereGeometry(3, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: colorTertiary, wireframe: true, transparent: true, opacity: 0.3 });
      sphere = new THREE.Mesh(geometry, material);
      group.add(sphere);
    }

    if (types.includes('dots')) {
      const geometry = new THREE.BufferGeometry();
      const count = 1000;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: colorPrimary, size: 0.05 });
      dots = new THREE.Points(geometry, material);
      group.add(dots);
    }

    if (types.includes('rain')) {
      const geometry = new THREE.BufferGeometry();
      const count = 2000;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = Math.random() * 40 - 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: colorSecondary, size: 0.05, transparent: true, opacity: 0.5 });
      const rainPoints = new THREE.Points(geometry, material);
      scene.add(rainPoints);
      rain.push(rainPoints);
    }

    if (types.includes('tunnel')) {
      tunnel = new THREE.Group();
      const geometry = new THREE.TorusGeometry(5, 0.05, 16, 100);
      const material = new THREE.MeshBasicMaterial({ color: colorPrimary });
      for (let i = 0; i < 20; i++) {
        const ring = new THREE.Mesh(geometry, material);
        ring.position.z = -i * 5;
        tunnel.add(ring);
      }
      scene.add(tunnel);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colorSecondary, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 8;
    camera.position.y = 1;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestID = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      group.rotation.y += 0.001;
      group.rotation.x += (mouseY - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX - group.rotation.y) * 0.05;
      
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(time + i) * 0.002;
      });

      stars.forEach(s => { s.rotation.y += 0.0005; });

      if (torus) {
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
      }

      if (sphere) {
        sphere.rotation.y += 0.005;
        sphere.rotation.x += 0.002;
      }

      if (dots) {
        dots.rotation.y -= 0.002;
      }

      if (waves && waves.geometry.attributes.position) {
        const positions = waves.geometry.attributes.position.array as Float32Array;
        const count = 50;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            const index = (i * count + j) * 3 + 1;
            positions[index] = Math.sin((i / 5) + time) + Math.sin((j / 5) + time);
          }
        }
        waves.geometry.attributes.position.needsUpdate = true;
      }

      rain.forEach(r => {
        const positions = r.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i+1] -= 0.2;
          if (positions[i+1] < -20) positions[i+1] = 20;
        }
        r.geometry.attributes.position.needsUpdate = true;
      });

      if (tunnel) {
        tunnel.children.forEach((ring) => {
          ring.position.z += 0.1;
          if (ring.position.z > 5) ring.position.z = -95;
          (ring as THREE.Mesh).rotation.z += 0.01;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(requestID);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [type]);

  return (
    <div 
      ref={containerRef} 
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100vw', height: '100vh', pointerEvents: 'none' }} 
    />
  );
};

export default Background;
