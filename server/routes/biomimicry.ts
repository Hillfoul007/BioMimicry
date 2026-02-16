import { RequestHandler } from "express";
import { organisms, BiologicalSolution } from "../../shared/organisms";

interface AnalysisResponse {
  challenge: string;
  solutions: Array<BiologicalSolution & { relevanceScore: number }>;
  timestamp: number;
  analysisDetails?: {
    challengeType: string;
    categories: string[];
  };
}

// Advanced semantic similarity scoring using multiple algorithms
class AIMatchingEngine {
  // Calculate cosine similarity between two text vectors
  private cosineSimilarity(vecA: Map<string, number>, vecB: Map<string, number>): number {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    const allTerms = new Set([...vecA.keys(), ...vecB.keys()]);

    for (const term of allTerms) {
      const a = vecA.get(term) || 0;
      const b = vecB.get(term) || 0;
      dotProduct += a * b;
      magnitudeA += a * a;
      magnitudeB += b * b;
    }

    const denominator = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }

  // Convert text to frequency vector (TF-IDF like approach)
  private textToVector(text: string): Map<string, number> {
    const words = text
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2); // Remove short words

    const vector = new Map<string, number>();
    const total = words.length;

    for (const word of words) {
      // Remove common stop words
      if (this.isStopWord(word)) continue;

      vector.set(word, (vector.get(word) || 0) + 1 / total);
    }

    return vector;
  }

  // Common stop words
  private isStopWord(word: string): boolean {
    const stopWords = new Set([
      "the",
      "is",
      "at",
      "which",
      "on",
      "a",
      "an",
      "and",
      "or",
      "but",
      "in",
      "with",
      "for",
      "to",
      "of",
      "from",
      "by",
      "be",
      "as",
      "was",
      "are",
      "been",
      "being",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "can",
      "if",
      "that",
      "this",
      "these",
      "those",
      "what",
      "when",
      "where",
      "why",
      "how",
      "who",
    ]);
    return stopWords.has(word);
  }

  // Exact keyword matching with weighting
  private calculateKeywordScore(challenge: string, solution: BiologicalSolution): number {
    let score = 0;
    const challengeLower = challenge.toLowerCase();
    const words = challengeLower.split(/\s+/);

    // Check tags (highest weight)
    for (const tag of solution.tags) {
      for (const word of words) {
        if (word.length > 2 && tag.includes(word)) {
          score += 0.15; // High weight for tag matches
        }
      }
    }

    // Check challenge description (high weight)
    if (solution.challenge.toLowerCase().includes(challengeLower)) {
      score += 0.25;
    }
    for (const word of words) {
      if (word.length > 3) {
        if (solution.challenge.toLowerCase().includes(word)) {
          score += 0.12;
        }
      }
    }

    // Check mechanism (medium weight)
    for (const word of words) {
      if (word.length > 3 && solution.mechanism.toLowerCase().includes(word)) {
        score += 0.08;
      }
    }

    // Check category (medium weight)
    if (solution.category.toLowerCase().includes(challengeLower)) {
      score += 0.20;
    }
    for (const word of words) {
      if (word.length > 3 && solution.category.toLowerCase().includes(word)) {
        score += 0.10;
      }
    }

    // Check advantage (lower weight)
    for (const word of words) {
      if (word.length > 3 && solution.advantage.toLowerCase().includes(word)) {
        score += 0.05;
      }
    }

    return Math.min(score, 1.0); // Cap at 1.0
  }

  // Calculate semantic similarity using text vectors
  private calculateSemanticScore(challenge: string, solution: BiologicalSolution): number {
    const challengeVector = this.textToVector(challenge);

    // Create combined solution text
    const solutionText =
      solution.organism +
      " " +
      solution.challenge +
      " " +
      solution.mechanism +
      " " +
      solution.advantage +
      " " +
      solution.tags.join(" ");

    const solutionVector = this.textToVector(solutionText);

    return this.cosineSimilarity(challengeVector, solutionVector);
  }

  // Metrics-based scoring (how good is the solution in general)
  private calculateMetricsScore(solution: BiologicalSolution): number {
    const { efficiency, sustainability, manufacturability } = solution.metrics;
    // Weighted average of metrics
    return efficiency * 0.4 + sustainability * 0.35 + manufacturability * 0.25;
  }

  // Detect challenge category from user input
  private detectChallengeCategory(challenge: string): string[] {
    const challengeLower = challenge.toLowerCase();
    const detectedCategories: string[] = [];

    const categoryKeywords: { [key: string]: string[] } = {
      "Cooling & Ventilation": [
        "cool",
        "cooling",
        "ventilation",
        "temperature",
        "heat",
        "thermal",
        "air",
        "conditioning",
      ],
      "Adhesives & Fastening": [
        "adhesive",
        "glue",
        "fastening",
        "grip",
        "stick",
        "bond",
        "attach",
      ],
      "Aerodynamics & Hydrodynamics": [
        "aerodynamic",
        "drag",
        "lift",
        "flow",
        "turbine",
        "wing",
        "blade",
        "hydrodynamic",
      ],
      "Surface Properties": [
        "surface",
        "coating",
        "self-cleaning",
        "waterproof",
        "hydrophobic",
        "texture",
      ],
      "Materials & Structures": [
        "material",
        "structure",
        "strength",
        "composite",
        "lightweight",
        "durable",
      ],
      "Optics & Colors": [
        "color",
        "optical",
        "light",
        "reflection",
        "iridescent",
        "vision",
      ],
      "Sensing & Detection": [
        "sensor",
        "detect",
        "sense",
        "thermal",
        "chemical",
        "vibration",
      ],
      "Water Management": [
        "water",
        "harvesting",
        "filtration",
        "salt",
        "ocean",
        "moisture",
      ],
      "Communication & Signaling": [
        "communication",
        "signal",
        "acoustic",
        "sound",
        "bioluminescent",
      ],
      "Energy Harvesting": [
        "energy",
        "power",
        "solar",
        "electricity",
        "generation",
        "harvesting",
      ],
      "Movement & Locomotion": [
        "movement",
        "locomotion",
        "climbing",
        "jumping",
        "propulsion",
        "motion",
      ],
      "Growth & Development": [
        "growth",
        "development",
        "scaling",
        "structure",
        "pattern",
      ],
      "Self-Repair & Healing": [
        "healing",
        "repair",
        "regeneration",
        "self-healing",
        "replacement",
      ],
      "Thermal Management": [
        "thermal",
        "temperature",
        "insulation",
        "heat",
        "cooling",
        "dissipation",
      ],
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      for (const keyword of keywords) {
        if (challengeLower.includes(keyword)) {
          if (!detectedCategories.includes(category)) {
            detectedCategories.push(category);
          }
          break;
        }
      }
    }

    return detectedCategories.length > 0
      ? detectedCategories
      : ["Materials & Structures"]; // Default
  }

  // Main ranking algorithm combining multiple approaches
  public rankSolutions(
    challenge: string,
    topK: number = 5
  ): Array<BiologicalSolution & { relevanceScore: number }> {
    const scoredSolutions = organisms.map((solution) => {
      // Calculate scores from different algorithms
      const keywordScore = this.calculateKeywordScore(challenge, solution);
      const semanticScore = this.calculateSemanticScore(challenge, solution);
      const metricsScore = this.calculateMetricsScore(solution);

      // Combine scores with weighted average
      // Keywords are heavily weighted as they're most direct
      const relevanceScore =
        keywordScore * 0.50 + semanticScore * 0.30 + metricsScore * 0.20;

      return {
        ...solution,
        relevanceScore: Math.min(relevanceScore, 0.99), // Cap at 0.99 to show confidence
      };
    });

    // Sort by relevance and return top K
    return scoredSolutions
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, topK);
  }

  public detectChallengeType(challenge: string): string {
    const categories = this.detectChallengeCategory(challenge);
    return categories[0] || "Multi-Disciplinary";
  }

  public detectCategories(challenge: string): string[] {
    return this.detectChallengeCategory(challenge);
  }
}

