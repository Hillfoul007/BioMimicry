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

// Base organisms with detailed information
const baseOrganisms = [
  // COOLING & VENTILATION
  {
    organism: "African Termite Mound",
    scientificName: "Macrotermes michaelseni",
    category: "Cooling & Ventilation",
    challenge: "Passive Building Cooling",
    mechanism: "Termites create vertical and horizontal passages using air density differences",
    advantage: "90% energy reduction; passive cooling without electricity",
    implementation: "Design building ventilation with helical channels and diagonal vents",
    image: "🏛️",
    tags: ["cooling", "ventilation", "passive", "architecture"],
    variants: ["Spiral Ventilation Core", "Multi-Stack System", "Moisture-Responsive Dampers"],
  },
  {
    organism: "Emperor Penguin Huddle",
    scientificName: "Aptenodytes forsteri",
    category: "Cooling & Ventilation",
    challenge: "Efficient Group Thermal Management",
    mechanism: "Penguins rotate positions in huddles, distributing warmth through group dynamics",
    advantage: "80% energy savings in heating; self-organizing thermal management",
    implementation: "Design modular heating systems with rotating zones",
    image: "🐧",
    tags: ["thermal", "group", "rotation", "efficiency"],
    variants: ["Rotational Heat Zone", "Dynamic Insulation", "Biomimetic Crowd Flow"],
  },
  {
    organism: "Namibian Desert Beetle",
    scientificName: "Stenocara gracilipes",
    category: "Cooling & Ventilation",
    challenge: "Water Harvesting & Cooling",
    mechanism: "Beetle carapace has hydrophilic peaks and hydrophobic valleys for water capture",
    advantage: "Harvests water from 10% humidity; passive cooling effect",
    implementation: "Create textured surfaces with alternating wettability patterns",
    image: "🪲",
    tags: ["water-harvesting", "cooling", "passive", "sustainable"],
    variants: ["Wettability-Patterned Coating", "3D Textured Collector", "Smart Surface Membrane"],
  },
  {
    organism: "Eucalyptus Trees",
    scientificName: "Eucalyptus species",
    category: "Cooling & Ventilation",
    challenge: "Thermal Buffering",
    mechanism: "Eucalyptus leaves emit heat at night through radiation efficiently",
    advantage: "Night-time cooling without energy; faster thermal response",
    implementation: "Design surfaces with high emissivity coatings and thin walls",
    image: "🌳",
    tags: ["cooling", "thermal", "passive", "nocturnal"],
    variants: ["High-Emissivity Coating", "Thin-Wall Heat Sink", "Bifunctional Surface"],
  },
  {
    organism: "Evaporative Cooling Frog",
    scientificName: "Litoria caerulea",
    category: "Cooling & Ventilation",
    challenge: "Evaporative Cooling System",
    mechanism: "Frogs use skin evaporation with specialized mucus production for cooling",
    advantage: "Efficient evaporative cooling in humid conditions",
    implementation: "Create porous materials with moisture-wicking capabilities",
    image: "🐸",
    tags: ["evaporative", "cooling", "moisture", "efficiency"],
    variants: ["Porous Cooling Membrane", "Mucus-Inspired Coating", "Hydrogel System"],
  },
  // ADHESIVES & FASTENING
  {
    organism: "Gecko Feet",
    scientificName: "Hemidactylus frenatus",
    category: "Adhesives & Fastening",
    challenge: "Ultra-Strong Reusable Adhesive",
    mechanism: "Gecko toes have 2M micro-hairs using van der Waals forces for reversible adhesion",
    advantage: "Reusable unlimited times; works on any surface; no residue",
    implementation: "Create synthetic polymers with hierarchical micro/nano-scale bristles",
    image: "🦎",
    tags: ["adhesive", "fastening", "reversible", "biomimetic"],
    variants: ["Polymeric Setae Film", "3D-Printed Hierarchical", "Hybrid Bio-Polymer"],
  },
  {
    organism: "Blue Mussel",
    scientificName: "Mytilus edulis",
    category: "Adhesives & Fastening",
    challenge: "Underwater Adhesive",
    mechanism: "Mussels produce byssal threads with DOPA proteins that cross-link in water",
    advantage: "Works underwater; 25 MPa strength; biodegradable",
    implementation: "Engineer proteins or polymers with catechol groups",
    image: "🐚",
    tags: ["adhesive", "underwater", "biodegradable", "marine"],
    variants: ["Recombinant Mussel Protein", "Catechol-Based Polymer", "Byssal Thread Fiber"],
  },
  {
    organism: "Tree Frog Toe Pads",
    scientificName: "Phyllomedusa species",
    category: "Adhesives & Fastening",
    challenge: "Wet Surface Grip",
    mechanism: "Frog toe pads secrete mucus with micro-ridges for wet adhesion",
    advantage: "Grips wet surfaces better than dry; self-lubricating",
    implementation: "Create micropatterned surfaces with liquid-secreting capabilities",
    image: "🐸",
    tags: ["adhesive", "wet", "friction", "dynamic"],
    variants: ["Liquid-Secreting Pad", "Hybrid Wettability Pattern", "Pressure-Sensitive Pad"],
  },
  {
    organism: "Acorn Barnacle",
    scientificName: "Semibalanus balanoides",
    category: "Adhesives & Fastening",
    challenge: "Ultra-Durable Ocean Adhesive",
    mechanism: "Barnacles produce proteinaceous cement that hardens underwater",
    advantage: "Extremely durable in marine conditions; permanent adhesion",
    implementation: "Engineer proteins with cross-linking chemistry for marine environments",
    image: "🦪",
    tags: ["adhesive", "marine", "durable", "permanent"],
    variants: ["Bioengineered Cement", "Two-Part Marine Epoxy", "Cement Coating"],
  },
  {
    organism: "Spider Dragline",
    scientificName: "Araneus diadematus",
    category: "Adhesives & Fastening",
    challenge: "High-Strength Elastic Line",
    mechanism: "Spider dragline combines high tensile strength with elasticity",
    advantage: "Lighter than steel; elastic recovery; biodegradable",
    implementation: "Synthesize and spin recombinant spider silk",
    image: "🕸️",
    tags: ["fiber", "elastic", "strength", "biodegradable"],
    variants: ["Synthetic Spider Silk", "Multi-Ply Dragline Cable", "Hybrid Silk-Polymer"],
  },
  // AERODYNAMICS & HYDRODYNAMICS
  {
    organism: "Humpback Whale Fins",
    scientificName: "Megaptera novaeangliae",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Efficient Wind Turbine Blades",
    mechanism: "Tubercles on whale fins create beneficial vortices to increase lift",
    advantage: "20-40% aerodynamic improvement; 30% noise reduction",
    implementation: "Add tubercle-like bumps to turbine blade leading edges",
    image: "🐋",
    tags: ["aerodynamics", "efficiency", "turbines", "hydrodynamics"],
    variants: ["Leading Edge Tubercles", "Full-Surface Wave Pattern", "Adaptive Tubercle System"],
  },
  {
    organism: "Herring Gull Wing",
    scientificName: "Larus argentatus",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Energy-Efficient Gliding",
    mechanism: "Gull wings have slotted primary feathers reducing induced drag",
    advantage: "30% energy reduction during flight; 2-3x glide distance",
    implementation: "Design aircraft blades with slotted wingtips",
    image: "🦅",
    tags: ["aerodynamics", "efficiency", "gliding", "vortex"],
    variants: ["Slotted Winglet Extension", "Feathered Wingtip Design", "Divergent Trailing Edge"],
  },
  {
    organism: "Shark Skin",
    scientificName: "Lamna nasus",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Hydrodynamic Drag Reduction",
    mechanism: "Shark skin has microscopic riblets aligning turbulent flow",
    advantage: "5-10% drag reduction; passive; self-maintaining",
    implementation: "Create microscopic parallel groove patterns on surfaces",
    image: "🦈",
    tags: ["hydrodynamics", "drag-reduction", "passive", "friction"],
    variants: ["Riblet Film Coating", "Molded Riblet Surface", "3D-Printed Riblet"],
  },
  {
    organism: "Dolphin Melon Organ",
    scientificName: "Tursiops truncatus",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Underwater Sonar & Navigation",
    mechanism: "Dolphin melon focuses sound waves with high precision",
    advantage: "Detailed 3D perception at distance; works in murky water",
    implementation: "Engineer acoustic lens systems using gradient-index materials",
    image: "🐬",
    tags: ["sonar", "acoustics", "navigation", "sensing"],
    variants: ["Acoustic Lens Material", "Phased Array Transducer", "Passive Resonator"],
  },
  {
    organism: "Sailfish Sail",
    scientificName: "Istiophorus platypterus",
    category: "Aerodynamics & Hydrodynamics",
    challenge: "Fluid Flow Optimization",
    mechanism: "Sailfish dorsal fin creates complex vortex patterns for maneuverability",
    advantage: "Superior agility and turning radius in water",
    implementation: "Design fins with optimized curvature and spacing",
    image: "🐟",
    tags: ["hydrodynamics", "maneuverability", "fin", "optimization"],
    variants: ["Curved Fin Design", "Vortex-Generating Pattern", "Dynamic Sail Shape"],
  },
  // SURFACE PROPERTIES
  {
    organism: "Lotus Leaf",
    scientificName: "Nelumbo nucifera",
    category: "Surface Properties",
    challenge: "Self-Cleaning Waterproof Surface",
    mechanism: "Lotus has microscopic bumps with wax creating superhydrophobic surface",
    advantage: "Self-cleaning without chemicals; 95% fouling reduction",
    implementation: "Create micro-textured surface with hydrophobic nanoparticles",
    image: "🌸",
    tags: ["self-cleaning", "hydrophobic", "surface", "coating"],
    variants: ["Nanoparticle Coating", "Textured Polymer Film", "Bio-Inspired Wax Layer"],
  },
  {
    organism: "Rose Petal",
    scientificName: "Rosa species",
    category: "Surface Properties",
    challenge: "Adhesive Yet Repellent Surface",
    mechanism: "Rose petals have hierarchical structures combining water attraction and repulsion",
    advantage: "Holds water while repelling dirt; maintains color",
    implementation: "Create hierarchical surface with dual-scale features",
    image: "🌹",
    tags: ["hydrophobic", "adhesion", "surface", "dual-scale"],
    variants: ["Dual-Scale Hierarchical", "Petal-Inspired Coating", "3D-Printed Texture"],
  },
  {
    organism: "Fish Scale",
    scientificName: "Oreochromis niloticus",
    category: "Surface Properties",
    challenge: "Lightweight Protective Armor",
    mechanism: "Fish scales have overlapping layered structure with flexible joints",
    advantage: "80% lighter than rigid armor; self-healing capability",
    implementation: "Design layered composite with overlapping elements",
    image: "🐟",
    tags: ["protection", "lightweight", "flexible", "composite"],
    variants: ["Overlapping Plate Armor", "Layered Composite Shield", "Segmented Structure"],
  },
  {
    organism: "Nacre (Mother-of-Pearl)",
    scientificName: "Pinctada species",
    category: "Surface Properties",
    challenge: "Iridescent Protective Coating",
    mechanism: "Nacre uses aragonite platelets with specific thickness for light interference",
    advantage: "Beautiful colors without dyes; 2-3 GPa hardness",
    implementation: "Create layered structures with specific aragonite crystal size",
    image: "✨",
    tags: ["iridescent", "coating", "protective", "optical"],
    variants: ["Nacre-Inspired Coating", "Synthetic Pearl Composite", "Structural Color Filter"],
  },
  {
    organism: "Bombyx Mori (Silkworm)",
    scientificName: "Bombyx mori",
    category: "Surface Properties",
    challenge: "Smooth Low-Friction Surface",
    mechanism: "Silk fibers have smooth crystalline structure minimizing friction",
    advantage: "Ultra-low friction; smooth to touch; biodegradable",
    implementation: "Engineer smooth polymers mimicking silk crystallinity",
    image: "🦗",
    tags: ["friction", "smooth", "silk", "low-resistance"],
    variants: ["Silk-Like Polymer", "Crystalline Coating", "Bio-Inspired Fiber"],
  },
  // MATERIALS & STRUCTURES (expanding significantly)
  {
    organism: "Spider Web Silk",
    scientificName: "Nephila edulis",
    category: "Materials & Structures",
    challenge: "Ultra-Strong Lightweight Material",
    mechanism: "Spider silk is 5x stronger than steel by weight with elasticity",
    advantage: "5x stronger than steel; 35% elastic; biodegradable",
    implementation: "Synthesize recombinant spider silk proteins",
    image: "🕷️",
    tags: ["materials", "strength", "lightweight", "biopolymer"],
    variants: ["Recombinant Silk Fiber", "Hybrid Silk-Polymer", "Silk-Inspired Nanofiber"],
  },
  {
    organism: "Abalone Shell",
    scientificName: "Haliotis species",
    category: "Materials & Structures",
    challenge: "Impact-Resistant Strong Composite",
    mechanism: "Abalone shell has layers of calcium carbonate with organic matrix",
    advantage: "3000x tougher than raw material; combines hardness with toughness",
    implementation: "Create layered composites with ceramic tiles in polymer matrix",
    image: "🐚",
    tags: ["composite", "impact-resistant", "structure", "biomimetic"],
    variants: ["Ceramic-Polymer Laminate", "3D Printed Nacre-Like", "Bio-Inspired Adhesive Layering"],
  },
  {
    organism: "Mammalian Bone",
    scientificName: "Homo sapiens",
    category: "Materials & Structures",
    challenge: "Strong Yet Lightweight Structure",
    mechanism: "Bone combines hard mineral with soft protein in hierarchical structure",
    advantage: "25x stronger than steel by weight; self-healing; adaptable",
    implementation: "Design composite structures with solid cortical shell and porous interior",
    image: "💀",
    tags: ["composite", "structure", "lightweight", "adaptive"],
    variants: ["Cortical-Trabecular Composite", "Gradient Density Structure", "3D-Printed Bio-Composite"],
  },
  {
    organism: "Honeycomb (Bee Hive)",
    scientificName: "Apis mellifera",
    category: "Materials & Structures",
    challenge: "Lightweight Yet Strong Structure",
    mechanism: "Hexagonal honeycomb provides maximum volume with minimum material",
    advantage: "99% volume efficiency; high strength-to-weight; self-supporting",
    implementation: "Design structures using hexagonal cell geometry",
    image: "🍯",
    tags: ["structure", "efficiency", "lightweight", "geometry"],
    variants: ["Hexagonal Cell Panel", "Gradient Cell Honeycomb", "Bio-Foam Honeycomb"],
  },
  {
    organism: "Pomelo Peel",
    scientificName: "Citrus maxima",
    category: "Materials & Structures",
    challenge: "Impact Protection Without Rigidity",
    mechanism: "Pomelo peel has spongy cellular structure absorbing energy through deformation",
    advantage: "Energy absorption without damage; lightweight; biodegradable",
    implementation: "Design foam or cellular structures with tuned porosity",
    image: "🍊",
    tags: ["protection", "absorption", "cellular", "impact"],
    variants: ["Cellular Foam Packing", "Gradient Cell Protection", "Bio-Inspired Packing Material"],
  },
  {
    organism: "Bamboo Plant",
    scientificName: "Bambusa species",
    category: "Materials & Structures",
    challenge: "Renewable Strong Lightweight Material",
    mechanism: "Bamboo has fiber structure with optimal radial and tangential arrangement",
    advantage: "Faster renewal than timber; high strength; sustainable",
    implementation: "Develop optimized bamboo composites and laminates",
    image: "🎋",
    tags: ["renewable", "strong", "lightweight", "sustainable"],
    variants: ["Bamboo Laminate", "Fiber-Aligned Composite", "Bio-Engineered Bamboo"],
  },
];

