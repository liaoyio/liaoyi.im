import type { ReactNode } from 'react'
import { RootProvider } from 'fumadocs-ui/provider'
import { Toaster } from 'sonner'
import { ProductionProvider } from '@/components/_production'
import { geistMono, geistSans } from '@/fonts'
import { cn } from '@/lib/cn'
import { baseUrl, createMetadata } from '@/lib/metadata'
import { description } from './layout.config'

import '../css/style.css'

export const metadata = createMetadata({
  title: {
    template: '%s | liaoyi.im',
    default: 'liaoyi.im',
  },
  description: description ?? '',
  metadataBase: baseUrl,
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className={cn('relative flex min-h-svh flex-col overflow-x-hidden')}>
        <Toaster richColors />
        <ProductionProvider />
        <RootProvider search={{ options: { type: 'fetch' } }}>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
