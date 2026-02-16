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
  const envMapRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ========== ADVANCED SCENE SETUP ==========
    const scene = new THREE.Scene();

    sceneRef.current = scene;

    // Create advanced gradient environment
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, "#e8f4f8");
      gradient.addColorStop(0.5, "#f0f9fc");
      gradient.addColorStop(1, "#d4f1f9");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
    }
    const bgTexture = new THREE.CanvasTexture(canvas);
    scene.background = bgTexture;

    // ========== ADVANCED CAMERA ==========
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      2000
    );

    camera.position.z = 8;
    cameraRef.current = camera;

    // ========== ADVANCED RENDERER ==========
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: "highp",
      powerPreference: "high-performance",
    });

    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    renderer.shadowMap.autoUpdate = true;

    renderer.pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ========== ADVANCED LIGHTING SETUP ==========
    // Key light (main illumination)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(12, 15, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 4096;
    keyLight.shadow.mapSize.height = 4096;
    keyLight.shadow.camera.far = 100;
    keyLight.shadow.camera.left = -20;
    keyLight.shadow.camera.right = 20;
    keyLight.shadow.camera.top = 20;
    keyLight.shadow.camera.bottom = -20;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Fill light (soften shadows)
    const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.6);
    fillLight.position.set(-15, 10, -10);
    scene.add(fillLight);

    // Rim light (edge highlights)
    const rimLight = new THREE.DirectionalLight(0x66BB6A, 0.4);
    rimLight.position.set(15, -5, 15);
    scene.add(rimLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Point lights for dynamic lighting
    const pointLight1 = new THREE.PointLight(0xffffff, 0.3);
    pointLight1.position.set(-10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x87CEEB, 0.2);
    pointLight2.position.set(10, -10, 10);
    scene.add(pointLight2);

    // ========== ADVANCED MATERIAL CREATION ==========
    const createAdvancedMaterial = (
      baseColor: number,
      metalness: number = 0.3,
      roughness: number = 0.6
    ) => {
      return new THREE.MeshStandardMaterial({
        color: baseColor,
        metalness: metalness,
        roughness: roughness,
        envMapIntensity: 1.0,
      });
    };

    // ========== HIGH-QUALITY ORGANISM MODELS ==========
    const createOrganismModel = () => {
      const group = new THREE.Group();

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

    // Create organism-specific models
    const createOrganismModel = () => {
      if (organism?.includes("Termite")) {

        createTermiteMound(group);
      } else if (organism?.includes("Gecko")) {
        createGeckoFeet(group);
      } else if (organism?.includes("Whale")) {
        createWhaleBlade(group);
      } else if (organism?.includes("Lotus")) {
        createLotusLeaf(group);
      } else if (organism?.includes("Spider")) {
        createSpiderWeb(group);
      } else if (organism?.includes("Abalone")) {
        createAbalonShell(group);
      } else if (organism?.includes("Butterfly")) {
        createButterflyWing(group);
      } else if (organism?.includes("Shark")) {
        createSharkSkin(group);
      } else if (organism?.includes("Penguin")) {
        createPenguin(group);
      } else if (organism?.includes("Cactus")) {
        createCactus(group);
      } else if (organism?.includes("Dolphin")) {
        createDolphinHead(group);
      } else {
        createDefaultOrganism(group);

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

    // Helper functions for model creation
    const createTermiteMound = (group: THREE.Group) => {

      // Main mound with high-detail geometry
      const moundGeometry = new THREE.IcosahedronGeometry(1.8, 5);
      const moundMaterial = createAdvancedMaterial(0x8B6F47, 0.1, 0.8);
      const mound = new THREE.Mesh(moundGeometry, moundMaterial);
      mound.scale.y = 1.5;
      mound.castShadow = true;
      mound.receiveShadow = true;
      group.add(mound);

      // Spiral ventilation with higher detail
      const spiralCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -3, 0),
        new THREE.Vector3(2, -2, 0.5),
        new THREE.Vector3(2.5, 0, 1.5),
        new THREE.Vector3(2, 2, 1.8),
        new THREE.Vector3(0.5, 2.5, 1),
        new THREE.Vector3(0, 3, 0),
      ]);

      const tubeGeometry = new THREE.TubeGeometry(spiralCurve, 40, 0.5, 12);
      const tubeMaterial = createAdvancedMaterial(0x9B5523, 0.2, 0.7);

      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      tube.castShadow = true;
      tube.receiveShadow = true;
      group.add(tube);


      // High-detail branching channels
      for (let i = 0; i < 14; i++) {
        const angle = (i / 14) * Math.PI * 2;
        const height = Math.sin((i / 14) * Math.PI) * 2.8;

        const channelGeometry = new THREE.CylinderGeometry(0.25, 0.18, 2.2, 16);
        const channelMaterial = createAdvancedMaterial(0xA0622D, 0.15, 0.75);
        const channel = new THREE.Mesh(channelGeometry, channelMaterial);
        channel.position.set(
          Math.cos(angle) * 2.6,
          height - 0.8,
          Math.sin(angle) * 2.6

        );
        channel.rotation.z = angle + Math.PI / 2;
        channel.castShadow = true;
        channel.receiveShadow = true;
        group.add(channel);
      }

    };

    const createGeckoFeet = (group: THREE.Group) => {
      // High-poly main foot pad
      const padGeometry = new THREE.BoxGeometry(2.4, 1.4, 0.7);
      const padMaterial = createAdvancedMaterial(0xD4A574, 0.2, 0.5);

      const pad = new THREE.Mesh(padGeometry, padMaterial);
      pad.castShadow = true;
      pad.receiveShadow = true;
      group.add(pad);


      // Detailed micro-scale bristles
      const bristleGeometry = new THREE.ConeGeometry(0.09, 1.5, 16);
      const bristleMaterial = createAdvancedMaterial(0xA68B5B, 0.1, 0.6);

      for (let x = -1; x <= 1; x += 0.2) {
        for (let z = -0.3; z <= 0.3; z += 0.1) {
          const bristle = new THREE.Mesh(bristleGeometry, bristleMaterial);
          bristle.position.set(x, 0.9, z);

          bristle.castShadow = true;
          group.add(bristle);
        }
      }


      // Sub-bristles for hierarchical detail
      const subBristleGeometry = new THREE.ConeGeometry(0.04, 0.7, 10);
      const subBristleMaterial = createAdvancedMaterial(0x8B7355, 0.05, 0.7);

      for (let x = -0.8; x <= 0.8; x += 0.4) {
        for (let z = -0.15; z <= 0.15; z += 0.15) {
          const subbristle = new THREE.Mesh(subBristleGeometry, subBristleMaterial);
          subbristle.position.set(x, 1.6, z);
          subbristle.scale.set(0.7, 0.7, 0.7);

          subbristle.castShadow = true;
          group.add(subbristle);
        }
      }

      // Contact surface
      const contactGeometry = new THREE.BoxGeometry(2.3, 1.3, 0.15);
      const contactMaterial = createAdvancedMaterial(0xC4975A, 0.3, 0.4);
      const contact = new THREE.Mesh(contactGeometry, contactMaterial);
      contact.position.y = -0.8;
      contact.castShadow = true;
      group.add(contact);
    };

    const createWhaleBlade = (group: THREE.Group) => {

      // High-detail main blade
      const bladeGeometry = new THREE.BoxGeometry(3.8, 0.9, 0.5);
      const bladeMaterial = createAdvancedMaterial(0x4A90E2, 0.4, 0.35);

      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.castShadow = true;
      blade.receiveShadow = true;
      group.add(blade);


      // Detailed tubercles
      const tubercleGeometry = new THREE.IcosahedronGeometry(0.28, 4);
      const tubercleMaterial = createAdvancedMaterial(0x2E5C8A, 0.35, 0.4);

      for (let i = 0; i < 18; i++) {
        const x = (i / 17) * 3.6 - 1.8;
        const tubercle = new THREE.Mesh(tubercleGeometry, tubercleMaterial);
        tubercle.position.set(x, 0.6, 0.2);
        tubercle.scale.set(1.1, 0.75, 0.55);
        tubercle.castShadow = true;
        group.add(tubercle);
      }

      // Vein structure
      for (let i = 0; i < 12; i++) {
        const x = (i / 11) * 3.6 - 1.8;
        const veinGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.7, 12);
        const veinMaterial = createAdvancedMaterial(0x3a5f7d, 0.2, 0.6);
        const vein = new THREE.Mesh(veinGeometry, veinMaterial);
        vein.position.set(x, 0, 0.08);
        vein.rotation.z = Math.PI / 2;
        vein.castShadow = true;
        group.add(vein);
      }

      // Edge highlight
      const edgeGeometry = new THREE.BoxGeometry(3.7, 0.06, 0.35);
      const edgeMaterial = createAdvancedMaterial(0x5A9FE2, 0.6, 0.25);
      const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
      edge.position.y = 0.48;
      edge.castShadow = true;
      group.add(edge);
    };

    const createLotusLeaf = (group: THREE.Group) => {
      // High-detail leaf surface
      const leafGeometry = new THREE.PlaneGeometry(3.5, 3.5, 32, 32);
      const leafPositions = leafGeometry.attributes.position;
      const positionArray = leafPositions.array as Float32Array;

      // Create organic wavy shape

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

      // Veins for organic look
      const veinMaterial = new THREE.LineBasicMaterial({
        color: 0x1e8449,
        linewidth: 3,
      });
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const points = [];
        for (let r = 0; r <= 1.7; r += 0.2) {
          points.push(
            new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0.4)
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, veinMaterial);
        group.add(line);
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
        const spiral = new THREE.Line(spiralGeometry, threadMaterial);
        group.add(spiral);
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

    // ========== CLEANUP ==========
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
