"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const mounted = useMounted();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="ml-auto"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {mounted && (<>
        <Sun className={cn("size-5 dark:hidden", theme==="light" && "animate-rotate")} />
        <Moon className={cn("hidden size-5 dark:block", theme==="dark" && "animate-rotate")} />
      </>)}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}