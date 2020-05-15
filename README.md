# gatsby-plugin-mdx-frontmatter

Utility to parse Markdown frontmatter with MDX in Gatsby using [GraphQL Schema customization](https://www.gatsbyjs.org/docs/schema-customization/)

_This package encompasses the work shared in [this blog post](https://zslabs.com/articles/mdx-frontmatter-in-gatsby/)._

## Installation

```bash
yarn add gatsby-plugin-mdx-frontmatter
```

## Usage

Add following to your `gatsby-config.js`:

```js
plugins: [
  {
    resolve: 'gatsby-plugin-mdx-frontmatter'
  },
  ...
]
```

Example markdown file we want to attach MDX to:

```md
---
title: My article
items:
  - value: >-
      Item 1 **value**
  - value: >-
      Item 2
      <Button>React-powered button</Button>
  - value: >-
      Item 3 __value__
content: >-
  Here's a **cool** graph!

  <Graph />
---

Article content.
```

We can use the provided `mdx` resolver to attach to each field in your `gatsby-node.js`:

```js
exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }

    type MdxFrontmatter {
      items: [ItemValues]
      content: String @mdx
    }

    type ItemValues {
      value: String @mdx
    }
  `);
};
```

You can then use `<MDXProvider />` and `<MDXRenderer />` as normal for these fields:

```js
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Button from "../components/Button";
import Graph from "../components/Graph";

const Article = ({ frontmatter, body }) => (
  <MDXProvider components={[Button, Graph]}>
    <div>
      <h1>{frontmatter.title}</h1>

      <ul>
        {frontmatter.items.map((item) => (
          <li key={item.value}>
            <MDXRenderer>{item.value}</MDXRenderer>
          </li>
        ))}
      </ul>

      <MDXRenderer>{frontmatter.content}</MDXRenderer>

      <MDXRenderer>{body}</MDXRenderer>
    </div>
  </MDXProvider>
);
```

## License

[MIT](LICENSE)
