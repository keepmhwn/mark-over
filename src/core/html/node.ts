import type { TransformCallback, TransformHtmlOptions } from "src/types";

import { JSDOM } from "jsdom";

import { collectTaggedTexts, transformTextInNode } from "src/utils/dom";

import { DEFAULT_SKIP_TAGS } from "src/constants";

async function transformHtmlTextInNode(
  options: TransformHtmlOptions,
  transform: TransformCallback
) {
  const { html, skipTags = [] } = options;

  const dom = new JSDOM("<!DOCTYPE html><body></body>");
  const document = dom.window.document;
  document.body.innerHTML = html;

  const taggedTexts = collectTaggedTexts({
    node: document.body,
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

  const newBody = document.createElement("body");
  (Array.from(document.body.childNodes) as Node[]).forEach((child) => {
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

export default transformHtmlTextInNode;
