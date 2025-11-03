import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: { browser: "src/browser.ts" },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    platform: "browser",
  },
  {
    entry: { node: "src/node.ts" },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    treeshake: true,
    minify: false,
    platform: "node",
    external: ["jsdom"],
  },
]);
