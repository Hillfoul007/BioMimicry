import { useState, useEffect } from "react";

export interface SketchfabModel {
  uid: string;
  name: string;
  thumbnail: string;
  downloadUrl?: string;
}

interface SketchfabResponse {
  organism: string;
  models: SketchfabModel[];
  count: number;
}

export function useSketchfabModels(organism?: string) {
  const [models, setModels] = useState<SketchfabModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<SketchfabModel | null>(null);

  useEffect(() => {
    if (!organism) {
      setModels([]);
      setSelectedModel(null);
      return;
    }

    const fetchModels = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `/api/sketchfab/search?organism=${encodeURIComponent(organism)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }

        const data: SketchfabResponse = await response.json();
        setModels(data.models);
        
        // Auto-select first model if available
        if (data.models.length > 0) {
          setSelectedModel(data.models[0]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        console.error("Sketchfab fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [organism]);

  return {
    models,
    loading,
    error,
    selectedModel,
    setSelectedModel,
  };
}
