import React, { FC } from "react";
import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  asChild?: boolean;
  size?: "sm" | "md" | "lg";
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  asChild = false,
  size = "md",
  className,
  ...rest
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={clsx(
        "w-fit",
        "rounded-xl font-bold",
        "transition-colors duration-300 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "inline-flex items-center justify-center",
        variant === "primary" && "mi-cta-primary",
        variant === "secondary" && "mi-cta-secondary",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-5 py-3",

        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Button;
