"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

import { Toaster } from "./ui/toaster";

const queryClient = new QueryClient();

export default function Providers(props: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}