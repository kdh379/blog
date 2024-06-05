"use client";

import { Toaster } from "@ui/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function Providers(props: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {props.children}
      <Toaster />
    </ThemeProvider>
  );
}