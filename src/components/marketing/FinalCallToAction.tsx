import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function FinalCallToAction() {
  return (
    <section className="pt-30 pb-24 relative text-center max-w-3xl mx-auto px-4">
      <div className="relative py-14 px-6 flex flex-col items-center gap-5 rounded-2xl mi-surface-dark">
        <Image
          src="/guides/yachay_meditation.png"
          alt="Guía de Mundo Interior"
          width={140}
          height={280}
          className="absolute -top-42 rounded-lg object-cover"
        />

        <h2 className="text-xl md:text-3xl font-bold text-white">
          ¿Quieres empezar?
        </h2>

        <p className="text-sm md:text-lg text-white/70 max-w-xl">
          Entra a la plataforma y encuentra tu primera historia para conectar.
        </p>

        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/welcome">Entrar a la plataforma</Link>
          </Button>

          <Link
            href="#pilot"
            className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white/70 hover:text-white underline underline-offset-4"
          >
            Para escuelas e instituciones
          </Link>
        </div>
      </div>
    </section>
  );
}
