import React from "react";

interface SubtitleDisplayProps {
  text?: string | null;
}

const SubtitleDisplay: React.FC<SubtitleDisplayProps> = ({ text }) => {
  if (!text) {
    return null;
  }

  return (
    <div className="pointer-events-none">
      <div className="max-w-3xl mx-auto flex justify-center">
        <p className="bg-black/60 backdrop-blur-sm text-white text-center  sm:text-large px-4 py-2  shadow-md inline-block max-w-full">
          {text}
        </p>
      </div>
    </div>
  );
};

export default SubtitleDisplay;
