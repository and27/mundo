import Image from "next/image";

export default function ModuleHero({
  title,
  image,
}: {
  title: string;
  image?: string;
}) {
  return (
    <div className="space-y-4 text-center">
      {image && (
        <div className="relative w-full h-52 md:h-72 rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover brightness-95"
          />
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
    </div>
  );
}
