import type { BlogPost } from '@/fumadocs/types'

/**
 * Returns posts sorted by date (newest first)
 */
export function getSortedByDatePosts(posts: BlogPost[], includeDrafts: boolean = false): BlogPost[] {
  const filteredPosts = posts.filter(
    post => includeDrafts || !post.data.draft,
  )
  return [...filteredPosts].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  )
}
