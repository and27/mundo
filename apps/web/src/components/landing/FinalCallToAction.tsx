import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function FinalCallToAction() {
  return (
    <section className="pt-40 pb-24 relative text-center max-w-3xl mx-auto px-4">
      <div className="relative py-14 px-6 flex flex-col items-center gap-5 rounded-[var(--radius-card)] mi-surface-2">
        {/* El guia se apoya en el borde de la tarjeta, con su sombra en el suelo. */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[140px]">
          <span aria-hidden className="mi-ground-shadow bottom-1 h-4 w-24" />
          <Image
            src="/guides/yachay_meditation.png"
            alt=""
            width={140}
            height={280}
            className="relative w-[140px] h-auto object-contain"
          />
        </div>

        <h2 className="text-xl md:text-3xl font-extrabold text-white">
          ¿Quieres empezar?
        </h2>

        <p className="text-sm md:text-lg text-white/70 max-w-xl">
          Entra a la plataforma y encuentra tu primera historia para conectar.
        </p>

        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href="/welcome">Entrar a la plataforma</Link>
          </Button>

          <Button asChild variant="ghost" size="lg">
            <Link href="#pilot">Para escuelas e instituciones</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
