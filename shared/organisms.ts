export interface BiologicalSolution {
  id: string;
  organism: string;
  scientificName: string;
  category: string;
  challenge: string;
  mechanism: string;
  advantage: string;
  implementation: string;
  image: string;
  tags: string[];
  relevanceScore?: number;
  metrics: {
    efficiency: number;
    sustainability: number;
    manufacturability: number;
  };
  designVariants: Array<{
    name: string;
    description: string;
    specs: string[];
  }>;
}

export const problemExamples = [
  {
    title: "Passive Building Cooling",
    description:
      "Design a building that maintains comfortable temperature without air conditioning",
    icon: "❄️",
  },
  {
    title: "Ultra-Strong Reusable Adhesive",
    description:
      "Create an adhesive that works wet or dry, is reusable, and non-toxic",
    icon: "🧴",
  },
  {
    title: "Efficient Wind Turbine Blades",
    description:
      "Design wind turbine blades that maximize energy capture with minimal noise",
    icon: "💨",
  },
  {
    title: "Self-Cleaning Waterproof Surface",
    description:
      "Create a material that repels water and dirt without chemical coatings",
    icon: "💧",
  },
];

export const organisms: BiologicalSolution[] = [
  {
    id: "termite-1",
    organism: "African Termite Mound",
    scientificName: "Macrotermes michaelseni",
    category: "Cooling & Ventilation",
    challenge: "Passive Building Cooling",
    mechanism:
      "Termites create vertical and horizontal passages that use air density differences to create natural convection, maintaining internal temperature at 30°C while external temperature varies 3-40°C",
    advantage:
      "Passive cooling system reducing energy consumption by 90%; works 24/7 without electricity",
    implementation:
      "Design building ventilation with helical channels, diagonal vents, and moisture-responsive openings mimicking termite mound architecture",
    image: "🏛️",
    tags: ["cooling", "ventilation", "passive", "architecture"],
    metrics: {
      efficiency: 0.95,
      sustainability: 0.98,
      manufacturability: 0.75,
    },
    designVariants: [
      {
        name: "Spiral Ventilation Core",
        description:
          "Central helical vent shaft with branching horizontal ducts",
        specs: [
          "Height-dependent pressure",
          "Auto-regulating humidity",
          "No moving parts",
        ],
      },
      {
        name: "Multi-Stack System",
        description: "Multiple small chimneys distributed across roof",
        specs: [
          "Parallel air flows",
          "Even temperature distribution",
          "Easier retrofit",
        ],
      },
      {
        name: "Moisture-Responsive Dampers",
        description: "Organic membrane dampers that open/close with humidity",
        specs: [
          "Fully passive",
          "Self-regulating",
          "Bio-inspired material",
        ],
      },
    ],
  },
  {
    id: "gecko-1",
    organism: "Gecko Feet",
    scientificName: "Hemidactylus frenatus",
    category: "Adhesives & Fastening",
    challenge: "Ultra-Strong Reusable Adhesive",
    mechanism:
      "Gecko toes have 2 million microscopic hairs (setae) that use van der Waals forces—weak molecular attractions—to create reversible adhesion without glue",
    advantage:
      "Reusable unlimited times, works on any surface, no residue, environmental friendly, stronger than glue",
    implementation:
      "Create synthetic polymers with hierarchical micro/nano-scale bristles engineered to mimic setae spacing and angle for optimal contact pressure",
    image: "🦎",
    tags: ["adhesive", "fastening", "reversible", "biomimetic"],
    metrics: {
      efficiency: 0.92,
      sustainability: 0.96,
      manufacturability: 0.65,
    },
    designVariants: [
      {
        name: "Polymeric Setae Film",
        description:
          "Thin flexible polymer with nano-bristles for grippy surfaces",
        specs: [
          "Weight: <1g per cm²",
          "Reusable 1000+ times",
          "Works wet or dry",
        ],
      },
      {
        name: "3D-Printed Hierarchical Structure",
        description:
          "Multi-scale structures combining macro, micro, and nano features",
        specs: [
          "Custom shapes",
          "Tunable stiffness",
          "Enhanced load capacity",
        ],
      },
      {
        name: "Hybrid Bio-Polymer Coating",
        description:
          "Biological protein coating with engineered surface topology",
        specs: [
          "Biodegradable",
          "Temperature stable",
          "Self-healing capability",
        ],
      },
    ],
  },
  {
    id: "whale-1",
    organism: "Humpback Whale Fins",
    scientificName: "Megaptera novaeangliae",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Efficient Wind Turbine Blades",
    mechanism:
      "Tubercles (bumpy protrusions) on whale fins disrupt smooth airflow to create beneficial vortices that increase lift and reduce drag by delaying boundary layer separation",
    advantage:
      "20-40% improvement in aerodynamic efficiency, 30% noise reduction, works at various angles of attack",
    implementation:
      "Add tubercle-like bumps to turbine blade leading edges, optimized for specific wind speeds and blade geometry",
    image: "🐋",
    tags: ["aerodynamics", "efficiency", "turbines", "hydrodynamics"],
    metrics: {
      efficiency: 0.94,
      sustainability: 0.97,
      manufacturability: 0.88,
    },
    designVariants: [
      {
        name: "Leading Edge Tubercles",
        description:
          "Wavy bumps on blade leading edge mimicking whale fin tubercles",
        specs: [
          "Increases lift 25%",
          "Reduces drag 20%",
          "Tubercle size: 2-5cm",
        ],
      },
      {
        name: "Full-Surface Wave Pattern",
        description:
          "Undulating pattern across entire blade surface like whale skin",
        specs: [
          "Boundary layer control",
          "Turbulence reduction",
          "All-angle performance",
        ],
      },
      {
        name: "Adaptive Tubercle System",
        description:
          "Flexible tubercles that adjust height based on wind speed",
        specs: [
          "Variable efficiency",
          "Self-optimizing",
          "Mechanical actuation",
        ],
      },
    ],
  },
  {
    id: "lotus-1",
    organism: "Lotus Leaf",
    scientificName: "Nelumbo nucifera",
    category: "Surface Properties",
    challenge: "Self-Cleaning Waterproof Surface",
    mechanism:
      "Lotus leaves have microscopic bumps covered with wax crystals creating superhydrophobic surface. Water beads up and rolls off, carrying dirt particles without wetting the surface",
    advantage:
      "Self-cleaning without chemicals, water resistant, reduces fouling by 95%, extends material lifespan",
    implementation:
      "Create micro-textured surface with hydrophobic nanoparticles or wax coating; use electrospinning or anodization techniques",
    image: "🌸",
    tags: ["self-cleaning", "hydrophobic", "surface", "coating"],
    metrics: {
      efficiency: 0.93,
      sustainability: 0.94,
      manufacturability: 0.82,
    },
    designVariants: [
      {
        name: "Nanoparticle Coating",
        description:
          "Suspension of hydrophobic nanoparticles applied as protective coating",
        specs: [
          "Thickness: 100-500nm",
          "Contact angle: >150°",
          "Durability: 2-3 years",
        ],
      },
      {
        name: "Textured Polymer Film",
        description:
          "Polymer film with micro-textures molded into surface structure",
        specs: [
          "Bump height: 1-10µm",
          "Water rolloff angle: <5°",
          "Flexible and durable",
        ],
      },
      {
        name: "Bio-Inspired Wax Layer",
        description:
          "Natural or synthetic wax with engineered crystal structure",
        specs: [
          "Fully biodegradable",
          "Temperature stable",
          "Reapplicable coating",
        ],
      },
    ],
  },
  {
    id: "spider-1",
    organism: "Spider Web Silk",
    scientificName: "Nephila edulis",
    category: "Materials & Structures",
    challenge: "Ultra-Strong Lightweight Material",
    mechanism:
      "Spider silk is a protein fiber stronger than steel at the same weight, combines high strength with elasticity, and uses hydrogen bonding for molecular alignment",
    advantage:
      "5x stronger than steel by weight, 35% elastic, biodegradable, produced at room temperature",
    implementation:
      "Synthesize recombinant spider silk proteins and spin into fibers; or create composite materials mimicking silk's structure",
    image: "🕷️",
    tags: ["materials", "strength", "lightweight", "biopolymer"],
    metrics: {
      efficiency: 0.96,
      sustainability: 0.95,
      manufacturability: 0.58,
    },
    designVariants: [
      {
        name: "Recombinant Silk Fiber",
        description:
          "Engineered spider silk protein spun into continuous fibers",
        specs: [
          "Tensile strength: 1.3 GPa",
          "Elongation: 30%",
          "Density: 1.3 g/cm³",
        ],
      },
      {
        name: "Hybrid Silk-Polymer Composite",
        description:
          "Spider silk combined with synthetic polymers for enhanced properties",
        specs: [
          "Enhanced durability",
          "Processable",
          "Tunable performance",
        ],
      },
      {
        name: "Silk-Inspired Nanofiber Mesh",
        description:
          "Electrospun fibers mimicking silk's hierarchical structure",
        specs: [
          "Diameter: 100-500nm",
          "High porosity",
          "Multi-functional",
        ],
      },
    ],
  },
  {
    id: "abalone-1",
    organism: "Abalone Shell",
    scientificName: "Haliotis species",
    category: "Materials & Structures",
    challenge: "Impact-Resistant Strong Composite",
    mechanism:
      "Abalone shells have layers of calcium carbonate tiles with organic matrix creating nacre. This structure dissipates impact energy through crack deflection and layer sliding",
    advantage:
      "3000x tougher than its raw mineral component; combines hardness with toughness",
    implementation:
      "Create layered composites with ceramic tiles embedded in polymer matrix, allowing controlled layer sliding",
    image: "🐚",
    tags: ["composite", "impact-resistant", "structure", "biomimetic"],
    metrics: {
      efficiency: 0.91,
      sustainability: 0.88,
      manufacturability: 0.72,
    },
    designVariants: [
      {
        name: "Ceramic-Polymer Laminate",
        description:
          "Alternating layers of ceramic tiles and polymer adhesive",
        specs: [
          "Tile size: 0.5-1mm",
          "Total thickness: 5-50mm",
          "Impact energy: 10x enhancement",
        ],
      },
      {
        name: "3D Printed Nacre-Like Structure",
        description:
          "Multi-material 3D printing creating hierarchical organization",
        specs: [
          "Custom geometries",
          "Optimized orientation",
          "Tunable toughness",
        ],
      },
      {
        name: "Bio-Inspired Adhesive Layering",
        description:
          "Organic adhesive that facilitates controlled sliding between layers",
        specs: [
          "Shear-responsive",
          "Self-healing capability",
          "Room temperature curing",
        ],
      },
    ],
  },
  {
    id: "butterfly-1",
    organism: "Butterfly Wing",
    scientificName: "Papilio species",
    category: "Optics & Colors",
    challenge: "Structural Color Without Dyes",
    mechanism:
      "Butterfly wings have microscopic scales with layered structures that use thin-film interference and scattering to produce vibrant colors without pigments",
    advantage:
      "Colors fade-resistant, no toxic dyes, iridescent properties, can be engineered for specific wavelengths",
    implementation:
      "Create multi-layer structures using photonic crystals or interference coatings with specific spacing and material refractive index",
    image: "🦋",
    tags: ["color", "optics", "structural", "iridescent"],
    metrics: {
      efficiency: 0.89,
      sustainability: 0.96,
      manufacturability: 0.68,
    },
    designVariants: [
      {
        name: "Thin-Film Interference Coating",
        description:
          "Multiple thin transparent layers creating constructive interference",
        specs: [
          "Layer thickness: 50-200nm",
          "Refractive indices: 1.3-2.4",
          "Color range: Full spectrum",
        ],
      },
      {
        name: "Photonic Crystal Array",
        description:
          "Periodic structure of nanoparticles creating photonic bandgap",
        specs: [
          "Period: 200-400nm",
          "3D or 2D arrays",
          "Tunable via structure",
        ],
      },
      {
        name: "Nano-Grating Pattern",
        description:
          "Fine gratings that diffract light at specific wavelengths",
        specs: [
          "Grating period: 200-500nm",
          "Aspect ratio: 1-3",
          "Multiple colors per area",
        ],
      },
    ],
  },
  {
    id: "humpback-whale-1",
    organism: "Humpback Whale Flippers",
    scientificName: "Megaptera novaeangliae",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Maneuverable Turbine Blade",
    mechanism:
      "Whale flippers have long, thin profile with bumpy leading edge and unique sweep angle, providing exceptional maneuverability and lift generation at slow speeds",
    advantage:
      "Extreme maneuverability, high lift-to-drag ratio, maintains performance at various speeds",
    implementation:
      "Design turbine blade with swept geometry and tubercle pattern optimized for slow-speed high-torque operation",
    image: "🐋",
    tags: ["hydrodynamics", "efficiency", "maneuverability", "structure"],
    metrics: {
      efficiency: 0.93,
      sustainability: 0.97,
      manufacturability: 0.85,
    },
    designVariants: [
      {
        name: "Swept Blade Design",
        description:
          "Blade with swept angle mimicking whale flipper geometry",
        specs: [
          "Sweep angle: 20-40°",
          "Aspect ratio: 3-5",
          "Maneuverability: High",
        ],
      },
      {
        name: "Variable Camber Blade",
        description:
          "Blade that changes curve along length like whale flipper",
        specs: [
          "Camber variation: 0-8%",
          "Adaptive performance",
          "Speed range: 2-10 m/s",
        ],
      },
      {
        name: "Multi-Bumped Leading Edge",
        description:
          "Distributed tubercles across leading edge for consistent vortex generation",
        specs: [
          "Tubercle count: 10-20",
          "Spacing: 1-2cm",
          "Height variation: 0.5-2cm",
        ],
      },
    ],
  },
];
