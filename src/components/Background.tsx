import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Group to hold everything
    const group = new THREE.Group();
    scene.add(group);

    // Digital Grid
    const gridHelper = new THREE.GridHelper(30, 60, 0xbb9af7, 0x414868);
    gridHelper.position.y = -3;
    group.add(gridHelper);

    // Floating Cubes
    const cubes: THREE.Mesh[] = [];
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    
    for (let i = 0; i < 60; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: i % 3 === 0 ? 0xbb9af7 : i % 3 === 1 ? 0x7aa2f7 : 0x73daca,
        transparent: true,
        opacity: 0.6,
        shininess: 100
      });
      const cube = new THREE.Mesh(geometry, material);
      
      cube.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(cube);
      cubes.push(cube);
    }

    // Lights
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

    window.addEventListener('resize', handleResize);

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      group.rotation.y += 0.001;
      group.rotation.x += (mouseY - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX - group.rotation.y) * 0.05;

      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      cubes.forEach(c => (c.material as THREE.Material).dispose());
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100vw', height: '100vh', pointerEvents: 'none', background: 'radial-gradient(circle at center, #1a1b26 0%, #0a0b10 100%)' }} />;
};

export default Background;
