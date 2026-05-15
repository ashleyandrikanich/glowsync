"use client";

import { useId } from "react";

type BrandSunProps = {
  /** Tailwind size classes, e.g. `h-9 w-9 sm:h-10 sm:w-10` */
  className?: string;
  /** Header bar: yellow → rose/red instead of orange blossom. */
  palette?: "default" | "amberRose";
};

/**
 * Abstract sun mark — soft rays + warm core for GlowSync.
 */
export function BrandSun({
  className = "h-9 w-9 sm:h-10 sm:w-10",
  palette = "default",
}: BrandSunProps) {
  const raw = useId().replace(/:/g, "");
  const gradId = `brand-sun-${raw}-${palette}`;
  const isAmberRose = palette === "amberRose";

  const rays = Array.from({ length: 12 }, (_, i) => (
    <rect
      key={i}
      x={-1.4}
      y={-21.5}
      width={2.8}
      height={10}
      rx={1.4}
      fill={`url(#${gradId})`}
      opacity={0.55 + (i % 3) * 0.08}
      transform={`rotate(${i * 30})`}
    />
  ));

  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="10"
          y1="6"
          x2="40"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          {isAmberRose ? (
            <>
              <stop stopColor="#facc15" />
              <stop offset="0.55" stopColor="#fb7185" />
              <stop offset="1" stopColor="#dc2626" />
            </>
          ) : (
            <>
              <stop stopColor="#EA580C" />
              <stop offset="1" stopColor="#CA8A04" />
            </>
          )}
        </linearGradient>
      </defs>
      <g transform="translate(24 24)">{rays}</g>
      <circle cx="24" cy="24" r="10" fill={`url(#${gradId})`} />
      <circle
        cx="24"
        cy="24"
        r="5.5"
        fill={isAmberRose ? "#fef9c3" : "#FFFBF7"}
        opacity={isAmberRose ? 0.5 : 0.45}
      />
      <circle
        cx="24"
        cy="24"
        r="2.8"
        fill={isAmberRose ? "#fecaca" : "#FDBA74"}
        opacity={isAmberRose ? 0.65 : 0.55}
      />
    </svg>
  );
}
