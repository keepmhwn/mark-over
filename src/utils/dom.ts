import type { TaggedText, TransformedTaggedText } from "src/types";

interface CollectTaggedTextsParams {
  node: Node;
  parentElement: Element | null;
  collected: TaggedText[];
  skipTags: string[];
}

interface TransformTextInNodeParams {
  node: Node;
  parentElement: Element | null;
  transformedTexts: TransformedTaggedText[];
}

const NodeType = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
} as const;

function isElementNode(node: Node): node is Element {
  return node.nodeType === NodeType.ELEMENT_NODE;
}

function isTextNode(node: Node): node is Element {
  return node.nodeType === NodeType.TEXT_NODE;
}

function matchesElementTag(
  element: Element | null,
  taggedText: TransformedTaggedText["tag"]
): boolean {
  if (!element) return taggedText.name === null;

  if (element.tagName !== taggedText.name) return false;

  if (element.id !== (taggedText.id ?? "")) return false;

  const elementClasses = Array.from(element.classList).sort();
  const tagClasses = Array.from([...(taggedText?.classList ?? [])]).sort();

  if (elementClasses.length !== tagClasses.length) return false;

  return elementClasses.every((cls, idx) => cls === tagClasses[idx]);
}

function findTransformedText(
  text: string,
  parentElement: Element | null,
  transformedTexts: TransformedTaggedText[]
): string | null {
  const matched = transformedTexts.find(
    (item) => item.text === text && matchesElementTag(parentElement, item.tag)
  );

  return matched?.transformed ?? null;
}

function collectTaggedTexts({
  node,
  parentElement,
  collected,
  skipTags,
}: CollectTaggedTextsParams): TaggedText[] {
  if (isElementNode(node)) {
    if (skipTags.includes(node.tagName)) {
      return collected;
    }

    return Array.from(node.childNodes).reduce(
      (collected, child) =>
        collectTaggedTexts({
          node: child,
          parentElement: node,
          collected,
          skipTags,
        }),
      collected
    );
  }

  if (isTextNode(node)) {
    const text = node.textContent?.trim() || "";

    if (text && parentElement) {
      return [
        ...collected,
        {
          key: new Date().getTime(),
          text,
          tag: {
            name: parentElement.tagName,
            id: parentElement.id || null,
            classList:
              parentElement.classList.length > 0 ? Array.from(parentElement.classList) : null,
          },
        },
      ];
    }
  }

  return collected;
}

function transformTextInNode({
  node,
  parentElement,
  transformedTexts,
}: TransformTextInNodeParams): Node {
  if (isElementNode(node)) {
    const cloned = node.cloneNode(false);

    Array.from(node.childNodes).forEach((child) => {
      cloned.appendChild(
        transformTextInNode({
          node: child,
          parentElement: node,
          transformedTexts,
        })
      );
    });

    return cloned;
  }

  if (node.nodeType === NodeType.TEXT_NODE) {
    const text = node.textContent?.trim() || "";
    const transformed = text ? findTransformedText(text, parentElement, transformedTexts) : null;

    const ownerDoc = node.ownerDocument;
    if (!ownerDoc) {
      return node.cloneNode(true);
    }

    return ownerDoc.createTextNode(transformed !== null ? transformed : node.textContent || "");
  }

  return node.cloneNode(true);
}

export { collectTaggedTexts, transformTextInNode };
