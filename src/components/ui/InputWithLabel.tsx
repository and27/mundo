import { FaEye } from "react-icons/fa6";
import { useState } from "react";

interface InputLabelProps {
  type?: string;
  label: string;
  name: string;
  value: string;
  className?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputWithLabel: React.FC<InputLabelProps> = ({
  type = "text",
  label,
  name,
  className,
  value,
  handleChange,
  error,
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="relative w-full mb-4">
      <input
        className={`text-sm md:text-base peer border text-white  py-2.5 px-4 rounded-md w-full placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
          error ? "border-red-500" : ""
        } ${className}`}
        type={inputType}
        id={name}
        name={name}
        value={value}
        placeholder=" "
        onChange={handleChange}
      />
      <label
        htmlFor={name}
        className={`
          px-2 rounded absolute -left-2 -top-6 text-sm text-white transition-all
          peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 md:peer-placeholder-shown:text-base 
          peer-focus:-top-6 peer-focus:-left-2 peer-focus:text-sm 
           peer-focus:text-white peer-placeholder-shown:text-white/60

        `}
      >
        {label}
      </label>
      {type === "password" && (
        <button
          type="button" // Important: type="button" to prevent form submission
          className="bg-transparent p-0 absolute right-4 top-3 text-icon-color" // text-icon-color is a placeholder
          onClick={togglePasswordVisibility} // Call the toggle function
        >
          <FaEye />
        </button>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">{error}</p>
      )}
    </div>
  );
};

export default InputWithLabel;
