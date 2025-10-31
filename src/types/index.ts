export interface TranslatorOptions {
  runtime: "node" | "browser";
  skipTags?: string[];
}

export interface TaggedText {
  key: number;
  text: string;
  tag: {
    name: string;
    id: string | null;
    classList: string[] | null;
  };
}

export interface TransformedTaggedText extends TaggedText {
  transformed: string;
}

export type TransformCallback = (taggedText: TaggedText) => string | Promise<string>;

export interface TransformHtmlOptions {
  html: string;
  skipTags?: string[];
}

export interface MarkOverOptions extends TransformHtmlOptions {
  runtime: "browser" | "node";
}
