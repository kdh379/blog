import { cn } from "@repo/ui/lib/utils";
import { PropsWithChildren } from "react";

import AppHeader from "./layout/AppHeader";
import Sidebar from "./layout/Sidebar";

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      <div className={cn(
        "container min-h-screen flex-1 px-8 antialiased tablet:grid tablet:grid-cols-[240px_minmax(0,1fr)] tablet:gap-10 desktop:pl-[calc(100vw-100.55%)] desktop:pr-0"
      )}>
        <Sidebar />
        <main className="flex flex-col pt-mobileHeader mobile:pt-0">{props.children}</main>
      </div>
    </>
  );
}