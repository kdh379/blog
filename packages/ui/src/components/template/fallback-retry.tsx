"use client";

import * as Sentry from "@sentry/nextjs";
import { RefreshCcw } from "lucide-react";

import { Button } from "@ui/components/ui/button";

interface ErrorFallbackProps {
	error?: {
		message: string;
		status: number;
	};
	reset?: () => void;
}

export  default function FallbackRetry({ error, reset }: ErrorFallbackProps) {
  // sentry에 에러 전송
  if (error)
    Sentry.captureException(new Error(`Error: ${error.status} - ${error.message}`));

  return (
    <div>
      <h1 className="mt-8 pb-4 text-2xl font-bold leading-5">
        서비스 요청 중 오류가 발생했습니다.
      </h1>
      <p className="text-lg">
        잠시 후 다시 시도해주세요.
      </p>
      {error && (
        <>
          <p className="mt-4 text-lg">
            {error.status}
          </p>
          <p className="text-muted-foreground leading-5">
            {error.message}
          </p>
        </>
      )}
      {reset && (
        <Button
          onClick={reset}
          size="lg"
          className="mt-4"
        >
          <RefreshCcw size={16} className="mr-2" />
          다시 시도
        </Button>
      )}
    </div>
  );
}
