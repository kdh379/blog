"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import { RecoilRoot } from "recoil";


export function ClientSideProvider({children }: React.PropsWithChildren) {

  return <RecoilRoot>
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  </RecoilRoot>;
}