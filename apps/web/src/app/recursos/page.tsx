import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/profesionales/LeadForm";
import { LEAD_RESOURCES } from "@/lib/leads";

const TITLE = "La tarea para casa que las familias sí hacen";
// Al compartir en grupos, la oferta gratuita invita mas que el titular.
const SHARE_TITLE = "Dos herramientas gratis para trabajar el miedo en casa";
const DESCRIPTION =
  "Material gratuito para psicólogas y psicólogos infantiles: termómetro del miedo y escalera de valentía, listos para imprimir.";

export const metadata: Metadata = {
  title: `${TITLE} · Mundo Interior`,
  description: DESCRIPTION,
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og/muestra-miedos.jpg", width: 1200, height: 630 }],
    locale: "es",
    type: "website",
  },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RecursosPage({ searchParams }: PageProps) {
  // ?ref=grupo-fb, ?ref=ig-anuncio... dice que canal trajo a cada contacto.
  const params = await searchParams;
  const rawRef = params.ref ?? params.utm_source;
  const source = typeof rawRef === "string" ? rawRef.slice(0, 60) : null;

  return (
    <main className="mi-canvas-base mi-canvas-marketing text-white">
      <div className="max-w-3xl mx-auto px-5 pt-10 pb-20">
        <Link href="/landing" aria-label="Mundo Interior" className="inline-block opacity-80 hover:opacity-100">
          <Image src="/images/logo-mundo.png" width={120} height={120} alt="Mundo Interior" />
        </Link>

        <header className="mt-10 max-w-2xl">
          <p className="mi-text-caption text-[var(--color-action-400)]">
            Para psicólogas y psicólogos infantiles
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-balance">
            {TITLE}.
          </h1>
          <p className="mt-5 text-lg text-white/75 leading-relaxed">
            Un programa de 4 semanas para miedos en niñas y niños de 5 a 10
            años. Tú lo asignas, la familia lo hace con cuentos, y en la sesión
            ves si lo hicieron.
          </p>
          <p className="mt-3 text-white/60">
            Empieza con dos herramientas gratis, listas para imprimir.
          </p>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          {LEAD_RESOURCES.map((r) => (
            <article key={r.href} className="rounded-[var(--radius-card)] mi-surface-1 p-4">
              <div className="relative aspect-[210/297] rounded-lg overflow-hidden bg-white">
                <Image
                  src={r.preview}
                  alt={`Vista previa: ${r.title}`}
                  fill
                  sizes="(min-width: 640px) 360px, 90vw"
                  className="object-cover object-top"
                />
              </div>
              <h2 className="mt-4 mi-text-subtitle">{r.title}</h2>
              <p className="mt-1 text-sm text-white/65">{r.blurb}</p>
            </article>
          ))}
        </section>

        <section className="mt-10">
          <LeadForm source={source} />
        </section>

        <section className="mt-14 max-w-2xl">
          <h2 className="mi-text-title">¿Qué es Mundo Interior?</h2>
          <p className="mt-3 text-white/75 leading-relaxed">
            Un programa de cuatro semanas para que las familias trabajen los
            miedos en casa: cada noche un cuento narrado, tres preguntas y una
            sola acción para el adulto, con un registro que la familia trae a
            sesión. Está pensado para acompañar tu trabajo, no para sustituirlo.
          </p>
          <p className="mt-3 text-white/75 leading-relaxed">
            Se basa en la terapia cognitivo-conductual guiada por padres
            (Creswell; Cartwright-Hatton) y en SPACE (Lebowitz, Yale). Aún no
            tiene revisión clínica externa: por eso nos sirve tu opinión.
          </p>
          <p className="mt-4">
            <Link href="/miedos" className="underline underline-offset-4 text-white">
              Ver la semana 1 como la recibe una familia
            </Link>
          </p>
        </section>

        <footer className="mt-16 pt-6 border-t border-white/10 text-xs text-white/45">
          Tus datos solo se usan para escribirte sobre estos materiales y el
          programa. Nunca los compartimos. Puedes pedir que los borremos cuando
          quieras.
        </footer>
      </div>
    </main>
  );
}
