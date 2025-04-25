import type { Metadata } from "next";
import { Chakra_Petch, Quicksand } from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "./layout/ClientLayoutWrapper";

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
  description: "Meditaciones con guías sagrados para niños y niñas.",
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
      </body>
    </html>
  );
}
