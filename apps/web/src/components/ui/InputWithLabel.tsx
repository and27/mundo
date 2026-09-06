import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import type { InputHTMLAttributes } from "react";

interface InputLabelProps {
  type?: string;
  label: string;
  name: string;
  value: string;
  className?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "name" | "type" | "value" | "onChange"
  >;
}

const InputWithLabel: React.FC<InputLabelProps> = ({
  type = "text",
  label,
  name,
  className,
  value,
  handleChange,
  error,
  inputProps,
}) => {
  const [inputType, setInputType] = useState(type);
  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  const isPasswordVisible = inputType === "text";

  return (
    <div className="relative w-full mb-4">
      <input
        className={`text-sm md:text-base peer w-full py-3.5 px-4 text-white placeholder-transparent
          rounded-[var(--radius-control)] mi-surface-1 border transition-colors
          ${
            error
              ? "border-[var(--color-error-500)]"
              : "border-white/15 focus:border-white/40"
          } ${isPasswordField ? "pr-12" : ""} ${className}`}
        type={inputType}
        id={name}
        name={name}
        value={value}
        placeholder=" "
        onChange={handleChange}
        {...inputProps}
      />
      <label
        htmlFor={name}
        className={`
          px-2 rounded absolute -left-2 -top-6 text-sm text-white transition-all
          peer-placeholder-shown:top-3 peer-placeholder-shown:left-2 md:peer-placeholder-shown:text-base 
          peer-focus:-top-6 peer-focus:-left-2 peer-focus:text-sm 
           peer-focus:text-white peer-placeholder-shown:text-white/60

        `}
      >
        {label}
      </label>
      {isPasswordField && (
        <button
          type="button"
          className="bg-transparent p-0 absolute right-4 top-3.5 text-white/60 hover:text-white transition-colors z-10"
          onClick={togglePasswordVisibility}
          aria-label={
            isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
          }
          aria-pressed={isPasswordVisible}
        >
          <FaEye aria-hidden />
        </button>
      )}
      {error && (
        <p className="text-[var(--color-error-500)] text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputWithLabel;
