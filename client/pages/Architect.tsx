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
  Search,
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
      const response = await fetch("/api/biomimicry/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge }),
      });

      if (!response.ok) throw new Error("Failed to analyze challenge");

      const stages = [1, 2, 3, 4, 5];
      for (const stage of stages) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        setGenerationStep(stage);
      }

      const data = await response.json();
      setSolutions(data.solutions as Solution[]);
      toast.success(`Found ${data.solutions.length} nature-inspired solutions!`);
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
      toast.success("PDF report downloaded!", { id: "pdf-export" });
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
      toast.success("3D model ready for 3D printing!", { id: "stl-export" });
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
    const shareText = `Check out this BioMimicry solution for "${challenge}"`;

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
        toast.success("Share link copied!");
      } catch (error) {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-blue-50">
      <Header />

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Input Section */}
          {!solutions && (
            <div className="space-y-12">
              {/* Hero Section */}
              <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold">AI-Powered Biomimicry</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Nature-Inspired
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Engineering Solutions
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Describe your engineering challenge and discover proven,
                  nature-inspired solutions from our database of 3000+ biomimetic designs
                </p>
              </div>

              {/* Main Input Card */}
              <div className="bg-white rounded-3xl border-2 border-emerald-200 p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Quick Examples */}
                <div className="mb-12">
                  <label className="block text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-600" />
                    Popular Challenges
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {problemExamples.map((example) => (
                      <button
                        key={example.title}
                        onClick={() => setChallenge(example.description)}
                        className="group relative overflow-hidden text-left p-5 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-emerald-50 hover:to-blue-50 hover:border-emerald-300 transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <p className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                            {example.icon}
                          </p>
                          <p className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                            {example.title}
                          </p>
                          <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors mt-1">
                            {example.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Challenge Input */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Describe Your Challenge
                    </label>
                    <div className="relative">
                      <textarea
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        placeholder="e.g., 'Design a building cooling system that uses minimal energy while maintaining comfort'..."
                        className="w-full h-32 px-5 py-4 rounded-2xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all text-base"
                      />
                      <button
                        onClick={handleVoiceInput}
                        className={`absolute right-4 top-4 p-3 rounded-xl transition-all ${
                          isListening
                            ? "bg-red-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600"
                        }`}
                        title="Voice input (click to speak)"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                    {isListening && (
                      <div className="flex items-center gap-2 mt-3 text-red-500 text-sm font-medium">
                        <span className="animate-pulse">●</span>
                        <span>Listening to your challenge...</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-3">
                      Be specific about the problem, constraints, and desired outcomes
                    </p>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Upload Design Files <span className="font-normal text-gray-500">(Optional)</span>
                    </label>
                    <label className="group relative flex flex-col items-center justify-center w-full px-8 py-10 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/50 hover:border-emerald-400 cursor-pointer transition-all duration-300">
                      <div className="text-center">
                        <div className="w-14 h-14 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-300 transition-colors">
                          <Upload className="w-7 h-7 text-emerald-600" />
                        </div>
                        <p className="text-base font-bold text-gray-900">
                          {file ? file.name : "Click to upload or drag files"}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
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

                  {/* Action Button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !challenge.trim()}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg group"
                  >
                    {isAnalyzing ? (
                      <>
                        <Zap className="w-5 h-5 animate-spin" />
                        Analyzing Challenge...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Find Nature-Inspired Solutions
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Processing Steps */}
              {isAnalyzing && generationStep > 0 && (
                <div className="bg-white rounded-2xl border-2 border-emerald-200 p-8 shadow-lg space-y-6">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    AI Processing Pipeline
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: 1, label: "Parsing Challenge", icon: "📝" },
                      { step: 2, label: "Searching Biology Database", icon: "🔍" },
                      { step: 3, label: "Semantic Analysis", icon: "🧬" },
                      { step: 4, label: "Ranking Solutions", icon: "⚙️" },
                      { step: 5, label: "Generating Report", icon: "📊" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                            generationStep >= item.step
                              ? "bg-emerald-600 text-white shadow-lg"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {generationStep > item.step ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            item.icon
                          )}
                        </div>
                        <span
                          className={`text-base font-semibold transition-colors ${
                            generationStep >= item.step
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {item.label}
                        </span>
                        {generationStep === item.step && (
                          <span className="animate-pulse ml-auto text-emerald-600 text-xl">
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
            <div className="space-y-8 animate-fade-in">
              {/* Challenge Display */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border-2 border-emerald-200 p-8 shadow-lg">
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
                  Your Challenge
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  {challenge}
                </p>
                {file && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-emerald-200">
                    <Upload className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Uploaded Design File</p>
                      <p className="text-xs text-gray-600">{file.name}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-gray-900">
                    Nature-Inspired Solutions
                  </h2>
                  <p className="text-lg text-gray-600">
                    {solutions.length} unique biomimetic solutions ranked by AI relevance score
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded-xl border-2 border-emerald-300 bg-white text-gray-900 font-semibold hover:bg-emerald-50 hover:border-emerald-400 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <RotateCw className="w-4 h-4" />
                  New Search
                </button>
              </div>

              {/* Solutions Cards */}
              <div className="space-y-5">
                {solutions.map((solution) => (
                  <div
                    key={solution.id}
                    className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-emerald-400 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Solution Header */}
                    <button
                      onClick={() => toggleExpanded(solution.id)}
                      className="w-full px-8 py-6 flex items-start justify-between hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {solution.organism}
                          </h3>
                          <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-300">
                            {solution.category}
                          </span>
                          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-300">
                            {Math.round(solution.relevanceScore * 100)}% Match
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3 italic">
                          {solution.scientificName}
                        </p>
                        <p className="text-base text-gray-700">
                          <span className="font-bold text-gray-900">Challenge: </span>
                          {solution.challenge}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 ml-6 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">AI Score</p>
                          <p className="text-3xl font-bold text-emerald-600">
                            {Math.round(solution.relevanceScore * 100)}%
                          </p>
                        </div>
                        {expandedId === solution.id ? (
                          <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-emerald-600 transition-colors" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-emerald-600 transition-colors" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Details */}
                    {expandedId === solution.id && (
                      <div className="border-t-2 border-gray-200 px-8 py-8 bg-gradient-to-br from-gray-50 to-white space-y-8">
                        {/* How Nature Solves It */}
                        <div className="space-y-3">
                          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                            <Lightbulb className="w-5 h-5 text-emerald-600" />
                            How Nature Solves It
                          </h4>
                          <p className="text-base text-gray-700 leading-relaxed">
                            {solution.mechanism}
                          </p>
                        </div>

                        {/* Key Advantages */}
                        <div className="space-y-3">
                          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Key Advantages
                          </h4>
                          <p className="text-base text-gray-700 leading-relaxed">
                            {solution.advantage}
                          </p>
                        </div>

                        {/* Performance Metrics */}
                        <div className="space-y-4 bg-white rounded-xl p-6 border border-emerald-100">
                          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                            <ZapIcon className="w-5 h-5 text-cyan-600" />
                            Biomimetic Performance
                          </h4>
                          <div className="grid grid-cols-3 gap-4">
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
                              <div key={metric.name} className="space-y-2">
                                <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                                  {metric.name}
                                </p>
                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                                    style={{
                                      width: `${metric.value * 100}%`,
                                    }}
                                  />
                                </div>
                                <p className="text-xs font-bold text-gray-600">
                                  {Math.round(metric.value * 100)}%
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Design Variants */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                            <Box className="w-5 h-5 text-purple-600" />
                            Design Variants
                          </h4>
                          <div className="space-y-3">
                            {solution.designVariants.map((variant, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedVariant(idx)}
                                className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                                  selectedVariant === idx
                                    ? "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-300/50"
                                    : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50"
                                }`}
                              >
                                <p className="font-bold text-gray-900 text-base">
                                  {variant.name}
                                </p>
                                <p className="text-sm text-gray-600 mt-1.5">
                                  {variant.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {variant.specs.slice(0, 2).map((spec, i) => (
                                    <span
                                      key={i}
                                      className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-lg border border-gray-300"
                                    >
                                      {spec}
                                    </span>
                                  ))}
                                  {variant.specs.length > 2 && (
                                    <span className="text-xs text-gray-600 px-3 py-1">
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
                          <h4 className="text-lg font-bold text-gray-900">
                            Biological vs Engineering Implementation
                          </h4>
                          <ComparisonView
                            solution={solution}
                            variant={selectedVariant}
                          />
                        </div>

                        {/* 3D Visualization */}
                        {show3DViewer && (
                          <div className="space-y-4 bg-white rounded-xl p-6 border border-emerald-100">
                            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                              <Box className="w-5 h-5 text-emerald-600" />
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
                        <div className="flex flex-wrap gap-3 pt-6 border-t-2 border-gray-200">
                          <button
                            onClick={() => setShow3DViewer(!show3DViewer)}
                            className="flex-1 min-w-max px-5 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <Box className="w-4 h-4" />
                            {show3DViewer ? "Hide" : "View"} 3D
                          </button>
                          <button
                            onClick={handleExportPDF}
                            disabled={exportingPDF}
                            className="flex-1 min-w-max px-5 py-3 border-2 border-gray-300 bg-white text-gray-900 font-bold rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <Download className="w-4 h-4" />
                            {exportingPDF ? "Generating..." : "PDF"}
                          </button>
                          <button
                            onClick={handleExportSTL}
                            disabled={exportingSTL}
                            className="flex-1 min-w-max px-5 py-3 border-2 border-gray-300 bg-white text-gray-900 font-bold rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <FileDown className="w-4 h-4" />
                            {exportingSTL ? "Generating..." : "STL"}
                          </button>
                          <button
                            onClick={handleShare}
                            className="px-5 py-3 border-2 border-gray-300 bg-white text-gray-900 font-bold rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all text-sm flex items-center justify-center gap-2"
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
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-emerald-600" />
              </div>
              <p className="text-gray-600 text-xl font-semibold">
                Describe your engineering challenge to discover nature-inspired solutions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
