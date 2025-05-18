import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  const photos = Array.from({ length: 6 }, (_, i) => i + 1)
  return (
    <section className="mx-auto grid max-w-screen-md grid-cols-2 items-center justify-center gap-6 p-4 pt-20 md:grid-cols-3">
      {photos.map(id => (
        <Link
          className="flex items-center rounded-xl border bg-gray-100 p-1 text-2xl font-medium decoration-0 md:size-[200px]"
          key={id}
          href={`/examples/intercepting-routes/photos/${id}`}
          passHref
        >
          <Image
            className="rounded-lg ease-in hover:opacity-80"
            src={`/images/t${id}.jpg`}
            alt="photos image"
            height={200}
            width={200}
          />
        </Link>
      ))}
    </section>
  )
}
