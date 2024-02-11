"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { RecoilRoot } from "recoil";

export function ClientSideProvider({ children, ...props }: ThemeProviderProps) {

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <RecoilRoot>
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  </RecoilRoot>;
}