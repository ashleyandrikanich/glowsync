import type { ElementType, ReactNode } from "react";

const sizeClass = {
  sm: "text-[1.125rem] sm:text-xl",
  md: "text-2xl sm:text-[1.65rem]",
  lg: "text-[clamp(2.625rem,6.5vw,3.875rem)] leading-[1.02]",
};

type BrandTitleProps = {
  as?: ElementType<{ children?: ReactNode; className?: string }>;
  size?: keyof typeof sizeClass;
  className?: string;
};

/**
 * Wordmark only: weight + rhythm contrast, no mark — reads as one name.
 */
export function BrandTitle({
  as: Component = "span",
  size = "md",
  className = "",
}: BrandTitleProps) {
  return (
    <Component
      className={`font-serif ${sizeClass[size]} tracking-[-0.02em] text-balance ${className}`}
    >
      <span className="font-semibold text-offblack">Glow</span>
      <span className="font-light italic text-earth">Sync</span>
    </Component>
  );
}
