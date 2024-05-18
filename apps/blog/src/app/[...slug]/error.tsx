"use client";

import FallbackRetry from "@repo/ui/components/template/fallback-retry";

interface ErrorProps {
  error: {
		message: string;
		status: number;
	};
	reset: () => void;
}

const Error = (props: ErrorProps) => {
  return <FallbackRetry {...props} />;
};

export default Error;
