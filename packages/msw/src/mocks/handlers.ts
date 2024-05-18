import { delay, http, HttpResponse } from "msw";

const MOCK_OG_OBJECT: OpenGraphRes = {
  ogDescription: "A description Mocked",
  ogImage: "/images/placeholder.png",
  ogTitle: "A title Mocked",
  ogVideo: "https://www.example.com/video.mp4",
};

function nextApi(url: string) {
  return `http://localhost:3000/api${url}`;
}

function searchParam(url: string, param: string) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(param);
}


export const handlers = [
  http.get<OpenGraphReq, any, OpenGraphRes>(
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