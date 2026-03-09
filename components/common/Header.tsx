import Link from "next/link";
import { Container } from "./Container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/data", label: "Data" },
  { href: "/publications", label: "Publications" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
            Nile Metrika
          </Link>
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-600 hover:text-slate-900">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}