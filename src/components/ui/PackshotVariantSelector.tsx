import { cn } from "@/lib/utils";
import { useState } from "react";

interface PackshotVariantSelectorProps {
  variants: string[];
  onVariantChange?: (selectedVariant: string) => void;
  currentVariant?: string;
  className?: string;
  thumbnailSize?: "sm" | "md" | "lg";
}

/**
 * Component to select between multiple packshot variants for a product
 * Shows thumbnail grid of available variants with selection indicator
 */
export const PackshotVariantSelector = ({
  variants,
  onVariantChange,
  currentVariant,
  className,
  thumbnailSize = "md",
}: PackshotVariantSelectorProps) => {
  const [selected, setSelected] = useState(currentVariant || variants[0]);

  const handleSelect = (variant: string) => {
    setSelected(variant);
    onVariantChange?.(variant);
  };

  if (variants.length <= 1) {
    return null;
  }

  const thumbnailSizeMap = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        className,
      )}
    >
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Variant ({variants.length})
      </label>
      <div className="flex gap-2 flex-wrap">
        {variants.map((variant, idx) => (
          <button
            key={variant}
            onClick={() => handleSelect(variant)}
            className={cn(
              "relative group overflow-hidden rounded border-2 transition-all",
              thumbnailSizeMap[thumbnailSize],
              selected === variant
                ? "border-primary shadow-lg"
                : "border-border hover:border-muted-foreground/50",
            )}
            title={`Variant ${idx + 1}`}
          >
            <img
              src={variant}
              alt={`Variant ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div
              className={cn(
                "absolute inset-0 pointer-events-none",
                selected === variant
                  ? "bg-primary/10"
                  : "bg-transparent",
              )}
            />
            {/* Variant index badge */}
            <div className="absolute bottom-0 right-0 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-tl text-center w-full">
              {idx + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
