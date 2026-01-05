import type { Metadata } from "next";
import { Chakra_Petch, Quicksand } from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "./layout/ClientLayoutWrapper";
import Script from "next/script";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
    <html lang="es" className={`${chakra.variable} ${quicksand.variable}`}>
      <body className="font-sans antialiased bg-emotion-default">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
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
