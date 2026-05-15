/**
 * Primary navigation — grouped for the header menu (core → learn → tools → meta).
 * Flat list derived for sitemap-style consumers.
 */
export const NAV_GROUPS = [
  {
    label: "Start",
    items: [{ href: "/", label: "Home" }],
  },
  {
    label: "Learn",
    items: [
      { href: "/skin-quiz", label: "Skin quiz" },
      { href: "/guide", label: "Routine guide" },
      { href: "/actives", label: "Actives library" },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/routine", label: "My routine" },
      { href: "/routine-coach", label: "Routine coach" },
    ],
  },
  {
    label: "More",
    items: [
      { href: "/about", label: "About" },
      { href: "/settings", label: "Settings" },
    ],
  },
] as const;

export type NavLinkItem = (typeof NAV_GROUPS)[number]["items"][number];

export const PRIMARY_NAV = NAV_GROUPS.flatMap((g) => [...g.items]);
