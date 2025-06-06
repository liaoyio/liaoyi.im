import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'antd'

interface Todo {
  userId: number
  todo: string
  completed: boolean
}

async function updateTodo(newTodo: Todo) {
  const response = await fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  })
  return response.json()
}

export default function TodoList() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      // 取消任何传出的重新获取
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      // 保存之前的数据
      const previousTodos = queryClient.getQueryData(['todos'])

      // 乐观更新
      queryClient.setQueryData(['todos'], (old: Todo[]) => [...old, newTodo])

      // 返回上下文对象
      return { previousTodos }
    },
    onError: (err, _, context) => {
      console.log('🚀 ~ TodoList ~ err:', err)
      // 如果发生错误，回滚到之前的数据
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    onSettled: () => {
      // 无论成功或失败，都重新获取数据
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      {mutation.isPending
        ? (
            'Adding todo...'
          )
        : (
            <>
              {mutation.isError
                ? (
                    <div>
                      An error occurred:
                      {mutation.error.message}
                    </div>

                  )
                : null}

              {mutation.isSuccess ? <div>Todo added!</div> : null}

              <Button
                onClick={() => {
                  mutation.mutate({ userId: Date.now(), todo: 'New Todo', completed: false })
                }}
              >
                Create Todo
              </Button>

            </>
          )}
    </div>
  )
}
