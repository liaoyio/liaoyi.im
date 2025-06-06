'use client'
import type { ProductsResponse } from './types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Alert, Card, Image, List, Rate, Space, Spin, Tag, Typography } from 'antd'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const { Text, Paragraph } = Typography

async function fetchProducts({ pageParam = 0 }): Promise<ProductsResponse> {
  const limit = 10
  const skip = pageParam * limit
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export default function InfiniteProductList() {
  const { ref, inView } = useInView()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { skip, limit, total } = lastPage
      const nextPage = skip + limit
      return nextPage < total ? nextPage / limit : undefined
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  if (status === 'pending') {
    return (
      <div className="text-center p-12.5">
        <Spin size="large" />
      </div>
    )
  }

  if (status === 'error') {
    return <Alert type="error" message="Error" description={error.message} showIcon />
  }

  return (
    <Card title="Infinite Product List">
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={data.pages.flatMap(page => page.products)}
        renderItem={product => (
          <List.Item>
            <Card
              hoverable
              cover={(
                <div style={{ padding: '20px', textAlign: 'center', background: '#fafafa' }}>
                  <Image
                    alt={product.title}
                    src={product.thumbnail}
                    style={{ height: 200, objectFit: 'contain' }}
                    preview={{
                      src: product.images[0],
                    }}
                  />
                </div>
              )}
            >
              <Card.Meta
                title={(
                  <Paragraph
                    ellipsis={{ rows: 2 }}
                    style={{ marginBottom: 8 }}
                  >
                    {product.title}
                  </Paragraph>
                )}
                description={(
                  <Space direction="vertical" size={4} style={{ width: '100%' }}>
                    <Space>
                      <Tag color="blue">{product.brand}</Tag>
                      <Tag color="green">{product.category}</Tag>
                    </Space>
                    <Space direction="vertical" size={0}>
                      <Text type="secondary" delete>
                        $
                        {(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                      </Text>
                      <Text strong style={{ fontSize: 16 }}>
                        $
                        {product.price}
                      </Text>
                    </Space>
                    <Space>
                      <Rate disabled defaultValue={product.rating} allowHalf />
                      <Text type="secondary">
                        (
                        {product.rating}
                        )
                      </Text>
                    </Space>
                    <Tag color={product.stock > 10 ? 'green' : product.stock > 0 ? 'orange' : 'red'}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </Tag>
                  </Space>
                )}
              />
            </Card>
          </List.Item>
        )}
      />

      <div ref={ref} className="mt-5 h-12 flex items-center justify-center">
        {isFetchingNextPage
          ? <Spin />
          : hasNextPage
            ? 'Load More'
            : 'No More Products'}
      </div>
    </Card>
  )
}
