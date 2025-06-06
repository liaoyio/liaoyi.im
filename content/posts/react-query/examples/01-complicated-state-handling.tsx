'use client'

import { useEffect, useState } from 'react'

interface Category {
  id: number
  name: string
  image: string
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://api.escuelajs.co/api/v1/categories')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setCategories(data.slice(0, 5))
    }
    catch (err) {
      setError(err instanceof Error ? err : new Error('发生未知错误'))
    }
    finally {
      setIsLoading(false)
    }
  }

  // 组件挂载时获取数据
  useEffect(() => {
    fetchCategories()
  }, [])

  // 加载状态显示
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
    <div className="grid grid-cols-5 gap-4 container m-auto">
      {categories.map(category => (
        <article key={category.id}>
          <img src={category.image} alt={category.name} className="size-30 rounded !m-0" />
          <p>Clothes</p>
        </article>
      ))}
    </div>
  )
}
