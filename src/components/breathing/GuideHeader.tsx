"use client";

import Image from "next/image";

type Props = {
  image: string;
  name?: string;
  subtitle?: string;
};

const GuideHeader = ({ name, image, subtitle }: Props) => {
  return (
    <div className="z-10 flex flex-col items-center">
      <div className="bg-white/10 border-1 border-white/20 rounded-full  animate-fade-in transition-all">
        <Image
          src={image}
          alt={name || ""}
          width={140}
          height={140}
          className="rounded-full"
        />
      </div>
      {/* <h1 className="text-xl font-bold text-white">{name}</h1> */}
      {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
    </div>
  );
};

export default GuideHeader;
