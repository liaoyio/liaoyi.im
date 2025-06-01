import type { Metadata } from 'next'
import type { BlogConfig } from '@/fumadocs/types'
import { Brain, Carrot, Cog, LucideBook, Volleyball, Wrench } from 'lucide-react'
import { ReactQueryIcon } from '@/components/icons'
import { Social } from '@/fumadocs/components/icons/social'

export const blogConfig = {
  blogTitle: 'Blog',
  blogDescription: 'Articles and thoughts',
  siteName: 'liaoyi.im',
  defaultAuthorName: 'liaoyi',
  xUsername: '@liaoyia',
  // Pagination
  paginationTitle: (page: number) => `Blog - Page ${page}`,
  paginationDescription: (page: number) =>
    `Articles and thoughts - Page ${page}`,
  categoryPaginationTitle: (category: string, page: number) =>
    `${category.charAt(0).toUpperCase() + category.slice(1)} - Page ${page}`,
  categoryPaginationDescription: (category: string, page: number) =>
    `Articles in the ${category} category - Page ${page}`,
  // URLs
  blogBase: '/posts',
  blogOgImageBase: 'og',
  pageSize: 5,
}

export function createBlogMetadata(
  override: Metadata,
  blogConfig: BlogConfig,
): Metadata {
  const { defaultAuthorName, siteName, xUsername } = blogConfig
  const siteUrl = `https://${siteName}`

  const author = {
    name: defaultAuthorName,
    url: siteUrl,
  }

  return {
    ...override,
    authors: [author],
    creator: defaultAuthorName,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: siteUrl,
      siteName,
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      site: xUsername,
      creator: xUsername,
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      ...override.twitter,
    },
    alternates: {
      canonical: '/',
      types: { 'application/rss+xml': '/api/rss.xml' },
      ...override.alternates,
    },
    icons: {
      icon: [
        {
          media: '(prefers-color-scheme: light)',
          url: '/icon.svg.svg',
          href: '/icon.svg',
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: '/icon.svg.svg',
          href: '/icon.svg',
        },
      ],
    },
  }
}

export function getCategoryBySlug(slug: string) {
  const categories = {
    'idea': {
      label: '探索和思考',
      icon: Brain,
      description: '记录一些头脑风暴、探索和思考',
    },
    'react-query': {
      label: 'React Query',
      icon: ReactQueryIcon,
      description: '关于如何使用 React Query，轻松解决前端开发时对异步状态的管理。',
    },
    'tools-tech': {
      label: '生产力工具',
      icon: Cog,
      description: '用于记录日常生活、工作、开发时的一些增效工具使用',
    },
  }

  return (
    categories[slug as keyof typeof categories] || {
      label: slug.toString().replace(/-/g, ' ').toLowerCase(),
      icon: Social.github,
    }
  )
}

export function getSeriesBySlug(slug: string) {
  const series = {
    'seo': {
      label: 'SEO 优化',
      icon: Carrot,
      description: '关于前端开发工程师需要知道的 SEO 知识系列文章。',
    },
    'react-query': {
      label: 'React Query',
      icon: ReactQueryIcon,
      description: '关于如何使用 React Query，轻松解决前端开发时对异步状态的管理',
    },
    'qa': {
      label: '踩坑记录',
      icon: Wrench,
      description: '记录日常开发碰到的问题，和解决方案',
    },
    'react-component': {
      label: 'React 组件',
      icon: Volleyball,
      description: '关于构建 React 组件的系列文章。',
    },
    // Add more series here as needed
  }

  return (
    series[slug as keyof typeof series] || {
      label: slug.charAt(0).toUpperCase() + slug.slice(1),
      icon: LucideBook,
      description: `Articles in the ${slug.charAt(0).toUpperCase() + slug.slice(1)} series.`,
    }
  )
}
