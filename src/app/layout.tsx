import type { ReactNode } from 'react'
import { RootProvider } from 'fumadocs-ui/provider'
import '../css/style.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
