import type { ReactNode } from "react";

type PageScaffoldProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageScaffold({ title, description, children }: PageScaffoldProps) {
  return (
    <main className="relative flex flex-1 justify-center px-4 pb-24 pt-8 sm:px-8 sm:pt-12">
      <article className="glow-card-sheen relative w-full max-w-2xl rounded-3xl border border-sand/80 bg-white/55 p-8 backdrop-blur-sm sm:p-12">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-earth/75">
          GlowSync
        </p>
        <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-offblack sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-offblack/70">
            {description}
          </p>
        ) : null}
        <div className="mt-10 space-y-6 text-[0.9375rem] leading-relaxed text-offblack/85">
          {children}
        </div>
      </article>
    </main>
  );
}
