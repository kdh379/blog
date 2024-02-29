"use client";

import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

import { Toaster } from "./ui/toaster";

export default function Providers(props: PropsWithChildren) {
  return (
    <RecoilRoot>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {props.children}
        <Toaster />
        <Analytics />
      </ThemeProvider>
    </RecoilRoot>
  );
}