import type { DefaultMDXOptions } from 'fumadocs-mdx/config'

import {
  transformerMetaHighlight,
  transformerNotationFocus,
  transformerRemoveNotationEscape,
} from '@shikijs/transformers'

import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins'
import { remarkInstall } from 'fumadocs-docgen'
import { transformerTwoslash } from 'fumadocs-twoslash'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

export const mdxOptions: DefaultMDXOptions = {
  rehypeCodeOptions: {

    inline: 'tailing-curly-colon',
    themes: { light: 'github-light', dark: 'github-dark' },
    transformers: [
      ...(rehypeCodeDefaultOptions.transformers ?? []),
      transformerTwoslash(),
      transformerRemoveNotationEscape(),
      transformerNotationFocus(),
      transformerMetaHighlight(),
    ],
  },
  remarkPlugins: [remarkMath, remarkInstall],
  rehypePlugins: v => [rehypeKatex, ...v],
}
