import { VideoIcon } from "lucide-react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

import FallbackEmpty from "../template/fallback-empty";

export default function Video({src}: {src: string}) {
  return (
    <ErrorBoundary errorComponent={FallbackEmpty}>
      <div className="aspect-video">
        <Suspense
          fallback={(
            <div className="bg-muted flex animate-pulse items-center justify-center rounded-md">
              <VideoIcon className="text-muted-foreground size-1/2" />
            </div>
          )}
        >
          <Component src={src} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

function Component({ src }: {src: string}) {
  return (
    <video
      src={src}
      controls
      muted
    />
  );
}