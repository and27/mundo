import type { Metadata } from "next";
import { Baloo_2, Figtree } from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "./layout/ClientLayoutWrapper";
import Script from "next/script";
import { Toaster } from "sonner";

// Dos voces: Figtree para el adulto (interfaz, datos, lectura larga) y
// Baloo 2 para el nino (redonda y gruesa, aguanta a tamano grande).
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "El Bosque Interior",
  description: "Meditaciones con guias sagrados para ninos y ninas.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${figtree.variable} ${baloo.variable}`}>
      <body className="font-sans antialiased">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <Toaster richColors position="top-right" />
        <Script id="register-sw" strategy="afterInteractive">
          {`if ("serviceWorker" in navigator) { window.addEventListener("load", () => { navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {}); }); }`}
        </Script>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="d2ec5e44-b861-4240-bc4d-1fac30b30535"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
