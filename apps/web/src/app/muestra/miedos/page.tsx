import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FearThermometer } from "@/components/muestra/FearThermometer";

// Pagina publica, sin cuenta ni datos: es lo que un psicologo manda a una
// familia por WhatsApp para que vea el programa antes de decidir nada.

const TITLE = "Ponerle nombre al miedo";
const DESCRIPTION =
  "Semana 1 de un programa en casa para niños con miedos: un cuento con Yachay, un termómetro del miedo y qué decir como adulto.";

export const metadata: Metadata = {
  title: `${TITLE} · Mundo Interior`,
  description: DESCRIPTION,
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
  // La portada original pesa 1,7 MB y WhatsApp no la muestra en la vista
  // previa; esta version de 1200x630 pesa ~50 KB.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og/muestra-miedos.jpg", width: 1200, height: 630 }],
    locale: "es",
    type: "website",
  },
};

const STORY_ID = "journey4_yachay_puma";

const SAY = [
  "Tiene sentido que te asustes.",
  "Estoy aquí contigo.",
  "Vamos paso a paso.",
];

const AVOID = [
  {
    phrase: "«No pasa nada, no seas miedoso».",
    why: "Le dice que lo que siente está mal, y lo aprende a esconder.",
  },
  {
    phrase: "Evitar todo lo que le da miedo.",
    why: "Alivia esta noche, pero le enseña que de verdad era peligroso.",
  },
  {
    phrase: "Castigar o premiar el miedo.",
    why: "El miedo no se elige. Lo que se acompaña es lo que hace con él.",
  },
];

const QUESTIONS = [
  "¿Dónde sientes el miedo en tu cuerpo?",
  "¿Qué ayudó a Yachay a seguir adelante?",
  "¿Qué te ayudaría a ti esta noche?",
];

