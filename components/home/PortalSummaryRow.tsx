import { Container } from "@/components/common/Container";
import { getPortalSummaryStats } from "@/lib/queries";

export async function PortalSummaryRow() {
  const stats = await getPortalSummaryStats();

  return (
    <section className="bg-white py-8">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}