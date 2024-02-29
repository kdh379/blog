interface OpenGraphReq {
  url: string;
}

interface OpenGraphRes {
  ogTitle: string;
  ogType: string;
  ogUrl: string;
  ogDescription: string;
  charset: string;
  requestUrl: string;
  success: boolean;
  ogImage: OGImage[];
  ogVideo: OGVideo[];
}

interface OGImage {
  url: string;
  type: string;
  width: string;
  height: string;
}

interface OGVideo {
  url: string;
  type: string;
  width: string;
  height: string;
}