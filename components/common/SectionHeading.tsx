export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-slate-600">{description}</p> : null}
    </div>
  );
}