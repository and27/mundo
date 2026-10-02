import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FearThermometer } from "@/components/muestra/FearThermometer";
import { WeekTracker } from "@/components/muestra/WeekTracker";

// Pagina publica, sin cuenta ni datos: es lo que un psicologo manda a una
// familia por WhatsApp para que vea el programa antes de decidir nada.

const TITLE = "Ayuda a tu hija o hijo con sus miedos de la noche";
const DESCRIPTION =
  "Programa de 4 semanas en casa para los miedos de la noche, de 5 a 10 años. Empieza gratis con la semana 1: un cuento con Yachay, tres preguntas, un juego y una frase para el adulto.";

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

// Formato de cada semana: cuento (~4 min) -> preguntas (2 min) -> juego
// (5 min) -> una sola accion para el adulto. El cuento es el gancho; lo que
// cambia algo es el juego de exposicion y lo que el adulto hace despues
// (Santacruz y Mendez 2006; Uncle Lightfoot; SPACE, Lebowitz).

const PRINTABLE = "/recursos/semana-1-miedos-de-la-noche.pdf";

const STEPS = [
  { n: 1, title: "El cuento", time: "4 min" },
  { n: 2, title: "Tres preguntas", time: "2 min" },
  { n: 3, title: "Un juego", time: "5 min, de tarde" },
  { n: 4, title: "Tu frase", time: "toda la semana" },
];

const QUESTIONS = [
  {
    q: "¿Cuántos dedos de miedo crees que tenía Yachay?",
    hint: "Que lo muestre con la mano o en el termómetro. La mano cerrada es nada de miedo.",
  },
  {
    q: "¿A ti te pasa eso a veces? ¿Qué te da miedo en la noche?",
    hint: "Solo escucha. No corrijas ni intentes convencer de que no pasa nada.",
  },
  {
    q: "¿Qué hizo Yachay cuando tenía miedo?",
    hint: "Si no se le ocurre nada, está bien. Recuérdalo tú.",
  },
];

// Frase de apoyo: aceptar el miedo + confiar en el nino (SPACE).
const PHRASE = "Sé que da miedo. Confío en que puedes con esto.";

const StepBadge = ({ n }: { n: number }) => (
  <span className="mi-voice-kid shrink-0 w-10 h-10 rounded-full bg-[var(--color-action-500)] text-[#2a1a05] text-xl font-extrabold flex items-center justify-center">
    {n}
  </span>
);

