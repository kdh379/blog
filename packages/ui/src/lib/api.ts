import { OpenGraphReq, OpenGraphRes } from "@repo/types/open-graph";

interface APIInterface {
  "getOpenGraph": HttpReqRes<OpenGraphReq, OpenGraphRes | undefined>;
}

const URLDict: Record<keyof APIInterface, HttpRequestInfo> = {
  getOpenGraph: {
    url: "/open-graph",
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

interface RequestOption<T_Key extends keyof APIInterface> extends RequestInit {
  key: T_Key;
          params: APIInterface[T_Key]["params"];
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

export default async function api<T_Key extends keyof APIInterface>(
  {
    key,
    params,
    ...options
  }: RequestOption<T_Key>
): Promise<APIInterface[T_Key]["res"]>
{
  const { url, method } = getAPIInfo(key, params);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    ...options,
  });

  if (!response.ok)
    throw new Error(`API request failed: ${response.status} ${response.statusText}`, {
      cause: response,
    });

  return response.json();
}