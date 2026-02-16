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
  // ========== COOLING & VENTILATION ==========
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
    id: "penguin-huddle-1",
    organism: "Emperor Penguin Huddle",
    scientificName: "Aptenodytes forsteri",
    category: "Cooling & Ventilation",
    challenge: "Efficient Group Thermal Management",
    mechanism:
      "Penguins rotate positions in huddles, moving from cold perimeter to warm center, creating a living system that maintains optimal temperature distribution without constant external energy",
    advantage:
      "80% energy savings in heating systems through distributed thermal management, self-organizing",
    implementation:
      "Design modular heating systems with rotating zones and dynamic insulation barriers",
    image: "🐧",
    tags: ["thermal", "group", "rotation", "efficiency"],
    metrics: {
      efficiency: 0.92,
      sustainability: 0.96,
      manufacturability: 0.78,
    },
    designVariants: [
      {
        name: "Rotational Heat Zone System",
        description: "Zones that sequentially activate heating to distribute warmth",
        specs: ["Zone count: 4-8", "Rotation interval: 30-60 min", "Energy: -80%"],
      },
      {
        name: "Dynamic Insulation Barrier",
        description:
          "Adaptive insulation that changes based on temperature zones",
        specs: ["R-value range: 5-20", "Variable thickness", "Smart response"],
      },
      {
        name: "Biomimetic Crowd Flow Control",
        description: "Structural design encouraging natural thermal redistribution",
        specs: ["Entry/exit points", "Optimal spacing", "Self-organizing"],
      },
    ],
  },
  {
    id: "evaporative-cooling-1",
    organism: "Desert Beetle (Namibian)",
    scientificName: "Stenocara gracilipes",
    category: "Cooling & Ventilation",
    challenge: "Water Harvesting & Cooling",
    mechanism:
      "Beetle carapace has hydrophilic (water-loving) peaks and hydrophobic (water-repelling) valleys. Morning fog condenses on peaks, rolls into valleys, and is absorbed - providing water while cooling",
    advantage:
      "Harvests water from air with 10% humidity, passive cooling, sustainable water source",
    implementation:
      "Create textured surfaces with alternating wettability using patterned coatings",
    image: "🪲",
    tags: ["water-harvesting", "cooling", "passive", "sustainable"],
    metrics: {
      efficiency: 0.88,
      sustainability: 0.99,
      manufacturability: 0.71,
    },
    designVariants: [
      {
        name: "Wettability-Patterned Coating",
        description: "Patterned hydrophobic/hydrophilic regions on surfaces",
        specs: ["Pattern period: 100-500µm", "Collection rate: 5-15 L/m²/day"],
      },
      {
        name: "3D Textured Collector",
        description: "3D-printed peaks and valleys with tuned surface properties",
        specs: ["Height: 2-10mm", "Angle: 30-45°", "Directional flow"],
      },
      {
        name: "Smart Surface Membrane",
        description: "Responsive membrane that changes wettability with temperature",
        specs: ["Switching temp: 20-30°C", "Reversible", "Long-lasting"],
      },
    ],
  },
  {
    id: "nightcooling-trees-1",
    organism: "Eucalyptus Trees (Savanna)",
    scientificName: "Eucalyptus species",
    category: "Cooling & Ventilation",
    challenge: "Thermal Buffering",
    mechanism:
      "Eucalyptus leaves emit stored heat at night through radiation, enabling passive cooling despite high daytime temperatures. The leaf structure allows rapid heat dissipation",
    advantage:
      "Night-time cooling without energy input, thermal mass reduction, faster response to temperature changes",
    implementation:
      "Design surfaces with high emissivity coatings and thin-wall structures for rapid thermal response",
    image: "🌳",
    tags: ["cooling", "thermal", "passive", "nocturnal"],
    metrics: {
      efficiency: 0.87,
      sustainability: 0.95,
      manufacturability: 0.82,
    },
    designVariants: [
      {
        name: "High-Emissivity Coating",
        description: "Special coatings that radiate heat efficiently in IR spectrum",
        specs: ["Emissivity: >0.95", "Visible: <0.3", "Passive cooling: 5-15°C"],
      },
      {
        name: "Thin-Wall Heat Sink",
        description: "Thin aluminum/copper structures for rapid thermal cycling",
        specs: ["Thickness: 1-3mm", "Fin density: 10-20/inch", "Response time: <30min"],
      },
      {
        name: "Bifunctional Surface",
        description: "High solar reflectance during day, high emissivity at night",
        specs: ["Day reflectance: >0.8", "Night emissivity: >0.9", "All-season"],
      },
    ],
  },

  // ========== ADHESIVES & FASTENING ==========
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
    id: "mussel-adhesion-1",
    organism: "Blue Mussel",
    scientificName: "Mytilus edulis",
    category: "Adhesives & Fastening",
    challenge: "Underwater Adhesive",
    mechanism:
      "Mussels produce byssal threads with adhesive proteins containing DOPA (dihydroxyphenylalanine) that cross-link in wet conditions, creating strong underwater bonds",
    advantage:
      "Works underwater, high strength (25 MPa), biodegradable, temperature stable, salt-tolerant",
    implementation:
      "Engineer proteins or polymers with catechol groups that cross-link in aqueous environments",
    image: "🐚",
    tags: ["adhesive", "underwater", "biodegradable", "marine"],
    metrics: {
      efficiency: 0.91,
      sustainability: 0.98,
      manufacturability: 0.62,
    },
    designVariants: [
      {
        name: "Recombinant Mussel Protein",
        description:
          "Bioengineered proteins mimicking natural mussel adhesive",
        specs: [
          "Tensile strength: 25 MPa",
          "Works in seawater",
          "Biodegradable",
        ],
      },
      {
        name: "Catechol-Based Polymer",
        description:
          "Synthetic polymer with catechol groups for wet adhesion",
        specs: [
          "Application: Underwater",
          "Cure: Hours",
          "Removable: Reversible",
        ],
      },
      {
        name: "Byssal Thread Fiber",
        description: "Fibrous structure mimicking mussel thread topology",
        specs: [
          "Diameter: 50-100µm",
          "Multi-layered",
          "Flexible and tough",
        ],
      },
    ],
  },
  {
    id: "lizard-toe-pads-1",
    organism: "Tree Frog Toe Pads",
    scientificName: "Phyllomedusa species",
    category: "Adhesives & Fastening",
    challenge: "Wet Surface Grip",
    mechanism:
      "Frog toe pads secrete mucus and have micro-ridged structures that use both hydrodynamic forces and adhesion to grip wet surfaces even when inverted",
    advantage:
      "Grips wet surfaces better than dry, self-lubricating, high friction coefficient, pressure-sensitive",
    implementation:
      "Create micropatterned surfaces with liquid-secreting capabilities or hybrid hydrophobic-hydrophilic designs",
    image: "🐸",
    tags: ["adhesive", "wet", "friction", "dynamic"],
    metrics: {
      efficiency: 0.89,
      sustainability: 0.94,
      manufacturability: 0.73,
    },
    designVariants: [
      {
        name: "Liquid-Secreting Pad",
        description:
          "Micropatterned pad that secretes lubricant for wet adhesion",
        specs: ["Friction coefficient: 1.5-2.0", "Reversible", "Self-healing"],
      },
      {
        name: "Hybrid Wettability Pattern",
        description:
          "Mixed hydrophobic ridges and hydrophilic valleys for capillary gripping",
        specs: ["Ridge spacing: 10-50µm", "Works wet or dry"],
      },
      {
        name: "Pressure-Sensitive Pad",
        description: "Pad that increases contact area under load",
        specs: ["Contact increase: 3-5x under pressure"],
      },
    ],
  },
  {
    id: "barnacle-cement-1",
    organism: "Acorn Barnacle",
    scientificName: "Semibalanus balanoides",
    category: "Adhesives & Fastening",
    challenge: "Ultra-Durable Ocean Adhesive",
    mechanism:
      "Barnacles produce a proteinaceous adhesive (cement) that hardens underwater and resists waves, corrosion, and biological attack for years. Uses chemical cross-linking",
    advantage:
      "Extremely durable in marine conditions, permanent adhesion, resists fouling, creates hard bonds",
    implementation:
      "Engineer proteins or polymers with cross-linking chemistry optimized for marine environments",
    image: "🦪",
    tags: ["adhesive", "marine", "durable", "permanent"],
    metrics: {
      efficiency: 0.93,
      sustainability: 0.87,
      manufacturability: 0.68,
    },
    designVariants: [
      {
        name: "Bioengineered Cement Protein",
        description: "Synthetic protein mimicking barnacle adhesive composition",
        specs: [
          "Bond strength: >50 MPa",
          "Marine durability: 10+ years",
          "Temperature: -10 to 40°C",
        ],
      },
      {
        name: "Two-Part Marine Epoxy",
        description:
          "Formulation based on barnacle cement chemistry for underwater hardening",
        specs: [
          "Underwater cure",
          "Salt resistance",
          "Anti-fouling",
        ],
      },
      {
        name: "Cement Coating",
        description:
          "Protective coating using barnacle cement principles for marine structures",
        specs: [
          "Thickness: 100-500µm",
          "Anti-corrosion",
          "Self-healing",
        ],
      },
    ],
  },
  {
    id: "spider-dragline-1",
    organism: "Orb-Weaver Spider Dragline",
    scientificName: "Araneus diadematus",
    category: "Adhesives & Fastening",
    challenge: "High-Strength Elastic Line",
    mechanism:
      "Spider dragline combines high tensile strength with elasticity through coiled protein structure. Can stretch 20% before breaking and return to original shape",
    advantage:
      "Lighter than steel with similar strength, elastic recovery, biodegradable, temperature stable",
    implementation:
      "Synthesize and spin recombinant spider silk with specific amino acid sequences for optimal protein alignment",
    image: "🕸️",
    tags: ["fiber", "elastic", "strength", "biodegradable"],
    metrics: {
      efficiency: 0.94,
      sustainability: 0.96,
      manufacturability: 0.60,
    },
    designVariants: [
      {
        name: "Synthetic Spider Silk Thread",
        description:
          "Lab-produced silk thread using recombinant protein fermentation",
        specs: [
          "Diameter: 3-10µm",
          "Tensile: 1 GPa",
          "Elasticity: 20%",
        ],
      },
      {
        name: "Multi-Ply Dragline Cable",
        description: "Multiple silk fibers twisted into stronger cable",
        specs: [
          "Diameter: 0.1-1mm",
          "Tensile: 500+ MPa",
          "Flexibility: High",
        ],
      },
      {
        name: "Hybrid Silk-Polymer Composite",
        description: "Spider silk combined with modern polymers for enhanced properties",
        specs: [
          "Enhanced durability",
          "UV resistance",
          "Chemical stability",
        ],
      },
    ],
  },

  // ========== AERODYNAMICS & HYDRODYNAMICS ==========
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
    image: "🐳",
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
  {
    id: "seagull-wing-1",
    organism: "Herring Gull Wing",
    scientificName: "Larus argentatus",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Energy-Efficient Gliding",
    mechanism:
      "Gull wings have slotted primary feathers that reduce induced drag during soaring, allowing birds to glide for hours using minimal energy through wing-tip vortex utilization",
    advantage:
      "Reduces energy consumption by 30% during sustained flight, increases glide distance 2-3x",
    implementation:
      "Design aircraft/turbine blades with slotted wingtips that channel vortex air flow, used in modern winglet designs",
    image: "🦅",
    tags: ["aerodynamics", "efficiency", "gliding", "vortex"],
    metrics: {
      efficiency: 0.95,
      sustainability: 0.94,
      manufacturability: 0.89,
    },
    designVariants: [
      {
        name: "Slotted Winglet Extension",
        description: "Vertical extensions at wing tips with slots for vortex separation",
        specs: [
          "Reduces induced drag 25%",
          "Improves efficiency 10-15%",
          "Modular retrofit",
        ],
      },
      {
        name: "Feathered Wingtip Design",
        description:
          "Separable feather-like elements at wing tips for vortex control",
        specs: [
          "Variable geometry",
          "Adaptive to flight conditions",
          "Lightweight",
        ],
      },
      {
        name: "Divergent Trailing Edge",
        description:
          "Wing trailing edge that splits into separate streams like feathers",
        specs: [
          "Active vortex management",
          "Flow separation control",
          "High efficiency",
        ],
      },
    ],
  },
  {
    id: "shark-skin-flow-1",
    organism: "Shark Skin (Riblet Pattern)",
    scientificName: "Lamna nasus",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Hydrodynamic Drag Reduction",
    mechanism:
      "Shark skin has microscopic parallel riblets (0.1-1mm) that align turbulent flow along the body, reducing friction drag by 5-10% compared to smooth surfaces",
    advantage:
      "Drag reduction without moving parts, passive effect, self-maintaining, works at all speeds",
    implementation:
      "Create microscopic parallel groove patterns on surfaces using 3D printing, molding, or coating techniques",
    image: "🦈",
    tags: ["hydrodynamics", "drag-reduction", "passive", "friction"],
    metrics: {
      efficiency: 0.91,
      sustainability: 0.93,
      manufacturability: 0.86,
    },
    designVariants: [
      {
        name: "Riblet Film Coating",
        description:
          "Thin adhesive film with microscopic riblets for application to existing surfaces",
        specs: [
          "Riblet depth: 0.1-0.5mm",
          "Spacing: 0.5-2mm",
          "Drag reduction: 5-8%",
        ],
      },
      {
        name: "Molded Riblet Surface",
        description:
          "Manufactured material with integrated riblet texture throughout",
        specs: [
          "Permanent texture",
          "Self-cleaning",
          "Durable 10+ years",
        ],
      },
      {
        name: "3D-Printed Riblet Structure",
        description:
          "Custom riblet patterns optimized for specific flow conditions",
        specs: [
          "Directional alignment",
          "Variable spacing",
          "Optimized geometry",
        ],
      },
    ],
  },
  {
    id: "dolphin-echolocation-1",
    organism: "Dolphin (Melon Organ)",
    scientificName: "Tursiops truncatus",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Underwater Sonar & Navigation",
    mechanism:
      "Dolphins have specialized melon organ that focuses and directs sound waves with high precision through acoustic lens effect, enabling detailed 3D perception at distance",
    advantage:
      "Biological sonar that works in murky water, precise 3D reconstruction, adaptive gain control",
    implementation:
      "Engineer acoustic lens systems using gradient-index materials or phased array principles",
    image: "🐬",
    tags: ["sonar", "acoustics", "navigation", "sensing"],
    metrics: {
      efficiency: 0.90,
      sustainability: 0.92,
      manufacturability: 0.72,
    },
    designVariants: [
      {
        name: "Acoustic Lens Material",
        description:
          "Gradient-index material that focuses sound like optical lens",
        specs: [
          "Frequency: 100-150 kHz",
          "Resolution: <1cm",
          "Range: 100m+",
        ],
      },
      {
        name: "Phased Array Transducer",
        description:
          "Electronic array mimicking dolphin melon structure with digital beamforming",
        specs: [
          "Elements: 64-256",
          "Beam steering: Electronic",
          "Real-time 3D imaging",
        ],
      },
      {
        name: "Passive Resonator Network",
        description:
          "Coupled resonators that naturally amplify and direct specific frequencies",
        specs: [
          "Passive operation",
          "Minimal power",
          "Biological accuracy",
        ],
      },
    ],
  },

  // ========== SURFACE PROPERTIES ==========
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
    id: "rose-petal-1",
    organism: "Rose Petal",
    scientificName: "Rosa species",
    category: "Surface Properties",
    challenge: "Adhesive Yet Repellent Surface",
    mechanism:
      "Rose petals have microscopic hierarchical structures that are hydrophilic (water-loving) at nanoscale but hydrophobic (water-repelling) at microscale, creating paradoxical adhesion that holds water while repelling dirt",
    advantage:
      "Combines water-holding and dirt-repelling; elegant surface texture; maintains color",
    implementation:
      "Create hierarchical surface with dual-scale features combining wettability contrast",
    image: "🌹",
    tags: ["hydrophobic", "adhesion", "surface", "dual-scale"],
    metrics: {
      efficiency: 0.87,
      sustainability: 0.95,
      manufacturability: 0.74,
    },
    designVariants: [
      {
        name: "Dual-Scale Hierarchical Pattern",
        description:
          "Micro and nano features with contrasting wettability properties",
        specs: [
          "Micro-bumps: 10-50µm",
          "Nano-texture: 100-500nm",
          "Mixed wettability",
        ],
      },
      {
        name: "Petal-Inspired Coating",
        description:
          "Coating that mimics petal structure with enhanced durability",
        specs: [
          "Self-organizing",
          "Color retention: 5+ years",
          "Reversible adhesion",
        ],
      },
      {
        name: "3D-Printed Biological Texture",
        description:
          "High-resolution 3D printing creating accurate rose petal topology",
        specs: [
          "Resolution: <10µm",
          "Custom geometry",
          "Material: Various polymers",
        ],
      },
    ],
  },
  {
    id: "fish-scale-1",
    organism: "Fish Scale (Tilapia)",
    scientificName: "Oreochromis niloticus",
    category: "Surface Properties",
    challenge: "Lightweight Protective Armor",
    mechanism:
      "Fish scales are lightweight yet strong, with overlapping layered structure and flexible connective tissue that provides protection while allowing movement and water flow",
    advantage:
      "80% lighter than equivalent rigid protection, flexible, self-healing, biocompatible",
    implementation:
      "Design layered composite with overlapping elements connected by flexible joints",
    image: "🐟",
    tags: ["protection", "lightweight", "flexible", "composite"],
    metrics: {
      efficiency: 0.90,
      sustainability: 0.92,
      manufacturability: 0.79,
    },
    designVariants: [
      {
        name: "Overlapping Plate Armor",
        description:
          "Overlapping ceramic plates connected by flexible material allowing motion",
        specs: [
          "Plate size: 10-50mm",
          "Overlap: 50%",
          "Flexibility range: Full articulation",
        ],
      },
      {
        name: "Layered Composite Shield",
        description:
          "Multiple material layers with specific stress distribution",
        specs: [
          "Layer count: 3-5",
          "Hard outer, soft inner",
          "Energy absorption: High",
        ],
      },
      {
        name: "Bio-Inspired Segmented Structure",
        description:
          "Segmented units that articulate naturally during movement",
        specs: [
          "Segments: 20-100",
          "Joint flexibility: 30-60°",
          "Self-healing capability",
        ],
      },
    ],
  },
  {
    id: "nacre-mother-of-pearl-1",
    organism: "Nacre (Mother-of-Pearl)",
    scientificName: "Pinctada species",
    category: "Surface Properties",
    challenge: "Iridescent Protective Coating",
    mechanism:
      "Nacre uses aragonite platelets in organic matrix with specific thickness that creates iridescent colors through light interference while providing exceptional hardness",
    advantage:
      "Beautiful colors without dyes, exceptional hardness (2-3 GPa), strong, sustainable",
    implementation:
      "Create layered structures with specific aragonite crystal size and organic binder composition",
    image: "✨",
    tags: ["iridescent", "coating", "protective", "optical"],
    metrics: {
      efficiency: 0.88,
      sustainability: 0.96,
      manufacturability: 0.76,
    },
    designVariants: [
      {
        name: "Nacre-Inspired Coating",
        description:
          "Multi-layer coating with aragonite crystals in organic binder",
        specs: [
          "Crystal size: 5-20µm",
          "Layer thickness: 50-500nm",
          "Hardness: 2-3 GPa",
        ],
      },
      {
        name: "Synthetic Pearl Composite",
        description:
          "Lab-grown nacre-like composite with tuned optical properties",
        specs: [
          "Color range: Full spectrum",
          "Durability: 10+ years",
          "Non-toxic",
        ],
      },
      {
        name: "Structural Color Filter",
        description:
          "Nacre structure used as wavelength-selective filter for optics",
        specs: [
          "Transmission: Wavelength-specific",
          "No dyes needed",
          "Optical efficiency: >90%",
        ],
      },
    ],
  },

  // ========== MATERIALS & STRUCTURES ==========
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
    id: "bone-structure-1",
    organism: "Mammalian Bone",
    scientificName: "Homo sapiens",
    category: "Materials & Structures",
    challenge: "Strong Yet Lightweight Structure",
    mechanism:
      "Bone combines hard mineral (calcium phosphate) with soft protein (collagen) in hierarchical structure - dense outer cortical bone and porous inner trabecular bone - achieving high strength-to-weight",
    advantage:
      "25x stronger than steel by weight, self-healing, lightweight, energy-absorbing, adaptable",
    implementation:
      "Design composite structures with solid outer shell and internal trabecular (beam-like) structure",
    image: "💀",
    tags: ["composite", "structure", "lightweight", "adaptive"],
    metrics: {
      efficiency: 0.94,
      sustainability: 0.91,
      manufacturability: 0.77,
    },
    designVariants: [
      {
        name: "Cortical-Trabecular Composite",
        description:
          "Dual-layer structure with dense cortical outer shell and porous trabecular interior",
        specs: [
          "Cortical thickness: 1-5mm",
          "Trabecular porosity: 30-90%",
          "Strength: 10-100 MPa",
        ],
      },
      {
        name: "Gradient Density Structure",
        description:
          "Continuously varying density from surface to center for optimal stress distribution",
        specs: [
          "Outer density: 2x inner",
          "Stress adaptation",
          "Weight savings: 40-60%",
        ],
      },
      {
        name: "3D-Printed Bio-Composite",
        description:
          "3D printing with fiber-reinforcement mimicking collagen-mineral structure",
        specs: [
          "Material: Polymer + ceramic fibers",
          "Custom geometry",
          "Optimized load paths",
        ],
      },
    ],
  },
  {
    id: "honeycomb-1",
    organism: "Honeycomb (Bee Hive)",
    scientificName: "Apis mellifera",
    category: "Materials & Structures",
    challenge: "Lightweight Yet Strong Structure",
    mechanism:
      "Hexagonal honeycomb cells provide maximum storage volume with minimum material. The geometry distributes stress evenly and the cells support each other, creating exceptional strength-to-weight",
    advantage:
      "99% volume efficiency, high strength-to-weight, self-supporting, minimal material",
    implementation:
      "Design structures using hexagonal cell geometry with tunable cell size and wall thickness",
    image: "🍯",
    tags: ["structure", "efficiency", "lightweight", "geometry"],
    metrics: {
      efficiency: 0.97,
      sustainability: 0.96,
      manufacturability: 0.91,
    },
    designVariants: [
      {
        name: "Hexagonal Cell Panel",
        description:
          "Honeycomb structure integrated into panels for walls, floors, or aircraft",
        specs: [
          "Cell size: 5-50mm",
          "Wall thickness: 0.5-2mm",
          "Weight savings: 60-80%",
        ],
      },
      {
        name: "Gradient Cell Honeycomb",
        description:
          "Varying cell sizes for tuned strength distribution and shock absorption",
        specs: [
          "Outer cells: Smaller for strength",
          "Inner cells: Larger for weight",
          "Adaptive response: Excellent",
        ],
      },
      {
        name: "Bio-Foam Honeycomb",
        description:
          "Open-cell foam with honeycomb-inspired geometry for lightweight construction",
        specs: [
          "Density: 1-300 kg/m³",
          "Anisotropic or isotropic",
          "Custom shapes",
        ],
      },
    ],
  },
  {
    id: "pomelo-peel-1",
    organism: "Pomelo Peel",
    scientificName: "Citrus maxima",
    category: "Materials & Structures",
    challenge: "Impact Protection Without Rigidity",
    mechanism:
      "Pomelo peel has spongy cellular structure that absorbs energy through deformation while remaining intact, protecting the fruit inside from drops and compression",
    advantage:
      "Energy absorption without damage, lightweight, biodegradable, minimalist material usage",
    implementation:
      "Design foam or cellular structures with tuned porosity for specific energy absorption",
    image: "🍊",
    tags: ["protection", "absorption", "cellular", "impact"],
    metrics: {
      efficiency: 0.89,
      sustainability: 0.97,
      manufacturability: 0.84,
    },
    designVariants: [
      {
        name: "Cellular Foam Packing",
        description:
          "Porous foam material with tuned cell structure for impact protection",
        specs: [
          "Porosity: 70-90%",
          "Density: 10-100 kg/m³",
          "Energy absorption: 90%+",
        ],
      },
      {
        name: "Gradient Cell Protection",
        description:
          "Denser cells on outside, looser inside for impact response",
        specs: [
          "Outer cell size: 1-5mm",
          "Inner cell size: 5-20mm",
          "Customizable protection level",
        ],
      },
      {
        name: "Bio-Inspired Packing Material",
        description:
          "Sustainable packing using pomelo peel or peel-inspired materials",
        specs: [
          "Fully compostable",
          "Renewable material",
          "Economic efficiency: High",
        ],
      },
    ],
  },

  // ========== OPTICS & COLORS ==========
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
    id: "firefly-lantern-1",
    organism: "Firefly Lantern",
    scientificName: "Photinus pyralis",
    category: "Optics & Colors",
    challenge: "Efficient Light Emission & Direction",
    mechanism:
      "Firefly abdomen has translucent cuticle with specific geometry that acts as light guide and reflector, directing bioluminescent light efficiently outward while preventing loss",
    advantage:
      "95% light efficiency, directional emission, no heat loss, biological light production",
    implementation:
      "Design optical guides with curved reflective surfaces and refractive index matching for efficient light direction",
    image: "🔦",
    tags: ["optics", "lighting", "efficiency", "bioluminescence"],
    metrics: {
      efficiency: 0.96,
      sustainability: 0.95,
      manufacturability: 0.75,
    },
    designVariants: [
      {
        name: "Curved Reflector Guide",
        description: "Curved reflective surfaces with light-generating core",
        specs: [
          "Reflectance: >95%",
          "Directional beam: <30°",
          "Efficiency: 90%+",
        ],
      },
      {
        name: "Index-Matched Light Pipe",
        description:
          "Optical fiber with surrounding medium matched for minimal loss",
        specs: [
          "Core index: 1.45-1.55",
          "Cladding match: Critical",
          "Length: Variable",
        ],
      },
      {
        name: "Biological Wavelength Filter",
        description:
          "Optical structure tuned for specific emission wavelength like firefly",
        specs: [
          "Peak wavelength: 560nm (green)",
          "Narrow bandwidth",
          "Monochromatic output",
        ],
      },
    ],
  },
  {
    id: "cat-eye-1",
    organism: "Cat Eye (Tapetum Lucidum)",
    scientificName: "Felis catus",
    category: "Optics & Colors",
    challenge: "Night Vision Enhancement",
    mechanism:
      "Cat eyes have tapetum lucidum - a reflective layer behind the retina that bounces light back through photoreceptors, effectively doubling light capture and enabling vision in low-light conditions",
    advantage:
      "See in light levels 6x lower than humans, no power consumption, biological implementation",
    implementation:
      "Design reflective coatings with specific angles and material composition to maximize light return",
    image: "👁️",
    tags: ["optics", "vision", "reflection", "night-vision"],
    metrics: {
      efficiency: 0.94,
      sustainability: 0.92,
      manufacturability: 0.79,
    },
    designVariants: [
      {
        name: "Retroreflector Coating",
        description:
          "Multi-layer reflector that returns light along incident direction",
        specs: [
          "Reflectance: 95%+",
          "Wavelength: Visible spectrum",
          "Angle tolerance: ±30°",
        ],
      },
      {
        name: "Micro-Mirror Array",
        description:
          "Array of tiny mirrors at optimal angles for light reflection",
        specs: [
          "Mirror size: 10-100µm",
          "Reflection: Specular",
          "Low loss",
        ],
      },
      {
        name: "Multilayer Dielectric Reflector",
        description:
          "Alternating refractive index layers for broadband reflection",
        specs: [
          "Layer count: 5-20",
          "Reflectance: 95-99%",
          "Wavelength range: 400-1000nm",
        ],
      },
    ],
  },
  {
    id: "peacock-feather-1",
    organism: "Peacock Feather",
    scientificName: "Pavo cristatus",
    category: "Optics & Colors",
    challenge: "Dynamic Multicolor Display",
    mechanism:
      "Peacock feathers use nanostructured barbules with thin-film interference and absorption to create iridescent colors that change with viewing angle, using no pigments",
    advantage:
      "Angle-dependent colors, high saturation, structural durability, no dyes needed",
    implementation:
      "Create angle-dependent reflective structures using thin films or photonic crystals",
    image: "🦚",
    tags: ["color", "iridescent", "optics", "structural"],
    metrics: {
      efficiency: 0.91,
      sustainability: 0.97,
      manufacturability: 0.70,
    },
    designVariants: [
      {
        name: "Angle-Tuned Thin Film",
        description:
          "Multi-layer thin film optimized for specific viewing angles",
        specs: [
          "Color shift: 30-60° viewing range",
          "Saturation: High",
          "Multiple colors: Simultaneous",
        ],
      },
      {
        name: "Nanostructured Photonic Surface",
        description:
          "Nanostructured surface that creates iridescent colors through multiple mechanisms",
        specs: [
          "Structure size: 50-500nm",
          "Color range: Full spectrum",
          "Durability: 10+ years",
        ],
      },
      {
        name: "Dynamic Color Coating",
        description:
          "Smart coating that changes colors based on angle or angle-independent variable",
        specs: [
          "Viewing angles: Tunable",
          "Reversible: Yes",
          "Response time: <1 second",
        ],
      },
    ],
  },

  // ========== SENSING & DETECTION ==========
  {
    id: "pit-viper-heat-sense-1",
    organism: "Pit Viper (Thermal Pit)",
    scientificName: "Crotalus species",
    category: "Sensing & Detection",
    challenge: "Infrared Heat Detection",
    mechanism:
      "Pit vipers have specialized pits with thin membrane containing temperature-sensitive nerve endings, detecting infrared radiation from warm bodies even in complete darkness",
    advantage:
      "Detects temperature differences as small as 0.03°C at distance, passive infrared sensing, biological efficiency",
    implementation:
      "Design thermal sensor arrays using microbolometers or other IR-sensitive materials arranged in concave reflector geometry",
    image: "🐍",
    tags: ["thermal", "infrared", "sensing", "detection"],
    metrics: {
      efficiency: 0.93,
      sustainability: 0.88,
      manufacturability: 0.72,
    },
    designVariants: [
      {
        name: "Microbolometer Array",
        description:
          "Thermal sensor array responding to infrared radiation",
        specs: [
          "Resolution: <0.1°C",
          "Response time: <100ms",
          "Array size: 32x32 to 640x480",
        ],
      },
      {
        name: "Reflector-Coupled Sensor",
        description:
          "Thermal sensors coupled with concave reflector for focusing IR",
        specs: [
          "Focal length: Optimized",
          "Sensitivity: Enhanced 10x",
          "Field of view: 30-60°",
        ],
      },
      {
        name: "Passive Membrane Detector",
        description:
          "Thin membrane with differential heat sensors mimicking viper pit",
        specs: [
          "Membrane material: Thin polymer",
          "Sensor type: Thermistor or pyroelectric",
          "Sensitivity: Very high",
        ],
      },
    ],
  },
  {
    id: "dog-smell-detection-1",
    organism: "Dog Olfactory System",
    scientificName: "Canis lupus familiaris",
    category: "Sensing & Detection",
    challenge: "Chemical Vapor Detection",
    mechanism:
      "Dogs have olfactory bulb with 300 million receptors arranged for detecting individual molecules and their combinations, enabling identification of specific odors at extremely low concentrations",
    advantage:
      "Detects parts-per-trillion concentrations, complex mixture discrimination, active sensing through sniffing",
    implementation:
      "Design arrays of chemical sensors with pattern recognition for odor classification",
    image: "🐕",
    tags: ["chemical", "detection", "sensing", "olfactory"],
    metrics: {
      efficiency: 0.92,
      sustainability: 0.90,
      manufacturability: 0.68,
    },
    designVariants: [
      {
        name: "Chemical Sensor Array",
        description:
          "Multiple chemical sensors with cross-sensitivity for pattern recognition",
        specs: [
          "Sensor count: 32-256",
          "Detection limit: ppt to ppb",
          "Response time: <1 second",
        ],
      },
      {
        name: "Biomimetic Olfactory Chip",
        description:
          "Microfluidic chip with molecular receptors mimicking olfactory bulb",
        specs: [
          "Receptor type: Protein or artificial",
          "Array density: High",
          "Multiplexing: Yes",
        ],
      },
      {
        name: "Active Sampling System",
        description:
          "Includes active sniffing mechanism to concentrate samples",
        specs: [
          "Sniff frequency: Variable",
          "Concentration: 10-100x",
          "Power: Moderate",
        ],
      },
    ],
  },
  {
    id: "spider-vibration-1",
    organism: "Spider Web Vibration Sensing",
    scientificName: "Araneae species",
    category: "Sensing & Detection",
    challenge: "Vibration & Motion Detection",
    mechanism:
      "Spiders sense vibrations through their legs using specialized organs (lyriform organs) that detect minimal vibration amplitudes, enabling detection of prey or predators from web disturbances",
    advantage:
      "Extremely sensitive vibration detection, distributed sensing network, multiplexed information",
    implementation:
      "Design vibration sensor arrays using accelerometers or MEMS devices arranged in distributed network",
    image: "🕸️",
    tags: ["vibration", "sensing", "distributed", "detection"],
    metrics: {
      efficiency: 0.91,
      sustainability: 0.87,
      manufacturability: 0.80,
    },
    designVariants: [
      {
        name: "Accelerometer Sensor Network",
        description: "Distributed accelerometers connected in web-like topology",
        specs: [
          "Sensitivity: <0.01g",
          "Node count: 10-100",
          "Wireless connectivity",
        ],
      },
      {
        name: "Fiber Optic Sensing Network",
        description:
          "Optical fibers serving as both structure and sensor for vibrations",
        specs: [
          "Fiber length: 1-100m",
          "Frequency range: 1-10 kHz",
          "Distributed sensing",
        ],
      },
      {
        name: "Resonant Cantilever Array",
        description:
          "Array of tuned cantilevers responding to specific frequencies",
        specs: [
          "Frequency range: Variable",
          "Quality factor: High",
          "Sensitivity: Tunable",
        ],
      },
    ],
  },

  // ========== WATER MANAGEMENT ==========
  {
    id: "cactus-water-storage-1",
    organism: "Cactus (Water Storage)",
    scientificName: "Cactaceae family",
    category: "Water Management",
    challenge: "Water Capture & Storage",
    mechanism:
      "Cacti have shallow but wide root networks that quickly capture sparse rainfall, and thick succulent tissues that store water with low evaporation rates through thick waxy cuticle",
    advantage:
      "Captures 2-3x more water than competing plants, stores for months, minimal loss, efficient under extreme conditions",
    implementation:
      "Design high surface area capturing systems with low-evaporation storage structures",
    image: "🌵",
    tags: ["water", "storage", "capture", "desert"],
    metrics: {
      efficiency: 0.94,
      sustainability: 0.98,
      manufacturability: 0.81,
    },
    designVariants: [
      {
        name: "Root-Mimicking Capture System",
        description:
          "Wide shallow collector network for efficient water capture",
        specs: [
          "Surface area: 5-10x cross-section",
          "Capture efficiency: 90%+",
          "Flow rate: Gravity-driven",
        ],
      },
      {
        name: "Waxy Storage Tank",
        description:
          "Storage tank with waxy inner coating for minimal evaporation",
        specs: [
          "Evaporation loss: <5% per month",
          "Coating: Polymer or bio-wax",
          "Duration: Years",
        ],
      },
      {
        name: "Gel Absorption Matrix",
        description:
          "High-capacity absorbing gel matrix for distributed storage",
        specs: [
          "Storage capacity: 10-50x weight",
          "Gel type: Hydrogel",
          "Release: Slow, plant-available",
        ],
      },
    ],
  },
  {
    id: "mangrove-salt-filtration-1",
    organism: "Mangrove Tree",
    scientificName: "Rhizophora species",
    category: "Water Management",
    challenge: "Salt Filtration from Saltwater",
    mechanism:
      "Mangroves filter salt through selective root membranes, removing 90% of salt from seawater while absorbing freshwater, enabling survival in salty environments",
    advantage:
      "Efficient salt removal, passive osmotic process, freshwater recovery from saltwater",
    implementation:
      "Design selective membrane systems using osmotic pressure or mechanical filtering at nanoscale",
    image: "🌴",
    tags: ["filtration", "salt", "water", "osmotic"],
    metrics: {
      efficiency: 0.93,
      sustainability: 0.97,
      manufacturability: 0.70,
    },
    designVariants: [
      {
        name: "Selective Osmotic Membrane",
        description:
          "Membrane allowing water but blocking salt ions through size selectivity",
        specs: [
          "Salt rejection: 90-95%",
          "Water permeability: High",
          "Material: Polymer or cellulose",
        ],
      },
      {
        name: "Layered Filtration Structure",
        description:
          "Multiple filtration layers with progressively smaller pore sizes",
        specs: [
          "Layer count: 3-5",
          "Pore sizes: 10µm to 1nm",
          "Efficiency: 99%",
        ],
      },
      {
        name: "Root-Integrated Filtering System",
        description:
          "Living or biomimetic root system with embedded filters",
        specs: [
          "Surface area: Maximum",
          "Continuous operation",
          "Self-cleaning: Yes",
        ],
      },
    ],
  },
  {
    id: "dung-beetle-water-1",
    organism: "Dung Beetle (Hydration)",
    scientificName: "Scarabaeus species",
    category: "Water Management",
    challenge: "Water Harvesting from Air",
    mechanism:
      "Dung beetles have textured exoskeletons with both hydrophilic and hydrophobic regions that capture atmospheric moisture through condensation and capillary action",
    advantage:
      "Harvests water from 50% humidity air, passive process, integrated into structure",
    implementation:
      "Create textured surfaces with mixed wettability for atmospheric water capture",
    image: "🪲",
    tags: ["water", "harvesting", "air", "atmosphere"],
    metrics: {
      efficiency: 0.85,
      sustainability: 0.99,
      manufacturability: 0.77,
    },
    designVariants: [
      {
        name: "Hygroscopic Textured Surface",
        description:
          "Textured surface with hygroscopic material absorbing atmospheric moisture",
        specs: [
          "Collection rate: 1-5 L/m²/day (50% humidity)",
          "Desorption: Heat-activated",
          "Reusable: Infinite cycles",
        ],
      },
      {
        name: "Capillary Water Extraction",
        description:
          "Capillary structures drawing moisture from humid air",
        specs: [
          "Channel size: 1-100µm",
          "Capillary pressure: Optimized",
          "Efficiency: 60-80%",
        ],
      },
      {
        name: "Wettability-Patterned Mesh",
        description:
          "Mesh with alternating wettability drawing and transporting water",
        specs: [
          "Pattern period: 100-1000µm",
          "Transport: Passive or active",
          "Scalability: Excellent",
        ],
      },
    ],
  },

  // ========== COMMUNICATION & SIGNALING ==========
  {
    id: "bioluminescent-communication-1",
    organism: "Dinoflagellate Bioluminescence",
    scientificName: "Dinophysis species",
    category: "Communication & Signaling",
    challenge: "Optical Communication System",
    mechanism:
      "Dinoflagellates emit bioluminescent light through chemical reactions with extremely high quantum efficiency (near 100%), enabling underwater light-based communication and defense",
    advantage:
      "Very high light efficiency, underwater communication, wavelength tuning, chemical energy",
    implementation:
      "Design chemiluminescent or bioluminescent systems with optical guides for communication",
    image: "✨",
    tags: ["bioluminescence", "communication", "optical", "efficiency"],
    metrics: {
      efficiency: 0.98,
      sustainability: 0.95,
      manufacturability: 0.65,
    },
    designVariants: [
      {
        name: "Chemiluminescent Reaction",
        description:
          "Controlled chemical reaction producing light on-demand",
        specs: [
          "Quantum efficiency: 80-95%",
          "Wavelength: 450-600nm",
          "Control: Chemical or electrical",
        ],
      },
      {
        name: "Genetically Engineered Organism",
        description:
          "Bioengineered microorganism producing bioluminescent protein",
        specs: [
          "Protein: GFP or luciferase variants",
          "Efficiency: 20-40%",
          "Wavelength: Tunable via mutation",
        ],
      },
      {
        name: "Optical Wireless Link",
        description:
          "Light communication system using bioluminescent source",
        specs: [
          "Data rate: 1-100 kbps",
          "Range: 1-100m underwater",
          "Modulation: Frequency or intensity",
        ],
      },
    ],
  },
  {
    id: "whale-song-communication-1",
    organism: "Humpback Whale Vocalization",
    scientificName: "Megaptera novaeangliae",
    category: "Communication & Signaling",
    challenge: "Long-Distance Acoustic Communication",
    mechanism:
      "Whales produce complex songs that travel hundreds of miles underwater, using specific frequencies below ambient noise levels, complex patterning for information encoding",
    advantage:
      "Long-range communication (100+ km), penetrates water, complex information transfer, passive reception",
    implementation:
      "Design acoustic systems with strategic frequency selection and directional transmission/reception",
    image: "🎵",
    tags: ["acoustic", "communication", "underwater", "sound"],
    metrics: {
      efficiency: 0.90,
      sustainability: 0.92,
      manufacturability: 0.76,
    },
    designVariants: [
      {
        name: "Low-Frequency Acoustic Transmitter",
        description:
          "Transmitter operating at low frequency for long-distance propagation",
        specs: [
          "Frequency: 10-200 Hz",
          "Range: 100+ km underwater",
          "Directional: Tunable",
        ],
      },
      {
        name: "Passive Acoustic Hydrophone Array",
        description:
          "Array of underwater microphones for long-distance detection",
        specs: [
          "Sensitivity: High",
          "Frequency range: 10-50 kHz",
          "Distributed sensing",
        ],
      },
      {
        name: "Biomimetic Vocalization Structure",
        description:
          "Acoustic generator mimicking whale vocal anatomy",
        specs: [
          "Frequency range: Variable",
          "Complexity: High",
          "Efficiency: >80%",
        ],
      },
    ],
  },

  // ========== ENERGY HARVESTING ==========
  {
    id: "leaf-photosynthesis-1",
    organism: "Plant Leaf (Photosynthesis)",
    scientificName: "Various species",
    category: "Energy Harvesting",
    challenge: "Solar Energy Conversion",
    mechanism:
      "Leaves use photosynthetic pigments (chlorophyll) in organized thylakoid structures to capture photons and convert light energy to chemical energy with 11% theoretical maximum efficiency",
    advantage:
      "Direct solar energy capture, ambient temperature operation, produces useful chemical products, self-repair",
    implementation:
      "Design photovoltaic systems using similar quantum efficiency principles or artificial photosynthesis",
    image: "🍃",
    tags: ["energy", "solar", "photosynthesis", "harvesting"],
    metrics: {
      efficiency: 0.85,
      sustainability: 0.99,
      manufacturability: 0.75,
    },
    designVariants: [
      {
        name: "Photosynthetic Cell Reactor",
        description:
          "Engineered photosynthetic cells for direct chemical energy production",
        specs: [
          "Efficiency: 5-10%",
          "Output: Biogas or hydrogen",
          "Continuous operation",
        ],
      },
      {
        name: "Artificial Photosynthesis Panel",
        description:
          "Synthetic system mimicking photosynthetic light reactions",
        specs: [
          "Efficiency: 10-15%",
          "Product: H2 or CO conversion",
          "Scalable design",
        ],
      },
      {
        name: "Bio-Hybrid Solar Cell",
        description:
          "Photosynthetic proteins integrated with electronic components",
        specs: [
          "Efficiency: 8-12%",
          "Output: Electricity or chemical",
          "Biological + electronic",
        ],
      },
    ],
  },
  {
    id: "shark-electroreception-energy-1",
    organism: "Shark (Electroreception)",
    scientificName: "Sphyrna species",
    category: "Energy Harvesting",
    challenge: "Bioelectric Field Detection",
    mechanism:
      "Sharks detect minute bioelectric fields (5 nanovolts/cm) through specialized organs (ampullae of Lorenzini) containing jelly-filled pores with electroreceptor cells",
    advantage:
      "Extremely sensitive electrical field detection, passive sensing, biological implementation",
    implementation:
      "Design sensitive electrochemical sensors with nano-scale electrodes for bioelectric field measurement",
    image: "🦈",
    tags: ["bioelectric", "sensing", "detection", "passive"],
    metrics: {
      efficiency: 0.88,
      sustainability: 0.90,
      manufacturability: 0.69,
    },
    designVariants: [
      {
        name: "Nano-Electrode Array",
        description:
          "Ultra-sensitive electrodes for detecting minute voltage variations",
        specs: [
          "Sensitivity: <1 nV",
          "Electrode spacing: <10µm",
          "Amplification: High-gain",
        ],
      },
      {
        name: "Jelly-Filled Sensor Pod",
        description:
          "Gel-filled sensor chamber mimicking ampulla structure",
        specs: [
          "Resistance: Optimized",
          "Electrode: Central",
          "Field sensitivity: Directional",
        ],
      },
      {
        name: "3D Electroreceptor Network",
        description:
          "Distributed electroreceptors forming 3D sensing network",
        specs: [
          "Array density: High",
          "Spatial resolution: mm-scale",
          "Frequency response: DC-10 Hz",
        ],
      },
    ],
  },
  {
    id: "electric-fish-generation-1",
    organism: "Electric Eel",
    scientificName: "Electrophorus electricus",
    category: "Energy Harvesting",
    challenge: "Biological Electrical Power Generation",
    mechanism:
      "Electric eels generate up to 860 volts through stacked electroplaques (electrocyte columns) arranged in series, each cell generating ~0.15V through ion pumping",
    advantage:
      "Biological power generation, no moving parts, controllable output, room temperature",
    implementation:
      "Design stacked ion-pumping cells creating bioelectric potential through membrane transport",
    image: "⚡",
    tags: ["bioelectric", "energy", "generation", "power"],
    metrics: {
      efficiency: 0.92,
      sustainability: 0.94,
      manufacturability: 0.64,
    },
    designVariants: [
      {
        name: "Electroplaque Stack",
        description:
          "Series of ion-pumping membranes generating high voltage",
        specs: [
          "Voltage per cell: 0.15V",
          "Cell count: 100-5000",
          "Total voltage: 15-750V",
        ],
      },
      {
        name: "Bio-Inspired Fuel Cell Stack",
        description:
          "Electrochemical cells stacked for voltage multiplication",
        specs: [
          "Cell voltage: 0.5-1V",
          "Stackable: Yes",
          "Fuel type: Organic or biological",
        ],
      },
      {
        name: "Artificial Bioelectric Generator",
        description:
          "Synthetic system mimicking eel electric organ function",
        specs: [
          "Output voltage: Variable",
          "Output current: Tunable",
          "Efficiency: 80%+",
        ],
      },
    ],
  },

  // ========== MOVEMENT & LOCOMOTION ==========
  {
    id: "gecko-climbing-1",
    organism: "Gecko Climbing",
    scientificName: "Hemidactylus frenatus",
    category: "Movement & Locomotion",
    challenge: "Wall Climbing Without Adhesive",
    mechanism:
      "Gecko feet have microscopic hair structures (setae) using van der Waals forces for adhesion, combined with dynamic toe motion allowing rapid climbing on any surface angle",
    advantage:
      "Climbs vertical and inverted surfaces, reversible adhesion, works on any material, high speed",
    implementation:
      "Create hairy climbing pads using polymer bristles with optimal spacing and material properties",
    image: "🦎",
    tags: ["climbing", "adhesion", "locomotion", "movement"],
    metrics: {
      efficiency: 0.93,
      sustainability: 0.97,
      manufacturability: 0.71,
    },
    designVariants: [
      {
        name: "Hairy Climbing Pad Boot",
        description:
          "Wearable pad with gecko-hair structure for climbing",
        specs: [
          "Setae density: 100-200 per mm²",
          "Hold capacity: 2x body weight",
          "Surface angle: Any (0-180°)",
        ],
      },
      {
        name: "Climbing Robot Foot",
        description:
          "Robotic foot using hairy pads for surface navigation",
        specs: [
          "Setae actuation: Electrostatic or mechanical",
          "Climbing speed: 1-10 m/s",
          "Payload: Variable",
        ],
      },
      {
        name: "Self-Cleaning Hairy Surface",
        description:
          "Climbing surface that maintains adhesion through self-cleaning",
        specs: [
          "Setae: Flexible",
          "Self-cleaning: Mechanical",
          "Durability: 1000+ climbs",
        ],
      },
    ],
  },
  {
    id: "jellyfish-propulsion-1",
    organism: "Jellyfish Propulsion",
    scientificName: "Aurelia aurita",
    category: "Movement & Locomotion",
    challenge: "Efficient Fluid Propulsion",
    mechanism:
      "Jellyfish propel through water by contracting and relaxing muscular bell, creating jet propulsion with minimal energy loss through optimized motion patterns and bell geometry",
    advantage:
      "Extremely efficient (10x more efficient than fish), works in density-stratified fluids, flexible design",
    implementation:
      "Design propulsion systems using pulsed jet flows or biomimetic flapping with optimized geometry",
    image: "🪼",
    tags: ["propulsion", "locomotion", "efficiency", "fluid"],
    metrics: {
      efficiency: 0.96,
      sustainability: 0.95,
      manufacturability: 0.78,
    },
    designVariants: [
      {
        name: "Pulsed Jet Thruster",
        description:
          "System that expels fluid in controlled pulses like jellyfish bell",
        specs: [
          "Pulse frequency: 1-5 Hz",
          "Jet diameter: 10-100cm",
          "Efficiency: 80-90%",
        ],
      },
      {
        name: "Elastic Bell Structure",
        description:
          "Elastic material designed to store and release energy efficiently",
        specs: [
          "Material: Elastomer or composite",
          "Recovery: 90%+ elastic",
          "Cycle life: 1000s of contractions",
        ],
      },
      {
        name: "Muscle-Powered Propulsion System",
        description:
          "Biomimetic actuators providing jellyfish-like propulsion",
        specs: [
          "Actuation: Electroactive polymer or pneumatic",
          "Contraction rate: 1-5 Hz",
          "Payload: Variable",
        ],
      },
    ],
  },
  {
    id: "springtail-jumping-1",
    organism: "Springtail (Furcula)",
    scientificName: "Collembola species",
    category: "Movement & Locomotion",
    challenge: "High-Performance Jumping",
    mechanism:
      "Springtails have a spring-loaded tail (furcula) held under tension by latch mechanism, releasing suddenly for extreme acceleration and distance jumping (10-100x body length)",
    advantage:
      "Extreme acceleration, compact energy storage, repeatable jumping, minimal preparation time",
    implementation:
      "Design elastic latching mechanisms and spring structures for stored energy release",
    image: "🦗",
    tags: ["jumping", "locomotion", "elastic", "acceleration"],
    metrics: {
      efficiency: 0.94,
      sustainability: 0.96,
      manufacturability: 0.79,
    },
    designVariants: [
      {
        name: "Spring-Loaded Catapult",
        description:
          "Latching spring mechanism for explosive release of stored energy",
        specs: [
          "Stored energy: Tunable",
          "Release time: <100ms",
          "Jump distance: 1-10m",
        ],
      },
      {
        name: "Elastic Polymer Spring",
        description:
          "High-performance polymer spring mimicking springtail furcula",
        specs: [
          "Spring constant: Tunable",
          "Recovery: >95%",
          "Cycle life: Unlimited",
        ],
      },
      {
        name: "Jumping Robot Leg",
        description:
          "Robotic jumping mechanism using springtail principles",
        specs: [
          "Jump height: 1-10m",
          "Payload: Variable",
          "Frequency: 1-10 jumps/sec",
        ],
      },
    ],
  },

  // ========== GROWTH & DEVELOPMENT ==========
  {
    id: "tree-growth-1",
    organism: "Tree Growth Pattern",
    scientificName: "Quercus species",
    category: "Growth & Development",
    challenge: "Self-Optimizing Structure Growth",
    mechanism:
      "Trees grow by optimizing structure based on wind loads and light availability, creating strongest where stress is highest through adaptive growth patterns and branch angles",
    advantage:
      "Self-optimizing for local conditions, minimal material usage, inherent strength, long-term adaptation",
    implementation:
      "Design computational models for stress-aware growth patterns and algorithmic structure generation",
    image: "🌲",
    tags: ["structure", "growth", "optimization", "adaptation"],
    metrics: {
      efficiency: 0.95,
      sustainability: 0.98,
      manufacturability: 0.73,
    },
    designVariants: [
      {
        name: "Stress-Guided Additive Manufacturing",
        description:
          "3D printing algorithm that adds material where stress is highest",
        specs: [
          "Optimization: Real-time FEA",
          "Material savings: 30-50%",
          "Print time: Adaptive",
        ],
      },
      {
        name: "Biomimetic Branch Angles",
        description:
          "Optimized branching geometry following tree patterns",
        specs: [
          "Angle optimization: Leonardo's angle (137.5°)",
          "Fractal structure: Self-similar",
          "Strength: Natural maximum",
        ],
      },
      {
        name: "Adaptive Robot Growth",
        description:
          "Modular robot that grows structure based on environmental loads",
        specs: [
          "Modular units: Stackable",
          "Growth direction: Load-responsive",
          "Real-time adaptation",
        ],
      },
    ],
  },
  {
    id: "nautilus-shell-spiral-1",
    organism: "Nautilus Shell Spiral",
    scientificName: "Nautilus pompilius",
    category: "Growth & Development",
    challenge: "Logarithmic Growth Scaling",
    mechanism:
      "Nautilus creates progressively larger spiral chambers following logarithmic spiral pattern, maintaining optimal proportions while growing, using minimal material per volume",
    advantage:
      "Optimal scaling geometry, structural efficiency, beautiful mathematics, material efficiency",
    implementation:
      "Design systems following golden ratio/Fibonacci sequences for natural growth patterns",
    image: "🐚",
    tags: ["spiral", "growth", "geometry", "scaling"],
    metrics: {
      efficiency: 0.94,
      sustainability: 0.97,
      manufacturability: 0.85,
    },
    designVariants: [
      {
        name: "Logarithmic Spiral Container",
        description:
          "Storage or structural system following nautilus spiral proportions",
        specs: [
          "Spiral ratio: Golden ratio (1.618)",
          "Volume efficiency: Optimal",
          "Strength distribution: Natural",
        ],
      },
      {
        name: "Fibonacci-Patterned Structure",
        description:
          "Structure using Fibonacci sequence for optimal strength distribution",
        specs: [
          "Material distribution: Fibonacci",
          "Branch patterns: Natural",
          "Load bearing: Optimized",
        ],
      },
      {
        name: "Self-Scaling Architecture",
        description:
          "Computational design that automatically scales elements using golden ratio",
        specs: [
          "Scalability: Infinite",
          "Proportion: Maintained",
          "Automation: Algorithmic",
        ],
      },
    ],
  },

  // ========== SELF-REPAIR & HEALING ==========
  {
    id: "starfish-regeneration-1",
    organism: "Starfish Regeneration",
    scientificName: "Asteroidea species",
    category: "Self-Repair & Healing",
    challenge: "Biological Self-Repair",
    mechanism:
      "Starfish can regrow lost limbs and organs through dedifferentiation of cells and controlled growth patterns, creating functional replacements from stem-like cells",
    advantage:
      "Complete regeneration possible, multiple parts replaceable, inherent repair, lifetime material renewal",
    implementation:
      "Engineer materials or systems with self-healing polymers or biological regeneration capabilities",
    image: "⭐",
    tags: ["regeneration", "self-repair", "healing", "biological"],
    metrics: {
      efficiency: 0.87,
      sustainability: 0.99,
      manufacturability: 0.62,
    },
    designVariants: [
      {
        name: "Self-Healing Polymer Matrix",
        description:
          "Polymer with embedded healing agents that activate upon damage",
        specs: [
          "Healing efficiency: 70-100%",
          "Healing time: Hours to days",
          "Cycle life: Limited (10-100x)",
        ],
      },
      {
        name: "Bio-Engineered Regenerative Scaffold",
        description:
          "Biological scaffold encouraging cell growth and regeneration",
        specs: [
          "Material: Natural polymer or ECM",
          "Cell seeding: Yes",
          "Regeneration time: Weeks to months",
        ],
      },
      {
        name: "Capsule-Based Healing System",
        description:
          "Embedded microcapsules releasing healing agents upon crack formation",
        specs: [
          "Capsule diameter: 1-1000µm",
          "Trigger: Mechanical rupture",
          "Healing: Multiple triggers possible",
        ],
      },
    ],
  },
  {
    id: "crocodile-tooth-replacement-1",
    organism: "Crocodile Tooth Replacement",
    scientificName: "Crocodylus niloticus",
    category: "Self-Repair & Healing",
    challenge: "Continuous Tooth Replacement System",
    mechanism:
      "Crocodiles continuously replace teeth throughout their lifetime using multiple dental laminae (replacement tooth lines) that supply new teeth, enabling lifetime functionality",
    advantage:
      "Lifetime tooth replacement, no decay-related failures, maintenance-free system, evolutionary proven",
    implementation:
      "Design distributed manufacturing systems that continuously produce replacement components",
    image: "🐊",
    tags: ["replacement", "regeneration", "continuous", "healing"],
    metrics: {
      efficiency: 0.90,
      sustainability: 0.96,
      manufacturability: 0.73,
    },
    designVariants: [
      {
        name: "Distributed Production Facility",
        description:
          "System of small manufacturing units continuously producing replacement parts",
        specs: [
          "Production rate: Continuous",
          "Unit count: Multiple",
          "Storage: Built-in",
        ],
      },
      {
        name: "Biological Replacement System",
        description:
          "Living tissue system that grows replacement components on-demand",
        specs: [
          "Growth: Controlled",
          "Replacement rate: Variable",
          "Integration: Seamless",
        ],
      },
      {
        name: "Modular Quick-Change System",
        description:
          "Mechanical system for rapid replacement of worn components",
        specs: [
          "Change time: Seconds",
          "Compatibility: Universal",
          "Wear life: Optimized per part",
        ],
      },
    ],
  },

  // ========== THERMAL MANAGEMENT ==========
  {
    id: "polar-bear-insulation-1",
    organism: "Polar Bear Fur",
    scientificName: "Ursus maritimus",
    category: "Thermal Management",
    challenge: "Extreme Cold Insulation",
    mechanism:
      "Polar bear fur has hollow transparent hairs that trap air and scatter light for insulation while appearing white, combined with dense underfur creating 90% insulation efficiency in extreme cold",
    advantage:
      "Extreme insulation at minimal weight, UV protection, thermal management in extreme conditions",
    implementation:
      "Design multi-scale insulation with hollow structures and air gaps",
    image: "🐻",
    tags: ["insulation", "thermal", "hollow", "lightweight"],
    metrics: {
      efficiency: 0.96,
      sustainability: 0.94,
      manufacturability: 0.76,
    },
    designVariants: [
      {
        name: "Hollow Fiber Insulation",
        description: "Hollow synthetic fibers creating air insulation like polar bear fur",
        specs: [
          "Fiber diameter: 50-200µm",
          "Wall thickness: 5-20µm",
          "R-value: 10-30 per inch",
        ],
      },
      {
        name: "Dual-Layer Thermal Insulation",
        description:
          "Outer guard hairs and inner underfur structure for thermal layering",
        specs: [
          "Outer layer: Protective and hydrophobic",
          "Inner layer: Maximum insulation",
          "Combined R-value: Very high",
        ],
      },
      {
        name: "Aerogel Padding",
        description:
          "Ultra-lightweight aerogel mimicking trapped air structure",
        specs: [
          "Density: 1-10 kg/m³",
          "Thermal conductivity: <0.02 W/m·K",
          "Extreme insulation",
        ],
      },
    ],
  },
  {
    id: "camel-heat-dissipation-1",
    organism: "Camel Fur (Desert Cooling)",
    scientificName: "Camelus dromedarius",
    category: "Thermal Management",
    challenge: "Desert Heat Dissipation",
    mechanism:
      "Camel fur is thick but has air spaces that allow air circulation, combined with light color reflecting heat and specialized skin that minimizes water loss while maximizing radiative cooling",
    advantage:
      "Maintains 2°C cooler skin in desert heat, minimal water loss, passive heat rejection",
    implementation:
      "Design light-colored materials with controlled porosity for heat dissipation",
    image: "🐫",
    tags: ["cooling", "heat", "reflective", "desert"],
    metrics: {
      efficiency: 0.91,
      sustainability: 0.96,
      manufacturability: 0.84,
    },
    designVariants: [
      {
        name: "Light-Colored Porous Material",
        description:
          "Porous material with light coloring for heat reflection and air circulation",
        specs: [
          "Color: White/light",
          "Porosity: 30-60%",
          "Heat rejection: 60-80%",
        ],
      },
      {
        name: "Radiative Cooling Coating",
        description:
          "Coating optimized for thermal radiation in IR spectrum",
        specs: [
          "Solar reflectance: >0.8",
          "Thermal emissivity: >0.9",
          "Cooling: 5-15°C below ambient",
        ],
      },
      {
        name: "Moisture-Regulating Fur Equivalent",
        description:
          "Material that minimizes moisture loss while maximizing heat dissipation",
        specs: [
          "Vapor transmission: Tunable",
          "Heat rejection: High",
          "Water retention: Minimized",
        ],
      },
    ],
  },
];
