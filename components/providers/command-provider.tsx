"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CommandMenu } from "@/components/ui/command-menu";

interface CommandContextType {
  open: () => void;
  close: () => void;
}

const CommandContext = createContext<CommandContextType>({
  open: () => {},
  close: () => {},
});

export function useCommand() {
  return useContext(CommandContext);
}

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <CommandContext.Provider
      value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
      <CommandMenu open={isOpen} onClose={() => setIsOpen(false)} />
    </CommandContext.Provider>
  );
}

