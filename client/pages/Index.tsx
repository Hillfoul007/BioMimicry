import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowRight, Leaf, Zap, Microscope, Sparkles, Brain, Network } from "lucide-react";
import ThreeDViewer from "@/components/ThreeDViewer";

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="py-32 px-4 sm:py-40">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 w-fit">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <p className="text-sm font-semibold text-emerald-300">Powered by Nature's Wisdom</p>
                  </div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                    Biomimicry
                    <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
                      Architect AI
                    </span>
                  </h1>
                </div>

                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Unlock 3.8 billion years of nature's engineering wisdom. Solve complex design challenges with AI-powered biomimetic solutions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link
                    to="/architect"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
                  >
                    Start Creating
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-500 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-gray-300 transition-all"
                  >
                    Learn More
                  </a>
                </div>

                <div className="flex gap-8 pt-8 border-t border-gray-800">
                  {[
                    { label: "Nature-Inspired", value: "100+" },
                    { label: "Solutions", value: "AI-Powered" },
                    { label: "3D Ready", value: "Instant" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-2xl font-bold text-emerald-400">{stat.value}</p>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 hover:border-gray-600 transition-all">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">3D Preview</p>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-gray-700">
                    <ThreeDViewer organism="Lotus" variant="default" />
                  </div>
                  <div className="mt-6 space-y-2">
                    <h3 className="font-bold text-lg text-white">Nature's Blueprint</h3>
                    <p className="text-sm text-gray-400">
                      Real-time 3D visualization of biomimetic designs powered by advanced AI algorithms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                The Intelligence Behind Nature
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Three simple steps to transform your design challenges into biomimetic solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="w-8 h-8" />,
                  step: "01",
                  title: "Analyze Challenge",
                  description: "Upload your design problem and let AI analyze it through the lens of biological systems",
                },
                {
                  icon: <Network className="w-8 h-8" />,
                  step: "02",
                  title: "Discover Patterns",
                  description: "AI identifies nature-inspired solutions from millions of biological organisms and systems",
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  step: "03",
                  title: "Generate Models",
                  description: "Create stunning 3D biomimetic designs optimized for performance and sustainability",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-600/0 to-cyan-600/0 group-hover:from-emerald-600/30 group-hover:to-cyan-600/30 rounded-xl blur transition duration-500" />
                  <div className="relative bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/30 group-hover:border-gray-600 p-8 transition-all">
                    <div className="text-5xl font-black text-gray-700 mb-4">{item.step}</div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                Biomimetic Solutions in Action
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Real-world examples of nature-inspired engineering solving modern challenges
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  organism: "Termite",
                  title: "Passive Climate Control",
                  description: "Termite mounds maintain perfect temperature without energy. Buildings using these principles reduce HVAC costs by 40%.",
                  impact: "40% Energy Savings",
                },
                {
                  organism: "Gecko",
                  title: "Dry Adhesives",
                  description: "Gecko feet inspire reusable adhesives with van der Waals forces. Perfect for space and medical applications.",
                  impact: "100% Reusable",
                },
                {
                  organism: "Whale",
                  title: "Efficient Turbines",
                  description: "Humpback whale fin tubercles increase turbine efficiency by 8% while reducing noise pollution.",
                  impact: "8% More Output",
                },
                {
                  organism: "Lotus",
                  title: "Self-Cleaning Surfaces",
                  description: "Lotus leaf superhydrophobic surfaces inspire coatings that repel water and self-clean automatically.",
                  impact: "0% Maintenance",
                },
              ].map((example, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-600/0 to-cyan-600/0 group-hover:from-emerald-600/40 group-hover:to-cyan-600/40 blur transition duration-500 rounded-xl" />
                  <div className="relative bg-gray-900/40 backdrop-blur-sm border border-gray-700/40 group-hover:border-gray-600/60 p-8 transition-all rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
                          {example.organism} Biomimicry
                        </p>
                        <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">
                          {example.title}
                        </h3>
                      </div>
                      <div className="text-3xl">🧬</div>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {example.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-300">{example.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-12 sm:p-16 text-center">
                <h2 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                  Ready to Design Like Nature?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join engineers, architects, and designers who are solving challenges with biomimetic intelligence.
                </p>
                <Link
                  to="/architect"
                  className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
                >
                  Launch Architect AI
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12 px-4 mt-12">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="text-gray-400">
              BioMimicry Architect AI — Unlocking nature's solutions for tomorrow's engineering
            </p>
            <p className="text-xs text-gray-600 mt-4">
              © 2024 BioMimicry Architect. Inspired by 3.8 billion years of evolution.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
