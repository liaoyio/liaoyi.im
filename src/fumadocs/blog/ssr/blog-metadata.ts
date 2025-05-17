import type { Metadata } from 'next'
import type { BlogConfig } from '@/fumadocs/types'

import { notFound } from 'next/navigation'
import {
  getCategorySlug,
  getSeriesSlug,
  isBlogRootPage,
  isCategoryPage,
  isPaginatedBlogPage,
  isPaginatedCategoryPage,
  isSeriesPage,
  isSinglePostPage,
} from '../utils/page-type'

// Helper function to generate image metadata for OpenGraph and Twitter
function getImageMetadata(url: string, alt: string) {
  return {
    alt,
    url,
    width: 1200,
    height: 630,
  }
}

export async function generateBlogMetadata(props: {
  params: { slug?: string[] }
  createBlogMetadata: (override: Metadata, blogConstants: any) => Metadata
  blogConfig: BlogConfig
  blogSource: any
  getCategoryBySlug: (slug: string) => any
  getSeriesBySlug: (slug: string) => any
}): Promise<Metadata> {
  const {
    params,
    createBlogMetadata,
    blogConfig,
    blogSource,
    getCategoryBySlug,
    getSeriesBySlug,
  } = props

  const {
    blogTitle: title,
    blogDescription: description,
    blogBase: baseURL,
    blogOgImageBase: ogIMageBaseURL,
  } = blogConfig

  // Default for root blog page or when slug is undefined
  if (isBlogRootPage(params)) {
    const images = getImageMetadata(`/${ogIMageBaseURL ?? 'blog-og'}/image.png`, title)

    return createBlogMetadata({
      title,
      description,
      openGraph: {
        url: `${baseURL ?? '/blog'}`,
        images,
      },
      twitter: {
        images,
      },
      alternates: {
        canonical: `${baseURL ?? '/blog'}`,
      },
    }, title)
  }

  // Handle blog post page
  if (isSinglePostPage(params)) {
    const page = blogSource.getPage(params.slug)
    if (!page)
      notFound()
    const blogPostOgImageUrl = `/${blogConfig.blogOgImageBase ?? 'blog-og'}/${(params.slug || []).join('/')}/image.png`

    const images = getImageMetadata(blogPostOgImageUrl, title)

    return createBlogMetadata({
      title: page.data.title,
      description: page.data.description,
      openGraph: {
        url: page.url,
        images,
      },
      twitter: {
        images,
      },
      alternates: {
        canonical: page.url,
      },
    }, blogConfig)
  }

  // Handle series page
  if (isSeriesPage(params)) {
    const seriesSlug = getSeriesSlug(params)!
    const series = getSeriesBySlug(seriesSlug)
    const canonicalUrl = `${baseURL ?? '/blog'}/series/${seriesSlug}`
    const seriesOgImageUrl = `/${blogConfig.blogOgImageBase ?? 'blog-og'}/series/${seriesSlug}/image.png`

    const images = getImageMetadata(seriesOgImageUrl, title)

    const metadata = createBlogMetadata({
      title: `${series.label}`,
      description: series.description,
      openGraph: {
        url: canonicalUrl,
        images,
      },
      twitter: {
        images,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    }, blogConfig)

    return metadata
  }

  // Handle category page
  if (isCategoryPage(params)) {
    const category = getCategorySlug(params)
    if (!category) {
      return createBlogMetadata({
        title,
        description,
        openGraph: {
          url: baseURL,
        },
        alternates: {
          canonical: baseURL,
        },
      }, blogConfig)
    }

    const canonicalUrl = `${baseURL ?? '/blog'}/${category}`
    const categoryInfo = getCategoryBySlug(category)
    const categoryOgImageUrl = `/${ogIMageBaseURL ?? 'blog-og'}/${category}/image.png`

    const images = getImageMetadata(categoryOgImageUrl, title)

    const metadata = createBlogMetadata({
      title: `${categoryInfo.label}`,
      description: categoryInfo.description,
      openGraph: {
        url: canonicalUrl,
        images,
      },
      twitter: {
        images,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    }, blogConfig)

    return metadata
  }

  // Handle paginated root blog page
  if (isPaginatedBlogPage(params) && params.slug) {
    const page = Number(params.slug[1])
    const canonicalUrl = baseURL ?? '/blog' // Use main blog URL as canonical for all paginated pages

    const images = getImageMetadata(`/${ogIMageBaseURL ?? 'blog-og'}/image.png`, title)

    const { paginationTitle, paginationDescription } = blogConfig

    return createBlogMetadata({
      title: paginationTitle(page),
      description: paginationDescription(page),
      openGraph: {
        url: canonicalUrl,
        images,
      },
      twitter: {
        images,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    }, blogConfig)
  }

  // Handle paginated category page
  if (isPaginatedCategoryPage(params) && params.slug) {
    const category = params.slug[0] || ''
    const page = Number(params.slug[2] || '1')
    const canonicalUrl = `${baseURL ?? '/blog'}/${category}` // Use main category URL as canonical

    const images = getImageMetadata(`/${ogIMageBaseURL ?? 'blog-og'}/${category}/image.png`, title)

    const { categoryPaginationTitle, categoryPaginationDescription } = blogConfig

    return createBlogMetadata({
      title: categoryPaginationTitle(category, page),
      description: categoryPaginationDescription(category, page),
      openGraph: {
        url: canonicalUrl,
        images,
      },
      twitter: {
        images,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    }, blogConfig)
  }

  const images = getImageMetadata(`/${ogIMageBaseURL ?? 'blog-og'}/image.png`, title)

  // Default fallback
  return createBlogMetadata({
    title,
    description,
    openGraph: {
      url: baseURL ?? '/blog',
      images,
    },
    twitter: {
      images,
    },
    alternates: {
      canonical: baseURL ?? '/blog',
    },
  }, blogConfig)
}
