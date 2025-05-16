import type { BlogConfig, BlogPost } from '@/fumadocs/types'
import { QuarteredGridBackground } from '@fumadocs/components/background'
import { DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { Pagination } from './pagination'
import { PostCard } from './post-card'

export interface PostListProps {
  posts: BlogPost[]
  currentPage: number
  totalPages: number
  heading?: string
  description?: string
  basePath?: string
  blogConfig?: BlogConfig
  disablePagination?: boolean
}

export default function PostList({
  posts,
  currentPage,
  totalPages,
  heading = 'Blog Posts',
  description = 'Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.',
  basePath = '/blog',
  disablePagination = false,
}: PostListProps) {
  return (
    <>
      <section className="relative container px-4 py-8 lg:py-12 lg:px-6 text-left bg-zinc-50/50 dark:bg-zinc-900/50">
        <QuarteredGridBackground />
        <div className="text-center">
          <DocsTitle className="dark:text-white capitalize">
            {heading}
          </DocsTitle>
          <DocsDescription className="mt-3 dark:text-gray-300 mb-0 font-light">
            {description}
          </DocsDescription>
        </div>
      </section>

      <section className="relative container text-left">
        <QuarteredGridBackground />
        <div className="grid sm:grid-cols-12">
          {posts
            .filter(
              (post): post is NonNullable<typeof post> => post !== undefined,
            )
            .map(post => (<PostCard key={post.url} hasSeriesBadge post={post} className="order-last border-x border-b border-t-0 sm:order-first sm:col-span-12 lg:col-span-12 bg-transparent dark:bg-transparent" />))}
        </div>

        {!disablePagination && (
          <div className="pb-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={basePath}
            />
          </div>
        )}
      </section>
    </>
  )
}
