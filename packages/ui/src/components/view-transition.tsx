"use client";

import { usePathname } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { createContext, use, useEffect, useRef, useState } from "react";

const ViewTransitionsContext = createContext<
  Dispatch<SetStateAction<(() => void) | null>>
    >(() => () => {});

function useBrowserNativeTransitions() {
  const pathname = usePathname();
  const currentPathname = useRef(pathname);

  const [currentViewTransition, setCurrentViewTransition] = useState<
        | null
        | [
            // 뷰 전환 시작 시 Promise 반환
            Promise<void>,
            () => void
              ]
              >(null);

  useEffect(() => {
    if (!("startViewTransition" in document)) {
      return () => {};
    }

    const onPopState = () => {
      let pendingViewTransitionResolve: () => void;

      const pendingViewTransition = new Promise<void>((resolve) => {
        pendingViewTransitionResolve = resolve;
      });

      const pendingStartViewTransition = new Promise<void>((resolve) => {
        document.startViewTransition(() => {
          resolve();
          return pendingViewTransition;
        });
      });

      setCurrentViewTransition([
        pendingStartViewTransition,
        pendingViewTransitionResolve!,
      ]);
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  if (currentViewTransition && currentPathname.current !== pathname)
    use(currentViewTransition[0]);

  // Transition 참조를 항상 최신 상태로 유지
  const transitionRef = useRef(currentViewTransition);
  useEffect(() => {
    transitionRef.current = currentViewTransition;
  }, [currentViewTransition]);

  useEffect(() => {
    // 새 경로 컴포넌트가 마운트되면 뷰 전환 끝냄
    currentPathname.current = pathname;
    if (transitionRef.current) {
      transitionRef.current[1]();
      transitionRef.current = null;
    }
  }, [pathname]);
}

export function ViewTransitions({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [finishViewTransition, setFinishViewTransition] = useState<
    null | (() => void)
      >(null);

  useEffect(() => {
    if (finishViewTransition) {
      finishViewTransition();
      setFinishViewTransition(null);
    }
  }, [finishViewTransition]);

  useBrowserNativeTransitions();

  return (
    <ViewTransitionsContext.Provider value={setFinishViewTransition}>
      {children}
    </ViewTransitionsContext.Provider>
  );
}

export function useSetFinishViewTransition() {
  return use(ViewTransitionsContext);
}