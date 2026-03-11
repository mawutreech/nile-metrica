type PublicPageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PublicPageIntro({
  eyebrow,
  title,
  description,
}: PublicPageIntroProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
    </div>
  );
}