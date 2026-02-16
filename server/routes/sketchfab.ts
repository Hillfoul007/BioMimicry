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
      // Fallback if API key not configured
      res.status(400).json({ error: "Sketchfab API not configured" });
      return;
    }

    // Query Sketchfab API for models
    const searchUrl = new URL("https://api.sketchfab.com/v2/search");
    searchUrl.searchParams.append("type", "models");
    searchUrl.searchParams.append("q", searchTerm);
    searchUrl.searchParams.append("count", "5");
    searchUrl.searchParams.append("downloadable", "true");

    const response = await fetch(searchUrl.toString(), {
      headers: {
        Authorization: `Token ${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Sketchfab API error: ${response.statusText}`);
    }

    const data = await response.json();
    const models: SketchfabModel[] = (data.results || []).map((model: any) => ({
      uid: model.uid,
      name: model.name,
      thumbnail: model.thumbnails?.[0]?.url || "",
      downloadUrl: `https://sketchfab.com/models/${model.uid}`,
    }));

    res.json({
      organism: searchTerm,
      models,
      count: models.length,
    });
  } catch (error) {
    console.error("Sketchfab search error:", error);
    res.status(500).json({
      error: "Failed to search Sketchfab models",
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
