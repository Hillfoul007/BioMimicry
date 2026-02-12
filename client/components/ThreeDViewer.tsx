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
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.pixelRatio = Math.min(window.devicePixelRatio, 2);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(8, 8, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create organism-specific 3D models
    const createOrganismModel = () => {
      const group = new THREE.Group();

      if (organism?.includes("Termite")) {
        // Termite Mound: Spiral ventilation structure
        createTermiteMound(group);
      } else if (organism?.includes("Gecko")) {
        // Gecko Feet: Micro-bristle arrays
        createGeckoFeet(group);
      } else if (organism?.includes("Whale")) {
        // Whale Fins: Tubercle-patterned blade
        createWhaleBlade(group);
      } else if (organism?.includes("Lotus")) {
        // Lotus Leaf: Wavy hydrophobic surface
        createLotusLeaf(group);
      } else if (organism?.includes("Spider")) {
        // Spider Web Silk: Woven fiber structure
        createSpiderWeb(group);
      } else if (organism?.includes("Abalone")) {
        // Abalone Shell: Layered nacre structure
        createAbalonShell(group);
      } else if (organism?.includes("Butterfly")) {
        // Butterfly Wing: Colorful scale pattern
        createButterflyWing(group);
      } else {
        // Default: Organic blob
        createDefaultOrganism(group);
      }

      return group;
    };

    const createTermiteMound = (group: THREE.Group) => {
      // Central spiral structure
      const spiralCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -2, 0),
        new THREE.Vector3(1.5, -1.5, 0),
        new THREE.Vector3(2, -0.5, 1),
        new THREE.Vector3(1.8, 0.5, 1.5),
        new THREE.Vector3(1, 1.5, 1.2),
        new THREE.Vector3(0, 2, 0),
      ]);

      const tubeGeometry = new THREE.TubeGeometry(spiralCurve, 20, 0.4, 6);
      const tubeMaterial = new THREE.MeshPhongMaterial({
        color: 0x8B4513,
        emissive: 0x3d2817,
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      tube.castShadow = true;
      group.add(tube);

      // Branching ventilation channels
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const height = Math.sin(i / 8 * Math.PI) * 2;
        const channelGeometry = new THREE.CylinderGeometry(0.2, 0.15, 1.5, 12);
        const channelMaterial = new THREE.MeshPhongMaterial({
          color: 0x9B5523,
          emissive: 0x4d2817,
        });
        const channel = new THREE.Mesh(channelGeometry, channelMaterial);
        channel.position.set(
          Math.cos(angle) * 2.2,
          height - 0.5,
          Math.sin(angle) * 2.2
        );
        channel.rotation.z = angle + Math.PI / 2;
        channel.castShadow = true;
        group.add(channel);
      }

      // Central mound body
      const moundGeometry = new THREE.SphereGeometry(1.5, 32, 32);
      const moundMaterial = new THREE.MeshPhongMaterial({
        color: 0xA0522D,
        emissive: 0x5d2917,
      });
      const mound = new THREE.Mesh(moundGeometry, moundMaterial);
      mound.scale.y = 1.3;
      mound.castShadow = true;
      group.add(mound);
    };

    const createGeckoFeet = (group: THREE.Group) => {
      // Main foot pad
      const padGeometry = new THREE.BoxGeometry(2, 1.2, 0.5);
      const padMaterial = new THREE.MeshPhongMaterial({
        color: 0xD4A574,
        emissive: 0x6a5438,
      });
      const pad = new THREE.Mesh(padGeometry, padMaterial);
      pad.castShadow = true;
      group.add(pad);

      // Micro-scale bristles (setae)
      const bristleGeometry = new THREE.ConeGeometry(0.08, 1.2, 8);
      const bristleMaterial = new THREE.MeshPhongMaterial({
        color: 0xA68B5B,
      });

      for (let x = -0.9; x <= 0.9; x += 0.3) {
        for (let z = -0.2; z <= 0.2; z += 0.15) {
          const bristle = new THREE.Mesh(bristleGeometry, bristleMaterial);
          bristle.position.set(x, 0.7, z);
          bristle.castShadow = true;
          group.add(bristle);
        }
      }

      // Sub-bristles on main bristles for hierarchy
      const subBristleGeometry = new THREE.ConeGeometry(0.03, 0.6, 6);
      const subBristleMaterial = new THREE.MeshPhongMaterial({
        color: 0x8B7355,
      });

      for (let x = -0.6; x <= 0.6; x += 0.6) {
        for (let z = -0.1; z <= 0.1; z += 0.1) {
          const subbristle = new THREE.Mesh(subBristleGeometry, subBristleMaterial);
          subbristle.position.set(x, 1.4, z);
          subbristle.scale.set(0.5, 0.5, 0.5);
          subbristle.castShadow = true;
          group.add(subbristle);
        }
      }
    };

    const createWhaleBlade = (group: THREE.Group) => {
      // Main blade
      const bladeShape = new THREE.Shape();
      bladeShape.ellipse(1.8, 0.6, 0, Math.PI * 2);
      const bladeGeometry = new THREE.ShapeGeometry(bladeShape);
      const bladeMaterial = new THREE.MeshPhongMaterial({
        color: 0x4A90E2,
        emissive: 0x1e3a8a,
      });
      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.position.z = 0.05;
      blade.castShadow = true;
      group.add(blade);

      // Tubercles on leading edge
      const tubercleGeometry = new THREE.SphereGeometry(0.22, 16, 16);
      const tubercleMaterial = new THREE.MeshPhongMaterial({
        color: 0x2E5C8A,
        emissive: 0x0f2f4a,
      });

      for (let i = 0; i < 14; i++) {
        const x = (i / 13) * 3.2 - 1.6;
        const tubercle = new THREE.Mesh(tubercleGeometry, tubercleMaterial);
        tubercle.position.set(x, 0.7, 0.1);
        tubercle.scale.set(1, 0.8, 0.6);
        tubercle.castShadow = true;
        group.add(tubercle);
      }

      // Fin structure details
      const ribGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8);
      const ribMaterial = new THREE.MeshPhongMaterial({
        color: 0x3a5f7d,
      });

      for (let i = 0; i < 8; i++) {
        const x = (i / 7) * 3 - 1.5;
        const rib = new THREE.Mesh(ribGeometry, ribMaterial);
        rib.position.set(x, 0, 0.02);
        rib.rotation.z = Math.PI / 2;
        rib.castShadow = true;
        group.add(rib);
      }
    };

    const createLotusLeaf = (group: THREE.Group) => {
      // Main leaf surface with bumps
      const leafGeometry = new THREE.PlaneGeometry(3, 3, 20, 20);
      const leafPositions = leafGeometry.attributes.position;
      const positionArray = leafPositions.array as Float32Array;

      // Add wavy bumps
      for (let i = 0; i < positionArray.length; i += 3) {
        const x = positionArray[i];
        const y = positionArray[i + 1];
        const z = positionArray[i + 2];

        positionArray[i + 2] =
          z +
          Math.sin(x * 2) * 0.3 +
          Math.cos(y * 2) * 0.3 +
          Math.random() * 0.1;
      }
      leafPositions.needsUpdate = true;
      leafGeometry.computeVertexNormals();

      const leafMaterial = new THREE.MeshPhongMaterial({
        color: 0x2ECC71,
        emissive: 0x1a7a42,
        shininess: 100,
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.castShadow = true;
      leaf.receiveShadow = true;
      group.add(leaf);

      // Micro-bumps for hydrophobic effect
      const bumpGeometry = new THREE.SphereGeometry(0.15, 12, 12);
      const bumpMaterial = new THREE.MeshPhongMaterial({
        color: 0x27AE60,
        emissive: 0x1a5f3a,
      });

      for (let x = -1.4; x <= 1.4; x += 0.6) {
        for (let y = -1.4; y <= 1.4; y += 0.6) {
          const bump = new THREE.Mesh(bumpGeometry, bumpMaterial);
          bump.position.set(x, y, 0.5 + Math.random() * 0.2);
          bump.castShadow = true;
          group.add(bump);
        }
      }
    };

    const createSpiderWeb = (group: THREE.Group) => {
      // Radial threads
      const threadMaterial = new THREE.LineBasicMaterial({
        color: 0xE8E8E8,
        linewidth: 2,
      });

      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const points = [];

        for (let r = 0; r <= 2; r += 0.3) {
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

      // Spiral threads
      const spiralPoints = [];
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 8;
        const radius = (i / 100) * 2;
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

      // Droplets on web
      const dropletGeometry = new THREE.SphereGeometry(0.12, 12, 12);
      const dropletMaterial = new THREE.MeshPhongMaterial({
        color: 0xB0E0E6,
        emissive: 0x4a7c8e,
      });

      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 1.8;
        const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial);
        droplet.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0.2
        );
        droplet.castShadow = true;
        group.add(droplet);
      }
    };

    const createAbalonShell = (group: THREE.Group) => {
      // Layered nacre structure
      const layers = 5;
      for (let layer = 0; layer < layers; layer++) {
        const shellGeometry = new THREE.BoxGeometry(
          2.5 - layer * 0.3,
          1.8 - layer * 0.25,
          0.15
        );
        const shellColor = new THREE.Color(
          0xffffff
        ).lerpColors(
          new THREE.Color(0x4B0082),
          new THREE.Color(0xFFFFFF),
          layer / layers
        );
        const shellMaterial = new THREE.MeshPhongMaterial({
          color: shellColor,
          emissive: shellColor.clone().multiplyScalar(0.3),
          shininess: 120,
        });
        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        shell.position.z = layer * 0.2;
        shell.rotation.z = (layer * Math.PI) / 20;
        shell.castShadow = true;
        group.add(shell);
      }

      // Iridescent coating suggestion
      const iridGeometry = new THREE.SphereGeometry(1.2, 32, 32);
      const iridMaterial = new THREE.MeshStandardMaterial({
        color: 0x00CED1,
        metalness: 0.6,
        roughness: 0.3,
      });
      const iridescence = new THREE.Mesh(iridGeometry, iridMaterial);
      iridescence.scale.set(0.9, 0.7, 0.08);
      iridescence.castShadow = true;
      group.add(iridescence);
    };

    const createButterflyWing = (group: THREE.Group) => {
      // Wing body
      const wingGeometry = new THREE.PlaneGeometry(2.5, 3);
      const wingMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF6B9D,
        emissive: 0xc71585,
        side: THREE.DoubleSide,
      });
      const wing = new THREE.Mesh(wingGeometry, wingMaterial);
      wing.castShadow = true;
      group.add(wing);

      // Scale pattern spots
      const spotGeometry = new THREE.CircleGeometry(0.25, 16);
      const spotColors = [0xFFD700, 0xFF4500, 0x4169E1, 0x32CD32];

      const spotPositions = [
        [-0.8, 1.2],
        [0.8, 1.2],
        [-1.2, 0],
        [1.2, 0],
        [-0.6, -1.2],
        [0.6, -1.2],
        [0, 1.8],
        [0, -1.8],
      ];

      spotPositions.forEach((pos, idx) => {
        const spotMaterial = new THREE.MeshPhongMaterial({
          color: spotColors[idx % spotColors.length],
          emissive: spotColors[idx % spotColors.length],
          side: THREE.DoubleSide,
        });
        const spot = new THREE.Mesh(spotGeometry, spotMaterial);
        spot.position.set(pos[0], pos[1], 0.02);
        spot.castShadow = true;
        group.add(spot);
      });
    };

    const createDefaultOrganism = (group: THREE.Group) => {
      const geometry = new THREE.IcosahedronGeometry(1.5, 5);
      const material = new THREE.MeshPhongMaterial({
        color: 0x2d9e6f,
        emissive: 0x1a5f42,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      group.add(mesh);
    };

    const biomimeticModel = createOrganismModel();
    modelRef.current = biomimeticModel;
    scene.add(biomimeticModel);

    // Animation loop with smooth rotation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth rotation
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
    <div
      ref={containerRef}
      className="w-full h-96 bg-gradient-to-b from-slate-100 to-slate-50 rounded-lg border border-border overflow-hidden shadow-lg"
    />
  );
}
