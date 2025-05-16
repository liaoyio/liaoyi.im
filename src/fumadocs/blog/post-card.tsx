import Link from 'fumadocs-core/link'
import { HoverHighlightCard } from '@/fumadocs/hover-highlight-card'
import { cn } from '@/lib/cn'

interface PostHighlightCardProps {
  post: any
  className?: string
  hasSeriesPartIndex?: boolean
  hasSeriesBadge?: boolean
}

export function PostCard({
  post,
  hasSeriesPartIndex = false,
  className = '',
  hasSeriesBadge = false,
}: PostHighlightCardProps) {
  const hasSeries = !!post?.data.series
  return (
    <HoverHighlightCard hasTranslate={false} className={cn('p-0', className)}>
      <div className="size-full">
        {
          hasSeriesPartIndex && (
            <div className="size-10 border-r border-b border-dashed flex items-center justify-center absolute top-0 left-0">
              {post?.data.seriesPart || ''}
            </div>
          )
        }

        {
          hasSeriesBadge && hasSeries && (
            <Link href={`/posts/series/${post?.data.series}`} className="py-2 px-6 border-l border-b border-dashed flex items-center justify-center absolute top-0 right-0">
              {post?.data.series || ''}
            </Link>
          )
        }

        <div className="px-4 py-8 pl-18 space-y-4">
          <div>
            <Link href={post?.url}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2">
                {post?.data.title}
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {post?.data.description}
            </p>
          </div>

          <div className="flex md:flex-row flex-col md:items-center ms:text-sm text-xs text-gray-500 dark:text-gray-400 ">
            <time dateTime={post?.data.date.toISOString()}>
              {post?.data.date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {post?.data.tags && post.data.tags.length > 0 && (
              <>
                <span className="mx-2 md:block hidden">•</span>
                <div className="md:flex hidden flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                  {post.data.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </HoverHighlightCard>
  )
}
