import type { Metadata } from 'next/types'

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    authors: [
      {
        name: 'Liaoyi',
        url: 'https://liaoyi.im',
      },
    ],
    creator: 'Liaoyi',
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://liaoyi.im',
      siteName: 'liaoyi.im',
      images: '/og.svg',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@liaoyia',
      creator: '@liaoyia',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/og.svg',
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
          url: '/icon.svg',
          href: '/icon.svg',
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: '/icon.svg',
          href: '/icon.svg',
        },
      ],
    },
  }
}

export const baseUrl
  = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_SITE_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.NEXT_PUBLIC_SITE_URL}`)
