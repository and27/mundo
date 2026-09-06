import Image from "next/image";

type KidsFeaturedCardProps = {
  title: string;
  subtitle: string; // ej: "Paso 2 de 4"
  imageUrl: string;
  onContinue: () => void;
};

export function KidsFeaturedCard({
  title,
  subtitle,
  imageUrl,
  onContinue,
}: KidsFeaturedCardProps) {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-8">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        {/* El personaje se apoya en el suelo de la escena, sin caja alrededor. */}
        <div className="relative shrink-0">
          <span
            aria-hidden
            className="mi-ground-shadow bottom-1 h-4 w-24"
          />
          <Image
            src={imageUrl}
            alt=""
            width={132}
            height={132}
            className="relative w-[132px] h-[132px] object-contain"
          />
        </div>

        <div className="flex-1 mi-stack-sm items-center sm:items-start">
          <div>
            <h2 className="mi-text-kid-name text-white mi-legible">{title}</h2>
            <p className="mi-text-body text-white/75 mi-legible">{subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="mi-cta-primary mi-voice-kid inline-flex items-center gap-2 px-7 py-4 min-h-[56px] text-lg rounded-[var(--radius-kid)] font-bold"
          >
            Seguir mi cuento
          </button>
        </div>
      </div>
    </section>
  );
}
