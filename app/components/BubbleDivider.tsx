type BubbleDividerProps = {
  className?: string;
};

export function BubbleDivider({ className = "" }: BubbleDividerProps) {
  return (
    <div
      className={`mx-auto flex max-w-3xl items-center justify-center gap-2 px-4 ${className}`}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-dawn/55 to-sand/55" />
      <span className="h-2.5 w-2.5 rounded-full bg-dawn/65" />
      <span className="h-5 w-5 rounded-full border border-dawn/55 bg-gradient-to-br from-linen/85 to-blush/40 shadow-sm" />
      <span className="h-3 w-3 rounded-full bg-sand/60" />
      <span className="h-7 w-7 rounded-full border border-sage/20 bg-gradient-to-br from-sage/15 to-linen/80 shadow-sm" />
      <span className="h-3.5 w-3.5 rounded-full bg-blossom/35" />
      <span className="h-5 w-5 rounded-full border border-sand/65 bg-gradient-to-br from-linen/85 to-dawn/35 shadow-sm" />
      <span className="h-2.5 w-2.5 rounded-full bg-dawn/65" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-dawn/55 to-sand/55" />
    </div>
  );
}
