import type { MDXComponents } from 'mdx/types'
import type { BlogConfig, BlogPost } from '@/fumadocs/types'
import Link from 'fumadocs-core/link'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import { Calendar } from 'lucide-react'
import { createElement } from 'react'
import { QuarteredGridBackground } from '@/fumadocs/components/background'
import { cn } from '@/lib/cn'
// Popover and Badge configuration come from configuration context
import { RelatedSeriesPostsPopover } from './series/info'

interface SinglePostProps {
  page: BlogPost
  category?: string
  lastUpdate?: Date
  tags: string[]
  blogConfig?: BlogConfig
  getCategoryBySlug: (slug: string) => any
  mdxComponents: MDXComponents
  posts?: BlogPost[]
}

const defaultPosts: BlogPost[] = []

export function SinglePost({
  page,
  category,
  lastUpdate,
  tags,
  blogConfig,
  getCategoryBySlug,
  mdxComponents,
  posts = defaultPosts,
}: SinglePostProps) {
  const MDX = page.data.body
  const categoryHref = `${blogConfig?.blogBase ?? 'blog'}/${category}`
  return (
    <>
      <div className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left">
        <QuarteredGridBackground />
        {category && (
          <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 capitalize">
                {getCategoryBySlug(category).icon
                  && createElement(getCategoryBySlug(category).icon, { className: 'h-4 w-4' })}
                <Link href={categoryHref}>
                  {getCategoryBySlug(category).label}
                </Link>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={lastUpdate?.toString()}>
                  {lastUpdate?.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </span>
            </div>
          </div>
        )}
        <DocsTitle className="text-left dark:text-white flex items-center gap-2">
          {page.data.title}
          {/* 当前系列相关文章 Popover */}
          {page.data.series && page.data.seriesPart
            && <RelatedSeriesPostsPopover blogConfig={blogConfig} page={page} posts={posts} />}
        </DocsTitle>

        <DocsDescription className="text-left mt-3 dark:text-gray-300">
          {page.data.description}
        </DocsDescription>

        <div className="flex flex-wrap gap-2 mt-4">
          {tags.length > 0
            && tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      <DocsLayout
        nav={{ enabled: false }}
        tree={{ name: 'Tree', children: [] }}
        sidebar={{ enabled: false, prefetch: false, tabs: false }}
        containerProps={{
          className: cn('flex-row-reverse', 'relative container [--fd-nav-height:calc(var(--spacing)*14)] md:[--fd-nav-height:57px]'),
        }}
      >
        <QuarteredGridBackground />

        <div className="grid grid-cols-4">
          <DocsPage
            toc={page.data.toc}
            full={page.data.full}
            lastUpdate={lastUpdate}
            footer={{ enabled: false }}
            tableOfContent={{ style: 'clerk', single: false }}
            article={{ className: cn('!m-[unset] max-w-none bg-zinc-50/50 dark:bg-zinc-900/50 py-8 md:py-12') }}
          >
            <DocsBody>
              <MDX configuration={mdxComponents} />
            </DocsBody>
          </DocsPage>
        </div>
      </DocsLayout>
    </>
  )
}
