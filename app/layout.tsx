import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import "./globals.css";

const deploymentBase = "https://fusiondigital16-ao.github.io/tinguita-site/";

// Metadados utilizados por motores de pesquisa e partilhas sociais.
export const metadata: Metadata = {
  metadataBase: new URL(deploymentBase),
  title: "Tinguita Paradise | Restaurante, piscina e lazer no Namibe",
  description: siteConfig.description,
  alternates: { canonical: deploymentBase },
  keywords: ["Tinguita Paradise", "restaurante no Namibe", "Praia Amélia", "piscina em Moçâmedes", "bar no Namibe", "lazer em família"],
  openGraph: {
    title: "Tinguita Paradise | O paraíso espera por si",
    description: siteConfig.description,
    type: "website",
    locale: "pt_AO",
    siteName: "Tinguita Paradise",
    url: deploymentBase,
    images: [{
      url: "images/tinguita-01.jpg",
      width: 1256,
      height: 940,
      alt: "Pôr do sol sobre a piscina e o oceano no Tinguita Paradise",
    }],
  },
  robots: { index: true, follow: true },
  icons: { icon: "images/tinguita-logo.jpg", shortcut: "images/tinguita-logo.jpg" },
};

// Dados estruturados baseados apenas nas informações confirmadas do espaço.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.name,
  description: siteConfig.description,
  url: deploymentBase,
  logo: `${deploymentBase}images/tinguita-logo.jpg`,
  telephone: siteConfig.contact.phoneLabel,
  email: siteConfig.contact.emailLabel,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bairro Praia Amélia, junto à Projeque",
    addressLocality: "Moçâmedes",
    addressRegion: "Namibe",
    addressCountry: "AO",
  },
  image: siteConfig.gallery.map((item) => `${deploymentBase}${item.src.replace(/^\//, "")}`),
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.location.latitude,
    longitude: siteConfig.location.longitude,
  },
  hasMap: siteConfig.location.mapsUrl,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