export default function MiedosPage() {
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

        {/* ---------- Encabezado: el programa ---------- */}
        <header className="mt-8">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-[var(--radius-card)] overflow-hidden">
            <Image
              src="/images/kidWithYachayBed.png"
              alt="Un niño en la cama lee un cuento con Yachay, el puma"
              fill
              priority
              sizes="(min-width: 672px) 672px, 100vw"
              className="object-cover object-[center_35%]"
            />
          </div>
          <p className="mt-8 mi-text-caption text-[var(--color-action-400)]">
            Miedos de la noche · 5 a 10 años
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-balance">
            {TITLE}.
          </h1>
          <p className="mt-5 text-lg text-white/75 leading-relaxed">
            Cuatro semanas en casa: cada noche un cuento con Yachay, tres
            preguntas, un juego corto y una sola cosa nueva para quien lo
            acompaña a dormir: mamá, papá, abuela, abuelo… Inspirado en
            programas de cuentos y juegos guiados por padres que se probaron
            con niños pequeños.
          </p>
        </header>

        {/* ---------- Semana 1 ---------- */}
        <section className="mt-14">
          <p className="mi-text-caption text-[var(--color-action-400)]">
            Semana 1 de 4 · Gratis
          </p>
          <h2 className="mt-2 mi-text-title">Ponerle nombre al miedo</h2>
          <p className="mt-3 text-white/75 leading-relaxed">
            El cuento abre la conversación, pero lo que ayuda de verdad es lo
            que hacen después: jugar y una sola frase tuya. Con 4 noches de 7
            alcanza.
          </p>

          <div className="mt-6 rounded-[var(--radius-card)] border border-white/15 p-4">
            <p className="text-sm text-white/80">
              <strong className="text-white">Antes de empezar.</strong> Esto es
              para los miedos comunes de la noche. Si en casa hay gritos, golpes
              o alguien que le da miedo, o si el miedo empezó después de algo
              que pasó, no empieces todavía: habla primero con tu psicóloga o
              psicólogo. En una emergencia, llama al ECU 911.
            </p>
          </div>

          <ol className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
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
        </section>

        {/* ---------- 1. El cuento ---------- */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <StepBadge n={1} />
            <h2 className="mi-text-kid-title">Escuchen el cuento juntos</h2>
          </div>
          <p className="mt-3 text-white/70">
            Yachay es un puma joven que de noche tiene miedo. Que el personaje
            también lo sienta es justo lo que tu hija o hijo necesita ver.
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
                Narrado · 4 minutos. Escúchenlo juntos, a su lado.
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
            Con 5 años basta con tres: poquito, medio, mucho. De 8 a 10, que
            diga el número y en qué momento lo siente.
          </p>
        </section>

        {/* ---------- 3. El juego ---------- */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <StepBadge n={3} />
            <h2 className="mi-text-kid-title">Un juego: sombras con linterna</h2>
          </div>
          <p className="mt-3 text-white/75 leading-relaxed">
            Por la tarde o el fin de semana, con la luz tenue, tu hija o hijo
            maneja la linterna y hacen sombras en la pared: con las manos, con
            peluches o con figuras de papel. Que decida cuándo prender y apagar.
          </p>
          <p className="mt-3 text-sm text-white/55">
            Es acercarse a la oscuridad jugando. Nunca justo antes de dormir, y
            al terminar guarden la linterna. En programas parecidos, practicar
            más con juegos se asoció con mejores resultados.
          </p>
        </section>

        {/* ---------- 3. La accion del adulto ---------- */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <StepBadge n={4} />
            <h2 className="mi-text-title">Tu parte esta semana: una frase</h2>
          </div>
          <p className="mt-3 text-white/70">
            Cuando tenga miedo, díselo una vez, con calma, y quédate cerca:
          </p>

          <blockquote className="mt-5 rounded-[var(--radius-card)] mi-surface-2 p-6 border-l-4 border-[var(--color-action-500)]">
            <p className="mi-voice-kid text-2xl sm:text-3xl font-extrabold leading-snug text-balance">
              «{PHRASE}»
            </p>
          </blockquote>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] mi-surface-1 p-5">
              <h3 className="mi-text-label text-[var(--color-warning-500)]">
                En vez de «No pasa nada»
              </h3>
              <p className="mt-3 text-white/85">
                Casi todos decimos «No pasa nada» o «No es para tanto», y lo
                decimos para calmar.
              </p>
              <p className="mt-3 text-sm text-white/55">
                Esta semana prueba la frase de arriba. Si se te escapa la de
                siempre, no importa: la próxima vez usas la nueva.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] mi-surface-1 p-5">
              <h3 className="mi-text-label text-white/70">Por qué la proponemos</h3>
              <p className="mt-3 text-white/80">
                La primera mitad le dice que su miedo es real. La segunda, que
                confías en su capacidad. Tu calma y tu confianza le enseñan más que
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

          <div className="mt-4 rounded-[var(--radius-card)] mi-surface-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <p className="text-white/80">
              <strong className="text-white">¿Prefieres papel?</strong> La hoja
              de la semana, en blanco y negro, con el registro para llevar a
              sesión.
            </p>
            <Button asChild variant="ghost" size="md" className="shrink-0">
              <a href={PRINTABLE} download>
                Descargar la hoja
              </a>
            </Button>
          </div>
        </section>

        {/* ---------- Senales de alarma ---------- */}
        <section className="mt-14 rounded-[var(--radius-card)] border border-[var(--color-warning-500)]/40 bg-[var(--color-warning-500)]/10 p-5">
          <h2 className="mi-text-subtitle">Habla con tu psicóloga o psicólogo antes de seguir si…</h2>
          <ul className="mt-3 mi-stack-sm list-disc pl-5 text-white/80">
            <li>el miedo apareció de golpe después de algo que pasó, o hay pesadillas que repiten algo vivido;</li>
            <li>en casa hay gritos, golpes o alguien que le da miedo;</li>
            <li>es miedo o rechazo a una persona concreta, o a un lugar donde pasó algo;</li>
            <li>hubo un cambio grande hace poco: una muerte, una separación, una mudanza;</li>
            <li>vuelve atrás en cosas que ya hacía (mojar la cama, hablar como bebé), o el miedo invade también el día;</li>
            <li>tiene pesadillas casi todas las noches, grita o camina dormido sin recordarlo, o ronca fuerte con pausas al respirar;</li>
            <li>se angustia mucho con el cuento o el juego: en ese caso, paren y consulten;</li>
            <li>no puede ir al colegio, comer o dormir muchas noches, tiene ataques de pánico o habla de hacerse daño;</li>
            <li>o sientes que te está desbordando a ti.</li>
          </ul>
          <p className="mt-3 text-sm text-white/60">
            Este programa acompaña, pero no reemplaza a un profesional.
          </p>
        </section>

        {/* ---------- Para profesionales ---------- */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/80">
            <strong className="text-white">Si eres psicóloga o psicólogo:</strong>{" "}
            este es el primer paso de un programa de cuatro semanas para que
            las familias trabajen los miedos de la noche en casa, entre sesión y
            sesión.
          </p>
          <Button asChild variant="ghost" size="lg" className="mt-5">
            <Link href="/recursos">Ver herramientas para profesionales</Link>
          </Button>
          <p className="mt-8 text-xs text-white/40">
            Material educativo en desarrollo. No sustituye la atención de un
            profesional de la salud mental.
          </p>
        </footer>
      </div>
    </main>
  );
}
