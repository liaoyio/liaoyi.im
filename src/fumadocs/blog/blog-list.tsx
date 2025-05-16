import type { BlogConfig, BlogPost } from '@fumadocs/types'
import PostList from './post-list'
import { getSortedByDatePosts } from './utils'

export function RecentPosts({
  posts,
  heading = 'Recent Posts',
  description,
  recentPostsLimit = 5,
  blogConfig,
}: {
  posts: BlogPost[]
  heading?: string
  description?: string
  recentPostsLimit?: number
  blogConfig?: BlogConfig
}) {
  const sortedPosts = getSortedByDatePosts(posts)
  const displayPosts = sortedPosts.slice(0, recentPostsLimit)
  const totalPages = 1

  return (
    <PostList
      posts={displayPosts}
      currentPage={1}
      totalPages={totalPages}
      disablePagination={true}
      heading={heading}
      description={description}
      blogConfig={blogConfig}
    />
  )
}

export function BlogList({
  page = 1,
  disablePagination = false,
  blogConfig,
  posts,
  heading,
  description,
}: {
  page?: number
  disablePagination?: boolean
  blogConfig?: BlogConfig
  posts: BlogPost[]
  heading?: string
  description?: string
}) {
  const pageSize = blogConfig?.pageSize || 5
  const displayPosts = posts.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(posts.length / pageSize)
  const basePath = blogConfig?.blogBase ?? '/blog'

  return (
    <PostList
      posts={displayPosts}
      currentPage={page}
      totalPages={totalPages}
      disablePagination={disablePagination}
      blogConfig={blogConfig}
      heading={heading}
      description={description}
      basePath={basePath}
    />
  )
}
