import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-4">
          <div>
            <h3 className="text-base font-semibold">Nile Metrika</h3>
            <p className="mt-3 text-sm text-slate-600">
              South Sudan&apos;s public portal for accessible, trusted, and structured statistical information.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Explore</h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <Link href="/data">Data</Link>
              <Link href="/publications">Publications</Link>
              <Link href="/methodology">Methodology</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Institution</h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <span>Terms of Use</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}