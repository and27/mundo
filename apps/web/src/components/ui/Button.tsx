import React, { FC } from "react";
import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  asChild?: boolean;
  size?: ButtonSize;
  /** Voz del nino: tipografia redonda y area de toque mas grande. */
  kid?: boolean;
  fullWidth?: boolean;
}

// NN/g pide unos 2 cm de lado para manos pequenas; de ahi el salto de tamano
// cuando `kid` esta activo.
const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
};

const kidSizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-3 text-base",
  md: "px-6 py-4 text-lg",
  lg: "px-8 py-5 text-xl",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "mi-cta-primary",
  secondary: "mi-cta-secondary",
  ghost: "mi-cta-ghost",
};

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  asChild = false,
  size = "md",
  kid = false,
  fullWidth = false,
  className,
  ...rest
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center",
        "font-bold disabled:opacity-50 disabled:cursor-not-allowed",
        fullWidth ? "w-full" : "w-fit",
        kid ? "mi-voice-kid rounded-[var(--radius-kid)]" : "rounded-[var(--radius-control)]",
        kid ? kidSizeClasses[size] : sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Button;
