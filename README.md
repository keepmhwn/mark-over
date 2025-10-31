# mark-over

> Transform text content within HTML markup while preserving structure

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight library that allows you to transform text content within HTML elements while maintaining the original HTML structure. Perfect for internationalization, text manipulation, or any scenario where you need to modify text content without breaking your markup.

## Features

- 🎯 **Preserve Structure** - Maintains HTML structure while transforming text
- 🔄 **Async Support** - Works with both synchronous and asynchronous transformations
- 🌐 **Universal** - Works in both Node.js and browser environments
- 📦 **Zero Dependencies** (browser mode) - Lightweight for browser usage
- 🎨 **Tag Awareness** - Access element information (tag name, id, classes) during transformation
- ⚙️ **Configurable** - Skip specific tags that shouldn't be transformed

## Installation

```bash
npm install @keepmhwn/mark-over
```

```bash
yarn add @keepmhwn/mark-over
```

```bash
pnpm add @keepmhwn/mark-over
```

## Usage

### Basic Example

```typescript
import { markOver } from "@keepmhwn/mark-over";

const html = "<div><h1>Hello</h1><p>World</p></div>";

const result = await markOver(
  {
    runtime: "node", // or "browser"
    html: html,
  },
  (taggedText) => {
    // Transform each text node
    return taggedText.text.toUpperCase();
  }
);

console.log(result);
// Output: <div><h1>HELLO</h1><p>WORLD</p></div>
```

### Translation Example

```typescript
import { markOver } from "@keepmhwn/mark-over";

const translations = {
  Hello: "안녕하세요",
  World: "세계",
  Welcome: "환영합니다",
};

const html = `
  <div>
    <h1>Hello</h1>
    <p>Welcome to the World</p>
  </div>
`;

const result = await markOver(
  {
    runtime: "node",
    html: html,
  },
  (taggedText) => {
    // Translate each word
    return taggedText.text
      .split(" ")
      .map((word) => translations[word] || word)
      .join(" ");
  }
);
```

### Using Tag Information

```typescript
import { markOver } from "@keepmhwn/mark-over";

const html = `
  <div>
    <h1 id="title" class="header">Product Name</h1>
    <p class="description">Description text</p>
    <span class="price">$99.99</span>
  </div>
`;

const result = await markOver(
  {
    runtime: "node",
    html: html,
  },
  (taggedText) => {
    // Access element information
    const { text, tag } = taggedText;

    // Different transformation based on tag
    if (tag.name === "H1") {
      return text.toUpperCase();
    }

    // Different transformation based on class
    if (tag.classList?.includes("price")) {
      return `💰 ${text}`;
    }

    return text;
  }
);
```

### Async Transformation (e.g., API calls)

```typescript
import { markOver } from "@keepmhwn/mark-over";

async function translateText(text: string): Promise<string> {
  // Call translation API
  const response = await fetch("https://api.example.com/translate", {
    method: "POST",
    body: JSON.stringify({ text, target: "ko" }),
  });
  const data = await response.json();
  return data.translatedText;
}

const html = "<div><p>Hello World</p></div>";

const result = await markOver(
  {
    runtime: "node",
    html: html,
  },
  async (taggedText) => {
    // Async transformation
    return await translateText(taggedText.text);
  }
);
```

### Skip Specific Tags

```typescript
import { markOver } from "@keepmhwn/mark-over";

const html = `
  <div>
    <p>Translate this</p>
    <code>const x = 42;</code>
    <pre>function example() {}</pre>
  </div>
`;

const result = await markOver(
  {
    runtime: "node",
    html: html,
    skipTags: ["CODE", "PRE"], // Don't transform code blocks
  },
  (taggedText) => {
    return taggedText.text.toUpperCase();
  }
);

// CODE and PRE tags remain unchanged
```

### Browser Usage

```typescript
import { markOver } from "@keepmhwn/mark-over";

// In browser environment
const result = await markOver(
  {
    runtime: "browser", // Use browser's native DOM API
    html: document.body.innerHTML,
  },
  (taggedText) => {
    return taggedText.text.toUpperCase();
  }
);

document.body.innerHTML = result;
```

## API

### `markOver(options, transform)`

Transforms text content within HTML markup.

#### Parameters

- **`options`**: `MarkOverOptions`
  - **`runtime`**: `"node" | "browser"` - Runtime environment
  - **`html`**: `string` - HTML string to transform
  - **`skipTags`**: `string[]` (optional) - Array of tag names to skip (default: `["STYLE", "SCRIPT", "CODE", "PRE", "SVG"]`)

- **`transform`**: `(taggedText: TaggedText) => string | Promise<string>` - Transformation function
  - **`taggedText`**: Object containing:
    - **`text`**: `string` - The text content
    - **`tag`**: Object with element information:
      - **`name`**: `string` - Tag name (e.g., "DIV", "P", "SPAN")
      - **`id`**: `string | null` - Element ID
      - **`classList`**: `string[] | null` - Array of class names
    - **`key`**: `number` - Unique identifier

#### Returns

`Promise<string>` - Transformed HTML string

## TypeScript

This library is written in TypeScript and includes type definitions.

```typescript
import { markOver, type MarkOverOptions, type TaggedText } from "@keepmhwn/mark-over";

const options: MarkOverOptions = {
  runtime: "node",
  html: "<p>Hello</p>",
};

const transform = (taggedText: TaggedText): string => {
  return taggedText.text.toUpperCase();
};

const result = await markOver(options, transform);
```

## Use Cases

- **🌍 Internationalization (i18n)** - Translate HTML content while preserving structure
- **📝 Text Processing** - Apply text transformations (uppercase, lowercase, etc.)
- **🔍 Content Analysis** - Extract and analyze text with context
- **🎨 Dynamic Styling** - Add markup based on text content
- **🤖 AI Text Enhancement** - Process text through AI APIs while maintaining HTML structure
- **🔐 Content Sanitization** - Transform or filter text content

## Default Skip Tags

By default, the following tags are skipped to preserve technical content:

- `STYLE` - CSS styles
- `SCRIPT` - JavaScript code
- `CODE` - Inline code
- `PRE` - Preformatted text
- `SVG` - SVG elements

You can override this by providing your own `skipTags` array.

## License

MIT © [minhwan(keepmhwn)](https://github.com/keepmhwn)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/keepmhwn/mark-over/issues).

## Author

**minhwan(keepmhwn)**

- Email: keepmhwn@gmail.com
- GitHub: [@keepmhwn](https://github.com/keepmhwn)
