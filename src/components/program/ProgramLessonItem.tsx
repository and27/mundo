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
        w-full
        flex items-center gap-4
        bg-white
        border border-neutral-200
        rounded-2xl
        p-4 md:p-5
        text-left
        transition-all duration-200
        hover:shadow-md hover:-translate-y-[1px]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
      "
    >
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
        <Image
          src={module.image}
          alt={module.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 mi-stack-sm">
        <h3 className="text-neutral-800 text-base font-semibold leading-snug">
          {module.title}
        </h3>

        <p className="text-neutral-600 text-sm">{module.subtitle}</p>

        <p className="text-neutral-400 text-xs">{module.duration}</p>
      </div>

      <FiChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
    </button>
  );
}
