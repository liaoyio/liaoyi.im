'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import All from './components/all'
import LoadMore from './components/load-more'
import SingleProduct from './components/single-product'

export default function ProductPage() {
  // 标签位置
  const [mode, setMode] = useState('top')
  // 对齐方式
  const [alignValue, setAlignValue] = useState('center')

  return (
    <section className="container mx-auto py-10">
      <div className="flex gap-6 mb-10">
        <Tabs defaultValue={mode} onValueChange={e => setMode(e)}>
          <TabsList>
            <TabsTrigger value="top">Horizontal</TabsTrigger>
            <TabsTrigger value="left">Vertical</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs defaultValue={alignValue} onValueChange={e => setAlignValue(e)}>
          <TabsList>
            {['start', 'center', 'end'].map(it => <TabsTrigger key={it} value={it}>{it}</TabsTrigger>) }
          </TabsList>
        </Tabs>

      </div>

      <Tabs defaultValue="1">
        <TabsList className="mb-6">
          <TabsTrigger value="1">全部</TabsTrigger>
          <TabsTrigger value="2">单个产品</TabsTrigger>
          <TabsTrigger value="3">分页</TabsTrigger>
        </TabsList>

        <TabsContent value="1">
          <All />
        </TabsContent>
        <TabsContent value="2">
          <SingleProduct />
        </TabsContent>
        <TabsContent value="3">
          <LoadMore />
        </TabsContent>
      </Tabs>
    </section>
  )
}
