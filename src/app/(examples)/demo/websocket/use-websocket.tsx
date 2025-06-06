import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Message {
  type: string
  data: any
}

interface ChatMessage {
  username: string
  message: string
  timestamp: number
}

interface SystemMessage {
  type: 'USER_JOINED' | 'USER_LEFT' | 'USERNAME_CHANGED'
  data: {
    username: string
    oldUsername?: string
    newUsername?: string
    timestamp: number
  }
}

// 查询键
export const chatKeys = {
  all: ['chat'] as const,
  messages: () => [...chatKeys.all, 'messages'] as const,
  users: () => [...chatKeys.all, 'users'] as const,
}

export function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false)
  const [username, setUsername] = useState('')
  const wsRef = useRef<WebSocket | null>(null)
  const heartbeatIntervalRef = useRef(0)
  const queryClient = useQueryClient()

  // 发送消息
  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'CHAT_MESSAGE',
        message,
      }))
    }
  }, [])

  // 更新用户名
  const updateUsername = useCallback((newUsername: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'SET_USERNAME',
        username: newUsername,
      }))
      setUsername(newUsername)
    }
  }, [])

  // 发送心跳
  const sendHeartbeat = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'HEARTBEAT',
        timestamp: Date.now(),
      }))
    }
  }, [])

  // 处理接收到的消息
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: Message = JSON.parse(event.data)

      switch (message.type) {
        case 'WELCOME':
          setUsername(message.data.username)
          break

        case 'CHAT_MESSAGE':
          // 使用 TanStack Query 更新消息缓存
          queryClient.setQueryData(chatKeys.messages(), (old: ChatMessage[] = []) => {
            return [...old, message.data]
          })
          break

        case 'USER_JOINED':
        case 'USER_LEFT':
        case 'USERNAME_CHANGED':
          // 使用 TanStack Query 更新系统消息缓存
          queryClient.setQueryData(chatKeys.users(), (old: SystemMessage[] = []) => {
            return [...old, message as SystemMessage]
          })
          break

        case 'HEARTBEAT_ACK':
          // 心跳确认，可以在这里处理连接状态
          break
      }
    }
    catch (error) {
      console.error('Error processing message:', error)
    }
  }, [queryClient])

  // 初始化 WebSocket 连接
  useEffect(() => {
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)
      // 启动心跳
      heartbeatIntervalRef.current = setInterval(sendHeartbeat, 30000) as unknown as any
    }

    ws.onclose = () => {
      setIsConnected(false)
      // 清除心跳
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current)
      }
    }

    ws.onmessage = handleMessage

    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current)
      }
      ws.close()
    }
  }, [url, handleMessage, sendHeartbeat])

  return {
    isConnected,
    username,
    sendMessage,
    updateUsername,
  }
}
