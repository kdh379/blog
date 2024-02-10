import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import Sidebar from "./layout/Sidebar";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers(props: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <div className={cn(
        "max-w-desktop bg-background mx-auto flex min-h-screen px-8 antialiased"
      )}>
        <Sidebar />
        {props.children}
      </div>
    </ThemeProvider>
  );
}