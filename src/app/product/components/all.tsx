/* eslint-disable @next/next/no-img-element */
import type { Product } from '../api/products'
import { useQuery } from '@tanstack/react-query'

import { Card } from '@/components/ui/card'
import { getProducts } from '../api/products'

export default function All() {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error instanceof Error) {
    return (
      <div>
        请求错误❌
        {error.message}
      </div>
    )
  }

  return (
    <>

      <div className=" grid grid-cols-4 gap-8">
        {
          data?.map(item => (
            <Card key={item.id} className="p-6 aspect-square relative  ">
              <img
                src={item.image}
                alt={item.title}
                className="size-full rounded bg-white object-contain transition duration-300 ease-in-out hover:scale-105"
              />
              <h3 className="line-clamp-1">{item.title}</h3>
              <p className="line-clamp-2 text-fd-muted-foreground text-sm">{item.description}</p>

            </Card>
          ))
        }
      </div>
    </>
  )
}
