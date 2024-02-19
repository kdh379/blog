import { NextRequest, NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const options = { url, timeout: 10000 };
  const { error, result } = await ogs(options);
  
  if (error) {
    return NextResponse.json(result, {status: 503});
  }
  return NextResponse.json(result);
}