import type { ReactNode } from 'react'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { getLinks } from 'fumadocs-ui/layouts/shared'
import { baseOptions, linkItems } from '@/app/layout.config'
import Footer from '@/fumadocs/components/footer'
import { Header } from '@/fumadocs/components/header'
import { Social } from '@/fumadocs/components/icons/social'

const footerNavigation = [
  { name: 'X', href: 'https://x.com/liaoyia', icon: Social.x },
  { name: 'GitHub', href: 'https://github.com/liaoyio', icon: Social.github },
]

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
      <Footer navigation={footerNavigation} />
    </HomeLayout>
  )
}
