import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {description ? (
        <div className="mt-3 text-base leading-relaxed text-zinc-400">{description}</div>
      ) : null}
    </div>
  );
}
