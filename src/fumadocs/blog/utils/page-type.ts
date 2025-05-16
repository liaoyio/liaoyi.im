/**
 * Helper functions to determine page types based on URL parameters
 */

/**
 * Checks if the current route is the blog root page
 */
export function isBlogRootPage(params: { slug?: string[] }): boolean {
  return !params.slug || params.slug.length === 0
}
