"use client";

import { Button } from "@ui/components/ui/button";
import { Icons } from "@ui/components/ui/icons";
import { useMounted } from "@ui/hooks/use-mounted";
import { cn } from "@ui/lib/utils";
import { useTheme } from "next-themes";


export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  const mounted = useMounted();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="ml-auto"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && (<>
        { theme === "dark" 
          ? <Icons.moon className={cn("size-5")} />
          : <Icons.sun className={cn("size-5")} />
        }
      </>)}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}