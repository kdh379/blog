interface OpenGraphReq {
  url: string;
}

interface OpenGraphRes {
  ogTitle: string;
  ogType: string;
  ogUrl: string;
  ogDescription: string;
  chartset: string;
  requestUrl: string;
  success: boolean;
  ogImage: OGImage[];
}

interface OGImage {
  url: string;
  type: string;
  width: string;
  height: string;
}