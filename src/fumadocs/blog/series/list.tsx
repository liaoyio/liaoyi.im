import type { BlogPost } from '@/fumadocs/types'
import { QuarteredGridBackground } from '@fumadocs/components/background'
import { Book } from '@fumadocs/components/book'
import { BookOpen } from 'lucide-react'
import React from 'react'
import { PostCard } from '../post-card'

interface SeriesListProps {
  seriesSlug: string
  posts?: BlogPost[]
  getSeriesBySlug: (slug: string) => any
}

const defaultPosts: BlogPost[] = []

/** 系列文章列表 (未添加分页) */
export function SeriesList({
  seriesSlug,
  posts = defaultPosts,
  getSeriesBySlug,
}: SeriesListProps) {
  const seriesInfo = getSeriesBySlug(seriesSlug)

  const seriesPosts = posts
    .filter(post => post?.data.series === seriesSlug)
    .sort((a, b) => (a?.data.seriesPart ?? 0) - (b?.data.seriesPart ?? 0))

  return (
    <div className="container px-4 py-8 lg:py-12 lg:px-6">
      <QuarteredGridBackground />
      <div className="relative">
        <div className="flex flex-col md:flex-row gap-8 mb-8 md:items-center items-start">
          <Book
            color="#3b82f6"
            depth={6}
            width={150}
            illustration={(
              <div className="flex items-center justify-center h-full w-full p-4">
                <BookOpen size={32} className="text-white" />
              </div>
            )}
          >
            <div className="p-3 mb-2 grid gap-2">
              <h3 className="font-semibold text-sm">{seriesInfo.label}</h3>
              <div className="text-xs space-x-2">
                {seriesPosts.length}
                {' '}
                Parts
              </div>
            </div>
          </Book>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">
              {seriesInfo.label}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {seriesInfo.description}
            </p>
          </div>
        </div>

        <ul className="space-y-6">
          {seriesPosts.map((post, index) => (
            <li key={String(post?.url) + String(index)}>
              <PostCard post={post} hasSeriesPartIndex={true} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
