import { postsSource } from '@/lib/source'

export default function page() {
  return (
    <div>posts</div>
  )
}

export async function generateStaticParams() {
  return postsSource.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
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
