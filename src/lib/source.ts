import { loader } from 'fumadocs-core/source'
import { createMDXSource } from 'fumadocs-mdx'
import { posts } from '@/.source'

export const postsSource = loader({
  baseUrl: '/posts',
  source: createMDXSource(posts),
})
