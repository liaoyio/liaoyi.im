'use client'

import { useQuery } from '@tanstack/react-query'

interface Category {
  id: number
  name: string
  image: string
}

export default function CategoriesList() {
  const { data: categories, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories')
      const res = await response.json()
      return res.slice(0, 5) as Category[]
    },
  })

  // 处理加载状态
  if (isLoading) {
    return (
      <div className="container m-auto  text-center">
        加载中...
      </div>
    )
  }

  // 错误状态显示
  if (error) {
    return (
      <div className="container m-auto  text-center text-orange-600">
        发生错误:
        {error.message}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 container m-auto">
      {categories?.map(category => (
        <article key={category.id}>
          <img src={category.image} alt={category.name} className="size-30 rounded" />
          <p>Clothes</p>
        </article>
      ))}
    </div>
  )
}
