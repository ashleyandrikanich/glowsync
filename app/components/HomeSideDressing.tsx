/**
 * Home-only side margins — soft wash, vertical rhythm, and warm blurs so
 * wide viewports feel intentional without affecting layout.
 */
export function HomeSideDressing({ side }: { side: "left" | "right" }) {
  const mirror = side === "right" ? "scale-x-[-1]" : "";

  return (
    <div
      className={`relative h-full overflow-hidden ${mirror}`}
      aria-hidden
    >
      {/* Side wash — ties to page apricot / sand */}
      <div className="absolute inset-0 bg-gradient-to-b from-dawn/15 via-transparent to-sand/10" />
      <div className="absolute -left-6 top-[12%] h-44 w-44 rounded-full bg-dawn/25 blur-3xl" />
      <div className="absolute -left-4 bottom-[18%] h-36 w-36 rounded-full bg-sand/20 blur-3xl" />

      <div className="relative flex h-full flex-col items-center justify-between py-14">
        <div className="flex flex-col items-center gap-9">
          <div className="h-28 w-px bg-gradient-to-b from-transparent via-sand/55 to-transparent" />
          <div className="flex flex-col items-center gap-3">
            {[11, 16, 12, 18, 10, 14].map((size, i) => (
              <div
                key={i}
                className={`rounded-full border shadow-[inset_0_1px_0_rgba(255,251,247,0.45)] ${
                  i % 2 === 0
                    ? "border-sand/40 bg-linen/35"
                    : "border-dawn/50 bg-blush/30"
                }`}
                style={{ width: size, height: size }}
              />
            ))}
          </div>
          <div className="h-24 w-px bg-gradient-to-b from-transparent via-blossom/20 to-transparent" />
        </div>

        {/* Light “ray” ticks — echo BrandSun without copying it */}
        <div className="flex flex-col items-center gap-1.5 opacity-70">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-1 w-6 rounded-full bg-gradient-to-r from-transparent via-sand/50 to-transparent"
              style={{ opacity: 0.35 + (i % 3) * 0.12 }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-7 pb-6">
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-earth/18 to-transparent" />
          <div className="relative">
            <div className="absolute inset-0 scale-150 rounded-full bg-dawn/30 blur-md" />
            <div className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-linen/90 to-sand/50 ring-2 ring-sand/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
