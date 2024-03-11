import { delay, http, HttpResponse } from "msw";
import { OgObject } from "open-graph-scraper/dist/lib/types";

const MOCK_OG_OBJECT: OgObject = {
  charset: "utf-8",
  ogDescription: "A description Mocked",
  ogImage: [
    {
      height: 630,
      type: "image/jpeg",
      url: "/images/placeholder.png",
      width: 1200,
    },
  ],
  ogTitle: "A title Mocked",
  ogType: "website",
  ogUrl: "https://example.com",
  ogVideo: [],
  requestUrl: "https://example.com",
  success: true,
};

function nextApi(url: string) {
  return `http://localhost:3000/api${url}`;
}

function searchParam(url: string, param: string) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(param);
}


export const handlers = [
  http.get<OpenGraphReq, any, OgObject>(
    nextApi("/open-graph"),
    async ({ request}) => {

      const url = searchParam(request.url, "url");
      
      if( url === "https://example.com/error")
        return HttpResponse.json({}, {status: 503});
      else if( url === "pending")
        await delay("infinite");

      return HttpResponse.json(MOCK_OG_OBJECT);
    }
  ),
];