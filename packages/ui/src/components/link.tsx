"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useCallback } from "react";

import { useSetFinishViewTransition } from "@ui/components/view-transition";

// copied from https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

// copied from https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L204-L217
function shouldPreserveDefault(
  e: React.MouseEvent<HTMLAnchorElement>
): boolean {
  const { nodeName } = e.currentTarget;

  // anchors inside an svg have a lowercase nodeName
  const isAnchorNodeName = nodeName.toUpperCase() === "A";

  if (isAnchorNodeName && isModifiedEvent(e)) {
    // ignore click for browser’s default behavior
    return true;
  }

  return false;
}

// next/link 래퍼입니다. 라우터 API를 사용하여 탐색하고 뷰 전환을 트리거합니다.
export function Link(props: React.ComponentProps<typeof NextLink>) {
  const router = useRouter();
  const finishViewTransition = useSetFinishViewTransition();

  const { href, as, replace, scroll } = props;
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e);
      }

      if ("startViewTransition" in document) {
        if (shouldPreserveDefault(e)) {
          return;
        }

        e.preventDefault();

        document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              startTransition(() => {
                // copied from https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L231-L233
                router[replace ? "replace" : "push"](as?.toString() || href.toString(), {
                  scroll: scroll ?? true,
                });
                finishViewTransition(() => resolve);
              });
            })
        );
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onClick, href, as, replace, scroll]
  );

  return <NextLink {...props} onClick={onClick} />;
}