import { mdxOptions } from '@fumadocs/mdx/mdx-options'
import { postsSchema } from '@fumadocs/schema'
import { defineCollections, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config'

import { transformerTwoslash } from 'fumadocs-twoslash'
import { createFileSystemTypesCache } from 'fumadocs-twoslash/cache-fs'

transformerTwoslash({ typesCache: createFileSystemTypesCache() })

export const posts = defineCollections({
  type: 'doc',
  dir: 'content/posts',
  schema: frontmatterSchema.extend(postsSchema),
})

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    providerImportSource: '@/mdx-components',
    ...mdxOptions,
  },
})
