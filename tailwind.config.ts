import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        /** Warm cream — cards, header wash */
        linen: "#FFFBF7",
        /** Warm tan — borders & UI chrome */
        sand: "#D4A574",
        /** Deep orange-red — primary buttons & key actions */
        earth: "#C2410C",
        /** Warm charcoal — body text */
        offblack: "#271E1A",
        /** Bright orange — hovers, highlights */
        blossom: "#EA580C",
        /** Amber / golden — focus rings, secondary emphasis */
        sage: "#CA8A04",
        /** Soft peach — panels, selection washes */
        dawn: "#FDBA74",
        /** Pale yellow cream — subtle fills */
        blush: "#FEF3C7",
      },
    },
  },
} satisfies Config;
