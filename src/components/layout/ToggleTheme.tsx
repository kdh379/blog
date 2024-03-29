"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

import { Icons } from "../ui/icons";

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
        { theme === "light" 
          ? <Icons.sun className={cn("size-5")} />
          : <Icons.moon className={cn("size-5")} />
        }
      </>)}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}