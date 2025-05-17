import type { BlogConfig } from '@/fumadocs/types'
import readingTime from 'reading-time'

import {
  getCategorySlug,
  getPageNumber,
  getSeriesSlug,
  isBlogRootPage,
  isCategoryPage,
  isPaginatedBlogPage,
  isPaginatedCategoryPage,
  isSeriesPage,
} from '../utils/page-type'

export interface OGImageMetadata {
  /** Title for the OG image */
  title: string
  /** * Optional description for the OG image */
  description?: string
  [key: string]: any
}

export interface OGImageGeneratorConfig {
  /** Blog constants from the application */
  blogConfig: BlogConfig
  /** Function to get category information by slug */
  getCategoryBySlug: (slug: string) => { label: string, description?: string }
  /** Function to get series information by slug */
  getSeriesBySlug: (slug: string) => { label: string, description?: string }
  /** * Blog source to get post data */
  blogSource: any
}

/**
 * Process URL parameters by removing image.png from the slug
 */
export function processImageParams(params: { slug?: string[] }) {
  return {
    slug: params.slug?.filter(s => s !== 'image.png'),
  }
}

/**
 * Generate OG image metadata based on URL parameters
 */
export function generateOGImageMetadata(
  params: { slug?: string[] },
  config: OGImageGeneratorConfig,
): any {
  const processedParams = processImageParams(params)
  const { blogConfig, getCategoryBySlug, getSeriesBySlug, blogSource }
    = config

  const base = {
    title: `Hi, I'm liaoyi 👋`,
    description: '这里是我的数字花园，一个记录思考与成长的个人空间。',
  }

  // Blog root page
  if (isBlogRootPage(processedParams)) {
    return base
  }

  // Series page
  if (isSeriesPage(processedParams)) {
    const seriesSlug = getSeriesSlug(processedParams)
    if (seriesSlug) {
      const series = getSeriesBySlug(seriesSlug)
      if (series) {
        return {
          title: series.label,
          description: series.description,
        }
      }
    }
  }

  // Category page
  if (isCategoryPage(processedParams)) {
    const categorySlug = getCategorySlug(processedParams)
    if (categorySlug) {
      const categoryInfo = getCategoryBySlug(categorySlug)
      if (categoryInfo) {
        return {
          title: categoryInfo.label,
          description: categoryInfo.description,
        }
      }
    }
  }

  // Paginated blog page
  if (isPaginatedBlogPage(processedParams)) {
    // const pageNumber = getPageNumber(processedParams)
    return base
  }

  // Paginated category page
  if (isPaginatedCategoryPage(processedParams)) {
    const categorySlug = processedParams.slug?.[0] || ''
    const pageNumber = getPageNumber(processedParams)
    const categoryInfo = getCategoryBySlug(categorySlug)

    if (categoryInfo) {
      return {
        title: blogConfig.categoryPaginationTitle(categorySlug, pageNumber),
        description: categoryInfo.description,
      }
    }
  }

  // Single post page (default case for any other URL pattern)
  if (processedParams.slug && processedParams.slug.length > 0) {
    const post = blogSource.getPage(processedParams.slug)
    const stats = readingTime(post.data.content)
    const minutes = Math.ceil(stats.minutes)

    if (post && post.data && post.data.title) {
      return {
        single: true,
        title: post.data.title,
        description: post.data.description,
        series: post.data.series,
        minutes,
        words: stats.words,
        date: post.data.date?.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      }
    }
  }

  // Default fallback
  return base
}
