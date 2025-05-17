import type { Metadata } from 'next'
import type { BlogConfig } from '@/fumadocs/types'
import { Brain, Code, Cog, Lightbulb, LucideBook, Megaphone, Rocket, Users, Wrench } from 'lucide-react'
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

// Moved from lib/categories.ts
export function getCategoryBySlug(slug: string) {
  const categories = {
    'behind-the-scenes': {
      label: 'Behind the Scenes',
      icon: Wrench,
      description:
        'Raw process of building—why and how you create tools, launches, updates, redesigns.',
    },
    'dev-life': {
      label: 'Dev Life',
      icon: Code,
      description:
        'Personal takes on being a developer/founder—tips, lessons, workflows.',
    },
    'plans': {
      label: 'Plans',
      icon: Lightbulb,
      description:
        'Public brainstorming—future features, tool concepts, Teurons\' direction.',
    },
    'idea': {
      label: 'Idea',
      icon: Brain,
      description:
        'Exploratory thoughts and wild concepts for Teurons and beyond.',
    },
    'tools-tech': {
      label: 'Tools Tech',
      icon: Cog,
      description: 'Deep dives into tech stacks, tool mechanics, trends.',
    },
    'team': {
      label: 'Team',
      icon: Users,
      description: 'Teurons\' startup journey, team dynamics, Betalectic roots.',
    },
    'startup': {
      label: 'Startup',
      icon: Rocket,
      description: 'Growth stories and insights from Teurons and Betalectic.',
    },
    'opinions': {
      label: 'Opinions',
      icon: Megaphone,
      description:
        'Subjective, wild, gut-hunch takes—less informed, out-of-box rants.',
    },
    'deep-domain-problems': {
      label: 'Deep Domain Problems',
      icon: LucideBook,
      description:
        'Isolated series like a book/course—tackling big, specific domain issues.',
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
    'x': {
      label: 'Series X',
      icon: LucideBook,
      description:
        'A comprehensive series on Zero Trust security architecture.',
    },
    'building-react-component-library': {
      label: 'Building React Component Library',
      icon: LucideBook,
      description: 'A series on building a React component library.',
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
