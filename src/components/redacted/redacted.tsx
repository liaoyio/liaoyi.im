'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Chat } from './chat'

const CHARS = ['▓', '▒', '░']
const LENGTH = 8

function Redacted() {
  const [text, setText] = useState(generateRandomText())
  const [_, setMounted] = useState(false)
  const [chatActive, setChatActive] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setText(generateRandomText())
    }, 500)

    return () => clearInterval(interval)
  }, [])

  function generateRandomText() {
    return Array.from(
      { length: LENGTH },
      () => CHARS[Math.floor(Math.random() * CHARS.length)],
    ).join('')
  }
  return (
    <button
      type="button"
      className={cn('ring-offset-neutral-300 focus-visible:ring-neutral-400 rounded-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-help font-mono', {
        'cursor-auto': chatActive,
      })}
      onClick={() => setChatActive(true)}
    >
      <Chat active={chatActive} setActive={() => setChatActive(false)} />
      <span className="text-xs">{text}</span>
    </button>
  )
}

export default Redacted
