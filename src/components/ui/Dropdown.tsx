import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  trigger: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
  >;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
}

export default function Dropdown({
  trigger,
  children,
  className = "",
  align = "right",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const menuId = useRef(
    `dropdown-${Math.random().toString(36).slice(2)}`
  ).current;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const menu = dropdownRef.current?.querySelector<HTMLElement>(
      "[role='menu']"
    );
    const firstItem = menu?.querySelector<HTMLElement>("[role='menuitem']");
    firstItem?.focus();
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const menu = dropdownRef.current?.querySelector<HTMLElement>(
        "[role='menu']"
      );
      if (!menu) return;
      const items = Array.from(
        menu.querySelectorAll<HTMLElement>("[role='menuitem']")
      );
      if (items.length === 0) return;
      const currentIndex = items.findIndex(
        (item) => item === document.activeElement
      );
      const nextIndex =
        event.key === "ArrowDown"
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;
      items[nextIndex]?.focus();
    }
  };

  const alignmentClass = align === "right" ? "right-0" : "left-0";

  const triggerNode = React.isValidElement(trigger)
    ? React.cloneElement(trigger, {
        "aria-haspopup": "menu",
        "aria-expanded": isOpen,
        "aria-controls": menuId,
        onKeyDown: handleKeyDown,
        ref: triggerRef,
      })
    : trigger;

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{triggerNode}</div>

      {isOpen && (
        <div
          className={`absolute ${alignmentClass} top-full mt-2 z-50 ${className}`}
          role="menu"
          id={menuId}
          aria-orientation="vertical"
          onKeyDown={handleKeyDown}
        >
          <div onClick={() => setIsOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
}
