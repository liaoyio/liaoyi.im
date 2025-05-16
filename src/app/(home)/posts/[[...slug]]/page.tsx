import type { Metadata } from 'next'
import BlogWrapper from '@/fumadocs/blog/wrapper'
import { postsSource } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'
import { blogConfig, getCategoryBySlug, getSeriesBySlug } from '@/post-config'

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const posts = postsSource.getPages()

  return (
    <BlogWrapper
      params={params}
      blogSource={postsSource}
      posts={posts}
      blogConfig={blogConfig}
      getCategoryBySlug={getCategoryBySlug}
      getSeriesBySlug={getSeriesBySlug}
      mdxComponents={getMDXComponents()}
    />
  )
}

export async function generateStaticParams() {
  return postsSource.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = postsSource.getPage(params.slug)
  if (!page) {
    //  notFound()
    return {
      title: '404',
      description: '404 NotFound',
    }
  }
  return {
    title: page?.data.title,
    description: page?.data.description,
  }
}
