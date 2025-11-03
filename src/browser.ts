import type { TaggedText, TransformCallback } from "./types";

import transformHtmlTextInBrowser from "./core/html/browser";

export interface BrowserMarkOverOptions {
  html: string;
  skipTags?: string[];
}

async function markOver(options: BrowserMarkOverOptions, transform: TransformCallback) {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    throw new Error(
      "[@keepmhwn/mark-over/browser] This function is designed for browser environments only. " +
        "If you're running in Node.js, please use '@keepmhwn/mark-over/node' instead."
    );
  }

  const { html, skipTags } = options;
  return transformHtmlTextInBrowser({ html, skipTags }, transform);
}

export { markOver, TaggedText, TransformCallback };
