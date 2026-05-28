import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        /** Warm cream — cards, header wash */
        linen: "#FFFBF7",
        /** Light orange-tan — borders & UI chrome */
        sand: "#FDBA74",
        /** Primary deep orange — key actions */
        earth: "#C2410C",
        /** Warm charcoal — body text */
        offblack: "#271E1A",
        /** Bright orange — hovers, highlights */
        blossom: "#EA580C",
        /** Secondary orange emphasis */
        sage: "#F97316",
        /** Soft peach-orange — panel washes */
        dawn: "#FB923C",
        /** Pale orange cream — subtle fills */
        blush: "#FFEDD5",
      },
    },
  },
} satisfies Config;
