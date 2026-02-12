import { useState } from "react";
import Header from "@/components/Header";
import {
  Upload,
  Zap,
  Leaf,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  RotateCw,
} from "lucide-react";

interface Solution {
  id: string;
  title: string;
  organism: string;
  mechanism: string;
  advantage: string;
  implementation: string;
  category: string;
  relevance: number;
}

export default function Architect() {
  const [challenge, setChallenge] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [solutions, setSolutions] = useState<Solution[] | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const mockSolutions: Solution[] = [
    {
      id: "1",
      title: "Hierarchical Thermal Management",
      organism: "Termite Mound",
      mechanism:
        "Termites create ventilation shafts that use air density differences to regulate internal temperature without active cooling",
      advantage:
        "Passive cooling reducing energy consumption by up to 90% compared to traditional HVAC",
      implementation:
        "Design building vents with similar branching patterns and diagonal shafts to create convective currents",
      category: "Cooling & Ventilation",
      relevance: 0.95,
    },
    {
      id: "2",
      title: "Van der Waals Surface Adhesion",
      organism: "Gecko Feet",
      mechanism:
        "Geckos have hierarchical toe pads with millions of micro and nano-scale setae that create non-covalent van der Waals forces",
      advantage:
        "Reusable, reversible adhesion without chemical residue; works on any surface",
      implementation:
        "Create synthetic setae using polymers with proper spacing and angling for optimal contact",
      category: "Adhesives & Fastening",
      relevance: 0.88,
    },
    {
      id: "3",
      title: "Hydrodynamic Tubercle Design",
      organism: "Humpback Whale Fins",
      mechanism:
        "Tubercles (bumps) on whale fins create turbulent vortices that improve hydrodynamic efficiency and reduce drag",
      advantage:
        "20-40% improvement in aerodynamic efficiency with noise reduction benefits",
      implementation:
        "Apply tubercle patterns to turbine blades, propellers, and wing designs at scale",
      category: "Aerodynamics & Hydrodynamics",
      relevance: 0.91,
    },
  ];

  const handleAnalyze = async () => {
    if (!challenge.trim() && !file) {
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSolutions(mockSolutions);
    setIsAnalyzing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const reset = () => {
    setChallenge("");
    setFile(null);
    setSolutions(null);
    setExpandedId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <Header />

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Input Section */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl border border-border p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                BioMimicry Architect
              </h1>
              <p className="text-muted-foreground mb-8">
                Describe your engineering challenge or upload design files to discover
                nature-inspired solutions
              </p>

              {/* Challenge Input */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Challenge Description
                  </label>
                  <textarea
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="Describe your engineering problem... e.g., 'Design a building cooling system that uses minimal energy' or 'Create an adhesive that works underwater'"
                    className="w-full h-24 px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Upload Design Files (Optional)
                  </label>
                  <label className="flex items-center justify-center w-full px-4 py-6 rounded-lg border-2 border-dashed border-border bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, PDF, DWG (max 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".png,.jpg,.jpeg,.pdf,.dwg"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!challenge.trim() && !file)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Analyze & Generate
                    </>
                  )}
                </button>
                {solutions && (
                  <button
                    onClick={reset}
                    className="px-4 py-3 border border-border bg-white text-foreground font-semibold rounded-lg hover:bg-slate-50 transition-all"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          {solutions && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Nature-Inspired Solutions
                </h2>
                <p className="text-muted-foreground mb-6">
                  {solutions.length} biomimetic solutions ranked by relevance to your
                  challenge
                </p>
              </div>

              {solutions.map((solution) => (
                <div
                  key={solution.id}
                  className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Solution Header */}
                  <button
                    onClick={() => toggleExpanded(solution.id)}
                    className="w-full px-6 py-5 flex items-start justify-between hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">
                          {solution.title}
                        </h3>
                        <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {solution.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Leaf className="w-4 h-4" />
                        Inspired by: <span className="font-semibold">{solution.organism}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Relevance</p>
                        <p className="text-lg font-bold text-primary">
                          {Math.round(solution.relevance * 100)}%
                        </p>
                      </div>
                      {expandedId === solution.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  {/* Solution Details */}
                  {expandedId === solution.id && (
                    <div className="border-t border-border px-6 py-5 bg-slate-50 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-accent" />
                          How It Works
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {solution.mechanism}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-accent" />
                          Key Advantages
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {solution.advantage}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-accent" />
                          Implementation
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {solution.implementation}
                        </p>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm">
                          Generate 3D Model
                        </button>
                        <button className="flex-1 px-4 py-2 border border-border bg-white text-foreground font-semibold rounded-lg hover:bg-slate-100 transition-all text-sm">
                          Save Solution
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* 3D Modeling Section Placeholder */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20 p-8 text-center">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  3D Modeling Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Click "Generate 3D Model" on any solution to create interactive 3D
                  visualizations of biomimetic designs
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!solutions && !isAnalyzing && (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Upload a challenge to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
