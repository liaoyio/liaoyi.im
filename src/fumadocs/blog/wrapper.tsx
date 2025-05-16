import type { loader } from 'fumadocs-core/source'
import type { BlogConfig } from '@/fumadocs/types'

import { BlogList } from '@/fumadocs/blog/blog-list'
import { blogConfig } from '@/post-config'
import { getSortedByDatePosts } from './utils'
import { isBlogRootPage } from './utils/page-type'

interface BlogWrapperProps {
  params: { slug?: string[] }
  blogSource: ReturnType<typeof loader>
  posts: any[]
  getCategoryBySlug: (slug: string) => any
  getSeriesBySlug: (slug: string) => any
  mdxComponents: any
  includeDrafts?: boolean
  blogConfig?: BlogConfig
}

export default function BlogWrapper({
  params,
  posts,
  includeDrafts = process.env.NODE_ENV !== 'production',
}: BlogWrapperProps) {
  const sortedPosts = getSortedByDatePosts(posts, includeDrafts)
  // Handle blog root page
  if (isBlogRootPage(params)) {
    return (
      <BlogList page={1} blogConfig={blogConfig} posts={sortedPosts} />
    )
  }
}
