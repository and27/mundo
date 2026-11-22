import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CuentoPlayer from "@/components/cuento/CuentoPlayer";
import { cuentos, getCuento } from "@/lib/cuento/stories";

export function generateStaticParams() {
  return Object.keys(cuentos).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = getCuento(slug);
  if (!story) return {};
  return {
    title: `${story.title} · Mundo Interior`,
    description: story.subtitle,
    robots: { index: false }, // demo: todavía no indexar
    openGraph: { title: story.title, description: story.subtitle, images: [story.cover] },
  };
}

export default async function CuentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getCuento(slug);
  if (!story) notFound();
  return <CuentoPlayer story={story} />;
}
