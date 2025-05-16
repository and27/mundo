"use client";
import Link from "next/link";
import Image from "next/image";
import { useOnboardingStore } from "@/store/useOnboardingStore";

const Login = () => {
  const { name } = useOnboardingStore();
  return (
    <div className="-mt-10 text-white min-h-screen flex flex-col items-center justify-center bg-fondo-calmo p-5">
      <Image
        src="/images/logo-mundo.png"
        alt="Mundo Interior Logo"
        width={150}
        height={150}
        className="mb-8"
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Accede a Mundo Interior
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-2xl w-full">
        <div className="flex-1 bg-white/50 rounded-lg p-8 flex flex-col items-center text-center shadow-lg">
          {/* <Image src="/icons/adult-icon.png" alt="Icono Adulto" width={60} height={60} className="mb-4" /> */}
          <h2 className="text-condor text-xl font-semibold mb-4">
            Acceso para Guías (Educadores y Padres)
          </h2>
          <p className="text-condor/80 mb-6">
            Herramientas, recursos y la metodología para acompañar el bienestar
            emocional de niños y niñas.
          </p>
          <Link
            href="/register"
            className="bg-transparent hover:bg-sunset border border-condor text-condor font-bold py-3 px-8 rounded-full  transition"
          >
            Acceder como Facilitador
          </Link>
        </div>

        <div className="flex-1 bg-white/50 rounded-lg p-8 flex flex-col justify-between items-center text-center shadow-lg">
          {/* <Image src="/icons/child-icon.png" alt="Icono Niño" width={60} height={60} className="mb-4" /> */}
          <h2 className="text-condor text-xl font-semibold mb-4">
            Entra a tu Universo Interior (Para niños y adolescentes)
          </h2>
          <p className="text-condor/80 mb-6">
            Un espacio seguro para explorar tus emociones y descubrir tu
            fortaleza.
          </p>
          <Link
            href={name ? "/onboarding/emotion" : "/onboarding/name"}
            className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition"
          >
            Iniciar Mi Viaje
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="">
          ¿Eres nuevo?
          <Link
            href="/registro/facilitador"
            className="font-semibold hover:underline"
          >
            Regístrate como Facilitador aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
