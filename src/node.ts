import type { TaggedText, TransformCallback } from "./types";

import transformHtmlTextInNode from "./core/html/node";

export interface NodeMarkOverOptions {
  html: string;
  skipTags?: string[];
}

async function markOver(options: NodeMarkOverOptions, transform: TransformCallback) {
  if (typeof window !== "undefined") {
    throw new Error(
      "[@keepmhwn/mark-over/node] This function is designed for Node.js environments only. " +
        "If you're running in a browser, please use '@keepmhwn/mark-over/browser' instead."
    );
  }

  const { html, skipTags } = options;
  return transformHtmlTextInNode({ html, skipTags }, transform);
}

export { markOver, TaggedText, TransformCallback };