// Create singleton instance
const aiEngine = new AIMatchingEngine();

export const handleBiomimicryAnalysis: RequestHandler = (req, res) => {
  try {
    const { challenge } = req.body;

    if (!challenge || typeof challenge !== "string" || challenge.trim() === "") {
      res.status(400).json({
        error: "Challenge description is required",
      });
      return;
    }

    // Use AI matching engine to rank solutions
    const scoredSolutions = aiEngine.rankSolutions(challenge, 5);

    // Detect challenge type and categories
    const challengeType = aiEngine.detectChallengeType(challenge);
    const detectedCategories = aiEngine.detectCategories(challenge);

    const response: AnalysisResponse = {
      challenge,
      solutions: scoredSolutions,
      timestamp: Date.now(),
      analysisDetails: {
        challengeType,
        categories: detectedCategories,
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Biomimicry analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze challenge",
    });
  }
};

// Search organisms by keyword with ranking
export const handleOrganismSearch: RequestHandler = (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Search query is required" });
      return;
    }

    const searchTerm = query.toLowerCase();

    // Use AI engine to rank results
    const results = aiEngine.rankSolutions(query, 20);

    res.json({
      query,
      results,
      count: results.length,
    });
  } catch (error) {
    console.error("Organism search error:", error);
    res.status(500).json({
      error: "Failed to search organisms",
    });
  }
};

// Get all organisms with pagination
export const handleGetOrganisms: RequestHandler = (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const paginated = organisms.slice(offset, offset + limit);

    res.json({
      organisms: paginated,
      pagination: {
        page,
        limit,
        total: organisms.length,
        pages: Math.ceil(organisms.length / limit),
      },
    });
  } catch (error) {
    console.error("Get organisms error:", error);
    res.status(500).json({
      error: "Failed to fetch organisms",
    });
  }
};

// Get single organism details
export const handleGetOrganism: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const organism = organisms.find((org) => org.id === id);

    if (!organism) {
      res.status(404).json({ error: "Organism not found" });
      return;
    }

    res.json(organism);
  } catch (error) {
    console.error("Get organism error:", error);
    res.status(500).json({
      error: "Failed to fetch organism",
    });
  }
};
