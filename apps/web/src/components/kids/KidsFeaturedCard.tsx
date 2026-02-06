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
    <section className="max-w-4xl mx-auto px-6 pt-6">
      <div className="mi-surface-soft rounded-2xl p-4 md:p-5">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-44 h-28 rounded-xl overflow-hidden">
            <Image src={imageUrl} alt="" fill className="object-cover" />
          </div>

          <div className="flex-1 mi-stack-sm">
            <div>
              <h2 className="mi-text-subtitle text-white">
                {title}
              </h2>
              <p className="mi-text-body-sm text-white/70">{subtitle}</p>
            </div>

            <button
              onClick={onContinue}
              className="mi-cta-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold w-fit"
            >
              ▶ Continuar historia
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
