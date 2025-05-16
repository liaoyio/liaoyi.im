/**
 * Helper functions to determine page types based on URL parameters
 */

/** 检查当前路由是否为 post 根页面 */
export function isBlogRootPage(params: { slug?: string[] }): boolean {
  return !params.slug || params.slug.length === 0
}

/** 检查当前路由是否为系列页面 */
export function isSeriesPage(params: { slug?: string[] }): boolean {
  return (
    !!params.slug
    && params.slug.length >= 2
    && params.slug[0] === 'series'
    && !!params.slug[1]
  )
}

/** 如果是系列页面，则从 params 获取系列标记 */
export function getSeriesSlug(params: { slug?: string[] }): string | null {
  if (
    isSeriesPage(params)
    && params.slug
    && params.slug.length > 1
    && params.slug[1]
  ) {
    return params.slug[1]
  }
  return null
}
