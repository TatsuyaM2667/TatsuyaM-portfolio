import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BackgroundProps {
  type?: string;
}

const Background = ({ type = 'grid-cubes' }: BackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || type === 'none') return;

    let requestID: number;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const cubes: THREE.Mesh[] = [];
    const stars: THREE.Points[] = [];
    let waves: THREE.Points | null = null;
    let torus: THREE.Mesh | null = null;

    if (type === 'grid' || type === 'grid-cubes') {
      const gridHelper = new THREE.GridHelper(30, 60, 0xbb9af7, 0x414868);
      gridHelper.position.y = -3;
      group.add(gridHelper);
    }

    if (type === 'cubes' || type === 'grid-cubes') {
      const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      for (let i = 0; i < 60; i++) {
        const material = new THREE.MeshPhongMaterial({
          color: i % 3 === 0 ? 0xbb9af7 : i % 3 === 1 ? 0x7aa2f7 : 0x73daca,
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
    } else if (type === 'stars') {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

      const starVertices = [];
      for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        starVertices.push(x, y, z);
      }

      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const starPoints = new THREE.Points(starGeometry, starMaterial);
      scene.add(starPoints);
      stars.push(starPoints);
    } else if (type === 'torus') {
      const geometry = new THREE.TorusKnotGeometry(2, 0.6, 128, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xbb9af7, 
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      torus = new THREE.Mesh(geometry, material);
      group.add(torus);
    } else if (type === 'waves') {
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
      const material = new THREE.PointsMaterial({ color: 0x7aa2f7, size: 0.1 });
      waves = new THREE.Points(geometry, material);
      waves.position.y = -2;
      group.add(waves);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x7aa2f7, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;
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
      group.rotation.y += 0.001;
      group.rotation.x += (mouseY - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX - group.rotation.y) * 0.05;
      
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });

      if (type === 'stars') {
        stars.forEach(s => {
          s.rotation.y += 0.0005;
        });
      }

      if (torus) {
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
      }

      if (waves && waves.geometry.attributes.position) {
        const positions = waves.geometry.attributes.position.array as Float32Array;
        const count = 50;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            const index = (i * count + j) * 3 + 1;
            positions[index] = Math.sin((i / 5) + (Date.now() * 0.001)) + Math.sin((j / 5) + (Date.now() * 0.001));
          }
        }
        waves.geometry.attributes.position.needsUpdate = true;
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
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        } else if (object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
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
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: -1, /* Behind everything */
        width: '100vw', 
        height: '100vh', 
        pointerEvents: 'none',
      }} 
    />
  );
};

export default Background;
