'use client'

import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'

interface Todo {
  id: number
  title: string
  completed: boolean
}

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  if (!response.ok) {
    throw new Error('网络请求失败')
  }
  return response.json()
}

/**
 * 待办事项列表组件
 */
export default function TodoList() {
  const {
    data: todos,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isStale,
    dataUpdatedAt,
  } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 5000,
  })

  if (isLoading) {
    return <div className="text-orange-500">加载中...</div>
  }

  if (isError) {
    return (
      <div className="text-red-500">
        错误:
        {error.message}
      </div>
    )
  }

  return (
    <div>
      <h3>TODO List</h3>

      {/* 当数据过期且不在获取中时显示刷新按钮 */}
      {isStale && !isFetching && (
        <Button type="button" variant="outline" onClick={() => refetch()} style={{ marginBottom: '1rem' }}>
          刷新数据
        </Button>
      )}

      {/* 如果正在获取新数据，显示加载提示 */}
      {isFetching && <div className="text-blue-500">正在更新数据...</div>}

      <p className="text-xs">
        数据更新于
        {new Date(dataUpdatedAt).toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </p>

      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} />
            <span className="ml-2">{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
