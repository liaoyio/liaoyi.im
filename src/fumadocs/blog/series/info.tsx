import type { BlogConfig, BlogPost } from '@/fumadocs/types'
import Link from 'fumadocs-core/link'
import { BookOpen } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/cn'
import { getSeriesInfo } from '../utils'

interface SeriesComponentProps {
  seriesName: string
  currentPart: number
  posts: BlogPost[]
  blogConfig?: BlogConfig
}

/** 展示当前系列其它文章链接  */
export function RelatedSeriesPosts({
  seriesName,
  currentPart,
  posts,
  blogConfig,
}: SeriesComponentProps) {
  const seriesInfo = getSeriesInfo(seriesName, posts)
  if (!seriesInfo)
    return null

  // 🌰: /posts/series/x
  const { title, posts: seriesPosts, totalParts } = seriesInfo
  const seriesHref = `${blogConfig?.blogBase ?? 'blog'}/series/${seriesName}`
  return (
    <div className="my-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-2 font-medium text-gray-900 dark:text-white">
        Part
        {' '}
        {currentPart}
        {' '}
        of
        {' '}
        {totalParts}
        {' '}
        in series:
        {' '}
        <Link href={seriesHref} className="text-blue-600 dark:text-blue-400 hover:underline">
          {title}
        </Link>
      </div>
      <div className="space-y-1">
        {seriesPosts.map((post, index) => {
          const isCurrent = post?.data.seriesPart === currentPart
          return (
            <div
              key={String(post?.url) + String(index)}
              className={cn(
                'flex items-center',
                isCurrent && 'font-medium text-blue-600 dark:text-blue-400',
                !isCurrent && 'text-gray-600 dark:text-gray-400',
              )}
            >
              <span className="mr-2 text-sm">
                {(post?.data.seriesPart || index + 1).toString().padStart(2, '0')}
              </span>
              <Link
                href={post?.url}
                className={cn(
                  'hover:underline',
                  !isCurrent && 'hover:text-blue-600 dark:hover:text-blue-400',
                )}
              >
                {post?.data.title}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** 当前系列相关文章 Popover  */
export function RelatedSeriesPostsPopover({
  page,
  posts,
  blogConfig,
}: { page: any, posts: BlogPost[], blogConfig?: BlogConfig }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative ml-1 bg-foreground/5"
          aria-label="View series information"
        >
          <BookOpen className="size-5" aria-hidden="true" />
          <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1 text-xs">
            {page?.data.seriesPart}
            {' '}
            /
            {' '}
            {getSeriesInfo(page.data.series, posts)?.totalParts || 0}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <RelatedSeriesPosts
          seriesName={page.data.series}
          currentPart={page.data.seriesPart}
          posts={posts}
          blogConfig={blogConfig}
        />
      </PopoverContent>
    </Popover>
  )
}
