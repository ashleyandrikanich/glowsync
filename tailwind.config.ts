import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        linen: "#FAF9F6",
        sand: "#E2D1C3",
        earth: "#8D7B68",
        offblack: "#2D2926",
        /** Soft rose — accents, hovers, playful highlights */
        blossom: "#C9A89E",
        /** Muted sage — balance, secondary emphasis */
        sage: "#94B49C",
        /** Warm peach wash — backgrounds & gradients */
        dawn: "#EDD4C8",
        /** Light blush for fills */
        blush: "#F0E0DC",
      },
    },
  },
} satisfies Config;
