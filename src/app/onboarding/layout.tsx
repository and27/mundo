"use client";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <section className="min-h-screen x-4 py-8  mx-auto text-white">
      <div className="p-3 max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="py-5 flex items-center text-white/70 hover:text-white transition"
        >
          ← <span className="ml-1 text-sm">Volver</span>
        </button>
        {children}
      </div>
    </section>
  );
};

export default Layout;
