import type { Metadata } from "next";
import { Chakra_Petch, Quicksand } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
      <body className="font-sans antialiased">
        {/* <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md text-white flex justify-around py-3 z-50">
          <Link href="/" className="flex flex-col items-center text-sm">
            <span className="text-xs mt-1">Inicio</span>
          </Link>
          <Link href="/explore" className="flex flex-col items-center text-sm">
            <span className="text-xs mt-1">Explorar</span>
          </Link>
          <Link href="/listen" className="flex flex-col items-center text-sm">
            <span className="text-xs mt-1">Escuchar</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-sm">
            <span className="text-xs mt-1">Perfil</span>
          </Link>
        </nav> */}
        <div className="bg-black/30 backdrop-blur-xs">
          <Link href="/">
            <Image
              src="/images/logo-mundo.png"
              alt="Description"
              className="mx-auto pt-10"
              width={120}
              height={10}
            />
          </Link>

          {children}
        </div>
      </body>
    </html>
  );
}
