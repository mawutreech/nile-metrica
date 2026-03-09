import { Container } from "./Container";

export function PageHero({ title, description }: { title: string; description: string }) {
  return (
    <section className="border-b border-slate-200 bg-white py-16">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-4 text-lg text-slate-600">{description}</p>
        </div>
      </Container>
    </section>
  );
}