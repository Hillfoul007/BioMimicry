import { RequestHandler } from "express";
import { organisms, BiologicalSolution } from "../../shared/organisms";

interface AnalysisResponse {
  challenge: string;
  solutions: Array<BiologicalSolution & { relevanceScore: number }>;
  timestamp: number;
}

// Keyword matching for relevance scoring
const calculateRelevance = (
  challenge: string,
  solution: BiologicalSolution
): number => {
  const challengeWords = challenge.toLowerCase().split(/\s+/);
  let score = Math.random() * 0.3 + 0.6; // Base score between 0.6-0.9

  // Boost score if challenge keywords match solution tags or description
  challengeWords.forEach((word) => {
    if (word.length > 3) {
      // Skip small words
      if (solution.tags.some((tag) => tag.includes(word))) {
        score += 0.1;
      }
      if (solution.challenge.toLowerCase().includes(word)) {
        score += 0.15;
      }
      if (solution.mechanism.toLowerCase().includes(word)) {
        score += 0.08;
      }
      if (solution.category.toLowerCase().includes(word)) {
        score += 0.1;
      }
    }
  });

  // Cap at 0.99
  return Math.min(score, 0.99);
};

export const handleBiomimicryAnalysis: RequestHandler = (req, res) => {
  try {
    const { challenge } = req.body;

    if (!challenge || typeof challenge !== "string" || challenge.trim() === "") {
      res.status(400).json({
        error: "Challenge description is required",
      });
      return;
    }

    // Calculate relevance scores for all organisms
    const scoredSolutions = organisms
      .map((org) => ({
        ...org,
        relevanceScore: calculateRelevance(challenge, org),
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5); // Return top 5

    const response: AnalysisResponse = {
      challenge,
      solutions: scoredSolutions,
      timestamp: Date.now(),
    };

    res.json(response);
  } catch (error) {
    console.error("Biomimicry analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze challenge",
    });
  }
};

// Search organisms by keyword
export const handleOrganismSearch: RequestHandler = (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Search query is required" });
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = organisms.filter(
      (org) =>
        org.organism.toLowerCase().includes(searchTerm) ||
        org.category.toLowerCase().includes(searchTerm) ||
        org.tags.some((tag) => tag.includes(searchTerm)) ||
        org.challenge.toLowerCase().includes(searchTerm)
    );

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
