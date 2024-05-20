"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error 
          statusCode={500}
          title="요청사항을 처리하는중 오류가 발생하였습니다."
        />
      </body>
    </html>
  );
}
