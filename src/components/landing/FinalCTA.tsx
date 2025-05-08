import Image from "next/image";
import Link from "next/link";

const FinalCallToAction = () => {
  return (
    <section className="pt-30 relative text-condor text-center max-w-3xl mx-auto shadow-lg">
      <div className="  py-10 px-5 flex flex-col items-center gap-3 bg-white/50 rounded-2xl">
        <Image
          src="/guides/mago-transparent.png"
          alt="Guías en el bosque"
          width={120}
          height={280}
          className="absolute -top-5 rounded-lg object-cover"
        />
        <h2 className="text-2xl md:text-3xl font-bold">
          ¿Listo para empezar tu viaje?
        </h2>
        <p className="text-sm md:text-base mb-3">
          No es solo meditación. Es un reencuentro con tu alma.
        </p>
        <Link
          href="/onboarding/name"
          className="w-fit bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition"
        >
          Iniciar ahora
        </Link>
      </div>
    </section>
  );
};

export default FinalCallToAction;
