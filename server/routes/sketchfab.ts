import { RequestHandler } from "express";

interface SketchfabModel {
  uid: string;
  name: string;
  thumbnail: string;
  downloadUrl?: string;
}

// Search for organism models on Sketchfab
export const handleSketchfabSearch: RequestHandler = async (req, res) => {
  try {
    const { organism, query } = req.query;
    const searchTerm = query || organism;

    if (!searchTerm || typeof searchTerm !== "string") {
      res.status(400).json({ error: "Organism name or search query is required" });
      return;
    }

    const apiToken = process.env.SKETCHFAB_API_TOKEN;
    if (!apiToken) {
      console.warn("Sketchfab API token not configured");
      // Return mock data for development
      res.json({
        organism: searchTerm,
        models: [],
        count: 0,
        message: "Sketchfab API not configured - returning empty results"
      });
      return;
    }

    // Query Sketchfab API for models
    const searchUrl = new URL("https://api.sketchfab.com/v2/search");
    searchUrl.searchParams.append("type", "models");
    searchUrl.searchParams.append("q", searchTerm);
    searchUrl.searchParams.append("count", "10");

    console.log("Searching Sketchfab for:", searchTerm, "URL:", searchUrl.toString());

    const response = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Token ${apiToken}`,
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Sketchfab API error: ${response.statusText}`, errorText);
      throw new Error(`Sketchfab API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`Sketchfab response status: ${response.status}`, data);

    if (!data.results) {
      console.warn(`No results from Sketchfab for "${searchTerm}"`, data);
      res.json({
        organism: searchTerm,
        models: [],
        count: 0,
        message: "No models found on Sketchfab"
      });
      return;
    }

    const models: SketchfabModel[] = data.results.map((model: any) => ({
      uid: model.uid,
      name: model.name,
      thumbnail: model.thumbnails?.[0]?.url || "",
      downloadUrl: `https://sketchfab.com/models/${model.uid}`,
    }));

    console.log(`Found ${models.length} models for "${searchTerm}"`);
    res.json({
      organism: searchTerm,
      models,
      count: models.length,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Sketchfab search error:", errorMessage, String(error));

    // Return empty results instead of error to allow fallback
    res.status(200).json({
      organism: searchTerm,
      models: [],
      count: 0,
      error: errorMessage,
      message: "Sketchfab API unavailable, using procedural models"
    });
  }
};

// Get download URL for a specific model
export const handleSketchfabDownload: RequestHandler = async (req, res) => {
  try {
    const { modelId } = req.params;

    if (!modelId || typeof modelId !== "string") {
      res.status(400).json({ error: "Model ID is required" });
      return;
    }

    const apiToken = process.env.SKETCHFAB_API_TOKEN;
    if (!apiToken) {
      res.status(400).json({ error: "Sketchfab API not configured" });
      return;
    }

    // Get model details including download links
    const modelUrl = `https://api.sketchfab.com/v2/models/${modelId}`;
    const response = await fetch(modelUrl, {
      headers: {
        Authorization: `Token ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Model not found: ${response.statusText}`);
    }

    const model = await response.json();

    // Get downloadable files
    let glbUrl = "";
    if (model.downloadUrl) {
      glbUrl = `${model.downloadUrl}/download`;
    }

    res.json({
      uid: model.uid,
      name: model.name,
      thumbnail: model.thumbnails?.[0]?.url || "",
      glbUrl: glbUrl,
      description: model.description || "",
      author: model.user?.username || "Unknown",
    });
  } catch (error) {
    console.error("Sketchfab download error:", error);
    res.status(500).json({
      error: "Failed to get model download URL",
    });
  }
};

// Get model preview/viewer URL
export const handleSketchfabViewer: RequestHandler = async (req, res) => {
  try {
    const { modelId } = req.params;

    if (!modelId || typeof modelId !== "string") {
      res.status(400).json({ error: "Model ID is required" });
      return;
    }

    // Construct Sketchfab viewer embed URL
    const viewerUrl = `https://sketchfab.com/models/${modelId}/embed`;
    const glbProxyUrl = `https://api.sketchfab.com/v2/models/${modelId}/download`;

    res.json({
      modelId,
      viewerUrl,
      glbProxyUrl,
      embedUrl: `<iframe title="${modelId}" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/${modelId}/embed"></iframe>`,
    });
  } catch (error) {
    console.error("Sketchfab viewer error:", error);
    res.status(500).json({
      error: "Failed to generate viewer URL",
    });
  }
};
