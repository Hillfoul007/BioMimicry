import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowRight, Leaf, Zap, Microscope } from "lucide-react";
import ThreeDViewer from "@/components/ThreeDViewer";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-primary font-semibold text-sm tracking-wide uppercase">
                  Powered by Nature's Wisdom
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  BioMimicry
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Architect AI
                  </span>
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Leverage 3.8 billion years of nature's R&D to solve your engineering challenges. Upload any design problem and discover biology-inspired solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/architect"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                  Start Designing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-white text-foreground font-semibold rounded-lg hover:bg-slate-50 transition-all"
                >
                  Learn More
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
              <div className="relative bg-white rounded-2xl border border-border p-8 shadow-lg">
                <div className="mb-6 animate-float">
                  <ThreeDViewer organism="Lotus" variant="default" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">AI-Powered Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze biomimetic patterns and generate 3D models of nature-inspired designs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              How BioMimicry Architect Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From challenge to biomimetic solution in minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Microscope className="w-8 h-8" />,
                title: "Analyze Challenge",
                description: "Upload your design challenge or engineering problem",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Discover Solutions",
                description: "AI identifies nature-inspired patterns and solutions from biology",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Generate 3D Models",
                description: "Create and visualize biomimetic designs with our 3D engine",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Nature-Inspired Examples
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real biomimetic solutions solving modern engineering challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Termite Mound Cooling",
                description: "Buildings that maintain temperature like termite mounds through passive cooling channels and smart ventilation",
                challenge: "Design passive building cooling systems",
              },
              {
                title: "Gecko-Inspired Adhesives",
                description: "Ultra-strong adhesives using van der Waals forces instead of toxic chemicals, reusable and environmentally friendly",
                challenge: "Create sustainable adhesive without chemistry",
              },
              {
                title: "Whale Fin Turbines",
                description: "Wind turbine blades inspired by humpback whale fins for improved efficiency and reduced noise",
                challenge: "Optimize wind turbine efficiency",
              },
              {
                title: "Lotus Leaf Water Resistance",
                description: "Self-cleaning surfaces with superhydrophobic properties for coatings, textiles, and building materials",
                challenge: "Develop water and stain-resistant materials",
              },
            ].map((example, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-border bg-white p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                    Challenge
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{example.challenge}</p>
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {example.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {example.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Design Like Nature?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Upload your engineering challenge and discover biomimetic solutions powered by AI
          </p>
          <Link
            to="/architect"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            Launch BioMimicry Architect
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>
            BioMimicry Architect AI — Learning from nature's solutions to engineering challenges
          </p>
        </div>
      </footer>
    </div>
  );
}
