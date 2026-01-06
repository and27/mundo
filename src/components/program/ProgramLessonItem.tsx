import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";

interface IProgramLessonUnit {
  module: {
    image: string;
    title: string;
    subtitle: string;
    duration: string;
  };
  onClick: () => void;
}

export default function ProgramLessonItem({
  module,
  onClick,
}: IProgramLessonUnit) {
  return (
    <button
      onClick={onClick}
      className="
        group
        w-full
        flex items-center gap-5
        rounded-2xl
        p-4 md:p-5
        text-left
        border
        bg-white
        border-neutral-200
        transition-colors duration-300
        hover:bg-primary-50
        hover:cursor-pointer
        hover:border-primary-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
      "
    >
      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
        <Image
          src={module.image}
          alt={module.title}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <h3 className="text-neutral-800 text-base font-semibold leading-snug">
          {module.title}
        </h3>

        <p className="text-neutral-700 text-sm">{module.subtitle}</p>

        <p className="text-neutral-600 text-xs">{module.duration}</p>
      </div>

      <FiChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
  );
}
