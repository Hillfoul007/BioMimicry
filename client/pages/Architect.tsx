import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ThreeDViewer from "@/components/ThreeDViewer";
import ARPreview from "@/components/ARPreview";
import ComparisonView from "@/components/ComparisonView";
import {
  Upload,
  Zap,
  Leaf,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Share2,
  Download,
  Mic,
  Play,
  TrendingUp,
  Zap as ZapIcon,
  Box,
  Camera,
  FileDown,
  Smartphone,
} from "lucide-react";
import { organisms, problemExamples, BiologicalSolution } from "@shared/organisms";
import { generatePDFReport, downloadSTL, generateShareLink, copyToClipboard } from "@/lib/export";

interface Solution extends BiologicalSolution {
  relevanceScore: number;
  aiExplanation?: string;
}

interface SimulationResult {
  metric: string;
  traditional: number;
  biomimetic: number;
  improvement: string;
}

export default function Architect() {
  const [challenge, setChallenge] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [solutions, setSolutions] = useState<Solution[] | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [showARPreview, setShowARPreview] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingSTL, setExportingSTL] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setChallenge((prev) => prev + (prev ? " " : "") + transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!challenge.trim() && !file) {
      return;
    }

    setIsAnalyzing(true);
    setGenerationStep(1);
    setSolutions(null);

    try {
      // Show progress stages
      const stages = [1, 2, 3, 4, 5];
      for (const stage of stages) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        setGenerationStep(stage);
      }

      // Call AI-powered analysis API
      const response = await fetch("/api/biomimicry/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenge: challenge.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze challenge");
      }

      const data = await response.json();
      setSolutions(data.solutions as Solution[]);
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze challenge. Please try again.");
    } finally {
      setIsAnalyzing(false);
      setGenerationStep(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    if (expandedId !== id) {
      const solution = solutions?.find((s) => s.id === id);
      if (solution) {
        setSelectedSolution(solution);
        setSelectedVariant(0);
      }
    }
  };

  const reset = () => {
    setChallenge("");
    setFile(null);
    setSolutions(null);
    setExpandedId(null);
    setSelectedSolution(null);
    setShow3DViewer(false);
  };

  const simulationResults: SimulationResult[] = [
    {
      metric: "Energy Efficiency",
      traditional: 45,
      biomimetic: 92,
      improvement: "+104%",
    },
    {
      metric: "Cost Reduction",
      traditional: 0,
      biomimetic: 35,
      improvement: "+35%",
    },
    {
      metric: "Environmental Impact",
      traditional: 60,
      biomimetic: 95,
      improvement: "+58%",
    },
  ];

  const handleExportPDF = async () => {
    if (!selectedSolution) {
      toast.error("Please select a solution first");
      return;
    }
    setExportingPDF(true);
    try {
      toast.loading("Generating PDF report...", { id: "pdf-export" });
      await generatePDFReport(challenge, selectedSolution, selectedVariant);
      toast.success("PDF report downloaded! Check your downloads folder.", {
        id: "pdf-export",
      });
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to generate PDF report", { id: "pdf-export" });
    } finally {
      setExportingPDF(false);
    }
  };

  const handleExportSTL = () => {
    if (!selectedSolution) {
      toast.error("Please select a solution first");
      return;
    }
    setExportingSTL(true);
    try {
      toast.loading("Generating 3D model (STL)...", { id: "stl-export" });
      const variant = selectedSolution.designVariants[selectedVariant];
      downloadSTL(selectedSolution.organism, variant.name);
      toast.success("3D model ready for printing! Download started.", {
        id: "stl-export",
      });
    } catch (error) {
      console.error("STL export error:", error);
      toast.error("Failed to generate STL file", { id: "stl-export" });
    } finally {
      setExportingSTL(false);
    }
  };

  const handleShare = async () => {
    if (!selectedSolution) {
      toast.error("Please select a solution first");
      return;
    }

    const shareLink = generateShareLink(challenge, selectedSolution.id);
    const shareText = `Check out this BioMimicry solution for "${challenge}" - inspired by ${selectedSolution.organism}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "BioMimicry Architect",
          text: shareText,
          url: shareLink,
        });
        toast.success("Solution shared successfully!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Share error:", error);
          toast.error("Failed to share");
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await copyToClipboard(shareLink);
        toast.success("Share link copied to clipboard!");
      } catch (error) {
        console.error("Copy error:", error);
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <Header />

      <div className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Input Section */}
          {!solutions && (
            <div className="mb-12">
              <div className="bg-white rounded-2xl border border-border p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Design Challenge Analyzer
                </h1>
                <p className="text-muted-foreground mb-8">
                  Describe your engineering problem to discover nature-inspired
                  solutions powered by AI
                </p>

                {/* Quick Examples */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Quick Examples
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {problemExamples.map((example) => (
                      <button
                        key={example.title}
                        onClick={() => setChallenge(example.description)}
                        className="text-left p-3 rounded-lg border border-border hover:bg-slate-50 hover:border-primary transition-all group"
                      >
                        <p className="text-lg mb-1">{example.icon}</p>
                        <p className="font-medium text-foreground text-sm">
                          {example.title}
                        </p>
                        <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                          {example.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Challenge Input */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Describe Your Challenge
                    </label>
                    <div className="flex gap-2">
                      <textarea
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        placeholder="Describe your engineering problem... e.g., 'Design a building cooling system that uses minimal energy'"
                        className="flex-1 h-24 px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                      <button
                        onClick={handleVoiceInput}
                        className={`px-4 py-3 rounded-lg border transition-all ${
                          isListening
                            ? "bg-primary text-white border-primary"
                            : "border-input bg-white text-foreground hover:bg-slate-50"
                        }`}
                        title="Voice input"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                    {isListening && (
                      <p className="text-sm text-primary mt-2 flex items-center gap-2">
                        <span className="animate-pulse">●</span> Listening...
                      </p>
                    )}
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
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!challenge.trim() && !file)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Analyze & Generate Solutions
                    </>
                  )}
                </button>
              </div>

              {/* Generation Steps */}
              {isAnalyzing && generationStep > 0 && (
                <div className="mt-8 bg-white rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    AI Processing Pipeline
                  </h3>
                  <div className="space-y-3">
                    {[
                      { step: 1, label: "Parsing Challenge", icon: "📝" },
                      { step: 2, label: "Searching Biology Database", icon: "🔍" },
                      { step: 3, label: "Matching Organisms", icon: "🧬" },
                      {
                        step: 4,
                        label: "Generating Design Variants",
                        icon: "⚙️",
                      },
                      { step: 5, label: "Calculating Metrics", icon: "📊" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                            generationStep >= item.step
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {generationStep > item.step ? "✓" : item.icon}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            generationStep >= item.step
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {item.label}
                        </span>
                        {generationStep === item.step && (
                          <span className="animate-pulse ml-auto">●</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Solutions Section */}
          {solutions && (
            <div className="space-y-6 animate-slide-up">
              {/* Solutions Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Nature-Inspired Solutions
                  </h2>
                  <p className="text-muted-foreground">
                    {solutions.length} biomimetic solutions ranked by relevance
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="px-4 py-2 border border-border bg-white text-foreground font-semibold rounded-lg hover:bg-slate-50 transition-all"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Solutions Cards */}
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
                          {solution.organism}
                        </h3>
                        <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {solution.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <em>{solution.scientificName}</em>
                      </p>
                      <p className="text-sm text-foreground">
                        <strong>Challenge:</strong> {solution.challenge}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Relevance</p>
                        <p className="text-2xl font-bold text-primary">
                          {Math.round(solution.relevanceScore * 100)}%
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
                    <div className="border-t border-border px-6 py-5 bg-slate-50 space-y-6">
                      {/* AI Explanation */}
                      {solution.aiExplanation && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm font-semibold text-blue-900 mb-1">Why This Solution Matches</p>
                          <p className="text-sm text-blue-800 leading-relaxed">
                            {solution.aiExplanation}
                          </p>
                        </div>
                      )}

                      {/* Mechanism */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-accent" />
                          How Nature Solves It
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {solution.mechanism}
                        </p>
                      </div>

                      {/* Advantages */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-accent" />
                          Key Advantages
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {solution.advantage}
                        </p>
                      </div>

                      {/* Design Variants */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Box className="w-4 h-4 text-accent" />
                          Design Variants
                        </h4>
                        <div className="space-y-3">
                          {solution.designVariants.map((variant, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedVariant(idx)}
                              className={`w-full text-left p-3 rounded-lg border transition-all ${
                                selectedVariant === idx
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <p className="font-medium text-foreground">
                                {variant.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {variant.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {variant.specs.map((spec, i) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-white px-2 py-1 rounded border border-border"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <ZapIcon className="w-4 h-4 text-accent" />
                          Biomimetic Performance Metrics
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            {
                              name: "Efficiency",
                              value: solution.metrics.efficiency,
                            },
                            {
                              name: "Sustainability",
                              value: solution.metrics.sustainability,
                            },
                            {
                              name: "Manufacturability",
                              value: solution.metrics.manufacturability,
                            },
                          ].map((metric) => (
                            <div key={metric.name}>
                              <p className="text-xs font-semibold text-foreground mb-1">
                                {metric.name}
                              </p>
                              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                                  style={{
                                    width: `${metric.value * 100}%`,
                                  }}
                                />
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {Math.round(metric.value * 100)}%
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Simulation */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Play className="w-4 h-4 text-accent" />
                          Performance Simulation (vs Traditional)
                        </h4>
                        <div className="space-y-3">
                          {simulationResults.map((result, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-xs font-medium text-foreground">
                                  {result.metric}
                                </p>
                                <p className="text-xs font-bold text-secondary">
                                  {result.improvement}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <div className="flex-1 h-4 bg-slate-300 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-slate-500"
                                    style={{
                                      width: `${result.traditional}%`,
                                    }}
                                  />
                                </div>
                                <div className="flex-1 h-4 bg-slate-300 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                    style={{
                                      width: `${result.biomimetic}%`,
                                    }}
                                  />
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Traditional: {result.traditional}% | Biomimetic:{" "}
                                {result.biomimetic}%
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comparison View */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          Biological Inspiration vs. Engineering Solution
                        </h4>
                        <ComparisonView solution={solution} variant={selectedVariant} />
                      </div>

                      {/* 3D Visualization Viewer */}
                      {show3DViewer && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Box className="w-4 h-4 text-accent" />
                            3D Model Visualization
                          </h4>
                          <ThreeDViewer
                            organism={solution.organism}
                            variant={solution.designVariants[selectedVariant]?.name}
                          />
                        </div>
                      )}

                      {/* Impact Dashboard */}
                      <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          Impact Summary
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">35%</p>
                            <p className="text-xs text-muted-foreground">
                              Cost Savings
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-secondary">
                              92%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Sustainability
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-accent">
                              8/10
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Manufacturability
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                        <button
                          onClick={() => setShow3DViewer(!show3DViewer)}
                          className="flex-1 min-w-max px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                        >
                          <Box className="w-4 h-4" />
                          {show3DViewer ? "Hide" : "View"} 3D
                        </button>
                        <button
                          onClick={handleExportSTL}
                          disabled={exportingSTL}
                          className="flex-1 min-w-max px-4 py-2 border border-border bg-white text-foreground font-semibold rounded-lg hover:bg-slate-100 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <FileDown className="w-4 h-4" />
                          {exportingSTL ? "Exporting..." : "STL"}
                        </button>
                        <button
                          onClick={handleExportPDF}
                          disabled={exportingPDF}
                          className="flex-1 min-w-max px-4 py-2 border border-border bg-white text-foreground font-semibold rounded-lg hover:bg-slate-100 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <Download className="w-4 h-4" />
                          {exportingPDF ? "Exporting..." : "PDF"}
                        </button>
                        <button
                          onClick={() => setShowARPreview(true)}
                          className="flex-1 min-w-max px-4 py-2 border border-border bg-white text-foreground font-semibold rounded-lg hover:bg-slate-100 transition-all text-sm flex items-center justify-center gap-2"
                        >
                          <Smartphone className="w-4 h-4" />
                          AR
                        </button>
                        <button
                          onClick={handleShare}
                          className="px-4 py-2 border border-border bg-white text-foreground font-semibold rounded-lg hover:bg-slate-100 transition-all text-sm"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* AR Preview Modal */}
              {showARPreview && (
                <ARPreview
                  organism={selectedSolution?.organism || "Organism"}
                  designName={
                    selectedSolution?.designVariants[selectedVariant]?.name ||
                    "Design"
                  }
                  onClose={() => setShowARPreview(false)}
                />
              )}

              {/* Coming Soon Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <Box className="w-5 h-5" />
                    Advanced 3D Editor
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Real-time editing and optimization of 3D models with physics
                    simulation
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-sm">
                    Coming Soon
                  </button>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    AI Optimization
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Automatically optimize designs based on constraints and
                    performance goals
                  </p>
                  <button className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all text-sm">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!solutions && !isAnalyzing && (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Upload a challenge to get started with nature-inspired solutions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
