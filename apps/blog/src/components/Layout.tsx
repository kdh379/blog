import { cn } from "@repo/ui/lib/utils";
import { PropsWithChildren } from "react";

import AppHeader from "./layout/AppHeader";
import Sidebar from "./layout/Sidebar";

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      <div className={cn(
        "tablet:grid tablet:grid-cols-[240px_minmax(0,1fr)] tablet:gap-10 desktop:pr-0 desktop:pl-[calc(100vw-100.55%)] container min-h-screen flex-1 px-8 antialiased"
      )}>
        <Sidebar />
        <main className="pt-mobileHeader mobile:pt-0 flex flex-col">{props.children}</main>
      </div>
    </>
  );
}