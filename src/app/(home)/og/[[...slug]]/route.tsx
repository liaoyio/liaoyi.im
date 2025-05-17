import { generateOgImageStaticParams } from '@/fumadocs/blog/ssr/blog-static-params'
import { generateOGImageMetadata } from '@/fumadocs/blog/ssr/og-image'
import { generateOGImage } from '@/lib/og/og'
import { postsSource } from '@/lib/source'
import { blogConfig, getCategoryBySlug, getSeriesBySlug } from '@/post-config'

// eslint-disable-next-line react-refresh/only-export-components
export const contentType = 'image/png'
export const dynamic = 'force-static'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const resolvedParams = await params // { slug: [ 'image.png' ] }

  const metadata = generateOGImageMetadata(resolvedParams, {
    blogConfig,
    getCategoryBySlug,
    getSeriesBySlug,
    blogSource: postsSource,
  })

  const image = generateOGImage(metadata)
  return image
}

export async function generateStaticParams() {
  const posts = postsSource.getPages()
  /**
   *   { slug: [ 'image.png' ] },
   *   { slug: [ 'page', '2', 'image.png' ] },
   *   { slug: [ 'page', '4', 'image.png' ] },
   *   { slug: [ 'idea', 'image.png' ] },
   */
  const imageRoutes = await generateOgImageStaticParams(postsSource, posts)
  return imageRoutes
}