export default function MuestraMiedosPage() {
  return (
    <main className="mi-canvas-base mi-canvas-marketing text-white">
      <div className="max-w-2xl mx-auto px-5 pt-10 pb-20">
        <Link
          href="/landing"
          aria-label="Mundo Interior"
          className="inline-block opacity-80 hover:opacity-100"
        >
          <Image
            src="/images/logo-mundo.png"
            width={120}
            height={120}
            alt="Mundo Interior"
          />
        </Link>

        {/* ---------- Encabezado: para el adulto ---------- */}
        <header className="mt-10">
          <p className="mi-text-caption text-[var(--color-action-400)]">
            Programa para miedos · Semana 1 de 4
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-balance">
            {TITLE}
          </h1>
          <p className="mt-5 text-lg text-white/75 leading-relaxed">
            Esta semana no se trata de que el miedo desaparezca. Se trata de que
            tu hijo o tu hija pueda decir qué siente y cuánto: el primer paso
            para que el miedo deje de mandar.
          </p>
          <p className="mt-3 text-white/60">
            Cinco minutos por noche. No hace falta hacerlo perfecto.
          </p>
        </header>

        {/* ---------- 1. El cuento ---------- */}
        <section className="mt-14">
          <h2 className="mi-text-kid-title">1. Esta noche, escuchen el cuento</h2>
          <p className="mt-2 text-white/70">
            Yachay es un puma joven que tiene que entrar a una cueva oscura. Él
            también tiene miedo, y eso es justo lo que tu hijo necesita ver.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-5 items-center rounded-[var(--radius-card)] mi-surface-2 p-5">
            <div className="relative w-40 h-40 shrink-0 rounded-[var(--radius-card)] overflow-hidden">
              <Image
                src="/images/journeyFear/yachay_puma_cover.png"
                alt="Yachay, el joven puma"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="mi-text-kid-name">
                Yachay, el Joven Puma y la Montaña
              </h3>
              <p className="mt-1 text-sm text-white/60">
                Un cuento narrado para escuchar juntos.
              </p>
              <Button asChild kid size="md" className="mt-4">
                <Link href={`/cuentos/${STORY_ID}`}>Escuchar el cuento</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ---------- 2. El termómetro ---------- */}
        <section className="mt-14">
          <h2 className="mi-text-kid-title">2. Después: el termómetro del miedo</h2>
          <p className="mt-2 text-white/70">
            Pregúntale: <em>«¿Cuánto miedo tenía Yachay en la cueva? ¿Y tú,
            cuando se apaga la luz?»</em> Que lo toque o lo señale. No hay
            respuesta correcta: lo importante es que lo diga.
          </p>
          <div className="mt-6">
            <FearThermometer />
          </div>
        </section>

        {/* ---------- 3. Para el adulto ---------- */}
        <section className="mt-14">
          <h2 className="mi-text-title">3. Para ti: qué decir y qué evitar</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] mi-surface-1 p-5">
              <h3 className="mi-text-label text-[var(--color-success-500)]">
                Frases que ayudan
              </h3>
              <ul className="mt-3 mi-stack-sm">
                {SAY.map((s) => (
                  <li key={s} className="text-white/85">
                    «{s}»
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-card)] mi-surface-1 p-5">
              <h3 className="mi-text-label text-[var(--color-warning-500)]">
                Mejor evitar
              </h3>
              <ul className="mt-3 mi-stack-sm">
                {AVOID.map((a) => (
                  <li key={a.phrase}>
                    <span className="text-white/85">{a.phrase}</span>
                    <span className="block text-sm text-white/55">{a.why}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-[var(--radius-card)] mi-surface-1 p-5">
            <h3 className="mi-text-label text-white/70">
              Tres preguntas para después del cuento
            </h3>
            <ol className="mt-3 mi-stack-sm list-decimal pl-5">
              {QUESTIONS.map((q) => (
                <li key={q} className="text-white/85">
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- 4. La semana ---------- */}
        <section className="mt-14">
          <h2 className="mi-text-title">4. Cada noche de esta semana</h2>
          <ol className="mt-5 mi-stack-md">
            <li className="flex gap-4">
              <span className="mi-voice-kid text-2xl font-extrabold text-[var(--color-action-400)] w-6 shrink-0">1</span>
              <span className="text-white/80">
                Escuchar el cuento, o recordarlo juntos si ya lo conocen.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="mi-voice-kid text-2xl font-extrabold text-[var(--color-action-400)] w-6 shrink-0">2</span>
              <span className="text-white/80">
                El termómetro: ¿cuánto miedo hay esta noche?
              </span>
            </li>
            <li className="flex gap-4">
              <span className="mi-voice-kid text-2xl font-extrabold text-[var(--color-action-400)] w-6 shrink-0">3</span>
              <span className="text-white/80">
                Una de las frases que ayudan, antes de apagar la luz.
              </span>
            </li>
          </ol>
          <p className="mt-5 text-white/60">
            Hacerlo casi todas las noches importa más que hacerlo bien. Si
            anotas el número de cada noche, llévalo a la próxima sesión.
          </p>
        </section>

        {/* ---------- 5. Senales de alarma ---------- */}
        <section className="mt-14 rounded-[var(--radius-card)] border border-[var(--color-warning-500)]/40 bg-[var(--color-warning-500)]/10 p-5">
          <h2 className="mi-text-subtitle">Cuándo pedir ayuda profesional</h2>
          <p className="mt-2 text-white/80">
            Este programa acompaña, pero no reemplaza a un profesional. Busca
            ayuda si el miedo le impide ir al colegio, comer o dormir muchas
            noches seguidas, si tiene ataques de pánico, si habla de hacerse
            daño, o si sientes que te está desbordando a ti.
          </p>
        </section>

        {/* ---------- Para profesionales ---------- */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/80">
            ¿Eres psicóloga o psicólogo infantil? Este es el primer paso de un
            programa de cuatro semanas para que las familias trabajen en casa
            entre sesión y sesión.
          </p>
          <Button asChild variant="ghost" size="lg" className="mt-5">
            <Link href="/register?tab=register">Quiero usarlo con mis pacientes</Link>
          </Button>
          <p className="mt-8 text-xs text-white/40">
            Contenido en revisión clínica. No sustituye la atención de un
            profesional de la salud mental.
          </p>
        </footer>
      </div>
    </main>
  );
}
