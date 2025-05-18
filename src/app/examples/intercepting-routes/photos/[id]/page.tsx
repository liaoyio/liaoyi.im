import Image from 'next/image'

export const dynamicParams = false

export function generateStaticParams() {
  const slugs = ['1', '2', '3', '4', '5', '6']
  return slugs.map(slug => ({ id: slug }))
}

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return (
    <main className="flex justify-center items-center mx-auto max-w-screen-md pt-10">
      <div className="size-[400px] items-center rounded-xl bg-gray-100 p-1">
        <Image
          src={`/images/t${id}.jpg`}
          width={400}
          height={400}
          alt={id}
          className="rounded-lg"
        />
      </div>
    </main>
  )
}
