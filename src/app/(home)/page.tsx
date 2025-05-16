import { RecentPosts } from '@/fumadocs/blog/blog-list'
import { QuarteredGridBackground } from '@/fumadocs/components/background'
import Hero from '@/fumadocs/components/hero'
import { postsSource } from '@/lib/source'
import { blogConfig } from '@/post-config'

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <div className="relative flex w-full flex-col items-center overflow-x-hidden">
        <QuarteredGridBackground maxWidthClass="container" />
        <div className="relative flex items-center justify-center w-full mx-auto container">
          <div className="space-y-8">
            <Hero />
          </div>
        </div>
        <RecentPosts
          blogConfig={blogConfig}
          posts={postsSource.getPages()}
          heading="Recent Posts"
          description="The recently published"
        />
      </div>
    </div>
  )
}
