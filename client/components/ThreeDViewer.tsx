import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeDViewerProps {
  variant?: string;
  organism?: string;
}

export default function ThreeDViewer({ variant, organism }: ThreeDViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create biomimetic geometry based on variant
    const createBiomimeticGeometry = () => {
      const group = new THREE.Group();

      if (organism?.includes("Termite")) {
        // Spiral ventilation structure
        const spiralGeometry = new THREE.BufferGeometry();
        const points: THREE.Vector3[] = [];

        for (let i = 0; i < 100; i++) {
          const angle = (i / 100) * Math.PI * 4;
          const radius = 2;
          const x = Math.cos(angle) * radius;
          const y = i / 50 - 1;
          const z = Math.sin(angle) * radius;
          points.push(new THREE.Vector3(x, y, z));
        }

        spiralGeometry.setFromPoints(points);
        const spiralMaterial = new THREE.LineBasicMaterial({ color: 0x2d9e6f });
        const spiral = new THREE.Line(spiralGeometry, spiralMaterial);
        group.add(spiral);

        // Add tubes for ventilation
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const tubeGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 16);
          const tubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x4a9d6f,
            wireframe: false,
          });
          const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
          tube.position.set(
            Math.cos(angle) * 1.5,
            0,
            Math.sin(angle) * 1.5
          );
          tube.castShadow = true;
          group.add(tube);
        }
      } else if (organism?.includes("Gecko")) {
        // Micro-bristles structure
        for (let i = 0; i < 30; i++) {
          const x = (Math.random() - 0.5) * 3;
          const y = (Math.random() - 0.5) * 3;
          const z = Math.random() * 0.5;

          const bristleGeometry = new THREE.CylinderGeometry(0.02, 0.03, 1, 8);
          const bristleMaterial = new THREE.MeshPhongMaterial({
            color: 0xf39c12,
          });
          const bristle = new THREE.Mesh(bristleGeometry, bristleMaterial);
          bristle.position.set(x, y, z);
          bristle.castShadow = true;
          group.add(bristle);
        }
      } else if (organism?.includes("Whale")) {
        // Tubercle pattern on blade
        const bladeGeometry = new THREE.BoxGeometry(3, 1, 0.2);
        const bladeMaterial = new THREE.MeshPhongMaterial({
          color: 0x3498db,
        });
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade.castShadow = true;
        group.add(blade);

        // Add tubercles
        for (let i = 0; i < 12; i++) {
          const tubercleGeometry = new THREE.SphereGeometry(0.15, 16, 16);
          const tubercleMaterial = new THREE.MeshPhongMaterial({
            color: 0x2980b9,
          });
          const tubercle = new THREE.Mesh(tubercleGeometry, tubercleMaterial);
          tubercle.position.set((i / 12) * 2.5 - 1.25, 0.5, 0);
          tubercle.castShadow = true;
          group.add(tubercle);
        }
      } else {
        // Default geometric structure
        const geometry = new THREE.IcosahedronGeometry(1, 4);
        const material = new THREE.MeshPhongMaterial({
          color: 0x2d9e6f,
          wireframe: false,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        group.add(mesh);
      }

      return group;
    };

    const biomimeticModel = createBiomimeticGeometry();
    scene.add(biomimeticModel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the model
      biomimeticModel.rotation.x += 0.005;
      biomimeticModel.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [organism, variant]);

  return (
    <div
      ref={containerRef}
      className="w-full h-96 bg-gradient-to-b from-slate-100 to-slate-50 rounded-lg border border-border overflow-hidden"
    />
  );
}
