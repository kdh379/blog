export interface OpenGraphReq {
  url: string;
}

export interface OpenGraphRes {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogVideo?: string;
  data?: any;
}