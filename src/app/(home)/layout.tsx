import type { ReactNode } from 'react'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { getLinks } from 'fumadocs-ui/layouts/shared'
import { baseOptions, linkItems } from '@/app/layout.config'
import { Header } from '@/fumadocs/components/header'

export default function Layout({ children }: { children: ReactNode }) {
  const finalLinks = getLinks(linkItems, baseOptions.githubUrl)
  return (
    <HomeLayout
      {...baseOptions}
      nav={{ component: (<Header finalLinks={finalLinks} {...baseOptions} />) }}
      className="pt-0 home-layout"
    >
      <div className="home-children flex flex-1 flex-col divide-y divide-dashed divide-border/70 border-border/70 border-dashed sm:border-b dark:divide-border dark:border-border">
        {children}
      </div>
    </HomeLayout>
  )
}
