'use client'

import dynamic from 'next/dynamic'

const Redacted = dynamic(() => import('./redacted'), {
  ssr: false,
  loading: () => (
    <span className="cursor-help text-xs font-mono select-none">▓░▓▒░░▓░</span>
  ),
})

export function RedactedText() {
  return <Redacted />
}
