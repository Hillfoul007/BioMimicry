import { BiologicalSolution } from "@shared/organisms";
import { ChevronRight } from "lucide-react";

interface ComparisonViewProps {
  solution: BiologicalSolution;
  variant: number;
}

export default function ComparisonView({
  solution,
  variant,
}: ComparisonViewProps) {
  const selectedVariant = solution.designVariants[variant];

  const comparisonPoints = [
    {
      aspect: "Design Principle",
      organism: solution.mechanism.split(".")[0],
      engineered: selectedVariant.description,
    },
    {
      aspect: "Materials",
      organism: "Biological materials (proteins, minerals, etc.)",
      engineered: selectedVariant.specs[0] || "Advanced polymers & composites",
    },
    {
      aspect: "Manufacturing",
      organism: "Natural biological processes",
      engineered: selectedVariant.specs[1] || "Industrial production methods",
    },
    {
      aspect: "Performance",
      organism: solution.advantage.split(".")[0],
      engineered: selectedVariant.specs[2] || "Optimized for human applications",
    },
    {
      aspect: "Sustainability",
      organism: "100% biodegradable",
      engineered: `${Math.round(solution.metrics.sustainability * 100)}% sustainable`,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h4 className="text-lg font-bold text-foreground mb-6">
        Nature vs. Engineering
      </h4>

      <div className="space-y-4">
        {comparisonPoints.map((point, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-4">
            {/* Aspect Label */}
            <div className="col-span-1">
              <p className="text-sm font-semibold text-foreground bg-slate-50 p-3 rounded-lg">
                {point.aspect}
              </p>
            </div>

            {/* Organism Side */}
            <div className="col-span-1">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 relative">
                <p className="text-xs font-bold text-green-700 mb-2 uppercase tracking-wide">
                  Nature ({solution.organism})
                </p>
                <p className="text-xs text-green-900 leading-relaxed">
                  {point.organism}
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="col-span-1">
              <div className="flex items-center justify-center h-full">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    Inspired by
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom: Engineered Design */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-bold text-blue-700 mb-2 uppercase tracking-wide">
            Engineered Design: {selectedVariant.name}
          </p>
          <p className="text-sm text-blue-900 leading-relaxed">
            {selectedVariant.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedVariant.specs.map((spec, i) => (
              <span
                key={i}
                className="text-xs bg-white px-3 py-1 rounded-full border border-blue-200 text-blue-800"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
        <p className="text-sm font-semibold text-foreground mb-2">
          💡 Key Insight
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By studying how {solution.organism} naturally solves this challenge,
          we can create engineering solutions that are more efficient,
          sustainable, and often simpler than traditional approaches.
        </p>
      </div>
    </div>
  );
}
