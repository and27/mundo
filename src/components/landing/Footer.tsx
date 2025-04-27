import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-20 py-8 text-center text-white/50 text-sm">
      <p>
        🌿 Hecho con amor desde los Andes •{" "}
        <Link href="/contacto" className="underline hover:text-white">
          Contáctanos
        </Link>{" "}
        •{" "}
        <Link href="/about" className="underline hover:text-white">
          Acerca de Mundo Interior{" "}
        </Link>
        •{" "}
        <Link href="/terms" className="underline hover:text-white">
          Términos y condiciones
        </Link>
      </p>
      <p className="mt-2">© {new Date().getFullYear()} Mundo Interior</p>
    </footer>
  );
};

export default Footer;
