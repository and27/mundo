import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FearThermometer } from "@/components/muestra/FearThermometer";
import { WeekTracker } from "@/components/muestra/WeekTracker";

// Pagina publica, sin cuenta ni datos: es lo que un psicologo manda a una
// familia por WhatsApp para que vea el programa antes de decidir nada.

const TITLE = "Ponerle nombre al miedo";
const DESCRIPTION =
  "Semana 1 de un programa en casa para niños con miedos: un cuento con Yachay, tres preguntas y una sola frase para el adulto.";

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

// Formato de cada semana: cuento (7 min) -> preguntas (2 min) -> una sola
// accion para el adulto. El cuento es el gancho; lo que cambia algo es lo que
// el adulto hace despues (Rasmussen 2016; SPACE, Lebowitz).

const STEPS = [
  { n: 1, title: "El cuento", time: "7 min" },
  { n: 2, title: "Tres preguntas", time: "2 min" },
  { n: 3, title: "Tu frase", time: "toda la semana" },
];

const QUESTIONS = [
  {
    q: "¿Cuánto miedo tenía Yachay en la cueva?",
    hint: "Que lo señale en el termómetro.",
  },
  {
    q: "¿Y tú, cuándo sientes un miedo así?",
    hint: "Solo escucha. No corrijas ni lo convenzas de que no pasa nada.",
  },
  {
    q: "¿Qué ayudó a Yachay a seguir?",
    hint: "Si no se le ocurre nada, está bien. Recuérdalo tú.",
  },
];

// Frase de apoyo: aceptar el miedo + confiar en el nino (SPACE).
const PHRASE = "Sé que da miedo. Confío en que puedes con esto.";

const STOP = ["«No pasa nada».", "«No seas miedoso»."];

const StepBadge = ({ n }: { n: number }) => (
  <span className="mi-voice-kid shrink-0 w-10 h-10 rounded-full bg-[var(--color-action-500)] text-[#2a1a05] text-xl font-extrabold flex items-center justify-center">
    {n}
  </span>
);

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
            El cuento abre la conversación, pero lo que ayuda de verdad es lo
            que tú haces después. Esta semana es una sola cosa.
          </p>

          <ol className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-[var(--radius-card)] mi-surface-1 p-3 sm:p-4">
                <span className="mi-voice-kid text-2xl font-extrabold text-[var(--color-action-400)]">
                  {s.n}
                </span>
                <p className="mt-1 font-semibold leading-tight">{s.title}</p>
                <p className="text-sm text-white/55">{s.time}</p>
              </li>
            ))}
          </ol>
        </header>

        {/* ---------- 1. El cuento ---------- */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <StepBadge n={1} />
            <h2 className="mi-text-kid-title">Escuchen el cuento juntos</h2>
          </div>
          <p className="mt-3 text-white/70">
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
                Narrado · 7 minutos. Escúchalo con él, no lo dejes solo.
              </p>
              <Button asChild kid size="md" className="mt-4">
                <Link href={`/cuentos/${STORY_ID}`}>Escuchar el cuento</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ---------- 2. Las preguntas ---------- */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <StepBadge n={2} />
            <h2 className="mi-text-kid-title">Al terminar, tres preguntas</h2>
          </div>
          <p className="mt-3 text-white/70">
            Es la parte que más importa del cuento: los niños aprenden de lo que
            conversan después, no solo de lo que escuchan.
          </p>

          <ol className="mt-6 mi-stack-sm">
            {QUESTIONS.map((item, i) => (
              <li key={item.q} className="rounded-[var(--radius-card)] mi-surface-1 p-4 flex gap-3">
                <span className="mi-voice-kid text-lg font-extrabold text-[var(--color-action-400)] w-5 shrink-0">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-white/90">«{item.q}»</span>
                  <span className="block mt-0.5 text-sm text-white/55">{item.hint}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <FearThermometer />
          </div>
          <p className="mt-3 text-sm text-white/55">
            De 5 a 7 años: que lo toque o lo señale. De 8 a 10: que diga el
            número y en qué momento del día lo siente.
          </p>
        </section>

        {/* ---------- 3. La accion del adulto ---------- */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <StepBadge n={3} />
            <h2 className="mi-text-title">Tu parte esta semana: una frase</h2>
          </div>
          <p className="mt-3 text-white/70">
            Cada vez que tenga miedo, a cualquier hora, dile:
          </p>

          <blockquote className="mt-5 rounded-[var(--radius-card)] mi-surface-2 p-6 border-l-4 border-[var(--color-action-500)]">
            <p className="mi-voice-kid text-2xl sm:text-3xl font-extrabold leading-snug text-balance">
              «{PHRASE}»
            </p>
          </blockquote>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] mi-surface-1 p-5">
              <h3 className="mi-text-label text-[var(--color-warning-500)]">
                Deja de decir
              </h3>
              <ul className="mt-3 mi-stack-sm">
                {STOP.map((s) => (
                  <li key={s} className="text-white/85">{s}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-white/55">
                Con buena intención, le enseñan que lo que siente está mal, y
                aprende a esconderlo.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] mi-surface-1 p-5">
              <h3 className="mi-text-label text-white/70">Por qué funciona</h3>
              <p className="mt-3 text-white/80">
                La primera mitad le dice que su miedo es real. La segunda, que
                tú lo ves capaz. Tu calma y tu confianza le enseñan más que
                cualquier explicación.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-white/60">
            Nada más por ahora. Si duerme contigo o evita algo, no lo cambies
            todavía: eso se trabaja en la semana 3, paso a paso.
          </p>

          <div className="mt-8 rounded-[var(--radius-card)] mi-surface-1 p-5">
            <h3 className="mi-text-label text-white/70">¿Usaste la frase hoy?</h3>
            <div className="mt-4">
              <WeekTracker />
            </div>
            <p className="mt-4 text-sm text-white/55">
              Muéstrale esta pantalla a tu psicóloga o psicólogo en la próxima
              sesión. Hacerlo casi todas las noches importa más que hacerlo
              perfecto.
            </p>
          </div>
        </section>

        {/* ---------- Senales de alarma ---------- */}
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
