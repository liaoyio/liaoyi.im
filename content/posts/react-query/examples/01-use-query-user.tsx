'use client'
import { useQuery } from '@tanstack/react-query'
import { Input } from 'antd'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface User {
  id: number
  email: string
  username: string
  address: {
    city: string
    street: string
    number: number
    zipcode: string
  }
  phone: string
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`https://fakestoreapi.com/users/${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

function UserDetail({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // 只有当 userId 存在时才执行查询
  })

  if (isLoading)
    return <p>loading...</p>

  if (error) {
    return <p className=" text-red-600 p-4 border-red-400">{error.message}</p>
  }

  if (!data)
    return <p className=" text-orange-600 p-4 border-orange-400"> No data available</p>

  return (
    <div className="border p-6 flex flex-col gap-2 rounded-md">

      <div className="font-semibold">
        👩‍🚀
        {data.username}
      </div>

      <div>
        <p>
          📩 :
          {data.email}
        </p>

        <p>
          📲 :
          {data.phone}
        </p>

        <p>
          <span> 📇 :</span>
          {data.address.street}
          {data.address.number}
          ,
          {data.address.city}
        </p>
      </div>
    </div>
  )
}

export default function QueryUser() {
  const [inputValue, setInputValue] = useState<string>('1') // 输入框的值
  const [userId, setUserId] = useState<string>('1') // 实际查询的用户ID

  const handleSearch = () => {
    if (inputValue.trim()) {
      setUserId(inputValue.trim())
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <Button onClick={handleSearch} size="icon" variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-80">
        <UserDetail userId={userId} />
      </div>
    </div>
  )
}
