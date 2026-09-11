import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

const inter = localFont({
  src: "../../public/fonts/inter.woff2",
  variable: "--font-body",
  display: "swap",
});
const display = localFont({
  src: "../../public/fonts/bebas-neue.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400",
});
export const metadata: Metadata = {
  title: "Casa 77 | Barbearia por assinatura em Barreiras",
  description: site.description,
  ...(site.url
    ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } }
    : {}),
  openGraph: {
    title: "Casa 77. Seu estilo, sua identidade.",
    description: site.description,
    locale: "pt_BR",
    type: "website",
    ...(site.url
      ? { url: site.url, images: ["/images/hero-poster.webp"] }
      : {}),
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${display.variable}`}>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
