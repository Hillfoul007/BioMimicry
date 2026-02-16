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
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Renderer setup - Enhanced for better quality
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.pixelRatio = Math.min(window.devicePixelRatio, 2);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced Lighting - 3-point light setup
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(10, 10, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x4a90e2, 0.5);
    fillLight.position.set(-8, 5, 8);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xff6b9d, 0.3);
    backLight.position.set(0, -10, -10);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add ground plane for shadows
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -3;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create model
    const model = new THREE.Group();
    modelRef.current = model;
    scene.add(model);

    // Helper functions for model creation (defined first before use)
    const createTermiteMound = (group: THREE.Group) => {
      const spiralCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -2.5, 0),
        new THREE.Vector3(1.8, -1.8, 0.2),
        new THREE.Vector3(2.3, -0.3, 1.2),
        new THREE.Vector3(2, 0.8, 1.8),
        new THREE.Vector3(1, 2, 1.5),
        new THREE.Vector3(0.2, 2.5, 0.5),
      ]);

      const tubeGeometry = new THREE.TubeGeometry(spiralCurve, 30, 0.5, 8);
      const tubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xA0522D,
        shininess: 20,
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      tube.castShadow = true;
      group.add(tube);

      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const height = Math.sin((i / 10) * Math.PI) * 2.2;
        const channelGeometry = new THREE.CylinderGeometry(0.25, 0.15, 1.8, 16);
        const channelMaterial = new THREE.MeshPhongMaterial({
          color: 0x9B5523,
          shininess: 15,
        });
        const channel = new THREE.Mesh(channelGeometry, channelMaterial);
        channel.position.set(
          Math.cos(angle) * 2.5,
          height - 0.5,
          Math.sin(angle) * 2.5
        );
        channel.rotation.z = angle + Math.PI / 2;
        channel.castShadow = true;
        group.add(channel);
      }

      const moundGeometry = new THREE.SphereGeometry(1.6, 48, 48);
      const moundMaterial = new THREE.MeshPhongMaterial({
        color: 0xA0522D,
        shininess: 10,
      });
      const mound = new THREE.Mesh(moundGeometry, moundMaterial);
      mound.scale.y = 1.35;
      mound.castShadow = true;
      group.add(mound);
    };

    const createGeckoFeet = (group: THREE.Group) => {
      const padGeometry = new THREE.BoxGeometry(2.2, 1.4, 0.6);
      const padMaterial = new THREE.MeshPhongMaterial({
        color: 0xD4A574,
        shininess: 25,
      });
      const pad = new THREE.Mesh(padGeometry, padMaterial);
      pad.castShadow = true;
      group.add(pad);

      const bristleGeometry = new THREE.ConeGeometry(0.1, 1.4, 12);
      const bristleMaterial = new THREE.MeshPhongMaterial({
        color: 0xA68B5B,
        shininess: 20,
      });

      for (let x = -0.95; x <= 0.95; x += 0.25) {
        for (let z = -0.25; z <= 0.25; z += 0.12) {
          const bristle = new THREE.Mesh(bristleGeometry, bristleMaterial);
          bristle.position.set(x, 0.8, z);
          bristle.castShadow = true;
          group.add(bristle);
        }
      }

      const subBristleGeometry = new THREE.ConeGeometry(0.04, 0.8, 8);
      const subBristleMaterial = new THREE.MeshPhongMaterial({
        color: 0x8B7355,
        shininess: 15,
      });

      for (let x = -0.7; x <= 0.7; x += 0.7) {
        for (let z = -0.15; z <= 0.15; z += 0.15) {
          const subbristle = new THREE.Mesh(subBristleGeometry, subBristleMaterial);
          subbristle.position.set(x, 1.5, z);
          subbristle.scale.set(0.6, 0.6, 0.6);
          subbristle.castShadow = true;
          group.add(subbristle);
        }
      }
    };

    const createWhaleBlade = (group: THREE.Group) => {
      const points = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1.5, 0),
        new THREE.Vector2(1.8, 0.3),
        new THREE.Vector2(1.5, 0.6),
        new THREE.Vector2(0, 0.6),
      ];
      const bladeGeometry = new THREE.LatheGeometry(points, 32);
      const bladeMaterial = new THREE.MeshPhongMaterial({
        color: 0x4A90E2,
        shininess: 40,
      });
      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.castShadow = true;
      group.add(blade);

      const tubercleGeometry = new THREE.IcosahedronGeometry(0.24, 3);
      const tubercleMaterial = new THREE.MeshPhongMaterial({
        color: 0x2E5C8A,
        shininess: 35,
      });

      for (let i = 0; i < 16; i++) {
        const x = (i / 15) * 3.4 - 1.7;
        const tubercle = new THREE.Mesh(tubercleGeometry, tubercleMaterial);
        tubercle.position.set(x, 0.75, 0.05);
        tubercle.scale.set(1.1, 0.9, 0.7);
        tubercle.castShadow = true;
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

      const leafMaterial = new THREE.MeshPhongMaterial({
        color: 0x2ECC71,
        shininess: 60,
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.castShadow = true;
      group.add(leaf);

      const bumpGeometry = new THREE.SphereGeometry(0.18, 16, 16);
      const bumpMaterial = new THREE.MeshPhongMaterial({
        color: 0x27AE60,
        shininess: 50,
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
      const threadMaterial = new THREE.LineBasicMaterial({
        color: 0xE8E8E8,
        linewidth: 3,
      });

      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const points = [];
        for (let r = 0; r <= 2.2; r += 0.25) {
          points.push(
            new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0)
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, threadMaterial);
        group.add(line);
      }

      const spiralPoints = [];
      for (let i = 0; i < 150; i++) {
        const angle = (i / 150) * Math.PI * 10;
        const radius = (i / 150) * 2.2;
        spiralPoints.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
        );
      }
      const spiralGeometry = new THREE.BufferGeometry().setFromPoints(spiralPoints);
      const spiral = new THREE.Line(spiralGeometry, threadMaterial);
      group.add(spiral);

      const dropletGeometry = new THREE.SphereGeometry(0.14, 16, 16);
      const dropletMaterial = new THREE.MeshPhongMaterial({
        color: 0xB0E0E6,
        shininess: 80,
      });

      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 2;
        const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial);
        droplet.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0.25
        );
        droplet.castShadow = true;
        group.add(droplet);
      }
    };

    const createAbalonShell = (group: THREE.Group) => {
      const layers = 7;
      for (let layer = 0; layer < layers; layer++) {
        const shellGeometry = new THREE.BoxGeometry(
          2.6 - layer * 0.25,
          1.9 - layer * 0.22,
          0.18
        );
        const shellColor = new THREE.Color().setHSL(
          0.6,
          0.8,
          0.5 + (layer / layers) * 0.3
        );
        const shellMaterial = new THREE.MeshPhongMaterial({
          color: shellColor,
          shininess: 100 + layer * 10,
        });
        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        shell.position.z = layer * 0.22;
        shell.rotation.z = (layer * Math.PI) / 18;
        shell.castShadow = true;
        group.add(shell);
      }

      const iridGeometry = new THREE.SphereGeometry(1.3, 40, 40);
      const iridMaterial = new THREE.MeshPhongMaterial({
        color: 0x00CED1,
        shininess: 120,
      });
      const iridescence = new THREE.Mesh(iridGeometry, iridMaterial);
      iridescence.scale.set(1, 0.75, 0.1);
      iridescence.castShadow = true;
      group.add(iridescence);
    };

    const createButterflyWing = (group: THREE.Group) => {
      const wingGeometry = new THREE.PlaneGeometry(2.8, 3.4);
      const wingMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF6B9D,
        shininess: 50,
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
        const spotMaterial = new THREE.MeshPhongMaterial({
          color: spotColors[idx % spotColors.length],
          shininess: 40,
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
      const skinGeometry = new THREE.PlaneGeometry(4, 2.5, 40, 25);
      const skinPositions = skinGeometry.attributes.position;
      const positionArray = skinPositions.array as Float32Array;

      for (let i = 0; i < positionArray.length; i += 3) {
        const x = positionArray[i];
        positionArray[i + 2] = positionArray[i + 2] + Math.sin(x * 10) * 0.1;
      }
      skinPositions.needsUpdate = true;
      skinGeometry.computeVertexNormals();

      const skinMaterial = new THREE.MeshPhongMaterial({
        color: 0x4A4A4A,
        shininess: 35,
      });
      const skin = new THREE.Mesh(skinGeometry, skinMaterial);
      skin.castShadow = true;
      group.add(skin);
    };

    const createBoneModel = (group: THREE.Group) => {
      const corticalGeometry = new THREE.CylinderGeometry(0.4, 0.4, 3, 32);
      const corticalMaterial = new THREE.MeshPhongMaterial({
        color: 0xDCCCC0,
        shininess: 30,
      });
      const cortical = new THREE.Mesh(corticalGeometry, corticalMaterial);
      cortical.castShadow = true;
      group.add(cortical);

      const trabecularGeometry = new THREE.CylinderGeometry(0.35, 0.35, 2.8, 32);
      const trabecularMaterial = new THREE.MeshPhongMaterial({
        color: 0xE8D7C7,
        shininess: 20,
      });
      const trabecular = new THREE.Mesh(trabecularGeometry, trabecularMaterial);
      trabecular.castShadow = true;
      group.add(trabecular);

      for (let i = 0; i < 8; i++) {
        const ringGeometry = new THREE.TorusGeometry(0.32 - i * 0.02, 0.05, 16, 100);
        const ringMaterial = new THREE.LineBasicMaterial({
          color: 0x8B7D6B,
          linewidth: 1,
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.z = -1 + i * 0.35;
        group.add(ring);
      }
    };

    const createHoneycomb = (group: THREE.Group) => {
      const cellSize = 0.5;
      const cells = 5;

      for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < cells; i++) {
          for (let j = 0; j < cells; j++) {
            const x = i * cellSize - (cellSize * cells) / 2;
            const y =
              j * cellSize * Math.sqrt(3) / 2 - (cellSize * cells) / 3;
            const z = layer * cellSize * 0.5;

            const hexGeometry = new THREE.CylinderGeometry(
              cellSize * 0.8,
              cellSize * 0.8,
              cellSize * 0.6,
              6
            );
            const hexMaterial = new THREE.MeshPhongMaterial({
              color: 0xFFE680,
              shininess: 40,
            });
            const hex = new THREE.Mesh(hexGeometry, hexMaterial);
            hex.position.set(x, y, z);
            hex.castShadow = true;
            group.add(hex);
          }
        }
      }
    };

    const createDefaultOrganism = (group: THREE.Group) => {
      const geometry = new THREE.IcosahedronGeometry(1.5, 5);
      const material = new THREE.MeshPhongMaterial({
        color: 0x2d9e6f,
        shininess: 45,
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

    // Animation loop with smooth rotation and mouse control
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.x += 0.003;
        modelRef.current.rotation.y += 0.007;
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
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
        🔄 Rotating | 🎨 High-quality render
      </div>
    </div>
  );
}
