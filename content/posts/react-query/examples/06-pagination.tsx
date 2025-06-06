'use client'
import type { TablePaginationConfig } from 'antd/es/table'
import type { PaginationParams, ProductsResponse } from './types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Alert, Card, Space, Spin, Table, Tag } from 'antd'
import { useState } from 'react'

async function fetchProducts({ page, limit }: PaginationParams): Promise<ProductsResponse> {
  const skip = (page - 1) * limit
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export default function ProductList() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
  })

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['products', pagination],
    queryFn: () => fetchProducts(pagination),
    placeholderData: keepPreviousData,
  })

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      page: newPagination.current || 1,
      limit: newPagination.pageSize || 10,
    })
  }

  if (isPending) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>

    )
  }

  if (isError) {
    return (
      <Alert
        type="error"
        message="Error"
        description={error.message}
        showIcon
      />
    )
  }

  return (
    <div className=" container mx-auto py-10">
      <Card title="Product List">
        <Table
          columns={[
            {
              title: 'Thumbnail',
              dataIndex: 'thumbnail',
              key: 'thumbnail',
              render: thumbnail => (
                <img src={thumbnail} alt="product" style={{ width: 80, height: 80, objectFit: 'contain' }} />
              ),
            },
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              render: title => (
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {title}
                </div>

              ),
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
              render: (price, record) => (
                <Space direction="vertical" size={0}>
                  <span style={{ color: '#ff4d4f', textDecoration: 'line-through' }}>
                    $
                    {(price * (1 + record.discountPercentage / 100)).toFixed(2)}
                  </span>

                  <span style={{ fontWeight: 'bold' }}>
                    $
                    {price}
                  </span>

                </Space>

              ),
            },
            {
              title: 'Category',
              dataIndex: 'category',
              key: 'category',
              render: category => (
                <Tag color="blue">{category}</Tag>
              ),
            },
          ]}
          dataSource={data?.products}
          rowKey="id"
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: data?.total,
            showSizeChanger: true,
            showTotal: total => `Total ${total} items`,
          }}

          onChange={handleTableChange}
          loading={isPending}
        />
      </Card>
    </div>
  )
}
