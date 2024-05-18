import { Node } from "unist";

export interface UnistNode extends Node {
  type: string
  name?: string
  tagName?: string
  value?: string
  properties?: {
    [key: string]: unknown
  }
  __rawString__?: string
  children?: UnistNode[]
}

export interface UnistTree extends Node {
  children: UnistNode[]
}