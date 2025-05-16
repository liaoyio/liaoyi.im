import type { MDXComponents } from 'mdx/types'
import type { BlogConfig } from '@/fumadocs/types'
import { notFound } from 'next/navigation'
import { BlogList, CategoryBlogList } from './blog-list'
import { SeriesList } from './series/list'
import { SinglePost } from './single-post'
import { getSortedByDatePosts } from './utils'
import { getCategorySlug, getPageNumber, getSeriesSlug, isBlogRootPage, isCategoryPage, isPaginatedBlogPage, isPaginatedCategoryPage, isSeriesPage, isSinglePostPage } from './utils/page-type'

interface BlogWrapperProps {
  params: { slug?: string[] }
  blogSource: any
  posts: any[]
  getCategoryBySlug: (slug: string) => any
  getSeriesBySlug: (slug: string) => any
  mdxComponents: MDXComponents
  includeDrafts?: boolean
  blogConfig?: BlogConfig
}

export default function BlogWrapper({
  params,
  posts,
  includeDrafts = process.env.NODE_ENV !== 'production',
  blogSource,
  getCategoryBySlug,
  getSeriesBySlug,
  blogConfig,
  mdxComponents,

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

  // Handle category page
  if (isCategoryPage(params)) {
    const category = getCategorySlug(params)
    return (
      <CategoryBlogList
        category={category}
        blogConfig={blogConfig}
        posts={sortedPosts}
        getCategoryBySlug={getCategoryBySlug}
      />
    )
  }

  // Handle paginated blog page
  if (isPaginatedBlogPage(params)) {
    return (
      <BlogList
        page={getPageNumber(params)}
        blogConfig={blogConfig}
        posts={sortedPosts}
      />
    )
  }

  // Handle paginated category page
  if (isPaginatedCategoryPage(params)) {
    const category = params.slug?.[0]

    if (!category) {
      return notFound()
    }

    return (
      <CategoryBlogList
        category={category}
        page={getPageNumber(params)}
        blogConfig={blogConfig}
        posts={sortedPosts}
        getCategoryBySlug={getCategoryBySlug}
      />
    )
  }

  // Handle blog post page
  if (isSinglePostPage(params)) {
    const page = blogSource.getPage(params.slug)
    const category = params.slug?.[0] || undefined

    if (!page)
      notFound()

    const lastModified = page?.data.date
    const lastUpdate = lastModified ? new Date(lastModified) : undefined
    const tags = page?.data.tags ?? []

    return (
      <SinglePost
        page={page}
        category={category}
        lastUpdate={lastUpdate}
        tags={tags}
        blogConfig={blogConfig}
        getCategoryBySlug={getCategoryBySlug}
        mdxComponents={mdxComponents}
        posts={sortedPosts}
      />
    )
  }
}
