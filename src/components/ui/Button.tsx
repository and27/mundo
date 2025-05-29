import React, { FC } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  variant = "primary",
}) => {
  const primaryStyles = "bg-yellow-500 text-black hover:bg-yellow-600";
  const secondaryStyles = "bg-magic/20 text-white hover:brightness-95";

  return (
    <button
      type="button"
      className={clsx(
        "px-5 py-2.5 rounded-full",
        "transition-colors duration-300 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "inline-flex items-center justify-center",
        variant === "primary" && primaryStyles,
        variant === "secondary" && secondaryStyles,

        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
