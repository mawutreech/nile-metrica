import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: {
    default: "Nile Metrika",
    template: "%s | Nile Metrika",
  },
  description: "South Sudan's public statistics and data portal.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
