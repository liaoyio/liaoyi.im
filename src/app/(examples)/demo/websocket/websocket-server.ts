/* eslint-disable node/prefer-global/buffer */
// pnpm ws:  "ws": "npx tsx './src/app/(examples)/demo/websocket/websocket-server.ts'",
import { createServer } from 'node:http'
import { v4 as uuidv4 } from 'uuid'
import { WebSocket, WebSocketServer } from 'ws'

// 创建 HTTP 服务器
const server = createServer()
const wss = new WebSocketServer({ server })

// 存储所有连接的客户端
interface Client {
  id: string
  ws: WebSocket
  username: string
  lastHeartbeat: number
}

const clients = new Map<string, Client>()

// 心跳检测间隔（毫秒）
const HEARTBEAT_INTERVAL = 30000
// 心跳超时时间（毫秒）
const HEARTBEAT_TIMEOUT = 60000

// 广播消息给所有客户端
function broadcast(message: any, excludeClientId?: string) {
  const messageStr = JSON.stringify(message)
  clients.forEach((client) => {
    if (client.id !== excludeClientId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(messageStr)
    }
  })
}

// 处理 WebSocket 连接
wss.on('connection', (ws: WebSocket) => {
  const clientId = uuidv4()
  console.log(`Client connected: ${clientId}`)

  // 初始化客户端
  const client: Client = {
    id: clientId,
    ws,
    username: `User-${clientId.slice(0, 4)}`,
    lastHeartbeat: Date.now(),
  }
  clients.set(clientId, client)

  // 发送欢迎消息
  ws.send(JSON.stringify({
    type: 'WELCOME',
    data: {
      clientId,
      username: client.username,
      message: 'Welcome to the chat!',
    },
  }))

  // 广播新用户加入
  broadcast({
    type: 'USER_JOINED',
    data: {
      username: client.username,
      timestamp: Date.now(),
    },
  }, clientId)

  // 处理消息
  ws.on('message', (message: Buffer) => {
    try {
      const data = JSON.parse(message.toString())

      switch (data.type) {
        case 'CHAT_MESSAGE':
          // 处理聊天消息
          broadcast({
            type: 'CHAT_MESSAGE',
            data: {
              username: client.username,
              message: data.message,
              timestamp: Date.now(),
            },
          })
          break

        case 'HEARTBEAT':
          // 处理心跳消息
          client.lastHeartbeat = Date.now()
          ws.send(JSON.stringify({
            type: 'HEARTBEAT_ACK',
            data: { timestamp: Date.now() },
          }))
          break

        case 'SET_USERNAME':
          client.username = data.username
          broadcast({
            type: 'USERNAME_CHANGED',
            data: {
              oldUsername: client.username, // 处理用户名更改
              newUsername: data.username,
              timestamp: Date.now(),
            },
          })
          break
      }
    }
    catch (error) {
      console.error('Error processing message:', error)
    }
  })

  // 处理连接关闭
  ws.on('close', () => {
    console.log(`Client disconnected: ${clientId}`)
    clients.delete(clientId)
    broadcast({
      type: 'USER_LEFT',
      data: {
        username: client.username,
        timestamp: Date.now(),
      },
    })
  })

  // 处理错误
  ws.on('error', (error: unknown) => {
    console.error(`WebSocket error for client ${clientId}:`, error)
  })
})

// 心跳检测
setInterval(() => {
  const now = Date.now()
  clients.forEach((client, clientId) => {
    if (now - client.lastHeartbeat > HEARTBEAT_TIMEOUT) {
      console.log(`Client ${clientId} timed out`)
      client.ws.terminate()
      clients.delete(clientId)
    }
  })
}, HEARTBEAT_INTERVAL)

// 启动服务器
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`)
})
