import type { loader } from 'fumadocs-core/source'
import type { BlogConfig } from '@/fumadocs/types'

import { blogConfig, getSeriesBySlug } from '@/post-config'
import { BlogList } from './blog-list'
import { SeriesList } from './series/list'
import { getSortedByDatePosts } from './utils'
import { getSeriesSlug, isBlogRootPage, isSeriesPage } from './utils/page-type'

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

  // Handle series page
  if (isSeriesPage(params)) {
    const seriesSlug = getSeriesSlug(params)!
    return (
      <SeriesList
        seriesSlug={seriesSlug}
        posts={sortedPosts}
        getSeriesBySlug={getSeriesBySlug}
      />
    )
  }
}
