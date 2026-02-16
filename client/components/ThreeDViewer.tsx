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

      return group;
    };

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

        const distance = Math.sqrt(x * x + y * y);
        positionArray[i + 2] =
          z +
          Math.sin(x * 2.5) * 0.4 +
          Math.cos(y * 2.5) * 0.4 +
          Math.sin(distance * 1.5) * 0.25 +
          (Math.random() - 0.5) * 0.12;
      }
      leafPositions.needsUpdate = true;
      leafGeometry.computeVertexNormals();

      const leafMaterial = createAdvancedMaterial(0x2ECC71, 0.25, 0.35);
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.castShadow = true;
      leaf.receiveShadow = true;
      group.add(leaf);

      // Detailed micro-bumps
      const bumpGeometry = new THREE.IcosahedronGeometry(0.18, 3);
      const bumpMaterial = createAdvancedMaterial(0x27AE60, 0.2, 0.45);

      for (let x = -1.7; x <= 1.7; x += 0.7) {
        for (let y = -1.7; y <= 1.7; y += 0.7) {
          const bump = new THREE.Mesh(bumpGeometry, bumpMaterial);
          bump.position.set(
            x,
            y,
            0.7 + Math.random() * 0.3 + Math.sin(x) * 0.15
          );
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
        linewidth: 2,
      });

      // Radial threads
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const points = [];
        for (let r = 0; r <= 2.5; r += 0.25) {
          points.push(
            new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0)
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, threadMaterial);
        group.add(line);
      }

      // Spiral threads
      for (let ring = 0; ring < 10; ring++) {
        const spiralPoints = [];
        const startRadius = ring * 0.3;
        for (let i = 0; i < 80; i++) {
          const angle = (i / 80) * Math.PI * 2;
          spiralPoints.push(
            new THREE.Vector3(
              Math.cos(angle) * (startRadius + 0.3),
              Math.sin(angle) * (startRadius + 0.3),
              0
            )
          );
        }
        const spiralGeometry = new THREE.BufferGeometry().setFromPoints(
          spiralPoints
        );
        const spiral = new THREE.Line(spiralGeometry, threadMaterial);
        group.add(spiral);
      }

      // High-detail droplets
      const dropletGeometry = new THREE.IcosahedronGeometry(0.16, 4);
      const dropletMaterial = createAdvancedMaterial(0xB0E0E6, 0.8, 0.1);

      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.4 + Math.random() * 2;
        const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial);
        droplet.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0.3
        );
        droplet.castShadow = true;
        group.add(droplet);
      }
    };

    const createAbalonShell = (group: THREE.Group) => {
      // Layered nacre with iridescence
      const layers = 8;
      for (let layer = 0; layer < layers; layer++) {
        const shellGeometry = new THREE.IcosahedronGeometry(
          1.6 - layer * 0.18,
          4
        );
        const t = layer / (layers - 1);
        const shellColor = new THREE.Color(0xffffff).lerpColors(
          new THREE.Color(0x4B0082),
          new THREE.Color(0x00CED1),
          t
        );

        const shellMaterial = createAdvancedMaterial(shellColor.getHex(), 0.7 + t * 0.2, 0.2 - t * 0.1);
        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        shell.position.z = layer * 0.2;
        shell.rotation.z = (layer * Math.PI) / 16;
        shell.castShadow = true;
        group.add(shell);
      }
    };

    const createButterflyWing = (group: THREE.Group) => {
      const wingGeometry = new THREE.PlaneGeometry(3, 3.5);
      const wingMaterial = createAdvancedMaterial(0xFF6B9D, 0.3, 0.5);
      const wing = new THREE.Mesh(wingGeometry, wingMaterial);
      wing.castShadow = true;
      group.add(wing);

      // Detailed iridescent spots
      const spotGeometry = new THREE.CircleGeometry(0.32, 24);
      const spotData = [
        { color: 0xFFD700, pos: [-1, 1.4] },
        { color: 0xFF4500, pos: [1, 1.4] },
        { color: 0x4169E1, pos: [-1.4, 0] },
        { color: 0x32CD32, pos: [1.4, 0] },
        { color: 0xFF1493, pos: [-0.8, -1.4] },
        { color: 0x00CED1, pos: [0.8, -1.4] },
      ];

      spotData.forEach((spot) => {
        const spotMaterial = createAdvancedMaterial(spot.color, 0.5, 0.35);
        const marker = new THREE.Mesh(spotGeometry, spotMaterial);
        marker.position.set(spot.pos[0], spot.pos[1], 0.05);
        marker.castShadow = true;
        group.add(marker);
      });
    };

    const createSharkSkin = (group: THREE.Group) => {
      const bodyGeometry = new THREE.ConeGeometry(0.9, 3.5, 20);
      const bodyMaterial = createAdvancedMaterial(0x4A4A4A, 0.3, 0.65);
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      // Riblet pattern
      const ribletMaterial = new THREE.LineBasicMaterial({
        color: 0x2A2A2A,
        linewidth: 1,
      });
      for (let i = 0; i < 24; i++) {
        const points = [];
        for (let t = 0; t <= 1; t += 0.1) {
          const y = -1.75 + t * 3.5;
          const angle = (i / 24) * Math.PI * 2;
          const radius = 0.9 * (1 - Math.abs(t - 0.5) * 0.6);
          points.push(
            new THREE.Vector3(
              Math.cos(angle) * radius,
              y,
              Math.sin(angle) * radius
            )
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, ribletMaterial);
        group.add(line);
      }
    };

    const createPenguin = (group: THREE.Group) => {
      const bodyGeometry = new THREE.CapsuleGeometry(0.45, 1.8, 8, 16);
      const bodyMaterial = createAdvancedMaterial(0x000000, 0.2, 0.65);
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      group.add(body);

      const headGeometry = new THREE.SphereGeometry(0.5, 20, 20);
      const headMaterial = createAdvancedMaterial(0x1a1a1a, 0.2, 0.65);
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 1.3;
      head.castShadow = true;
      group.add(head);

      const bellyGeometry = new THREE.IcosahedronGeometry(0.42, 4);
      const bellyMaterial = createAdvancedMaterial(0xFFFFFF, 0.1, 0.75);
      const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
      belly.scale.set(0.75, 0.95, 0.6);
      belly.position.z = 0.15;
      belly.castShadow = true;
      group.add(belly);
    };

    const createCactus = (group: THREE.Group) => {
      const bodyGeometry = new THREE.CylinderGeometry(0.7, 0.8, 2.8, 16);
      const bodyMaterial = createAdvancedMaterial(0x228B22, 0.1, 0.75);
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      group.add(body);

      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const armGeometry = new THREE.CylinderGeometry(0.35, 0.28, 1.4, 12);
        const arm = new THREE.Mesh(armGeometry, bodyMaterial);
        arm.position.set(Math.cos(angle) * 0.8, 0.4, Math.sin(angle) * 0.8);
        arm.rotation.z = angle;
        arm.castShadow = true;
        group.add(arm);
      }

      const spineGeometry = new THREE.ConeGeometry(0.1, 0.8, 8);
      const spineMaterial = createAdvancedMaterial(0x8B7355, 0.05, 0.8);

      for (let x = -0.6; x <= 0.6; x += 0.35) {
        for (let y = -1.4; y <= 1.4; y += 0.45) {
          const spine = new THREE.Mesh(spineGeometry, spineMaterial);
          spine.position.set(x, y, 0.75);
          spine.rotation.z = Math.random() * Math.PI * 2;
          spine.castShadow = true;
          group.add(spine);
        }
      }
    };

    const createDolphinHead = (group: THREE.Group) => {
      const headGeometry = new THREE.IcosahedronGeometry(0.8, 5);
      const headMaterial = createAdvancedMaterial(0x4A90E2, 0.3, 0.5);
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.castShadow = true;
      group.add(head);

      const melonGeometry = new THREE.SphereGeometry(0.6, 20, 20);
      const melonMaterial = createAdvancedMaterial(0x2E5C8A, 0.4, 0.4);
      const melon = new THREE.Mesh(melonGeometry, melonMaterial);
      melon.position.z = 0.4;
      melon.scale.set(1.2, 0.8, 0.6);
      melon.castShadow = true;
      group.add(melon);
    };

    const createDefaultOrganism = (group: THREE.Group) => {
      const geometry = new THREE.IcosahedronGeometry(1.6, 6);
      const material = createAdvancedMaterial(0x2d9e6f, 0.2, 0.4);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    };

    const biomimeticModel = createOrganismModel();
    modelRef.current = biomimeticModel;
    scene.add(biomimeticModel);

    // ========== ADVANCED ANIMATION LOOP ==========
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      if (modelRef.current) {
        modelRef.current.rotation.x += 0.002;
        modelRef.current.rotation.y += 0.005;
        modelRef.current.position.y = Math.sin(time * 0.4) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ========== RESPONSIVE HANDLING ==========
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

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
    <div
      ref={containerRef}
      className="w-full h-96 bg-gradient-to-b from-blue-50 to-emerald-50 rounded-xl border-2 border-emerald-200 overflow-hidden shadow-xl"
    />
  );
}
