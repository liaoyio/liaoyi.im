import type { Metadata } from 'next'
import { generateBlogStaticParams } from '@fumadocs/blog/ssr/blog-static-params'
import { generateBlogMetadata } from '@/fumadocs/blog/ssr/blog-metadata'
import BlogWrapper from '@/fumadocs/blog/wrapper'
import { postsSource } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'
import { blogConfig, createBlogMetadata, getCategoryBySlug, getSeriesBySlug } from '@/post-config'

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
  const posts = postsSource.getPages()
  return generateBlogStaticParams(postsSource, posts)
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params

  return generateBlogMetadata({
    params,
    createBlogMetadata,
    blogConfig,
    blogSource: postsSource,
    getCategoryBySlug,
    getSeriesBySlug,
  })
}
