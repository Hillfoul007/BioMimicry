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
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4f8);
    scene.fog = new THREE.Fog(0xf0f4f8, 50, 200);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup - High quality rendering
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      precision: 'highp'
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    renderer.pixelRatio = window.devicePixelRatio;
    renderer.sortObjects = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Professional 4-point lighting setup
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(15, 15, 15);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.far = 100;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.7);
    fillLight.position.set(-15, 10, 10);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xFFD700, 0.5);
    rimLight.position.set(0, -15, 15);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
    topLight.position.set(0, 20, 0);
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add ground plane with gradient
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      metalness: 0.1,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -4;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create model
    const model = new THREE.Group();
    modelRef.current = model;
    scene.add(model);

    // Helper functions for model creation (defined first before use)
    const createTermiteMound = (group: THREE.Group) => {
      // Main mound body
      const moundGeometry = new THREE.SphereGeometry(2, 64, 64);
      const moundMaterial = new THREE.MeshStandardMaterial({
        color: 0xB8860B,
        roughness: 0.6,
        metalness: 0.1,
        map: null
      });
      const mound = new THREE.Mesh(moundGeometry, moundMaterial);
      mound.scale.set(1, 1.5, 1);
      mound.castShadow = true;
      mound.receiveShadow = true;
      group.add(mound);

      // Ventilation channels
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const height = Math.sin((i / 12) * Math.PI) * 2.5;
        const channelGeometry = new THREE.CylinderGeometry(0.35, 0.2, 2.2, 24);
        const channelMaterial = new THREE.MeshStandardMaterial({
          color: 0xA0522D,
          roughness: 0.5,
          metalness: 0.15
        });
        const channel = new THREE.Mesh(channelGeometry, channelMaterial);
        channel.position.set(
          Math.cos(angle) * 2.8,
          height,
          Math.sin(angle) * 2.8
        );
        channel.rotation.z = angle + Math.PI / 2;
        channel.castShadow = true;
        channel.receiveShadow = true;
        group.add(channel);
      }

      // Top spire
      const spireGeometry = new THREE.ConeGeometry(0.8, 1.5, 32);
      const spireMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.6,
        metalness: 0.1
      });
      const spire = new THREE.Mesh(spireGeometry, spireMaterial);
      spire.position.y = 2.5;
      spire.castShadow = true;
      spire.receiveShadow = true;
      group.add(spire);
    };

    const createGeckoFeet = (group: THREE.Group) => {
      // Main pad
      const padGeometry = new THREE.BoxGeometry(2.5, 1.8, 0.8);
      const padMaterial = new THREE.MeshStandardMaterial({
        color: 0xCD853F,
        roughness: 0.4,
        metalness: 0.1
      });
      const pad = new THREE.Mesh(padGeometry, padMaterial);
      pad.castShadow = true;
      pad.receiveShadow = true;
      group.add(pad);

      // Dense setae (hair-like structures)
      const setaeGeometry = new THREE.ConeGeometry(0.08, 1.2, 16);
      const setaeMaterial = new THREE.MeshStandardMaterial({
        color: 0xA0826D,
        roughness: 0.5,
        metalness: 0.05
      });

      for (let x = -1.1; x <= 1.1; x += 0.18) {
        for (let z = -0.3; z <= 0.3; z += 0.12) {
          const setae = new THREE.Mesh(setaeGeometry, setaeMaterial);
          setae.position.set(x, 1.2, z);
          setae.castShadow = true;
          setae.receiveShadow = true;
          group.add(setae);
        }
      }

      // Sub-structures (spatulae)
      const spatulaeGeometry = new THREE.BoxGeometry(0.06, 0.3, 0.06);
      const spatulaeMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B7355,
        roughness: 0.4,
        metalness: 0.1
      });

      for (let x = -0.8; x <= 0.8; x += 0.4) {
        for (let z = -0.2; z <= 0.2; z += 0.2) {
          const spatulae = new THREE.Mesh(spatulaeGeometry, spatulaeMaterial);
          spatulae.position.set(x, 1.8, z);
          spatulae.castShadow = true;
          spatulae.receiveShadow = true;
          group.add(spatulae);
        }
      }
    };

    const createWhaleBlade = (group: THREE.Group) => {
      // Main blade with smooth curve
      const points = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1.8, 0.05),
        new THREE.Vector2(2.0, 0.4),
        new THREE.Vector2(1.8, 0.75),
        new THREE.Vector2(0, 0.75),
      ];
      const bladeGeometry = new THREE.LatheGeometry(points, 64);
      const bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0x1E90FF,
        roughness: 0.3,
        metalness: 0.25,
      });
      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.castShadow = true;
      blade.receiveShadow = true;
      group.add(blade);

      // Tubercles (bumps) that improve hydrodynamics
      const tubercleGeometry = new THREE.SphereGeometry(0.32, 32, 32);
      const tubercleMaterial = new THREE.MeshStandardMaterial({
        color: 0x0047AB,
        roughness: 0.3,
        metalness: 0.35,
      });

      for (let i = 0; i < 20; i++) {
        const x = (i / 19) * 3.8 - 1.9;
        const tubercle = new THREE.Mesh(tubercleGeometry, tubercleMaterial);
        tubercle.position.set(x, 1.0, 0.12);
        tubercle.scale.set(1.3, 1.0, 0.85);
        tubercle.castShadow = true;
        tubercle.receiveShadow = true;
        group.add(tubercle);
      }
    };

    const createLotusLeaf = (group: THREE.Group) => {
      const leafGeometry = new THREE.PlaneGeometry(3.2, 3.2, 24, 24);
      const leafPositions = leafGeometry.attributes.position;
      const positionArray = leafPositions.array as Float32Array;

      for (let i = 0; i < positionArray.length; i += 3) {
        const x = positionArray[i];
        const y = positionArray[i + 1];
        const z = positionArray[i + 2];
        positionArray[i + 2] =
          z +
          Math.sin(x * 2.2) * 0.35 +
          Math.cos(y * 2.2) * 0.35 +
          Math.sin(x * 6) * Math.cos(y * 6) * 0.12;
      }
      leafPositions.needsUpdate = true;
      leafGeometry.computeVertexNormals();

      const leafMaterial = new THREE.MeshStandardMaterial({
        color: 0x22C55E,
        roughness: 0.4,
        metalness: 0.1,
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.castShadow = true;
      group.add(leaf);

      const bumpGeometry = new THREE.SphereGeometry(0.18, 16, 16);
      const bumpMaterial = new THREE.MeshStandardMaterial({
        color: 0x16A34A,
        roughness: 0.3,
        metalness: 0.05,
      });

      for (let x = -1.5; x <= 1.5; x += 0.7) {
        for (let y = -1.5; y <= 1.5; y += 0.7) {
          const bump = new THREE.Mesh(bumpGeometry, bumpMaterial);
          bump.position.set(x, y, 0.55 + Math.random() * 0.25);
          bump.castShadow = true;
          group.add(bump);
        }
      }
    };

    const createSpiderWeb = (group: THREE.Group) => {
      // Radial threads
      const radialThreadMaterial = new THREE.LineBasicMaterial({
        color: 0xF0F0F0,
        linewidth: 2,
        fog: false
      });

      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const points = [];
        for (let r = 0; r <= 2.5; r += 0.2) {
          points.push(
            new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0)
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, radialThreadMaterial);
        group.add(line);
      }

      // Spiral capture threads
      const spiralPoints = [];
      for (let i = 0; i < 200; i++) {
        const angle = (i / 200) * Math.PI * 12;
        const radius = (i / 200) * 2.5;
        spiralPoints.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
        );
      }
      const spiralMaterial = new THREE.LineBasicMaterial({
        color: 0xE0E0E0,
        linewidth: 1.5,
        fog: false
      });
      const spiralGeometry = new THREE.BufferGeometry().setFromPoints(spiralPoints);
      const spiral = new THREE.Line(spiralGeometry, spiralMaterial);
      group.add(spiral);

      // Dewdrops with refraction
      const dropletGeometry = new THREE.SphereGeometry(0.18, 32, 32);
      const dropletMaterial = new THREE.MeshStandardMaterial({
        color: 0xB0E0E6,
        roughness: 0.1,
        metalness: 0.3,
        emissive: 0x87CEEB,
        emissiveIntensity: 0.1
      });

      for (let i = 0; i < 32; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.5 + Math.random() * 1.8;
        const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial);
        droplet.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0.3
        );
        droplet.castShadow = true;
        droplet.receiveShadow = true;
        group.add(droplet);
      }
    };

    const createAbalonShell = (group: THREE.Group) => {
      const layers = 9;
      const hueVariations = [0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9];

      for (let layer = 0; layer < layers; layer++) {
        const shellGeometry = new THREE.BoxGeometry(
          2.8 - layer * 0.28,
          2.1 - layer * 0.24,
          0.15
        );
        const shellColor = new THREE.Color().setHSL(
          hueVariations[layer],
          0.85,
          0.48 + (layer / layers) * 0.35
        );
        const shellMaterial = new THREE.MeshStandardMaterial({
          color: shellColor,
          roughness: 0.25,
          metalness: 0.5,
        });
        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        shell.position.z = layer * 0.2;
        shell.rotation.z = (layer * Math.PI) / 16;
        shell.castShadow = true;
        group.add(shell);
      }

      // Add inner iridescent glow
      const iridGeometry = new THREE.SphereGeometry(1.4, 32, 32);
      const iridMaterial = new THREE.MeshStandardMaterial({
        color: 0x00E5FF,
        roughness: 0.15,
        metalness: 0.7,
        emissive: 0x00B8CC,
        emissiveIntensity: 0.2,
      });
      const iridescence = new THREE.Mesh(iridGeometry, iridMaterial);
      iridescence.scale.set(1, 0.8, 0.08);
      iridescence.castShadow = true;
      group.add(iridescence);
    };

    const createButterflyWing = (group: THREE.Group) => {
      const wingGeometry = new THREE.PlaneGeometry(2.8, 3.4);
      const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0xFF6B9D,
        roughness: 0.35,
        metalness: 0.15,
        side: THREE.DoubleSide,
      });
      const wing = new THREE.Mesh(wingGeometry, wingMaterial);
      wing.castShadow = true;
      group.add(wing);

      const spotGeometry = new THREE.CircleGeometry(0.3, 20);
      const spotColors = [0xFFD700, 0xFF4500, 0x4169E1, 0x32CD32, 0xFF69B4];

      const spotPositions = [
        [-0.9, 1.3],
        [0.9, 1.3],
        [-1.3, 0.2],
        [1.3, 0.2],
        [-0.7, -1.3],
        [0.7, -1.3],
        [0, 2.0],
        [0, -2.0],
        [-1, 0.8],
        [1, 0.8],
      ];

      spotPositions.forEach((pos, idx) => {
        const spotMaterial = new THREE.MeshStandardMaterial({
          color: spotColors[idx % spotColors.length],
          roughness: 0.3,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
        const spot = new THREE.Mesh(spotGeometry, spotMaterial);
        spot.position.set(pos[0], pos[1], 0.02);
        spot.castShadow = true;
        group.add(spot);
      });
    };

    const createMothEye = (group: THREE.Group) => {
      const eyeGeometry = new THREE.SphereGeometry(0.8, 32, 32);
      const eyeMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        shininess: 30,
      });
      const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      eye.castShadow = true;
      group.add(eye);

      const coneGeometry = new THREE.ConeGeometry(0.08, 0.2, 8);
      const coneMaterial = new THREE.MeshPhongMaterial({
        color: 0x2a2a4e,
        shininess: 20,
      });

      for (let i = 0; i < 40; i++) {
        const phi = Math.acos(-1 + (2 * i) / 40);
        const theta = Math.sqrt(40 * Math.PI) * phi;
        const x = 0.8 * Math.sin(phi) * Math.cos(theta);
        const y = 0.8 * Math.sin(phi) * Math.sin(theta);
        const z = 0.8 * Math.cos(phi);

        const cone = new THREE.Mesh(coneGeometry, coneMaterial);
        cone.position.set(x, y, z);
        cone.lookAt(0, 0, 0);
        cone.castShadow = true;
        group.add(cone);
      }
    };

    const createSharkSkin = (group: THREE.Group) => {
      // High-res skin with riblet patterns
      const skinGeometry = new THREE.PlaneGeometry(4.5, 2.8, 80, 50);
      const skinPositions = skinGeometry.attributes.position;
      const positionArray = skinPositions.array as Float32Array;

      // Add riblet texture
      for (let i = 0; i < positionArray.length; i += 3) {
        const x = positionArray[i];
        const y = positionArray[i + 1];
        // Directional riblets for hydrodynamic efficiency
        positionArray[i + 2] =
          positionArray[i + 2] +
          Math.sin(x * 12) * 0.08 +
          Math.cos(y * 8) * 0.05;
      }
      skinPositions.needsUpdate = true;
      skinGeometry.computeVertexNormals();

      const skinMaterial = new THREE.MeshStandardMaterial({
        color: 0x36454F,
        roughness: 0.45,
        metalness: 0.15
      });
      const skin = new THREE.Mesh(skinGeometry, skinMaterial);
      skin.castShadow = true;
      skin.receiveShadow = true;
      group.add(skin);

      // Placoid scales (dermal denticles)
      const denticleGeometry = new THREE.ConeGeometry(0.08, 0.25, 8);
      const denticleMaterial = new THREE.MeshStandardMaterial({
        color: 0x2F4F4F,
        roughness: 0.4,
        metalness: 0.2
      });

      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 15; j++) {
          const x = (i / 30) * 4 - 2;
          const y = (j / 15) * 2.5 - 1.25;
          const denticle = new THREE.Mesh(denticleGeometry, denticleMaterial);
          denticle.position.set(x + Math.random() * 0.1, y + Math.random() * 0.1, 0.15);
          denticle.rotation.z = Math.random() * Math.PI * 2;
          denticle.castShadow = true;
          denticle.receiveShadow = true;
          group.add(denticle);
        }
      }
    };

    const createBoneModel = (group: THREE.Group) => {
      // Cortical (dense outer) bone
      const corticalGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3.5, 48);
      const corticalMaterial = new THREE.MeshStandardMaterial({
        color: 0xF5DEB3,
        roughness: 0.4,
        metalness: 0.1
      });
      const cortical = new THREE.Mesh(corticalGeometry, corticalMaterial);
      cortical.castShadow = true;
      cortical.receiveShadow = true;
      group.add(cortical);

      // Trabecular (spongy inner) bone
      const trabecularGeometry = new THREE.CylinderGeometry(0.4, 0.4, 3.2, 48);
      const trabecularMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFE4B5,
        roughness: 0.5,
        metalness: 0.05
      });
      const trabecular = new THREE.Mesh(trabecularGeometry, trabecularMaterial);
      trabecular.castShadow = true;
      trabecular.receiveShadow = true;
      group.add(trabecular);

      // Growth rings showing structure
      for (let i = 0; i < 10; i++) {
        const ringGeometry = new THREE.TorusGeometry(0.38 - i * 0.03, 0.06, 32, 128);
        const ringMaterial = new THREE.MeshStandardMaterial({
          color: 0xD2B48C,
          roughness: 0.4,
          metalness: 0.15
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.z = -1.2 + i * 0.3;
        ring.castShadow = true;
        ring.receiveShadow = true;
        group.add(ring);
      }
    };

    const createHoneycomb = (group: THREE.Group) => {
      const cellSize = 0.55;
      const cols = 6;
      const rows = 5;

      for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            // Hexagonal packing layout
            const x = i * cellSize - (cellSize * cols) / 2 + (j % 2) * cellSize * 0.5;
            const y = j * cellSize * Math.sqrt(3) / 2 - (cellSize * rows) / 3;
            const z = layer * cellSize * 0.6;

            // High-res hexagon cells
            const hexGeometry = new THREE.CylinderGeometry(
              cellSize * 0.75,
              cellSize * 0.75,
              cellSize * 0.55,
              6
            );
            const hexMaterial = new THREE.MeshStandardMaterial({
              color: 0xFDB913,
              roughness: 0.3,
              metalness: 0.2
            });
            const hex = new THREE.Mesh(hexGeometry, hexMaterial);
            hex.position.set(x, y, z);
            hex.castShadow = true;
            hex.receiveShadow = true;
            group.add(hex);

            // Cell walls/edges for definition
            const wallGeometry = new THREE.CylinderGeometry(
              cellSize * 0.78,
              cellSize * 0.78,
              cellSize * 0.08,
              6
            );
            const wallMaterial = new THREE.MeshStandardMaterial({
              color: 0xDAA520,
              roughness: 0.4,
              metalness: 0.25
            });
            const wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(x, y, z + cellSize * 0.3);
            wall.castShadow = true;
            wall.receiveShadow = true;
            group.add(wall);
          }
        }
      }
    };

    const createDefaultOrganism = (group: THREE.Group) => {
      const geometry = new THREE.IcosahedronGeometry(1.5, 5);
      const material = new THREE.MeshStandardMaterial({
        color: 0x059669,
        roughness: 0.4,
        metalness: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      group.add(mesh);
    };

    // Create organism-specific models
    const createOrganismModel = () => {
      if (organism?.includes("Termite")) {
        createTermiteMound(model);
      } else if (organism?.includes("Gecko")) {
        createGeckoFeet(model);
      } else if (organism?.includes("Whale")) {
        createWhaleBlade(model);
      } else if (organism?.includes("Lotus")) {
        createLotusLeaf(model);
      } else if (organism?.includes("Spider")) {
        createSpiderWeb(model);
      } else if (organism?.includes("Abalone")) {
        createAbalonShell(model);
      } else if (organism?.includes("Butterfly")) {
        createButterflyWing(model);
      } else if (organism?.includes("Moth")) {
        createMothEye(model);
      } else if (organism?.includes("Shark")) {
        createSharkSkin(model);
      } else if (organism?.includes("Bone")) {
        createBoneModel(model);
      } else if (organism?.includes("Honeycomb")) {
        createHoneycomb(model);
      } else {
        createDefaultOrganism(model);
      }
    };

    createOrganismModel();

    // Animation loop with smooth rotation
    let animationId: number;
    let time = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 1 / 60; // 60 FPS

      if (modelRef.current) {
        modelRef.current.rotation.x = Math.sin(time * 0.3) * 0.3;
        modelRef.current.rotation.y += 0.008;
        modelRef.current.position.y = Math.sin(time * 0.5) * 0.3;
      }

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
      cancelAnimationFrame(animationId);
      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [organism, variant]);

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-slate-100 to-slate-50 rounded-lg border border-border overflow-hidden shadow-lg">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/90 backdrop-blur px-3 py-1.5 rounded-full font-medium">
        3D Rendering • Interactive
      </div>
    </div>
  );
}
