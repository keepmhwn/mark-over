import type { TransformCallback, TransformHtmlOptions } from "src/types";

import { collectTaggedTexts, transformTextInNode } from "src/utils/dom";

import { DEFAULT_SKIP_TAGS } from "src/constants";

async function transformHtmlTextInBrowser(
  options: TransformHtmlOptions,
  transform: TransformCallback
): Promise<string> {
  const { html, skipTags = [] } = options;

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<!DOCTYPE html><body>${html}</body>`, "text/html");

  const taggedTexts = collectTaggedTexts({
    node: doc.body,
    parentElement: null,
    collected: [],
    skipTags: [...DEFAULT_SKIP_TAGS, ...skipTags],
  });

  const transformedTexts = await Promise.all(
    taggedTexts.map(async (taggedText) => ({
      ...taggedText,
      transformed: await transform(taggedText),
    }))
  );

  const newBody = doc.createElement("body");
  (Array.from(doc.body.childNodes) as Node[]).forEach((child) => {
    newBody.appendChild(
      transformTextInNode({
        node: child,
        parentElement: null,
        transformedTexts,
      })
    );
  });

  return newBody.innerHTML;
}

export default transformHtmlTextInBrowser;
