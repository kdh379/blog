import axios from "axios";

interface APIInterface {
  "getOpenGraph": HttpReqRes<OpenGraphReq, OpenGraphRes>;
};

const URLDict: Record<keyof APIInterface, HttpRequestInfo> = {
  getOpenGraph: {
    url: "/api/open-graph",
    method: "GET",
  },
};

declare type DefaultRecord = Record<string, string>;

interface HttpReqRes<T_Param = DefaultRecord, T_Res = unknown> {
  params: T_Param;
  res: T_Res;
}

type HttpRequestInfo = {
  url: string;
  method: "GET";
}

interface RequestOption <T_Key extends keyof APIInterface> {
  key: T_Key;
  params: APIInterface[T_Key]["params"];
}

function getInstance() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
}

function getAPIInfo<T_Key extends keyof APIInterface>(
  key: T_Key,
  params?: APIInterface[T_Key]["params"]
) {
  const { method } = URLDict[key];
  const url = `${URLDict[key].url}${
    params
      ? `?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&")}`
      : ""
  }`;

  return {
    url,
    method,
  };
}

export default async function api<T_Key extends keyof APIInterface>({
  key,
  params,
}: RequestOption<T_Key>
) {
  const { url, method } = getAPIInfo(key, params);

  const response = await getInstance().request<APIInterface[T_Key]["res"]>({
    url,
    method,
  });

  return response.data;
}