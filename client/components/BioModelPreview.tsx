import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface BioModelPreviewProps {
  organism?: string;
  modelName?: string;
  color?: string;
}

// Stunning biomimetic organisms to showcase
const BIO_SHOWCASE = [
  { organism: "Butterfly", color: 0xFF6B9D },
  { organism: "Honeycomb", color: 0xFDB913 },
  { organism: "Nautilus Shell", color: 0xE8B4B8 },
  { organism: "Lotus Leaf", color: 0x22C55E },
  { organism: "Peacock Feather", color: 0x00B4D8 },
];

export default function BioModelPreview({
  organism = BIO_SHOWCASE[0].organism,
  modelName = "Nature's Design",
  color = 0x059669,
}: BioModelPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelFetched, setModelFetched] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4f8);
    scene.fog = new THREE.Fog(0xf0f4f8, 100, 300);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer with high quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: "highp",
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.pixelRatio = window.devicePixelRatio;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting - Professional setup
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.8);
    fillLight.position.set(-10, 8, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xFFD700, 0.6);
    rimLight.position.set(0, -10, 15);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      metalness: 0.1,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -3;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create model group
    const model = new THREE.Group();
    modelRef.current = model;
    scene.add(model);

    // Load Sketchfab model
    const fetchAndLoadModel = async () => {
      try {
        const response = await fetch(
          `/api/sketchfab/search?organism=${encodeURIComponent(organism)}`
        );
        const data = await response.json();

        if (data.models && data.models.length > 0) {
          const selectedModel = data.models[0];

          // Get download URL
          const downloadResponse = await fetch(
            `/api/sketchfab/download/${selectedModel.uid}`
          );
          const downloadData = await downloadResponse.json();

          if (downloadData?.glbUrl) {
            const loader = new GLTFLoader();
            loader.load(
              downloadData.glbUrl,
              (gltf) => {
                const loadedModel = gltf.scene;
                loadedModel.scale.set(2, 2, 2);
                
                loadedModel.traverse((node) => {
                  if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                  }
                });

                model.add(loadedModel);
                setModelFetched(true);
                setIsLoading(false);
              },
              undefined,
              () => {
                // Fallback to procedural model
                createProceduralModel();
                setIsLoading(false);
              }
            );
            return;
          }
        }

        // Fallback to procedural
        createProceduralModel();
        setIsLoading(false);
      } catch (error) {
        console.warn("Model fetch failed, using procedural:", error);
        createProceduralModel();
        setIsLoading(false);
      }
    };

    // Create stunning procedural butterfly as fallback
    const createProceduralModel = () => {
      // Body
      const bodyGeometry = new THREE.CapsuleGeometry(0.2, 1.5, 4, 8);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x2c3e50,
        roughness: 0.4,
        metalness: 0.3,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      model.add(body);

      // Wings
      const wingGeometry = new THREE.PlaneGeometry(2.5, 3);
      const wingMaterial = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.2,
        side: THREE.DoubleSide,
      });

      // Left wing
      const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
      leftWing.position.set(-0.8, 0.2, 0);
      leftWing.rotation.z = Math.PI / 6;
      leftWing.castShadow = true;
      model.add(leftWing);

      // Right wing
      const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
      rightWing.position.set(0.8, 0.2, 0);
      rightWing.rotation.z = -Math.PI / 6;
      rightWing.scale.x = -1;
      rightWing.castShadow = true;
      model.add(rightWing);

      // Wing spots
      const spotGeometry = new THREE.CircleGeometry(0.25, 20);
      const spotMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFD700,
        roughness: 0.2,
        metalness: 0.3,
        emissive: 0xFFB900,
        emissiveIntensity: 0.3,
      });

      const spotPositions = [
        [-1.2, 1.2, 0.01],
        [-0.8, 0.5, 0.01],
        [1.2, 1.2, 0.01],
        [0.8, 0.5, 0.01],
      ];

      spotPositions.forEach((pos) => {
        const spot = new THREE.Mesh(spotGeometry, spotMaterial);
        spot.position.set(pos[0], pos[1], pos[2]);
        model.add(spot);
      });

      // Antennae
      const antennaGeometry = new THREE.CylinderGeometry(0.08, 0.05, 1.2, 8);
      const antennaMaterial = new THREE.MeshStandardMaterial({
        color: 0x34495e,
        roughness: 0.4,
      });

      const leftAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      leftAntenna.position.set(-0.15, 1, 0);
      leftAntenna.rotation.z = Math.PI / 3;
      leftAntenna.castShadow = true;
      model.add(leftAntenna);

      const rightAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      rightAntenna.position.set(0.15, 1, 0);
      rightAntenna.rotation.z = -Math.PI / 3;
      rightAntenna.castShadow = true;
      model.add(rightAntenna);
    };

    // Load model
    fetchAndLoadModel();

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 1 / 60;

      if (model) {
        // Rotate
        model.rotation.y += 0.005;
        
        // Float up and down
        model.position.y = Math.sin(time * 0.8) * 0.5;

        // Gentle wing flutter if butterfly
        if (!modelFetched && model.children.length > 0) {
          const children = model.children;
          if (children.length >= 3) {
            const leftWing = children[1];
            const rightWing = children[2];
            if (leftWing && rightWing) {
              leftWing.rotation.z = Math.PI / 6 + Math.sin(time * 3) * 0.2;
              rightWing.rotation.z = -Math.PI / 6 - Math.sin(time * 3) * 0.2;
            }
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [organism, color, modelFetched]);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 rounded-lg overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow">
      <div ref={containerRef} className="w-full h-full" />

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-sm text-muted-foreground font-medium">
            Loading {organism}...
          </p>
        </div>
      )}

      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-md">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide">
          {modelFetched ? "Sketchfab" : "Procedural"}
        </p>
        <p className="text-sm font-bold text-foreground">{organism}</p>
      </div>

      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full">
        <p className="text-xs text-muted-foreground font-medium">
          Interactive 3D • Drag to Rotate
        </p>
      </div>
    </div>
  );
}
