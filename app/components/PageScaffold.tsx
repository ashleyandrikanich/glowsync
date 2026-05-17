import type { ReactNode } from "react";
import { BubbleDivider } from "./BubbleDivider";

type PageScaffoldProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageScaffold({ title, description, children }: PageScaffoldProps) {
  return (
    <main className="relative flex flex-1 justify-center px-4 pb-24 pt-8 sm:px-8 sm:pt-12">
      <div className="relative w-full max-w-6xl">
        <div
          className="pointer-events-none absolute inset-y-0 right-full mr-3 hidden w-28 overflow-visible xl:block"
          aria-hidden
        >
          <span className="absolute left-8 top-[4%] h-10 w-10 rounded-full border border-dawn/45 bg-gradient-to-br from-linen/75 to-dawn/30 shadow-sm" />
          <span className="absolute left-3 top-[10%] h-5 w-5 rounded-full bg-blush/45 shadow-sm" />
          <span className="absolute left-14 top-[16%] h-8 w-8 rounded-full border border-dawn/40 bg-linen/65 shadow-sm" />
          <span className="absolute left-2 top-[19%] h-3 w-3 rounded-full bg-dawn/45 shadow-sm" />
          <span className="absolute left-6 top-[23%] h-12 w-12 rounded-full border border-sage/20 bg-sage/10 shadow-sm" />
          <span className="absolute left-[4.75rem] top-[27%] h-6 w-6 rounded-full bg-blush/35 shadow-sm" />
          <span className="absolute left-16 top-[31%] h-4 w-4 rounded-full bg-dawn/50 shadow-sm" />
          <span className="absolute left-4 top-[38%] h-7 w-7 rounded-full border border-blossom/25 bg-blossom/15 shadow-sm" />
          <span className="absolute left-[3.8rem] top-[41%] h-3 w-3 rounded-full bg-sage/20 shadow-sm" />
          <span className="absolute left-12 top-[46%] h-11 w-11 rounded-full border border-dawn/45 bg-gradient-to-br from-linen/75 to-blush/25 shadow-sm" />
          <span className="absolute left-7 top-[55%] h-4 w-4 rounded-full bg-dawn/45 shadow-sm" />
          <span className="absolute left-[4.5rem] top-[58%] h-5 w-5 rounded-full bg-blossom/25 shadow-sm" />
          <span className="absolute left-16 top-[63%] h-8 w-8 rounded-full border border-sage/20 bg-sage/10 shadow-sm" />
          <span className="absolute left-3 top-[71%] h-10 w-10 rounded-full border border-dawn/40 bg-linen/65 shadow-sm" />
          <span className="absolute left-[4.25rem] top-[74%] h-3 w-3 rounded-full bg-dawn/45 shadow-sm" />
          <span className="absolute left-12 top-[80%] h-5 w-5 rounded-full bg-dawn/45 shadow-sm" />
          <span className="absolute left-2 top-[84%] h-7 w-7 rounded-full border border-sage/20 bg-sage/10 shadow-sm" />
          <span className="absolute left-6 top-[89%] h-12 w-12 rounded-full border border-blossom/25 bg-blossom/15 shadow-sm" />
          <span className="absolute left-[4.25rem] top-[96%] h-4 w-4 rounded-full bg-sage/20 shadow-sm" />
          <span className="absolute left-4 top-[99%] h-6 w-6 rounded-full bg-blush/30 shadow-sm" />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-full ml-3 hidden w-28 overflow-visible xl:block"
          aria-hidden
        >
          <span className="absolute right-8 top-[5%] h-8 w-8 rounded-full border border-dawn/40 bg-gradient-to-br from-linen/75 to-blush/30 shadow-sm" />
          <span className="absolute right-2 top-[8%] h-4 w-4 rounded-full bg-sage/20 shadow-sm" />
          <span className="absolute right-4 top-[12%] h-12 w-12 rounded-full border border-blossom/25 bg-blossom/15 shadow-sm" />
          <span className="absolute right-16 top-[19%] h-4 w-4 rounded-full bg-dawn/50 shadow-sm" />
          <span className="absolute right-[4.75rem] top-[23%] h-7 w-7 rounded-full bg-blush/30 shadow-sm" />
          <span className="absolute right-7 top-[27%] h-7 w-7 rounded-full border border-dawn/45 bg-linen/65 shadow-sm" />
          <span className="absolute right-16 top-[35%] h-10 w-10 rounded-full border border-sage/20 bg-sage/10 shadow-sm" />
          <span className="absolute right-3 top-[43%] h-5 w-5 rounded-full bg-dawn/45 shadow-sm" />
          <span className="absolute right-[4.25rem] top-[47%] h-3 w-3 rounded-full bg-blossom/30 shadow-sm" />
          <span className="absolute right-10 top-[51%] h-12 w-12 rounded-full border border-dawn/40 bg-gradient-to-br from-linen/75 to-dawn/25 shadow-sm" />
          <span className="absolute right-6 top-[59%] h-4 w-4 rounded-full bg-blush/45 shadow-sm" />
          <span className="absolute right-[4.8rem] top-[63%] h-6 w-6 rounded-full border border-sage/20 bg-sage/10 shadow-sm" />
          <span className="absolute right-16 top-[67%] h-8 w-8 rounded-full border border-dawn/40 bg-linen/65 shadow-sm" />
          <span className="absolute right-2 top-[70%] h-3 w-3 rounded-full bg-dawn/45 shadow-sm" />
          <span className="absolute right-4 top-[75%] h-11 w-11 rounded-full border border-sage/20 bg-sage/10 shadow-sm" />
          <span className="absolute right-14 top-[84%] h-5 w-5 rounded-full bg-dawn/45 shadow-sm" />
          <span className="absolute right-2 top-[88%] h-7 w-7 rounded-full bg-blush/30 shadow-sm" />
          <span className="absolute right-8 top-[92%] h-9 w-9 rounded-full border border-blossom/25 bg-blossom/15 shadow-sm" />
          <span className="absolute right-[4.5rem] top-[98%] h-3 w-3 rounded-full bg-dawn/45 shadow-sm" />
          <span className="absolute right-5 top-[101%] h-5 w-5 rounded-full bg-sage/20 shadow-sm" />
        </div>
        <div
          className="pointer-events-none absolute -inset-7 rounded-[2.25rem] bg-gradient-to-br from-dawn/45 via-blush/30 to-sage/20 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -inset-2 rounded-[1.85rem] border border-dawn/50 shadow-[0_0_28px_rgba(248,188,143,0.40),0_0_74px_rgba(250,204,166,0.26)]"
          aria-hidden
        />
        <article className="glow-card-sheen relative w-full rounded-3xl border border-dawn/65 bg-gradient-to-br from-linen/92 via-blush/40 to-dawn/25 p-8 shadow-[0_0_0_1px_rgba(248,188,143,0.26),0_0_58px_rgba(248,188,143,0.34),0_28px_80px_rgba(90,64,46,0.12)] backdrop-blur-sm sm:p-12">
          <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-earth/75">
            GlowSync
          </p>
          <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-offblack sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-4xl text-[0.9375rem] leading-relaxed text-offblack/70">
              {description}
            </p>
          ) : null}
          <BubbleDivider className="mt-8" />
          <div className="mt-10 space-y-6 text-[0.9375rem] leading-relaxed text-offblack/85">
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}
