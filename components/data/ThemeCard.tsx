import Link from "next/link";
import { Theme } from "@/lib/types";

export function ThemeCard({ theme }: { theme: Theme }) {
  return (
    <Link href={`/themes/${theme.slug}`} className="nm-card block p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900">{theme.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{theme.description}</p>
    </Link>
  );
}