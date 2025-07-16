import React, { useRef, useEffect } from "react";

interface TextareaWithCounterProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  disabled?: boolean;
  maxChars?: number;
  minHeight?: string;
  maxHeight?: string;
}

export const TextareaWithCounter: React.FC<TextareaWithCounterProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  placeholder = "Describe tu situación aquí...",
  disabled = false,
  maxChars = 500,
  minHeight = "120px",
  maxHeight = "200px",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const wordCount = value.split(" ").filter((word) => word.length > 0).length;

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="text-sm md:text-base w-full bg-white/80 border border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded-lg p-3 text-slate-800 placeholder:text-slate-500 transition-all duration-200 resize-none"
          disabled={disabled}
          maxLength={maxChars}
          style={{
            minHeight: minHeight,
            maxHeight: maxHeight,
          }}
        />
      </div>

      {/* Counter and stats */}
      <div className="flex items-center justify-end gap-3">
        {value.length > 0 && (
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {wordCount} palabras
          </span>
        )}
        <div
          className={`text-xs font-medium transition-colors ${
            value.length > maxChars * 0.9 ? "text-amber-600" : "text-slate-500"
          } ${value.length >= maxChars ? "text-red-600" : ""}`}
        >
          {value.length}/{maxChars}
        </div>
      </div>
    </div>
  );
};
