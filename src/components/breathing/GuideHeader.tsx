"use client";

import Image from "next/image";

type Props = {
  image: string;
  name?: string;
  subtitle?: string;
};

const GuideHeader = ({ name, image, subtitle }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="">
        <Image src={image} alt={name || ""} width={140} height={140} />
      </div>
      {/* <h1 className="text-xl font-bold text-white">{name}</h1> */}
      {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
    </div>
  );
};

export default GuideHeader;
