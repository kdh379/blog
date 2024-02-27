import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import AppHeader from "./layout/AppHeader";
import Sidebar from "./layout/Sidebar";

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      <div className={cn(
        "tablet:grid tablet:grid-cols-[240px_minmax(0,1fr)] tablet:gap-10 container min-h-screen flex-1 antialiased"
      )}>
        <Sidebar />
        <main className="pt-mobileHeader mobile:pt-0">{props.children}</main>
      </div>
    </>
  );
}