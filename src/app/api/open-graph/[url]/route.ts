import { NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export async function GET(
  request: Request,
  { params }: { params: { url: string } }
) {
  const { url } = params;
  const options = { url, timeout: 10000 };
  const { error, result } = await ogs(options);
  
  if (error) {
    return NextResponse.json(result, {status: 503});
  }
  return NextResponse.json(result);
}