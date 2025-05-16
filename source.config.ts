import { mdxOptions } from '@fumadocs/mdx/mdx-options'
import { postsSchema } from '@fumadocs/schema'
import { defineCollections, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config'

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
