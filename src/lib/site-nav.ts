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
      { href: "/skin-quiz", label: "Skin Quiz" },
      { href: "/guide", label: "Routine Guide" },
      { href: "/actives", label: "Actives Library" },
      { href: "/education", label: "Education Hub" },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/routine", label: "My Routine" },
      { href: "/routine-history", label: "Routine History" },
      { href: "/skin-journal", label: "Skin Journal" },
      { href: "/routine-coach", label: "Routine Coach" },
      { href: "/compare", label: "Product Compare" },
      { href: "/wishlist", label: "Wishlist" },
    ],
  },
  {
    label: "More",
    items: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/settings", label: "Settings" },
    ],
  },
] as const;

export type NavLinkItem = (typeof NAV_GROUPS)[number]["items"][number];

export const PRIMARY_NAV = NAV_GROUPS.flatMap((g) => [...g.items]);
