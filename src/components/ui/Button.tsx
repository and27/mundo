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
  ...rest
}) => {
  const primaryStyles = "bg-yellow-500 text-neutral-900 hover:bg-yellow-600";
  const secondaryStyles = "bg-magic/20 text-white hover:brightness-95";

  return (
    <button
      type="button"
      className={clsx(
        "px-12 py-3.5 rounded-xl font-bold text-lg",
        "transition-colors duration-300 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "inline-flex items-center justify-center",
        variant === "primary" && primaryStyles,
        variant === "secondary" && secondaryStyles,

        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
