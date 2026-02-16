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

        const data = await response.json();

        // Handle both 200 and error status codes
        if (response.ok || response.status === 200) {
          const modelList = data.models || [];
          setModels(modelList);
          setError(null);

          // Auto-select first model if available
          if (modelList.length > 0) {
            setSelectedModel(modelList[0]);
          } else {
            setSelectedModel(null);
          }
        } else {
          const errorMsg = data.error || `HTTP ${response.status}`;
          throw new Error(errorMsg);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.warn("Sketchfab search will use procedural models:", message);
        setError(null); // Don't show error to user, just use procedural
        setModels([]);
        setSelectedModel(null);
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
