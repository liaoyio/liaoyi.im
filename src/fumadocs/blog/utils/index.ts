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

/**
 * Returns all unique series names from posts
 */
export function getSeriesNames(posts: BlogPost[]) {
  const seriesSet = new Set<string>()

  for (const post of posts) {
    if (post.data.series) {
      seriesSet.add(post.data.series)
    }
  }

  return Array.from(seriesSet).sort()
}

/**
 * Returns all posts for a specific series
 */
export function getPostsBySeries(seriesName: string, posts: BlogPost[]) {
  return posts
    .filter(post => post.data.series === seriesName)
    .sort((a, b) => {
      // Sort by seriesPart if available, otherwise by date
      if (a.data.seriesPart && b.data.seriesPart) {
        return a.data.seriesPart - b.data.seriesPart
      }
      return a.data.date.getTime() - b.data.date.getTime()
    })
}

/**
 * Returns comprehensive information about a series
 */
export function getSeriesInfo(seriesName: string, posts: BlogPost[]) {
  const seriesPosts = getPostsBySeries(seriesName, posts)
  if (seriesPosts.length === 0)
    return null

  // Use the first post's title to extract series name if possible
  const firstPost = seriesPosts[0]
  if (!firstPost)
    return null

  const title = firstPost.data.title || ''
  const seriesTitle = title.includes('Part')
    ? title.split('Part')[0].trim()
    : seriesName.charAt(0).toUpperCase() + seriesName.slice(1)

  return {
    name: seriesName,
    title: seriesTitle,
    posts: seriesPosts,
    totalParts: seriesPosts.length,
  }
}
