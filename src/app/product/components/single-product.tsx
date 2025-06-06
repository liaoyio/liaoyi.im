/* eslint-disable @next/next/no-img-element */
import type { Product } from '../api/products'
import { useQuery } from '@tanstack/react-query'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { getProductByID, getProducts } from '../api/products'

export default function SingleProduct() {
  // 先获取所有产品的 id，然后根据 id 获取单个产品
  const { data: allProducts, error: allProductsError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const [id, setId] = useState(allProducts?.[0].id)

  if (!id || allProductsError instanceof Error) {
    return <div>no product</div>
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: product, isPending } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductByID(id),
    enabled: !!id,
  })

  return (
    <>
      {id && (
        <div className="flex flex-wrap gap-4">
          {allProducts?.map(product => (
            <div
              key={product.id}
              onClick={() => setId(product.id)}
              className="size-16 p-1 relative rounded-full bg-center bg-contain border"
              style={
                {
                  backgroundImage: `url(${product.image})`,
                }
              }
            >

            </div>
          ))}
        </div>
      )}
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <Card key={product?.id} className="p-6 aspect-square relative mt-12 w-80">
          <img
            src={product?.image}
            alt={product?.title}
            className="size-full rounded bg-white object-contain transition duration-300 ease-in-out hover:scale-105"
          />
          <h3 className="line-clamp-1">{product?.title}</h3>
          <p className="line-clamp-2 text-fd-muted-foreground text-sm">{product?.description}</p>
        </Card>
      )}
    </>
  )
}
