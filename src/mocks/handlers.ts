import { http, HttpResponse } from "msw";

const MOCK_OG_OBJECT: OpenGraphRes = {
  charset: "utf-8",
  ogDescription: "A description",
  ogImage: [
    {
      height: "630",
      type: "image/jpeg",
      url: "https://example.com/image.jpg",
      width: "1200",
    },
  ],
  ogTitle: "A title",
  ogType: "website",
  ogUrl: "https://example.com",
  ogVideo: [],
  requestUrl: "https://example.com",
  success: true,
};

function nextApi(url: string) {
  return `http://localhost:3000/api${url}`;
}


export const handlers = [
  http.get<OpenGraphReq, any, OpenGraphRes>(
    nextApi("/open-graph"),
    async ({params}) => {
      const { url } = params;

      return HttpResponse.json(MOCK_OG_OBJECT);
    }
  ),
];