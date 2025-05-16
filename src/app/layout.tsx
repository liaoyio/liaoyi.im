import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { RootProvider } from 'fumadocs-ui/provider'
import { geistMono, geistSans } from '@/fonts'
import { cn } from '@/lib/cn'
import '../css/style.css'

export const metadata: Metadata = {
  title: {
    template: '%s | liaoyi.im',
    default: 'liaoyi.im',
  },
  description: '',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={cn('relative flex min-h-svh flex-col overflow-x-hidden')}>
        <RootProvider search={{ options: { type: 'static' } }}>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
