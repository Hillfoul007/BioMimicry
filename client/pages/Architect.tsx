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
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { organisms, problemExamples, BiologicalSolution } from "@shared/organisms";
import {
  generatePDFReport,
  downloadSTL,
  generateShareLink,
  copyToClipboard,
} from "@/lib/export";

interface Solution extends BiologicalSolution {
  relevanceScore: number;
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
      window.webkitSpeechRecognition || (window as any).SpeechRecognition;
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
    if (!challenge.trim()) {
      toast.error("Please describe your engineering challenge");
      return;
    }

    setIsAnalyzing(true);
    setGenerationStep(0);
    setSolutions(null);

    try {
      // Call API with real AI matching
      const response = await fetch("/api/biomimicry/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze challenge");
      }

      // Simulate processing steps for visual feedback
      const stages = [1, 2, 3, 4, 5];
      for (const stage of stages) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        setGenerationStep(stage);
      }

      const data = await response.json();
      setSolutions(data.solutions as Solution[]);

      toast.success(
        `Found ${data.solutions.length} nature-inspired solutions!`
      );
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
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
      toast.success("Design file uploaded");
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
    setGenerationStep(0);
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
      toast.success("PDF report downloaded!", {
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
      toast.loading("Generating 3D model...", { id: "stl-export" });
      const variant = selectedSolution.designVariants[selectedVariant];
      downloadSTL(selectedSolution.organism, variant.name);
      toast.success("3D model ready for 3D printing!", {
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
        toast.success("Solution shared!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Share error:", error);
        }
      }
    } else {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Input Section */}
          {!solutions && (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">AI-Powered Analysis</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Nature-Inspired Solutions
                  <br />
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    for Engineering Challenges
                  </span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Describe your problem and discover proven solutions from nature.
                  Our AI analyzes your challenge and finds the best biomimetic approaches.
                </p>
              </div>

              {/* Main Input Card */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
                {/* Quick Examples */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-slate-200 mb-4">
                    Popular Challenges
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {problemExamples.map((example) => (
                      <button
                        key={example.title}
                        onClick={() => setChallenge(example.description)}
                        className="group relative overflow-hidden text-left p-4 rounded-xl border border-slate-700/50 bg-slate-700/20 hover:bg-slate-700/40 hover:border-primary/50 transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <p className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                            {example.icon}
                          </p>
                          <p className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                            {example.title}
                          </p>
                          <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors mt-1">
                            {example.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Challenge Input */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      Describe Your Challenge
                    </label>
                    <div className="relative">
                      <textarea
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        placeholder="e.g., 'Design a building cooling system that uses minimal energy while maintaining comfort'..."
                        className="w-full h-28 px-4 py-3 rounded-xl border border-slate-700/50 bg-slate-700/30 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
                      />
                      <button
                        onClick={handleVoiceInput}
                        className={`absolute right-3 top-3 p-2 rounded-lg transition-all ${
                          isListening
                            ? "bg-primary text-white"
                            : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                        }`}
                        title="Voice input (click to speak)"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                    {isListening && (
                      <div className="flex items-center gap-2 mt-2 text-primary text-sm">
                        <span className="animate-pulse">●</span>
                        <span>Listening to your challenge...</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-2">
                      Be specific about the problem, constraints, and desired outcomes
                    </p>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      Upload Design Files (Optional)
                    </label>
                    <label className="group relative flex flex-col items-center justify-center w-full px-6 py-8 rounded-xl border-2 border-dashed border-slate-700/50 bg-slate-700/20 hover:bg-slate-700/30 hover:border-primary/50 cursor-pointer transition-all duration-300">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                          <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                          {file ? file.name : "Click to upload or drag files"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
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

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !challenge.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                    >
                      {isAnalyzing ? (
                        <>
                          <Zap className="w-4 h-4 animate-spin" />
                          Analyzing Challenge...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Find Nature-Inspired Solutions
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Processing Steps */}
              {isAnalyzing && generationStep > 0 && (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6 space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI Processing Pipeline
                  </h3>
                  <div className="space-y-3">
                    {[
                      { step: 1, label: "Parsing Challenge", icon: "📝" },
                      { step: 2, label: "Searching Biology Database", icon: "🔍" },
                      { step: 3, label: "Semantic Analysis", icon: "🧬" },
                      { step: 4, label: "Ranking Solutions", icon: "⚙️" },
                      { step: 5, label: "Generating Report", icon: "📊" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                            generationStep >= item.step
                              ? "bg-primary text-slate-950"
                              : "bg-slate-700/50 text-slate-400"
                          }`}
                        >
                          {generationStep > item.step ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            item.icon
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium transition-colors ${
                            generationStep >= item.step
                              ? "text-slate-100"
                              : "text-slate-500"
                          }`}
                        >
                          {item.label}
                        </span>
                        {generationStep === item.step && (
                          <span className="animate-pulse ml-auto text-primary">
                            ●
                          </span>
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
            <div className="space-y-6 animate-fade-in">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white">
                    Nature-Inspired Solutions
                  </h2>
                  <p className="text-slate-400">
                    {solutions.length} biomimetic solutions ranked by AI relevance
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="px-4 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 font-semibold hover:bg-slate-700/50 hover:border-primary/50 transition-all flex items-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  New Search
                </button>
              </div>

              {/* Solutions Cards */}
              <div className="space-y-4">
                {solutions.map((solution) => (
                  <div
                    key={solution.id}
                    className="group bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                  >
                    {/* Solution Header */}
                    <button
                      onClick={() => toggleExpanded(solution.id)}
                      className="w-full px-6 py-5 flex items-start justify-between hover:bg-slate-700/20 transition-colors text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-bold text-white">
                            {solution.organism}
                          </h3>
                          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30">
                            {solution.category}
                          </span>
                          <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold border border-secondary/30">
                            {Math.round(solution.relevanceScore * 100)}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 italic">
                          {solution.scientificName}
                        </p>
                        <p className="text-sm text-slate-300">
                          <span className="font-semibold text-slate-200">
                            Challenge:
                          </span>{" "}
                          {solution.challenge}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-slate-500">AI Score</p>
                          <p className="text-2xl font-bold text-primary">
                            {Math.round(solution.relevanceScore * 100)}%
                          </p>
                        </div>
                        {expandedId === solution.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0 group-hover:text-primary transition-colors" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Details */}
                    {expandedId === solution.id && (
                      <div className="border-t border-slate-700/50 px-6 py-6 bg-slate-900/30 space-y-6">
                        {/* How Nature Solves It */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-accent" />
                            How Nature Solves It
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {solution.mechanism}
                          </p>
                        </div>

                        {/* Key Advantages */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-accent" />
                            Key Advantages
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {solution.advantage}
                          </p>
                        </div>

                        {/* Performance Metrics */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                            <ZapIcon className="w-4 h-4 text-accent" />
                            Biomimetic Performance
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
                              <div key={metric.name} className="space-y-1">
                                <p className="text-xs font-semibold text-slate-300">
                                  {metric.name}
                                </p>
                                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                                    style={{
                                      width: `${metric.value * 100}%`,
                                    }}
                                  />
                                </div>
                                <p className="text-xs text-slate-500">
                                  {Math.round(metric.value * 100)}%
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Design Variants */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                            <Box className="w-4 h-4 text-accent" />
                            Design Variants
                          </h4>
                          <div className="space-y-2">
                            {solution.designVariants.map((variant, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedVariant(idx)}
                                className={`w-full text-left p-3 rounded-lg border transition-all ${
                                  selectedVariant === idx
                                    ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                                    : "border-slate-700/50 bg-slate-700/20 hover:border-primary/50 hover:bg-slate-700/30"
                                }`}
                              >
                                <p className="font-medium text-slate-100">
                                  {variant.name}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                  {variant.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {variant.specs.slice(0, 2).map((spec, i) => (
                                    <span
                                      key={i}
                                      className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded border border-slate-600/50"
                                    >
                                      {spec}
                                    </span>
                                  ))}
                                  {variant.specs.length > 2 && (
                                    <span className="text-xs text-slate-500 px-2 py-1">
                                      +{variant.specs.length - 2} more
                                    </span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Comparison View */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-slate-100">
                            Biological vs Engineering Implementation
                          </h4>
                          <ComparisonView
                            solution={solution}
                            variant={selectedVariant}
                          />
                        </div>

                        {/* 3D Visualization */}
                        {show3DViewer && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                              <Box className="w-4 h-4 text-accent" />
                              3D Model Visualization
                            </h4>
                            <ThreeDViewer
                              organism={solution.organism}
                              variant={
                                solution.designVariants[selectedVariant]?.name
                              }
                            />
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
                          <button
                            onClick={() => setShow3DViewer(!show3DViewer)}
                            className="flex-1 min-w-max px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <Box className="w-4 h-4" />
                            {show3DViewer ? "Hide" : "View"} 3D Model
                          </button>
                          <button
                            onClick={handleExportPDF}
                            disabled={exportingPDF}
                            className="flex-1 min-w-max px-4 py-2 border border-slate-700/50 bg-slate-700/20 text-slate-200 font-semibold rounded-lg hover:bg-slate-700/40 hover:border-primary/50 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <Download className="w-4 h-4" />
                            {exportingPDF ? "Generating..." : "Export PDF"}
                          </button>
                          <button
                            onClick={handleExportSTL}
                            disabled={exportingSTL}
                            className="flex-1 min-w-max px-4 py-2 border border-slate-700/50 bg-slate-700/20 text-slate-200 font-semibold rounded-lg hover:bg-slate-700/40 hover:border-primary/50 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <FileDown className="w-4 h-4" />
                            {exportingSTL ? "Generating..." : "Export STL"}
                          </button>
                          <button
                            onClick={handleShare}
                            className="px-4 py-2 border border-slate-700/50 bg-slate-700/20 text-slate-200 font-semibold rounded-lg hover:bg-slate-700/40 hover:border-primary/50 transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

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
            </div>
          )}

          {/* Empty State */}
          {!solutions && !isAnalyzing && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <p className="text-slate-400 text-lg">
                Describe your engineering challenge to discover nature-inspired solutions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
