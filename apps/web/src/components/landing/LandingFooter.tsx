import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function LandingFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-white/5">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Link href="/" aria-label="Ir al inicio">
            <Image
              src="/images/logo-mundo.png"
              width={140}
              height={40}
              alt="Mundo Interior"
            />
          </Link>
          <p className="text-sm text-white/70 max-w-sm">
            Una experiencia guiada para acompanar emociones infantiles con
            historias, practica y reflexion.
          </p>
          <Button asChild size="sm">
            <Link href="/welcome">Acceder ahora</Link>
          </Button>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Producto
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="#enfoque" className="hover:text-white">
                Enfoque
              </Link>
            </li>
            <li>
              <Link href="/welcome" className="hover:text-white">
                Comenzar
              </Link>
            </li>
            <li>
              <Link href="/tutor" className="hover:text-white">
                Educadores
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Recursos
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/about" className="hover:text-white">
                Acerca de
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white">
                Crear cuenta
              </Link>
            </li>
            <li>
              <Link href="/library" className="hover:text-white">
                Biblioteca
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Legal
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Politica de privacidad
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terminos y condiciones
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-white/50">
          <span>© {new Date().getFullYear()} Mundo Interior</span>
          <span>Hecho para familias y educadores</span>
        </div>
      </div>
    </footer>
  );
}
