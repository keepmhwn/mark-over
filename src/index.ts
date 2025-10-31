import type { MarkOverOptions, TaggedText, TransformCallback } from "./types";

import transformHtmlTextInNode from "./core/html/node";
import transformHtmlTextInBrowser from "./core/html/browser";

async function markOver(options: MarkOverOptions, transform: TransformCallback) {
  const { runtime, html, skipTags } = options;

  if (runtime === "browser") {
    return transformHtmlTextInBrowser({ html, skipTags }, transform);
  }

  if (runtime === "node") {
    return transformHtmlTextInNode({ html, skipTags }, transform);
  }

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Invalid runtime option: "${runtime}". Expected "browser" or "node".`);
}

export { markOver, MarkOverOptions, TaggedText, TransformCallback };
