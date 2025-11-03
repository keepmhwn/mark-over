// This file exists for type definitions compatibility
// The actual implementation is determined by conditional exports in package.json
// - Browser environments will receive ./browser
// - Node environments will receive ./node

export type { TaggedText, TransformCallback } from "./types";
export type { NodeMarkOverOptions as MarkOverOptions } from "./node";
export { markOver } from "./node";
