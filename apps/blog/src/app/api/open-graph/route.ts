
import { OpenGraphRes } from "@repo/types/open-graph";
import { NextRequest, NextResponse } from "next/server";
import urlMetadata from "url-metadata";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  try {
    const result = await urlMetadata(url, {
      cache: "force-cache",
    });

    const ogData: OpenGraphRes = {
      ogTitle: result["og:title"],
      ogDescription: result["og:description"],
      ogImage: result["og:image"] || result["image"],
      ogVideo: result["og:video:url"],
    };

    return NextResponse.json(ogData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid Error" }, { status: 500 });
  }
}