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

    // Scene setup with gradient background
    const scene = new THREE.Scene();
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 256);
      gradient.addColorStop(0, "#1e293b");
      gradient.addColorStop(1, "#0f172a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const texture = new THREE.CanvasTexture(canvas);
    scene.background = texture;
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;
    cameraRef.current = camera;

    // Renderer setup with enhanced quality
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
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    renderer.pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -10;
    mainLight.shadow.camera.right = 10;
    mainLight.shadow.camera.top = 10;
    mainLight.shadow.camera.bottom = -10;
    scene.add(mainLight);

    // Fill light for better shadow depth
    const fillLight = new THREE.DirectionalLight(0x4a9eff, 0.4);
    fillLight.position.set(-10, 5, -10);
    scene.add(fillLight);

    // Accent light
    const accentLight = new THREE.PointLight(0xff6b9d, 0.3);
    accentLight.position.set(5, -5, 5);
    scene.add(accentLight);

    // Create organism-specific 3D models with enhanced geometry
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
      } else {
        createDefaultOrganism(group);
      }

      return group;
    };

    const createTermiteMound = (group: THREE.Group) => {
      // Central spiral structure
      const spiralCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -2.5, 0),
        new THREE.Vector3(1.8, -1.8, 0.2),
        new THREE.Vector3(2.3, -0.5, 1.2),
        new THREE.Vector3(2.0, 0.8, 1.8),
        new THREE.Vector3(1.0, 1.8, 1.3),
        new THREE.Vector3(0, 2.5, 0),
      ]);

      const tubeGeometry = new THREE.TubeGeometry(spiralCurve, 30, 0.45, 8);
      const tubeMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.6,
        metalness: 0.1,
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      tube.castShadow = true;
      tube.receiveShadow = true;
      group.add(tube);

      // Branching ventilation channels
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const height = Math.sin((i / 12) * Math.PI) * 2.5;
        const radius = 2.4 + Math.sin(i) * 0.3;

        const channelGeometry = new THREE.CylinderGeometry(0.22, 0.16, 1.8, 12);
        const channelMaterial = new THREE.MeshStandardMaterial({
          color: 0x9B5523,
          roughness: 0.65,
          metalness: 0.05,
        });
        const channel = new THREE.Mesh(channelGeometry, channelMaterial);
        channel.position.set(
          Math.cos(angle) * radius,
          height - 0.5,
          Math.sin(angle) * radius
        );
        channel.rotation.z = angle + Math.PI / 2;
        channel.castShadow = true;
        channel.receiveShadow = true;
        group.add(channel);
      }

      // Main mound body with better geometry
      const moundGeometry = new THREE.IcosahedronGeometry(1.6, 4);
      const moundMaterial = new THREE.MeshStandardMaterial({
        color: 0xA0522D,
        roughness: 0.7,
        metalness: 0,
      });
      const mound = new THREE.Mesh(moundGeometry, moundMaterial);
      mound.scale.y = 1.4;
      mound.castShadow = true;
      mound.receiveShadow = true;
      group.add(mound);

      // Add subtle sand texture details
      const detailGeometry = new THREE.SphereGeometry(1.55, 16, 16);
      const detailMaterial = new THREE.MeshStandardMaterial({
        color: 0xB8753B,
        roughness: 0.8,
        metalness: 0,
      });
      const details = new THREE.Mesh(detailGeometry, detailMaterial);
      details.scale.y = 1.35;
      details.position.z = -0.1;
      details.castShadow = true;
      group.add(details);
    };

    const createGeckoFeet = (group: THREE.Group) => {
      // Main foot pad with better topology
      const padGeometry = new THREE.BoxGeometry(2.2, 1.3, 0.6);
      const padMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4A574,
        roughness: 0.4,
        metalness: 0.1,
      });
      const pad = new THREE.Mesh(padGeometry, padMaterial);
      pad.castShadow = true;
      pad.receiveShadow = true;
      group.add(pad);

      // Micro-scale bristles (setae) with better distribution
      const bristleGeometry = new THREE.ConeGeometry(0.085, 1.3, 12);
      const bristleMaterial = new THREE.MeshStandardMaterial({
        color: 0xA68B5B,
        roughness: 0.5,
      });

      for (let x = -0.95; x <= 0.95; x += 0.25) {
        for (let z = -0.25; z <= 0.25; z += 0.12) {
          const bristle = new THREE.Mesh(bristleGeometry, bristleMaterial);
          bristle.position.set(x, 0.8, z);
          bristle.castShadow = true;
          group.add(bristle);
        }
      }

      // Sub-bristles for hierarchical detail
      const subBristleGeometry = new THREE.ConeGeometry(0.035, 0.65, 8);
      const subBristleMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B7355,
        roughness: 0.6,
      });

      for (let x = -0.7; x <= 0.7; x += 0.5) {
        for (let z = -0.15; z <= 0.15; z += 0.15) {
          const subbristle = new THREE.Mesh(subBristleGeometry, subBristleMaterial);
          subbristle.position.set(x, 1.5, z);
          subbristle.scale.set(0.6, 0.6, 0.6);
          subbristle.castShadow = true;
          group.add(subbristle);
        }
      }

      // Adhesion layer
      const adhesionGeometry = new THREE.BoxGeometry(2.1, 1.2, 0.1);
      const adhesionMaterial = new THREE.MeshStandardMaterial({
        color: 0xC4975A,
        roughness: 0.3,
        metalness: 0.2,
      });
      const adhesion = new THREE.Mesh(adhesionGeometry, adhesionMaterial);
      adhesion.position.y = -0.7;
      adhesion.castShadow = true;
      group.add(adhesion);
    };

    const createWhaleBlade = (group: THREE.Group) => {
      // Main blade with smooth curve
      const bladeGeometry = new THREE.BoxGeometry(3.5, 0.8, 0.4);
      const bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0x4A90E2,
        roughness: 0.3,
        metalness: 0.4,
      });
      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.castShadow = true;
      blade.receiveShadow = true;
      group.add(blade);

      // Tubercles on leading edge with better geometry
      const tubercleGeometry = new THREE.SphereGeometry(0.25, 20, 20);
      const tubercleMaterial = new THREE.MeshStandardMaterial({
        color: 0x2E5C8A,
        roughness: 0.4,
        metalness: 0.3,
      });

      for (let i = 0; i < 16; i++) {
        const x = (i / 15) * 3.2 - 1.6;
        const tubercle = new THREE.Mesh(tubercleGeometry, tubercleMaterial);
        tubercle.position.set(x, 0.5, 0.15);
        tubercle.scale.set(1.0, 0.7, 0.5);
        tubercle.castShadow = true;
        group.add(tubercle);
      }

      // Fin structure with vein details
      for (let i = 0; i < 10; i++) {
        const x = (i / 9) * 3.2 - 1.6;
        const veinGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
        const veinMaterial = new THREE.MeshStandardMaterial({
          color: 0x3a5f7d,
          roughness: 0.5,
        });
        const vein = new THREE.Mesh(veinGeometry, veinMaterial);
        vein.position.set(x, 0, 0.05);
        vein.rotation.z = Math.PI / 2;
        vein.castShadow = true;
        group.add(vein);
      }

      // Edge highlight for hydrodynamics
      const edgeGeometry = new THREE.BoxGeometry(3.4, 0.05, 0.3);
      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0x5A9FE2,
        roughness: 0.2,
        metalness: 0.6,
      });
      const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
      edge.position.y = 0.42;
      edge.castShadow = true;
      group.add(edge);
    };

    const createLotusLeaf = (group: THREE.Group) => {
      // Main leaf surface with better topology
      const leafGeometry = new THREE.PlaneGeometry(3.2, 3.2, 24, 24);
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
          Math.sin(x * 2) * 0.35 +
          Math.cos(y * 2) * 0.35 +
          Math.sin(distance) * 0.2 +
          (Math.random() - 0.5) * 0.1;
      }
      leafPositions.needsUpdate = true;
      leafGeometry.computeVertexNormals();

      const leafMaterial = new THREE.MeshStandardMaterial({
        color: 0x2ECC71,
        roughness: 0.3,
        metalness: 0.2,
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.castShadow = true;
      leaf.receiveShadow = true;
      group.add(leaf);

      // Micro-bumps for hydrophobic effect
      const bumpGeometry = new THREE.SphereGeometry(0.16, 16, 16);
      const bumpMaterial = new THREE.MeshStandardMaterial({
        color: 0x27AE60,
        roughness: 0.4,
        metalness: 0.1,
      });

      for (let x = -1.6; x <= 1.6; x += 0.65) {
        for (let y = -1.6; y <= 1.6; y += 0.65) {
          const bump = new THREE.Mesh(bumpGeometry, bumpMaterial);
          bump.position.set(
            x,
            y,
            0.6 + Math.random() * 0.25 + Math.sin(x) * 0.1
          );
          bump.castShadow = true;
          group.add(bump);
        }
      }

      // Veins for organic look
      const veinMaterial = new THREE.LineBasicMaterial({
        color: 0x1e8449,
        linewidth: 2,
      });
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const points = [];
        for (let r = 0; r <= 1.5; r += 0.2) {
          points.push(
            new THREE.Vector3(
              Math.cos(angle) * r,
              Math.sin(angle) * r,
              0.35
            )
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, veinMaterial);
        group.add(line);
      }
    };

    const createSpiderWeb = (group: THREE.Group) => {
      // Radial threads with glow
      const threadMaterial = new THREE.LineBasicMaterial({
        color: 0xE8E8E8,
        linewidth: 2,
      });

      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const points = [];

        for (let r = 0; r <= 2.2; r += 0.25) {
          points.push(
            new THREE.Vector3(
              Math.cos(angle) * r,
              Math.sin(angle) * r,
              0
            )
          );
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, threadMaterial);
        group.add(line);
      }

      // Spiral threads with multiple rings
      for (let ring = 0; ring < 8; ring++) {
        const spiralPoints = [];
        const startRadius = ring * 0.27;
        for (let i = 0; i < 60; i++) {
          const angle = (i / 60) * Math.PI * 2;
          const radius = startRadius + 0.25;
          spiralPoints.push(
            new THREE.Vector3(
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
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

      // Droplets on web with better materials
      const dropletGeometry = new THREE.SphereGeometry(0.14, 16, 16);
      const dropletMaterial = new THREE.MeshStandardMaterial({
        color: 0xB0E0E6,
        roughness: 0.1,
        metalness: 0.8,
      });

      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.3 + Math.random() * 1.9;
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
      // Layered nacre structure with iridescence
      const layers = 6;
      for (let layer = 0; layer < layers; layer++) {
        const shellGeometry = new THREE.IcosahedronGeometry(1.5 - layer * 0.22, 3);
        const t = layer / (layers - 1);
        const shellColor = new THREE.Color(
          0xffffff
        ).lerpColors(
          new THREE.Color(0x4B0082),
          new THREE.Color(0x00CED1),
          t
        );

        const shellMaterial = new THREE.MeshStandardMaterial({
          color: shellColor,
          metalness: 0.6 + t * 0.3,
          roughness: 0.3 - t * 0.2,
        });
        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        shell.position.z = layer * 0.22;
        shell.rotation.z = (layer * Math.PI) / 18;
        shell.castShadow = true;
        group.add(shell);
      }

      // Iridescent outer coating
      const iridGeometry = new THREE.SphereGeometry(1.2, 32, 32);
      const iridMaterial = new THREE.MeshStandardMaterial({
        color: 0x00CED1,
        metalness: 0.8,
        roughness: 0.2,
      });
      const iridescence = new THREE.Mesh(iridGeometry, iridMaterial);
      iridescence.scale.set(0.92, 0.75, 0.12);
      iridescence.castShadow = true;
      group.add(iridescence);
    };

    const createButterflyWing = (group: THREE.Group) => {
      // Wing body with gradient
      const wingGeometry = new THREE.PlaneGeometry(2.8, 3.2);
      const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0xFF6B9D,
        metalness: 0.3,
        roughness: 0.5,
        side: THREE.DoubleSide,
      });
      const wing = new THREE.Mesh(wingGeometry, wingMaterial);
      wing.castShadow = true;
      group.add(wing);

      // Scale pattern with iridescence
      const spotGeometry = new THREE.CircleGeometry(0.28, 20);
      const spotColors = [
        { color: 0xFFD700, pos: [-0.9, 1.3] },
        { color: 0xFF4500, pos: [0.9, 1.3] },
        { color: 0x4169E1, pos: [-1.3, 0] },
        { color: 0x32CD32, pos: [1.3, 0] },
        { color: 0xFF1493, pos: [-0.7, -1.3] },
        { color: 0x00CED1, pos: [0.7, -1.3] },
      ];

      spotColors.forEach((spot) => {
        const spotMaterial = new THREE.MeshStandardMaterial({
          color: spot.color,
          metalness: 0.4,
          roughness: 0.4,
          side: THREE.DoubleSide,
        });
        const marker = new THREE.Mesh(spotGeometry, spotMaterial);
        marker.position.set(spot.pos[0], spot.pos[1], 0.03);
        marker.castShadow = true;
        group.add(marker);
      });
    };

    const createSharkSkin = (group: THREE.Group) => {
      // Shark body
      const bodyGeometry = new THREE.ConeGeometry(0.8, 3, 16);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x4A4A4A,
        roughness: 0.7,
        metalness: 0.2,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      // Riblet pattern for drag reduction
      const ribletMaterial = new THREE.LineBasicMaterial({
        color: 0x2A2A2A,
        linewidth: 1,
      });
      for (let i = 0; i < 20; i++) {
        const points = [];
        for (let t = 0; t <= 1; t += 0.1) {
          const y = -1.5 + t * 3;
          const angle = (i / 20) * Math.PI * 2;
          const radius = 0.8 * (1 - Math.abs(t - 0.5) * 0.5);
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
      // Body
      const bodyGeometry = new THREE.CapsuleGeometry(0.4, 1.5, 4, 8);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.6,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      group.add(body);

      // Head
      const headGeometry = new THREE.SphereGeometry(0.45, 16, 16);
      const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.6,
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 1.1;
      head.castShadow = true;
      group.add(head);

      // Eyes
      const eyeGeometry = new THREE.SphereGeometry(0.12, 12, 12);
      const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.3,
      });
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.15, 1.3, 0.35);
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.15, 1.3, 0.35);
      group.add(leftEye, rightEye);

      // Belly
      const bellyGeometry = new THREE.SphereGeometry(0.38, 16, 16);
      const bellyMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.7,
      });
      const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
      belly.scale.set(0.7, 0.9, 0.5);
      belly.position.z = 0.1;
      belly.castShadow = true;
      group.add(belly);
    };

    const createCactus = (group: THREE.Group) => {
      // Main body
      const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.7, 2.5, 12);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22,
        roughness: 0.7,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      group.add(body);

      // Arms
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const armGeometry = new THREE.CylinderGeometry(0.3, 0.25, 1.2, 8);
        const arm = new THREE.Mesh(armGeometry, bodyMaterial);
        arm.position.set(
          Math.cos(angle) * 0.7,
          0.3,
          Math.sin(angle) * 0.7
        );
        arm.rotation.z = angle;
        arm.castShadow = true;
        group.add(arm);
      }

      // Spines
      const spineGeometry = new THREE.ConeGeometry(0.08, 0.6, 6);
      const spineMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B7355,
        roughness: 0.8,
      });

      for (let x = -0.5; x <= 0.5; x += 0.3) {
        for (let y = -1.2; y <= 1.2; y += 0.4) {
          for (let z = -0.5; z <= 0.5; z += 0.5) {
            const spine = new THREE.Mesh(spineGeometry, spineMaterial);
            spine.position.set(x, y, 0.65);
            spine.rotation.z = Math.random() * Math.PI * 2;
            spine.castShadow = true;
            group.add(spine);
          }
        }
      }
    };

    const createDefaultOrganism = (group: THREE.Group) => {
      const geometry = new THREE.IcosahedronGeometry(1.5, 5);
      const material = new THREE.MeshStandardMaterial({
        color: 0x2d9e6f,
        roughness: 0.4,
        metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    };

    const biomimeticModel = createOrganismModel();
    modelRef.current = biomimeticModel;
    scene.add(biomimeticModel);

    // Animation loop with smooth rotation and subtle movements
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      // Enhanced smooth rotation with subtle bobbing
      if (modelRef.current) {
        modelRef.current.rotation.x += 0.0025;
        modelRef.current.rotation.y += 0.0055;
        modelRef.current.position.y = Math.sin(time * 0.5) * 0.15;
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
    <div
      ref={containerRef}
      className="w-full h-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg border border-slate-700/50 overflow-hidden shadow-xl"
    />
  );
}
