import { RequestHandler } from "express";
import { organisms, BiologicalSolution } from "../../shared/organisms";

interface AnalysisResponse {
  challenge: string;
  solutions: Array<BiologicalSolution & { relevanceScore: number; aiExplanation: string }>;
  timestamp: number;
}

// AI-powered analysis using Gemini REST API
const analyzeWithGemini = async (
  challenge: string
): Promise<Array<BiologicalSolution & { relevanceScore: number; aiExplanation: string }>> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key not configured");
    }

    // Prepare organism descriptions for the prompt
    const organismsDesc = organisms
      .map(
        (org) =>
          `${org.organism} (${org.scientificName}): ${org.challenge}. Mechanism: ${org.mechanism}`
      )
      .join("\n");

    const prompt = `You are a biomimicry expert. Analyze this engineering challenge and recommend the top 5 most relevant biological solutions from the provided list.

ENGINEERING CHALLENGE:
"${challenge}"

AVAILABLE BIOLOGICAL SOLUTIONS:
${organismsDesc}

For each recommended solution, provide:
1. The organism name
2. A relevance score from 0.6 to 1.0 (where 1.0 is perfect match)
3. A brief explanation of why this solution is relevant

Format your response as JSON array:
[
  {
    "organism": "organism_name",
    "relevanceScore": 0.95,
    "explanation": "Why this is relevant"
  }
]

Only respond with valid JSON array, no additional text.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    // Parse JSON response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from Gemini");
    }

    const aiRecommendations = JSON.parse(jsonMatch[0]);

    // Map recommendations back to organism data
    const scoredSolutions = aiRecommendations
      .map((rec: any) => {
        const organism = organisms.find(
          (org) => org.organism.toLowerCase() === rec.organism.toLowerCase()
        );
        if (!organism) return null;

        return {
          ...organism,
          relevanceScore: Math.min(Math.max(rec.relevanceScore, 0.6), 1.0),
          aiExplanation: rec.explanation || "",
        };
      })
      .filter((org: any) => org !== null)
      .slice(0, 5);

    return scoredSolutions;
  } catch (error) {
    console.error("Gemini AI analysis error:", error);
    // Fallback to keyword matching if Gemini fails
    return fallbackKeywordMatching(challenge);
  }
};

// Fallback keyword matching
const fallbackKeywordMatching = (challenge: string): Array<BiologicalSolution & { relevanceScore: number; aiExplanation: string }> => {
  const challengeWords = challenge.toLowerCase().split(/\s+/);

  return organisms
    .map((org) => {
      let score = 0.6;
      let explanation = "";

      challengeWords.forEach((word) => {
        if (word.length > 3) {
          if (org.tags.some((tag) => tag.includes(word))) {
            score += 0.1;
          }
          if (org.challenge.toLowerCase().includes(word)) {
            score += 0.15;
            explanation = `Matches challenge: "${word}"`;
          }
          if (org.mechanism.toLowerCase().includes(word)) {
            score += 0.08;
          }
        }
      });

      return {
        ...org,
        relevanceScore: Math.min(score, 0.99),
        aiExplanation: explanation || "Related to your challenge",
      };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);
};

export const handleBiomimicryAnalysis: RequestHandler = async (req, res) => {
  try {
    const { challenge } = req.body;

    if (!challenge || typeof challenge !== "string" || challenge.trim() === "") {
      res.status(400).json({
        error: "Challenge description is required",
      });
      return;
    }

    // Use Gemini AI for intelligent analysis
    const scoredSolutions = await analyzeWithGemini(challenge);

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
