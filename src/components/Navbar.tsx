// components/Navbar.tsx
import { Home, BookOpen, Headphones, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", icon: <Home />, label: "Inicio" },
  { href: "/explore", icon: <BookOpen />, label: "Explorar" },
  { href: "/listen", icon: <Headphones />, label: "Escuchar" },
  { href: "/profile", icon: <User />, label: "Perfil" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black/30 backdrop-blur-md text-white flex justify-around py-3 z-50">
      {links.map(({ href, icon, label }) => (
        <Link key={href} href={href} className="flex flex-col items-center text-sm">
          <div className={pathname === href ? "text-yellow-400" : "text-white"}>{icon}</div>
          <span className="text-xs mt-1">{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