// Function to generate massive variation of solutions
function generateSolutions(): BiologicalSolution[] {
  const solutions: BiologicalSolution[] = [];
  let idCounter = 0;

  // Create base + variations for each organism
  baseOrganisms.forEach((org) => {
    // Create main solution
    solutions.push({
      id: `bio-${idCounter++}`,
      organism: org.organism,
      scientificName: org.scientificName,
      category: org.category,
      challenge: org.challenge,
      mechanism: org.mechanism,
      advantage: org.advantage,
      implementation: org.implementation,
      image: org.image,
      tags: org.tags,
      metrics: {
        efficiency: 0.7 + Math.random() * 0.28,
        sustainability: 0.75 + Math.random() * 0.24,
        manufacturability: 0.6 + Math.random() * 0.38,
      },
      designVariants: org.variants.map((v) => ({
        name: v,
        description: `${v} variant for ${org.challenge}`,
        specs: [
          `Performance: ${80 + Math.floor(Math.random() * 20)}%`,
          `Cost index: ${Math.floor(100 + Math.random() * 150)}`,
          `Scalability: ${["High", "Medium", "Variable"][Math.floor(Math.random() * 3)]}`,
        ],
      })),
    });

    // Generate 40 variations of each organism by tweaking parameters
    for (let i = 0; i < 40; i++) {
      const variation = `${org.organism} - Variant ${i + 1}`;
      const modifiedMechanism = `${org.mechanism} with optimization level ${i + 1}`;
      
      solutions.push({
        id: `bio-${idCounter++}`,
        organism: variation,
        scientificName: org.scientificName,
        category: org.category,
        challenge: org.challenge,
        mechanism: modifiedMechanism,
        advantage: org.advantage,
        implementation: org.implementation,
        image: org.image,
        tags: [...org.tags, `variant-${i}`, `iteration-${Math.floor(i / 10)}`],
        metrics: {
          efficiency: 0.65 + Math.random() * 0.33,
          sustainability: 0.70 + Math.random() * 0.29,
          manufacturability: 0.55 + Math.random() * 0.43,
        },
        designVariants: org.variants.map((v, idx) => ({
          name: `${v} v${i + 1}`,
          description: `${v} variant adapted for iteration ${i + 1}`,
          specs: [
            `Optimization: ${Math.floor(50 + (i * 2))}%`,
            `Performance: ${80 + Math.floor(Math.random() * 19)}%`,
            `Cost factor: ${(1 + i * 0.05).toFixed(2)}x`,
            `Maturity: ${["Prototype", "Development", "Production"][Math.floor(i / 13)]}`,
          ],
        })),
      });
    }
  });

  // Additional organisms for expansion (adding more base organisms)
  const additionalOrganisms = [
    "Dragonfly Wing", "Peacock Feather", "Firefly Lantern", "Cat Eye", "Pit Viper Heat Pit",
    "Dog Olfactory System", "Spider Vibration Sensing", "Cactus Water Storage", "Mangrove Salt Filtration",
    "Dung Beetle Hydration", "Dinoflagellate Bioluminescence", "Whale Song Communication",
    "Plant Leaf Photosynthesis", "Electric Eel Generation", "Gecko Climbing", "Jellyfish Propulsion",
    "Springtail Jumping", "Tree Growth Pattern", "Nautilus Shell Spiral", "Starfish Regeneration",
    "Crocodile Tooth Replacement", "Polar Bear Insulation", "Camel Heat Dissipation",
  ];

  additionalOrganisms.forEach((organism, idx) => {
    const categories = [
      "Optics & Colors", "Sensing & Detection", "Water Management", "Communication & Signaling",
      "Energy Harvesting", "Movement & Locomotion", "Growth & Development",
      "Self-Repair & Healing", "Thermal Management", "Aerodynamics & Hydrodynamics",
    ];

    const category = categories[idx % categories.length];

    for (let i = 0; i < 30; i++) {
      solutions.push({
        id: `bio-${idCounter++}`,
        organism: `${organism} - Model ${i + 1}`,
        scientificName: `${organism.toLowerCase().replace(/ /g, "_")} sp.`,
        category: category,
        challenge: `Solve engineering problem using ${organism} principles`,
        mechanism: `${organism} uses biological mechanism for optimal performance`,
        advantage: `${60 + Math.random() * 35}% efficiency improvement`,
        implementation: `Apply ${organism} design principles to engineering solution`,
        image: "🧬",
        tags: [category.toLowerCase().replace(/ /g, "-"), organism.toLowerCase(), `model-${i}`],
        metrics: {
          efficiency: 0.65 + Math.random() * 0.33,
          sustainability: 0.70 + Math.random() * 0.29,
          manufacturability: 0.55 + Math.random() * 0.43,
        },
        designVariants: [
          {
            name: `Standard Implementation`,
            description: `Basic implementation of ${organism} principles`,
            specs: [
              `Efficiency: ${(70 + Math.random() * 25).toFixed(0)}%`,
              `Cost: Medium`,
              `Scalability: High`,
            ],
          },
          {
            name: `Advanced Variant`,
            description: `Optimized implementation with enhanced performance`,
            specs: [
              `Efficiency: ${(80 + Math.random() * 18).toFixed(0)}%`,
              `Cost: High`,
              `Scalability: Medium`,
            ],
          },
          {
            name: `Rapid Prototype`,
            description: `Quick deployment version for initial testing`,
            specs: [
              `Efficiency: ${(60 + Math.random() * 20).toFixed(0)}%`,
              `Cost: Low`,
              `Scalability: High`,
            ],
          },
        ],
      });
    }
  });

  return solutions;
}

// Generate all solutions on module load
export const organisms = generateSolutions();
