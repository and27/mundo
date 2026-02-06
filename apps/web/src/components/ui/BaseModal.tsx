"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

type BaseModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg";
  title?: string;
};

const MAX_WIDTH = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function BaseModal({
  open,
  onOpenChange,
  children,
  maxWidth = "md",
  title = "Dialog",
}: BaseModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed inset-0 z-40
            bg-black/40 backdrop-blur-sm
            data-[state=open]:animate-fade-in
            data-[state=closed]:animate-fade-out
          "
        />

        <Dialog.Content
          className="
            fixed inset-0 z-50 w-fit h-fit
              top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
          "
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <div
            className={`
              w-full ${MAX_WIDTH[maxWidth]}
              rounded-2xl
              focus:outline-none
            `}
          >
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
