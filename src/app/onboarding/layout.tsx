"use client";
import QuoteBanner from "@/components/QuoteBanner";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <section className="min-h-screen x-4 py-8  mx-auto text-white">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-white/70 hover:text-white transition"
        >
          ← <span className="ml-1 text-sm">Volver</span>
        </button>
        <QuoteBanner text="Cuando respiras, el bosque te escucha." />
        {children}
      </div>
    </section>
  );
};

export default Layout;
