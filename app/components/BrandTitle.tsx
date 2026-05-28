import type { ElementType, ReactNode } from "react";
import { BrandSun } from "./BrandSun";

const sizeClass = {
  sm: "text-[1.125rem] sm:text-xl",
  md: "text-2xl sm:text-[1.65rem]",
  lg: "text-[clamp(2.625rem,6.5vw,3.875rem)] leading-[1.02]",
};

const sunClass = {
  sm: "h-7 w-7 sm:h-8 sm:w-8",
  md: "h-9 w-9 sm:h-10 sm:w-10",
  lg: "h-11 w-11 sm:h-14 sm:w-14",
};

type BrandTitleProps = {
  as?: ElementType<{ children?: ReactNode; className?: string }>;
  size?: keyof typeof sizeClass;
  className?: string;
  /** High-contrast wordmark for dark backgrounds (e.g. header). */
  variant?: "default" | "onDark";
};

/**
 * Wordmark with abstract sun mark, used in header and hero.
 */
export function BrandTitle({
  as: Component = "span",
  size = "md",
  className = "",
  variant = "default",
}: BrandTitleProps) {
  const glow =
    variant === "onDark"
      ? "text-[#fffef2]"
      : "text-offblack";
  const sync =
    variant === "onDark"
      ? "text-[#fdba74]"
      : "text-earth";

  return (
    <Component
      className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}
    >
      <BrandSun
        className={sunClass[size]}
        palette={variant === "onDark" ? "amberRose" : "default"}
      />
      <span
        className={`font-serif ${sizeClass[size]} tracking-[-0.02em] text-balance`}
      >
        <span className={`font-semibold ${glow}`}>Glow</span>
        <span className={`font-light italic ${sync}`}>Sync</span>
      </span>
    </Component>
  );
}
