import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrimaKarsi – Jouw klus. Geregeld.",
  description:
    "Beschrijf je bouwklus, laat je gegevens achter en PrimaKarsi regelt de rest. Vakkundig, snel en betrouwbaar.",
  openGraph: {
    title: "PrimaKarsi – Jouw klus. Geregeld.",
    description:
      "Jouw bouwklus aanvragen in één minuut. PrimaKarsi komt naar jou toe.",
    url: "https://primakarsi.nl",
    siteName: "PrimaKarsi",
    locale: "nl_NL",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
