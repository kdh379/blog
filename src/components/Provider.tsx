"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

import { cn } from "@/lib/utils";

import AppHeader from "./layout/AppHeader";
import Sidebar from "./layout/Sidebar";
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
          <div className="bg-background relative min-h-screen antialiased transition ease-in-out">
            <AppHeader />
            <div className={cn(
              "tablet:grid tablet:grid-cols-[240px_minmax(0,1fr)] tablet:gap-10 container min-h-screen flex-1 antialiased"
            )}>
              <Sidebar />
              {props.children}
            </div>
            <Toaster />
          </div>
          <Analytics />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}