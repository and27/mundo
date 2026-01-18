import Image from "next/image";
import Link from "next/link";

const FinalCallToAction = () => {
  return (
    <section className="pt-30 relative text-condor text-center max-w-3xl mx-auto shadow-lg">
      <div className="py-16 px-5 flex flex-col items-center gap-5 bg-white/50 rounded-2xl">
        <Image
          src="/guides/mago-transparent.png"
          alt="Guía o Símbolo de Mundo Interior"
          width={120}
          height={280}
          className="absolute -top-5 rounded-lg object-cover"
        />
        <h2 className="text-2xl md:text-3xl font-bold">
          Hay una luz creciendo en su interior. <br /> ¿Le acompañas?
        </h2>
        <p className="text-sm md:text-lg mb-3">
          Te ofrecemos una metodología probada y recursos prácticos para nutrir
          el bienestar emocional en la infancia.
        </p>
        <Link
          href="/enlace-a-registro-o-recursos-facilitador"
          className="border border-condor w-fit text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition"
        >
          Regístrate Gratis
        </Link>
      </div>
    </section>
  );
};

export default FinalCallToAction;
