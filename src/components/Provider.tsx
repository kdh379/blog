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
        "bg-background desktop:grid desktop:grid-cols-[240px_minmax(0,1fr)] desktop:gap-10 container relative min-h-screen flex-1 antialiased"
      )}>
        <Sidebar />
        {props.children}
      </div>
    </ThemeProvider>
  );
}