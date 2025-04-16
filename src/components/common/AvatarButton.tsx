"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
  avatarUrl?: string; // Opcional, usa uno por defecto si no hay
};

const AvatarButton = ({ name, avatarUrl }: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition px-4 py-2 rounded-full text-sm text-white/80 font-medium"
    >
      <div className="w-8 h-8 relative rounded-full overflow-hidden border border-white/10">
        <Image
          src={avatarUrl || "/guides/amaru-transparent.png"}
          alt="Avatar"
          fill
          className="object-cover"
        />
      </div>
      <span>{name}</span>
    </button>
  );
};

export default AvatarButton;
