"use client";

import { Button } from "@ui/components/ui/button";

interface ErrorFallbackProps {
	error?: {
		message: string;
		status: number;
	};
	reset?: () => void;
}

export  default function FallbackRetry({ error, reset }: ErrorFallbackProps) {
  return (
    <div>
      <h1 className="headline mt-8 pb-4 text-3xl md:text-4xl lg:text-5xl">
        {error ? `Error: ${error.status}` : "알 수 없는 오류가 발생했습니다."}
      </h1>
      <p className="text-lg">
        {error ? `Error code: ${error.message}` : "다시 시도해주세요."}
      </p>
      {reset && <Button onClick={reset}>다시 시도</Button>}
    </div>
  );
}
